import Link from "next/link";
import { Section, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Section padding="hero">
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="eyebrow mb-4">Fehler 404</p>
        <h1 className="heading-1 mb-6">Seite nicht gefunden</h1>
        <p className="mb-8 max-w-md text-text-muted">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link href="/">
          <Button variant="outline" size="lg">
            Zur Startseite
          </Button>
        </Link>
      </div>
    </Section>
  );
}
