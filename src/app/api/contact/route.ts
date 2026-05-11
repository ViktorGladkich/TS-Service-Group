import { NextResponse } from "next/server";

/**
 * Contact form handler — receives form submissions from /kontakt.
 *
 * TODO: Integrate Resend or Nodemailer (env-configured).
 * Current implementation validates input and returns success stub.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, service, message, privacy, honeypot } = body;

    // Honeypot check — bots fill this hidden field
    if (honeypot) {
      // Silently reject
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message || !privacy) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    // TODO: Rate limiting
    // TODO: Send email via Resend/Nodemailer
    // const { RESEND_API_KEY, CONTACT_EMAIL } = process.env;

    console.log("Contact form submission:", {
      name,
      email,
      phone,
      service,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Ihre Nachricht wurde erfolgreich gesendet.",
    });
  } catch {
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
