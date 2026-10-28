import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/content/site";
import { Logo } from "./site-header";
import { Container } from "./primitives";

export function SiteFooter() {
  return (
    <footer className="border-border bg-card border-t">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">{SITE.tagline}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
            >
              {SITE.email}
            </a>
          </div>
          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="border-border text-muted-foreground mt-10 flex flex-wrap justify-between gap-2 border-t pt-6 text-xs">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} All rights reserved.
          </p>
          <p>
            AI agents assist professionals; they do not provide legal, financial or medical advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}
