import { NextResponse } from "next/server";
import { ContactSchema } from "@/components/sections/kontakt-form/schema";

/**
 * Contact form handler — receives submissions from /kontakt.
 *
 * TODO: integrate Resend/Nodemailer (env-configured) + rate limiting.
 * Currently validates the payload and returns a success stub.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — bots fill this hidden field; pretend success so they move on.
    if (body?.honeypot) {
      return NextResponse.json({ success: true });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder korrekt aus." },
        { status: 400 }
      );
    }

    // TODO: send email via Resend/Nodemailer using parsed.data

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
