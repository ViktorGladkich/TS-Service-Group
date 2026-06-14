import type { FormEventHandler } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { Field } from "./field";
import type { ContactFormValues, SubmitStatus } from "./schema";

// Right column — pure presentation. Form state is owned by the orchestrator
// and passed in; rendered only until the submission succeeds.
interface ContactFormFieldsProps {
  register: UseFormRegister<ContactFormValues>;
  errors: FieldErrors<ContactFormValues>;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  submitError: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function ContactFormFields({
  register,
  errors,
  isSubmitting,
  submitStatus,
  submitError,
  onSubmit,
}: ContactFormFieldsProps) {
  const isBusy = isSubmitting || submitStatus === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {/* Honeypot — visually hidden, bots fill it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          Lassen Sie dieses Feld leer
          <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
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
            gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung
            meiner Anfrage zu. *
          </span>
        </label>
        {errors.privacy && (
          <p className="pl-8 text-xs text-red-400">{errors.privacy.message}</p>
        )}
      </div>

      {/* Submit row */}
      <div className="kontakt-form-field flex flex-col items-start gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">
          * Pflichtfelder
        </p>

        <button
          type="submit"
          disabled={isBusy}
          className="group inline-flex items-center gap-4 rounded-full border border-border-hover bg-elevated py-2 pl-6 pr-2 text-sm font-medium text-text transition-all duration-300 hover:bg-elevated/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isBusy ? "Wird gesendet…" : "Anfrage senden"}</span>
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
  );
}
