# TS Service Group — Website Build Brief for Claude Code

You are building a premium, Awwwards-caliber, multi-page corporate website for **TS Service Group**, a German service company based in **Dresden, Saxony**. The company has three divisions:

1. **Sicherheitsdienst** — Objektschutz und Veranstaltungsschutz (physical security, NOT cybersecurity)
2. **Umzugservice** — Privat- und Firmenumzüge
3. **Reinigung** — Gebäude-, Unterhalts-, Grund- und Bauendreinigung

Treat this brief as the source of truth. Read it fully before scaffolding. Ask before deviating from any constraint.

---

## 1. Tech Stack (2026, modern)

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript, strict mode, no `any`
- **Styling**: TailwindCSS v4 (CSS-first config) + `class-variance-authority` for component variants + `clsx`/`tailwind-merge`
- **Animations**:
  - **Motion** (the new Framer Motion package `motion`) for declarative component animations
  - **GSAP + ScrollTrigger** for scroll-driven sequences
  - **Lenis** for smooth scroll, synced with ScrollTrigger
- **3D / WebGL (hero only, optional but recommended)**: React Three Fiber + Drei, or a lightweight shader background
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React, used sparingly — never as the central visual of a card
- **Fonts**: **Local fonts from [Fontshare](https://www.fontshare.com/)** — NO Google Fonts (this also helps with GDPR)
- **SEO**: Next.js Metadata API + JSON-LD via `schema-dts`
- **Email**: Resend or Nodemailer via Server Action
- **Linting**: ESLint, Prettier, Tailwind Prettier plugin

---

## 2. Brand & Design System

The visual identity must extend the chosen logo: **dark charcoal background `#121212`, metallic silver-gray accent, geometric Swiss minimalism, flat, no glossy/3D effects.**

### Color tokens (define in Tailwind v4 `@theme`)

```css
--color-bg: #0A0A0A;            /* page base, slightly deeper than logo bg */
--color-surface: #121212;        /* matches logo */
--color-elevated: #1A1A1A;
--color-text: #F5F5F5;
--color-text-muted: #A0A0A0;
--color-text-subtle: #6B6B6B;
--color-border: rgb(255 255 255 / 0.08);
--color-border-hover: rgb(255 255 255 / 0.16);
--gradient-metallic: linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%);
```

The metallic accent is used **sparingly** — for active states, key CTAs, dividers, numerals. Never flood the page with it.

### Typography (Fontshare, self-hosted)

Download `.woff2` files, place under `/public/fonts/`, declare via `@font-face` with `font-display: swap`, expose as Tailwind families:

- **Display** (`font-display`): **Clash Display** — for hero headlines, big numerals
- **Sans** (`font-sans`, default body): **Switzer** — body, UI, navigation
- **Mono** (`font-mono`, accents): **JetBrains Mono** alternative or **Geist Mono** local

Type scale (mobile → desktop, modular ~1.25):
- h1: 56 → 96px, tracking `-0.04em`, weight 500
- h2: 40 → 64px, tracking `-0.03em`
- h3: 28 → 36px
- body: 16 → 18px, leading 1.6
- caption / eyebrow: 12px uppercase, tracking `+0.12em`

### Layout & spacing
- 12-column grid, container max-width 1440px, gutters 24px
- Section padding: 120px desktop / 80px tablet / 56px mobile
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160
- Hairline 1px borders for separators
- Generous whitespace — Swiss minimalism, not cluttered

### "Not a template" visual rules
- No stock photos of smiling office workers
- No emoji
- No "icon + heading + 2 lines" template cards (this is the explicit ask)
- Numbers as visual anchors (large mono digits used as section counters: `01 / 02 / 03`)
- Marquee text bands between sections
- Always pair text with motion or texture, never just static centered text

---

## 3. Site Structure (German URLs)

```
/                                    Startseite
/leistungen                          Leistungen — Übersicht
/leistungen/sicherheitsdienst        Sicherheitsdienst Detail
/leistungen/umzugservice             Umzugservice Detail
/leistungen/reinigung                Reinigung Detail
/ueber-uns                           Über uns / Team / Werte
/referenzen                          Referenzen / Projekte
/kontakt                             Kontakt + Formular + Karte
/impressum                           Impressum (PFLICHT § 5 TMG)
/datenschutz                         Datenschutzerklärung (PFLICHT DSGVO)
/agb                                 Allgemeine Geschäftsbedingungen (empfohlen)
```

Optional local-SEO landing pages (recommend creating at least 2–3):
```
/sicherheitsdienst-dresden
/umzugsunternehmen-dresden
/gebaeudereinigung-dresden
```

---

## 4. Project Architecture

```
/src
  /app
    layout.tsx              # root: html lang="de", fonts, providers, JSON-LD Organization
    page.tsx                # Startseite
    /leistungen
      page.tsx
      /sicherheitsdienst/page.tsx
      /umzugservice/page.tsx
      /reinigung/page.tsx
    /ueber-uns/page.tsx
    /referenzen/page.tsx
    /kontakt/page.tsx
    /impressum/page.tsx
    /datenschutz/page.tsx
    /api/contact/route.ts   # form handler
    sitemap.ts
    robots.ts
    not-found.tsx
  /components
    /ui                     # Button, Input, Card, Badge, Section, Container — primitives
    /layout                 # Header, Footer, MobileNav, Logo
    /sections               # HeroSection, ServiceShowcase, StatsBand, CTASection, etc.
    /animations             # FadeIn, SplitText, Marquee, MagneticButton, MaskReveal, SmoothScroller
    /icons                  # Custom SVG icons (geometric, matching the logo language)
  /lib
    cn.ts                   # tailwind-merge wrapper
    fonts.ts                # next/font/local declarations
    seo.ts                  # metadata helpers
    schema.ts               # JSON-LD generators (LocalBusiness, Service, FAQ, Breadcrumb)
    site.config.ts          # NAP, social, SEO defaults — single source of truth
  /content
    services.ts             # typed German content per service
    faq.ts
    legal.ts
  /styles
    globals.css
```

### Component reuse rules (hard requirements)

- Any UI element used more than once **must** be a component.
- `<Button variant="primary | ghost | outline | metallic" size="sm | md | lg" />` — built with `cva`.
- `<Card>` is a primitive. Specialized cards (`<ServiceCard>`, `<StatCard>`, `<ProjectCard>`) compose it.
- `<Section>` handles consistent vertical padding + container width.
- Keep components < 200 lines; split when bigger.
- Co-locate component-only types; export shared types from `/lib/types.ts`.

---

## 5. Animations & Interactions

### Smooth scroll
- Lenis on the root, integrated with GSAP `ScrollTrigger` via `ScrollTrigger.scrollerProxy` or the official Lenis-GSAP recipe.
- Inertia ~1.2; smooth on wheel + touch; respects `prefers-reduced-motion`.

### Page transitions
- Use the View Transitions API (Next 15 supports it via `experimental.viewTransition`) **or** an overlay curtain wipe (200ms in / 400ms out, charcoal color, metallic hairline crossing the screen).

### Hero (Startseite)
- Kinetic typography: split headline into chars, stagger-reveal with y/opacity on load.
- Background: subtle animated gradient mesh **or** a minimal WebGL noise/distortion shader. Slow, restrained.
- Cursor-following soft radial light (very subtle, ~10% opacity).
- Scroll cue (mono caption + animated hairline) bottom-left.

### Cards (the brief explicitly forbids template "icon + text in one row")
Mix and match these patterns across the site:

- **Image-mask reveal cards** for services: full-bleed image hidden behind a clip-path; on hover the mask wipes open, title slides up, body fades in, an arrow draws itself.
- **Sticky-pin storytelling**: section pins, content swaps as user scrolls (use ScrollTrigger pinning).
- **Horizontal scroll showcase**: `Referenzen` page scrolls horizontally on desktop within a vertical scroll container.
- **Magnetic buttons & links**: cursor magnetism (max 24px pull) on CTAs.
- **3D tilt** (max 6°) on key cards using mouse position — restrained, not toy-like.
- **Number counters**: stats animate from 0 when in viewport.
- **Marquee bands**: service names looping infinitely between sections, hairline borders top/bottom.
- **Split-text headlines**: chars/words stagger on enter.
- **Hover-driven detail reveals**: secondary info appears only on hover, never cluttering the resting state.

### Easing & timing
- Use `expo.out`, `power3.out`, or custom cubic-beziers — tight, never bouncy.
- Default duration 600ms for transitions, 1.0s for hero reveals.
- All animations 60fps — only `transform` and `opacity`, no layout thrash.
- Honor `prefers-reduced-motion` — reduce to opacity fades only.

---

## 6. Content (German, formal Sie-Form)

Tone: confident, professional, understated. Emphasize **Verlässlichkeit, Diskretion, Präzision, Erfahrung**. No superlatives, no exclamation marks, no corporate fluff.

### Suggested headline directions (write final copy in German)
- "Sicherheit. Sauberkeit. Bewegung." (kinetic split on each period)
- "Drei Disziplinen. Ein Anspruch."
- "Ihr verlässlicher Partner in Dresden."

### Required German terminology to weave in naturally
Sicherheitsdienst, Objektschutz, Veranstaltungsschutz, Werkschutz, Pförtnerdienst, Empfangsdienst, Streifendienst, Brandwache, Privatumzug, Firmenumzug, Möbelmontage, Einlagerung, Entrümpelung, Gebäudereinigung, Unterhaltsreinigung, Grundreinigung, Bauendreinigung, Fensterreinigung, Teppichreinigung, Dresden, Sachsen, regional, bundesweit.

Each service detail page: minimum **600–800 words** of unique, helpful German copy.

---

## 7. SEO — Critical for Dresden Discoverability

### Technical
- `<html lang="de">`, `hrefLang="de-DE"`, canonical URLs everywhere
- `sitemap.xml` and `robots.txt` via Next 15 native (`app/sitemap.ts`, `app/robots.ts`)
- Per-page metadata via Metadata API: `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`
- 404 with proper status, custom German copy
- Structured headings (one H1 per page), semantic HTML, `<main>` / `<nav>` / `<article>`

### JSON-LD Schema.org (in `/lib/schema.ts`)
Inject on every relevant page:
- **Organization** + **LocalBusiness** in root layout (with `address`, `geo`, `openingHoursSpecification`, `areaServed: Dresden, Sachsen`, `telephone`, `priceRange`, `sameAs` socials)
- **Service** on each `/leistungen/...` page (`provider` linked to the LocalBusiness)
- More specific subtypes where applicable: `SecurityBusiness`, `MovingCompany`, `CleaningService` (Schema.org has `HouseCleaningService`)
- **BreadcrumbList** on subpages
- **FAQPage** for FAQ sections
- **Person** for team members on `/ueber-uns`

### Local SEO (Dresden)
- Title pattern: `Sicherheitsdienst Dresden | TS Service Group`
- H1 contains primary keyword + Dresden where it reads naturally
- Footer + `/kontakt` show consistent **NAP** (Name, Address, Phone) — same string everywhere
- Embed an **OpenStreetMap** iframe (lazy-loaded) on `/kontakt`. Avoid Google Maps unless the client wants it (extra cookie consent overhead).
- Mention Dresden districts in long-form content where natural: Altstadt, Neustadt, Loschwitz, Blasewitz, Pieschen, Striesen, Klotzsche, Cotta, Plauen.
- Internal links between service pages and the location landing pages.
- Alt text in German on every image.

### Performance (ranking factor)
- Lighthouse Performance ≥ 95 mobile
- LCP < 2.0s, CLS < 0.05, INP < 200ms
- All images via `next/image`, AVIF/WebP, sized correctly
- Preload critical fonts: `<link rel="preload" as="font" type="font/woff2" crossOrigin="">`
- Defer non-critical JS; route-level code splitting

---

## 8. Forms (`/kontakt`)

- React Hook Form + Zod, German validation messages
- Fields: Name, E-Mail, Telefon (optional), Leistung (Select), Nachricht, **DSGVO-Einwilligung (Pflicht-Checkbox mit Link auf /datenschutz)**
- Honeypot field + simple rate limit in the route handler
- Send via Resend or SMTP (env-configured); never expose secrets client-side
- Animated success state, no full reload

---

## 9. German Legal Compliance (non-negotiable)

- **Impressum** with all § 5 TMG fields: full name, address, contact, USt-IdNr., responsible person per § 18 MStV.
- **Datenschutzerklärung** covering: server logs, hosting provider, contact form, email processing, cookies (if any), embedded maps. Mention that **fonts are self-hosted** — this is a GDPR plus to highlight.
- **Cookie banner only if non-essential cookies are used.** If the site is purely first-party with no analytics, a static notice in the footer is sufficient. If Plausible/Umami self-hosted is added, still no banner needed.
- All external embeds (maps, video) must be **click-to-load** (two-click solution) to stay GDPR-clean.

---

## 10. Accessibility

- Keyboard navigation for every interactive element
- Visible focus rings (custom, on-brand — metallic hairline)
- ARIA labels for icon-only buttons
- Color contrast WCAG AA minimum (light text on `#121212` is fine; verify muted text)
- `prefers-reduced-motion` fully respected
- Form labels associated with inputs; errors announced via `aria-live`

---

## 11. Build Order (suggested)

1. Scaffold Next 15 + TS + Tailwind v4 + Prettier + ESLint
2. Install Fontshare fonts locally; configure `next/font/local`; add Tailwind families
3. Define design tokens (Tailwind `@theme`), build UI primitives (`Button`, `Card`, `Section`, `Container`, `Badge`)
4. Layout: `Header` (sticky, transparent → solid on scroll), `Footer` (NAP, sitemap links), `MobileNav` (full-screen overlay)
5. Foundations: Lenis + GSAP integration, page transitions, animation primitives (`SplitText`, `Marquee`, `MagneticButton`, `MaskReveal`)
6. **Startseite** with hero, service showcase, stats band, CTA section
7. Service detail pages (each with one signature scroll mechanic — pinning / horizontal / mask reveal)
8. `Über uns`, `Referenzen`, `Kontakt`
9. Legal pages (`Impressum`, `Datenschutz`, `AGB`)
10. SEO: Metadata API per page, JSON-LD, sitemap, robots, OG images
11. Performance pass: image audit, font preload, Lighthouse
12. Accessibility pass: keyboard, ARIA, reduced-motion
13. (Optional) local-SEO landing pages for Dresden

---

## 12. Inspiration Benchmarks

Look at recent Awwwards Site of the Day winners for motion language and restraint. Studios to study: Locomotive, Active Theory, Resn, Immersive Garden, Hello Monday. For typography hierarchy and spacing: Linear, Vercel, Stripe. The German aesthetic should remain functional and clean — no gimmicks for their own sake.

---

## 13. Hard Don'ts

- ❌ Google Fonts (use local Fontshare files)
- ❌ Light mode toggle (dark only per brief)
- ❌ Stock photography of generic office people
- ❌ Emoji in UI
- ❌ Bouncy / elastic / cartoonish animation easings
- ❌ "Wir sind leidenschaftlich!" hollow corporate phrases
- ❌ Template "icon + heading + 2 lines" service cards
- ❌ Embedded fonts/maps/scripts that leak data to third parties without consent
- ❌ `any` in TypeScript
- ❌ Inline styles where a Tailwind class works

---

## 14. Deliverable

A production-ready Next.js 15 codebase, deployable to Vercel, with a `README.md` explaining setup, environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`, etc.), and how to add new content. Code must be readable, consistently formatted, and commented where intent isn't obvious from the names.

Begin by scaffolding the project and confirming the Fontshare font selections before writing pages. After the scaffold, present me with the homepage hero before continuing — I want to align on motion language early.
