"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";

// ============================================================
// VALIDATION SCHEMA
// ============================================================

const ContactSchema = z.object({
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
  privacy: z
    .boolean()
    .refine((v) => v === true, {
      message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    }),
  // Honeypot — must stay empty (bots fill it, humans don't see it)
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

// ============================================================
// COMPONENT
// ============================================================

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function KontaktForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error ?? "Unbekannter Fehler.");
      }

      setSubmitStatus("success");
      reset();
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      );
    }
  };

  // Section header entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kontakt-form-eyebrow",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".kontakt-form-title-line",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".kontakt-form-info",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".kontakt-form-field",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-border bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* SECTION HEADER */}
        <div className="mb-16 flex flex-col md:mb-24">
          <span
            className="kontakt-form-eyebrow mb-4 font-mono text-sm uppercase tracking-[0.2em] text-text-muted"
            style={{ opacity: 0 }}
          >
            ANFRAGE
          </span>
          <h2
            ref={titleRef}
            className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl"
          >
            <span className="block overflow-hidden">
              <span
                className="kontakt-form-title-line block"
                style={{ transform: "translateY(100%)" }}
              >
                Schreiben Sie uns.
              </span>
            </span>
          </h2>
        </div>

        {/* CONTENT — info left, form right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* LEFT — supporting info */}
          <aside className="space-y-10 lg:col-span-4">
            <div
              className="kontakt-form-info space-y-3"
              style={{ opacity: 0 }}
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-text-subtle">
                Adresse
              </span>
              <p className="font-sans text-base leading-relaxed text-text">
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.postalCode}{" "}
                {siteConfig.contact.address.city}
                <br />
                <span className="text-text-muted">
                  {siteConfig.contact.address.region},{" "}
                  {siteConfig.contact.address.countryName}
                </span>
              </p>
            </div>

            <div
              className="kontakt-form-info space-y-3"
              style={{ opacity: 0 }}
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-text-subtle">
                Öffnungszeiten
              </span>
              <ul className="space-y-1 font-mono text-sm text-text">
                <li className="flex justify-between gap-4">
                  <span className="text-text-muted">Mo–Fr</span>
                  <span>08:00–18:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-text-muted">Sa</span>
                  <span>09:00–14:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-text-muted">So</span>
                  <span>Geschlossen</span>
                </li>
              </ul>
            </div>

            <div
              className="kontakt-form-info border-t border-border pt-8 space-y-3"
              style={{ opacity: 0 }}
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-metallic-light">
                Notruf 24/7
              </span>
              <p className="text-sm leading-relaxed text-text-muted">
                Für akute Sicherheitsanliegen ist unser Notdienst rund um die
                Uhr erreichbar.
              </p>
            </div>
          </aside>

          {/* RIGHT — form */}
          <div className="lg:col-span-8">
            {submitStatus === "success" ? (
              <SuccessState onReset={() => setSubmitStatus("idle")} />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-8"
              >
                {/* Honeypot — visually hidden, bots fill it */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                >
                  <label>
                    Lassen Sie dieses Feld leer
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("honeypot")}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <Field
                    label="Vorname *"
                    error={errors.firstName?.message}
                    className="kontakt-form-field"
                  >
                    <input
                      type="text"
                      autoComplete="given-name"
                      {...register("firstName")}
                      className="kontakt-input"
                    />
                  </Field>

                  <Field
                    label="Nachname *"
                    error={errors.lastName?.message}
                    className="kontakt-form-field"
                  >
                    <input
                      type="text"
                      autoComplete="family-name"
                      {...register("lastName")}
                      className="kontakt-input"
                    />
                  </Field>

                  <Field
                    label="E-Mail *"
                    error={errors.email?.message}
                    className="kontakt-form-field"
                  >
                    <input
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="kontakt-input"
                    />
                  </Field>

                  <Field
                    label="Telefon"
                    error={errors.phone?.message}
                    className="kontakt-form-field"
                  >
                    <input
                      type="tel"
                      autoComplete="tel"
                      {...register("phone")}
                      className="kontakt-input"
                    />
                  </Field>

                  <Field
                    label="Firma"
                    error={errors.company?.message}
                    className="kontakt-form-field"
                  >
                    <input
                      type="text"
                      autoComplete="organization"
                      {...register("company")}
                      className="kontakt-input"
                    />
                  </Field>

                  <Field
                    label="Leistung *"
                    error={errors.service?.message}
                    className="kontakt-form-field"
                  >
                    <div className="relative">
                      <select
                        {...register("service")}
                        defaultValue=""
                        className="kontakt-input appearance-none pr-8"
                      >
                        <option value="" disabled className="bg-bg text-text-muted">
                          Bitte wählen
                        </option>
                        {siteConfig.services.map((service) => (
                          <option
                            key={service.slug}
                            value={service.slug}
                            className="bg-bg text-text"
                          >
                            {service.title}
                          </option>
                        ))}
                        <option value="sonstiges" className="bg-bg text-text">
                          Sonstiges
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </Field>
                </div>

                <Field
                  label="Nachricht *"
                  error={errors.message?.message}
                  className="kontakt-form-field"
                >
                  <textarea
                    rows={6}
                    {...register("message")}
                    className="kontakt-input resize-none"
                  />
                </Field>

                {/* DSGVO checkbox */}
                <div className="kontakt-form-field space-y-2">
                  <label className="flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      {...register("privacy")}
                      className="kontakt-checkbox mt-1 shrink-0"
                    />
                    <span className="text-sm leading-relaxed text-text-muted">
                      Ich habe die{" "}
                      <Link
                        href="/datenschutz"
                        className="text-text underline underline-offset-4 hover:text-metallic-light"
                      >
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur
                      Bearbeitung meiner Anfrage zu. *
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="pl-8 text-xs text-red-400">
                      {errors.privacy.message}
                    </p>
                  )}
                </div>

                {/* Submit row */}
                <div className="kontakt-form-field flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
                    * Pflichtfelder
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "submitting"}
                    className="group inline-flex items-center gap-4 rounded-full border border-border-hover bg-elevated py-2 pl-6 pr-2 text-sm font-medium text-text transition-all duration-300 hover:bg-elevated/80 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>
                      {isSubmitting || submitStatus === "submitting"
                        ? "Wird gesendet…"
                        : "Anfrage senden"}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-text text-bg transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                {/* Submit error */}
                {submitStatus === "error" && submitError && (
                  <p
                    role="alert"
                    className="rounded-md border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                  >
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Local field styles */}
      <style jsx>{`
        :global(.kontakt-input) {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--color-border);
          padding: 0.5rem 0;
          color: var(--color-text);
          font-size: 1rem;
          line-height: 1.5;
          outline: none;
          transition: border-color 0.3s;
        }
        :global(.kontakt-input:focus) {
          border-bottom-color: var(--color-metallic-light);
        }
        :global(.kontakt-input::placeholder) {
          color: var(--color-text-subtle);
        }
        :global(.kontakt-checkbox) {
          appearance: none;
          width: 1rem;
          height: 1rem;
          border: 1px solid var(--color-border-hover);
          background: transparent;
          cursor: pointer;
          position: relative;
        }
        :global(.kontakt-checkbox:checked) {
          background: var(--color-metallic-light);
          border-color: var(--color-metallic-light);
        }
        :global(.kontakt-checkbox:checked::after) {
          content: "";
          position: absolute;
          left: 3px;
          top: 0px;
          width: 4px;
          height: 8px;
          border: solid #0a0a0a;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}

// ============================================================
// FIELD WRAPPER
// ============================================================

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)} style={{ opacity: 0 }}>
      <label className="block font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ============================================================
// SUCCESS STATE
// ============================================================

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-start justify-center space-y-6 rounded-2xl border border-metallic-light/30 bg-elevated/40 p-10 lg:p-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-metallic-light/40 bg-metallic-light/10">
        <Check className="h-6 w-6 text-metallic-light" />
      </span>
      <div className="space-y-3">
        <h3 className="font-display text-3xl font-medium tracking-tight text-text md:text-4xl">
          Vielen Dank.
        </h3>
        <p className="max-w-md text-base leading-relaxed text-text-muted">
          Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb
          eines Werktags bei Ihnen zurück.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted underline underline-offset-4 transition-colors hover:text-text"
      >
        Weitere Anfrage stellen
      </button>
    </div>
  );
}
