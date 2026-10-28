import type { Metadata } from "next";
import { Prose } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `Terms governing use of the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of service"
        description="The terms that apply when you use this website."
      />
      <Section>
        <Prose>
          <p>
            By accessing this website you agree to these terms. Use of our products and services is
            governed by a separate written agreement between you and {SITE.legalName}.
          </p>

          <h2>Use of the website</h2>
          <p>
            You may use this website for lawful purposes only. You agree not to attempt to gain
            unauthorised access, interfere with its operation, scrape it in violation of our robots
            rules, or submit unlawful or malicious content.
          </p>

          <h2>No professional advice</h2>
          <p>
            Content on this website is for general information. It is not legal, financial or
            medical advice. Our AI agents assist qualified professionals, who remain responsible for
            the decisions they make.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The website and its content are owned by {SITE.legalName} or its licensors and are
            protected by intellectual property laws. You may not copy or reuse them without
            permission, except as permitted by law.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The website is provided &ldquo;as is&rdquo; without warranties of any kind, to the
            fullest extent permitted by law. We do not guarantee that it will be uninterrupted or
            error free.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, we are not liable for indirect or consequential
            loss arising from your use of this website.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continued use means you accept the updated
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
