import { siteConfig } from "@/lib/site.config";

// Left column — static address, opening hours, emergency note.
// The `.kontakt-form-info` class is animated by the parent timeline.
export function ContactInfo() {
  return (
    <aside className="space-y-10 lg:col-span-4">
      <div className="kontakt-form-info space-y-3" style={{ opacity: 0 }}>
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

      <div className="kontakt-form-info space-y-3" style={{ opacity: 0 }}>
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

    </aside>
  );
}
