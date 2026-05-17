import { LegalPageLayout } from "@/components/LegalPageLayout";

const LAST_UPDATED = "Last updated: 05-05-2026";
const CONTACT_EMAIL = "[CONTACT EMAIL PLACEHOLDER]";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      description="This policy explains what information Mockify collects, how it is used, and the choices available to you."
      showBack
    >
      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Introduction
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          This Privacy Policy is provided by the operator of Mockify to explain
          how information is handled when you generate mockups using the tool.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Information We Collect
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          When you submit a generation request, we collect the product image you
          upload along with the brand name, product information, industry,
          aspect ratio, generation count, and any optional custom prompt. We do
          not collect account credentials or payment details because the tool
          has no login or payment features.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          How We Use Your Information
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          We use your inputs to build a generation prompt, send it to the AI
          model, and return mockup results to you. The uploaded product image is
          used solely to create the mockup output you requested.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Data Storage and Retention
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          We do not store your uploaded images or prompt details in a database.
          Inputs are processed in memory to generate your mockup, and the
          results are returned directly to your browser without long-term
          retention on our servers.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Third-Party Services
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          We use the Google Gemini API to process prompts and images for AI
          generation.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Cookies and Tracking
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          This tool does not use cookies or tracking technologies.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Data Sharing
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          We share your submitted inputs with Google Gemini solely to generate
          mockups. We do not sell your personal data or share it with
          advertisers, partners, or other third parties for marketing purposes.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          User Rights
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          You may request access to or deletion of your information by
          contacting us. We process requests in accordance with India&#39;s
          Digital Personal Data Protection Act, 2023 (DPDP Act).
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Children&#39;s Privacy
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          This tool is not directed to children under 13, and we do not
          knowingly collect personal data from children.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Changes to This Policy
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          We may update this policy from time to time. Continued use of the tool
          after changes are posted indicates acceptance of the revised policy.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">Contact</h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          For privacy-related requests, contact:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </article>
    </LegalPageLayout>
  );
}
