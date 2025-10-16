import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Simple email sending function without React Email dependencies
async function sendSimpleEmail(apiKey: string, emailData: EmailData) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email sending failed: ${errorText}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate the request body
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize the data
    const sanitizedData = {
      name: body.name.trim().substring(0, 100),
      email: body.email.trim().toLowerCase().substring(0, 254),
      message: body.message.trim().substring(0, 5000),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Log the message (for development and backup)
    console.log('📧 New contact form submission:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      message: sanitizedData.message,
      timestamp: sanitizedData.timestamp,
      userAgent: sanitizedData.userAgent
    });

    // Send email notification if API key is configured
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // Email to you (notification of new contact)
        const notificationEmail = {
          from: 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL || 'arjunrawat4741@gmail.com',
          subject: `🚀 New Contact Form Submission from ${sanitizedData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Contact Form Submission</h1>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #374151; margin: 0 0 5px 0;">👤 Name:</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 16px;">${sanitizedData.name}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #374151; margin: 0 0 5px 0;">📧 Email:</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 16px;">
                    <a href="mailto:${sanitizedData.email}" style="color: #3b82f6; text-decoration: none;">${sanitizedData.email}</a>
                  </p>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #374151; margin: 0 0 5px 0;">💬 Message:</h3>
                  <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <p style="color: #374151; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
                  </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                  <h3 style="color: #374151; margin: 0 0 5px 0;">🕒 Timestamp:</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">${new Date(sanitizedData.timestamp).toLocaleString()}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${sanitizedData.email}?subject=Re: Your message from Portfolio Contact Form" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Reply to ${sanitizedData.name}
                </a>
              </div>
            </div>
          `
        };

        await sendSimpleEmail(process.env.RESEND_API_KEY, notificationEmail);

        // Send confirmation email to the person who contacted you
        const confirmationEmail = {
          from: 'onboarding@resend.dev',
          to: sanitizedData.email,
          subject: `Thank you for contacting Arjun Rawat! 🚀`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out! 🚀</h1>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Hi <strong>${sanitizedData.name}</strong>,
                </p>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Thank you for contacting me through my portfolio! I've received your message and I'm excited to connect with you.
                </p>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
                  <h3 style="color: #065f46; margin: 0 0 10px 0;">✅ What happens next?</h3>
                  <ul style="color: #374151; margin: 0; padding-left: 20px;">
                    <li>I typically respond within 24 hours</li>
                    <li>I'll reach out to discuss your project or inquiry</li>
                    <li>We can schedule a call if needed</li>
                  </ul>
                </div>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  In the meantime, feel free to:
                </p>
                
                <div style="text-align: center; margin-bottom: 20px;">
                  <a href="https://github.com/ARJUNRAWAT-DEL" style="background: #24292e; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; margin: 0 5px; display: inline-block;">
                    View my GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/rwtarjun/" style="background: #0077b5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; margin: 0 5px; display: inline-block;">
                    Connect on LinkedIn
                  </a>
                </div>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                  Best regards,<br>
                  <strong>Arjun Rawat</strong><br>
                  <span style="color: #6b7280; font-size: 14px;">Data Analyst | AI/ML Engineer | Software Developer</span>
                </p>
              </div>
            </div>
          `
        };

        await sendSimpleEmail(process.env.RESEND_API_KEY, confirmationEmail);

        emailSent = true;
        console.log('✅ Emails sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError);
        // Don't fail the request if email sending fails
      }
    }

    // For now, we'll simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: emailSent 
          ? 'Message sent successfully! I\'ll get back to you soon via email.' 
          : 'Message received! Email service not configured yet, but I got your message in the logs.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later or contact me directly via email.' 
      },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}