import { z } from "zod";

// Shared by the form UI, the orchestrator, and the API route — the server
// re-validates with this same schema (never trust the client alone).
export const ContactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Bitte geben Sie Ihren Vornamen an (mind. 2 Zeichen)."),
  lastName: z
    .string()
    .min(2, "Bitte geben Sie Ihren Nachnamen an (mind. 2 Zeichen)."),
  company: z.string().optional(),
  email: z
    .string()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z.string().optional(),
  service: z.enum(
    ["sicherheitsdienst", "umzugservice", "reinigung", "sonstiges"],
    { message: "Bitte wählen Sie eine Leistung." }
  ),
  message: z
    .string()
    .min(10, "Ihre Nachricht muss mindestens 10 Zeichen enthalten."),
  privacy: z.boolean().refine((v) => v === true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
  // Honeypot — must stay empty (bots fill it, humans don't see it)
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";
