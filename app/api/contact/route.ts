import { validateContact, escapeHtml } from "@/lib/contact";
import { rateLimit, requestKey } from "@/lib/rate-limit";
export async function POST(request: Request) {
  if (!rateLimit(`contact:${requestKey(request)}`, 4, 600000))
    return Response.json(
      {
        error:
          "Too many messages. Please email me directly or try again in ten minutes.",
      },
      { status: 429 },
    );
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 14000)
      return Response.json({ error: "Message is too large." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid message format." }, { status: 400 });
  }
  const result = validateContact(body);
  if (result.error)
    return Response.json({ error: result.error }, { status: 400 });
  const data = result.data!;
  if (data.website)
    return Response.json(
      { error: "Message could not be accepted." },
      { status: 400 },
    );
  if (!process.env.RESEND_API_KEY)
    return Response.json(
      {
        error:
          "The contact form is temporarily unavailable. Please email arjunrawat4741@gmail.com directly.",
      },
      { status: 503 },
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL || "arjunrawat4741@gmail.com",
        reply_to: data.email,
        subject: data.subject || `Portfolio enquiry from ${data.name}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
        html: `<h2>Portfolio enquiry</h2><p>From: ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
      }),
    });
    if (!response.ok)
      return Response.json(
        {
          error:
            "Email delivery failed. Please email arjunrawat4741@gmail.com directly.",
        },
        { status: 502 },
      );
    return Response.json({
      message: "Message sent. Thank you — I’ll get back to you by email.",
    });
  } catch {
    return Response.json(
      {
        error:
          "Email delivery is unavailable. Please email arjunrawat4741@gmail.com directly.",
      },
      { status: 502 },
    );
  }
}
