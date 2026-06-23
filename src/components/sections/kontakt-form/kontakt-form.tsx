"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactInfo } from "./contact-info";
import { ContactFormFields } from "./contact-form-fields";
import { FieldStyles } from "./field-styles";
import { SuccessState } from "./success-state";
import {
  ContactSchema,
  type ContactFormValues,
  type SubmitStatus,
} from "./schema";

// Orchestrator — owns form state, submission, and the scroll-triggered
// entrance. Presentation lives in the sibling components (contact-info,
// contact-form-fields, success-state, field, field-styles).
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
        const json = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
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

  // Section header + fields entrance
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
                style={{ opacity: 0 }}
              >
                Schreiben Sie uns.
              </span>
            </span>
          </h2>
        </div>

        {/* CONTENT — info left, form right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <ContactInfo />

          <div className="lg:col-span-8">
            {submitStatus === "success" ? (
              <SuccessState onReset={() => setSubmitStatus("idle")} />
            ) : (
              <ContactFormFields
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                submitError={submitError}
                onSubmit={handleSubmit(onSubmit)}
              />
            )}
          </div>
        </div>
      </div>

      <FieldStyles />
    </section>
  );
}
