import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactSchema } from "@/components/sections/kontakt-form/schema";

/**
 * Kontaktformular-Handler — empfängt Anfragen von /kontakt und versendet
 * sie per Resend an das Postfach des Inhabers.
 *
 * Datenschutz: Der Nachrichteninhalt wird NICHT in Server-Logs geschrieben.
 * Bei Fehlern wird ausschließlich eine generische Fehlermeldung geloggt.
 */

// Server-seitige Konfiguration — ausschließlich aus Umgebungsvariablen,
// niemals im Client-Bundle. RESEND_API_KEY ist Pflicht (siehe .env.local).
const resendApiKey = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@ts-servicegroup.de";
// Absender muss eine bei Resend verifizierte Domain nutzen. Bis die Domain
// verifiziert ist, kann ersatzweise "onboarding@resend.dev" verwendet werden.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ??
  "TS Service Group <kontakt@ts-servicegroup.de>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Lesbare Labels für das Leistungs-Feld (Slug -> Anzeigename).
const SERVICE_LABELS: Record<string, string> = {
  sicherheitsdienst: "Sicherheitsdienst",
  umzugservice: "Umzugservice",
  reinigung: "Reinigung",
  sonstiges: "Sonstiges",
};

// Best-effort In-Memory Rate-Limit pro IP. Hinweis: In einer serverlosen
// Umgebung gilt das Limit pro Instanz und überlebt keinen Kaltstart —
// als einfacher Spam-Schutz (zusätzlich zum Honeypot) ausreichend.
const RATE_LIMIT_MAX = 5; // max. Anfragen
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // pro 10 Minuten
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot — Bots füllen dieses versteckte Feld; wir tun erfolgreich,
    // damit sie weiterziehen, versenden aber keine E-Mail.
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

    if (!resend) {
      // Fehlende Server-Konfiguration nicht nach außen offenlegen.
      console.error("Contact form: RESEND_API_KEY ist nicht konfiguriert.");
      return NextResponse.json(
        { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
        { status: 500 }
      );
    }

    const { firstName, lastName, company, email, phone, service, message } =
      parsed.data;
    const fullName = `${firstName} ${lastName}`.trim();
    const serviceLabel = SERVICE_LABELS[service] ?? service;

    const rows: Array<[string, string]> = [
      ["Name", fullName],
      ["E-Mail", email],
      ["Telefon", phone?.trim() || "—"],
      ["Firma", company?.trim() || "—"],
      ["Leistung", serviceLabel],
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;">
        <h2 style="margin:0 0 16px;">Neue Anfrage über das Kontaktformular</h2>
        <table style="border-collapse:collapse;margin-bottom:16px;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#666;">${label}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(
                  value
                )}</td></tr>`
            )
            .join("")}
        </table>
        <div style="padding:12px 16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap;">${escapeHtml(
          message
        )}</div>
      </div>
    `;

    const text = `Neue Anfrage über das Kontaktformular

${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}

Nachricht:
${message}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Neue Anfrage (${serviceLabel}) — ${fullName}`,
      html,
      text,
    });

    if (error) {
      // Nur generische Fehlerinfo loggen, keine Formularinhalte.
      console.error("Contact form: Resend-Versand fehlgeschlagen.", error.name);
      return NextResponse.json(
        { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ihre Nachricht wurde erfolgreich gesendet.",
    });
  } catch {
    // Kein Body/Stack mit personenbezogenen Daten loggen.
    console.error("Contact form: unerwarteter Fehler bei der Verarbeitung.");
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
