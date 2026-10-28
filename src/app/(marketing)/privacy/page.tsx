import type { Metadata } from "next";
import { Prose } from "@/components/marketing/blocks";
import { PageHero, Section } from "@/components/marketing/primitives";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE.name} collects, uses and protects personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy policy"
        description="How we collect, use and protect personal information on this website."
      />
      <Section>
        <Prose>
          <p>
            This policy explains how {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
            personal information collected through this website. It does not cover data processed on
            behalf of customers through our platform, which is governed by the customer agreement
            and data processing addendum.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us:</strong> name, work email, company, job title,
              industry, company size and the message you send when you request a demo or contact us.
            </li>
            <li>
              <strong>Technical data:</strong> standard server logs such as IP address, browser type
              and pages requested, used for security and reliability.
            </li>
          </ul>
          <p>
            This website does not use advertising or analytics cookies, and does not track you
            across other sites.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and arrange demonstrations.</li>
            <li>To operate, secure and improve the website.</li>
            <li>To meet legal obligations and protect our rights.</li>
          </ul>

          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We share it only with service providers who help us
            operate our business (for example, email and CRM providers) under confidentiality and
            data protection obligations, or where required by law.
          </p>

          <h2>Retention</h2>
          <p>
            We keep enquiry information only as long as needed to handle your request and our
            legitimate business relationship, then delete or anonymise it.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete or export
            your personal information, and to object to or restrict certain processing. To exercise
            these rights, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Security</h2>
          <p>
            We use technical and organisational measures to protect personal information, including
            encryption in transit and access controls. No method of transmission is completely
            secure.
          </p>

          <h2>Contact</h2>
          <p>
            {SITE.legalName}, {SITE.address}. Email:{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
