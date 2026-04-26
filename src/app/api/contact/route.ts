import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

// 🔒 Escape HTML (prevents injection)
function escapeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function POST(req: Request) {
  try {
    // 🛡️ GET REAL IP
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'anonymous'

    // 🛡️ RATE LIMIT
    const { success } = await rateLimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await req.json()

    const {
      name,
      email,
      phone,
      subject,
      message,
      website,
      token,
    } = body

    // 🕵️ HONEYPOT
    if (website && website.trim() !== '') {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      )
    }

    // 🤖 TURNSTILE CHECK
    if (!token) {
      return NextResponse.json(
        { error: 'Verification required' },
        { status: 400 }
      )
    }

    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}&remoteip=${ip}`,
      }
    )

    const turnstileData = await turnstileRes.json()

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 400 }
      )
    }

    // ✅ VALIDATION
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      )
    }

    // 🔒 Escape user input
    const safeName = escapeHTML(name)
    const safeEmail = escapeHTML(email)
    const safePhone = escapeHTML(phone || 'N/A')
    const safeSubject = escapeHTML(subject || 'N/A')
    const safeMessage = escapeHTML(message)

    console.log('📩 New contact form:', { safeName, safeEmail })

    // 📨 ADMIN EMAIL
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'abdessamad.ratby@gmail.com',
      subject: `New message: ${safeSubject}`,
      replyTo: safeEmail,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.05);">
            
            <div style="background:#0f172a; color:#ffffff; padding:20px;">
              <h2 style="margin:0;">📩 New Contact Message</h2>
            </div>

            <div style="padding:20px; color:#333;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
              <p><strong>Subject:</strong> ${safeSubject}</p>

              <hr style="margin:20px 0;" />

              <p><strong>Message:</strong></p>
              <div style="background:#f9fafb; padding:15px; border-radius:8px;">
                ${safeMessage}
              </div>
            </div>

            <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
              Sent from your website contact form
            </div>

          </div>
        </div>
      `,
    })

    // 🤖 AUTO REPLY
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: safeEmail,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.05);">

            <div style="background:#0f172a; color:#ffffff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Cabinet Ratby</h2>
            </div>

            <div style="padding:25px; color:#333;">
              <p>Hello <strong>${safeName}</strong>,</p>

              <p>Thank you for contacting us. Your message has been successfully received.</p>

              <p>Our team will review your request and get back to you as soon as possible.</p>

              <div style="margin:25px 0; padding:15px; background:#f9fafb; border-radius:8px;">
                <strong>Your message:</strong>
                <p style="margin-top:10px;">${safeMessage}</p>
              </div>

              <p>If your request is urgent, feel free to contact us directly.</p>

              <br/>

              <p style="margin:0;"><strong>Cabinet Ratby</strong></p>
              <p style="margin:0; color:#64748b;">Legal Services</p>
            </div>

            <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#64748b;">
              This is an automated response — please do not reply directly.
            </div>

          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('❌ Contact API error:', err)

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}