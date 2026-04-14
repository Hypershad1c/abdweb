import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message, website } =
      await req.json()

    // 🕵️ HONEYPOT CHECK (ANTI-SPAM)
    if (website && website.trim() !== '') {
      return NextResponse.json(
        { error: 'Spam detected' },
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

    console.log('📩 New contact form received:', {
      name,
      email,
      subject,
    })

    // 📨 EMAIL TO YOU (ADMIN)
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'spox618@gmail.com',
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

    // 🤖 AUTO REPLY TO USER
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
    console.error('❌ Email error:', err)

    return NextResponse.json(
      { error: 'Email failed' },
      { status: 500 }
    )
  }
}