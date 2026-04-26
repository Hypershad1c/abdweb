import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    // 🛡️ GET REAL IP (Vercel safe)
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
      token, // 👈 Turnstile token
    } = body

    // 🕵️ HONEYPOT CHECK
    if (website && website.trim() !== '') {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      )
    }

    // 🤖 VERIFY CLOUDFLARE TURNSTILE
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

    // ✅ BASIC VALIDATION
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      )
    }

    console.log('📩 New contact form:', { name, email, subject })

    // 📨 EMAIL TO ADMIN
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'abdessamad.ratby@gmail.com',
      subject: `New message: ${subject || 'No subject'}`,
      replyTo: email,
      html: `
        <div>
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || 'N/A'}</p>
          <p><b>Subject:</b> ${subject || 'N/A'}</p>
          <hr/>
          <p><b>Message:</b></p>
          <p>${message}</p>
        </div>
      `,
    })

    // 🤖 AUTO REPLY
    await resend.emails.send({
      from: 'Cabinet Ratby <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message',
      html: `
        <p>Hello ${name},</p>
        <p>We received your message and will contact you soon.</p>
        <br/>
        <p>— Cabinet Ratby</p>
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