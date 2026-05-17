import { LegalPageLayout } from "@/components/LegalPageLayout";

const LAST_UPDATED = "Last updated: 05-05-2026";
const CONTACT_EMAIL = "[CONTACT EMAIL PLACEHOLDER]";

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated={LAST_UPDATED}
      description="This disclaimer explains the limitations and responsibilities for using Mockify."
      showBack
    >
      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          General Information
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          Mockify creates AI-generated product and UI mockups based on your
          inputs and uploaded product image. The service is provided for
          informational and creative purposes only and does not constitute
          professional advice.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          No Guarantee of Results
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          AI-generated mockups may be incomplete, inaccurate, or unsuitable for
          a particular use. Outputs are not guaranteed to be accurate, legally
          available, or fit for commercial use, and you are responsible for
          validating them before relying on them.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Intellectual Property
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          You are responsible for confirming that generated mockups and related
          materials do not infringe third-party trademarks, copyrights, or other
          intellectual property rights. Perform your own clearance checks before
          any commercial or public use.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Third-Party AI Services
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          This tool uses the Google Gemini API to process prompts and product
          images for generation. We do not control or guarantee the behavior,
          accuracy, or availability of that third-party service.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Limitation of Liability
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          To the extent permitted by applicable law, the developer is not liable
          for any direct, indirect, incidental, consequential, or special
          damages arising from your use of this tool or reliance on its output.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Changes to Disclaimer
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          This disclaimer may be updated from time to time. Continued use of the
          tool after changes are posted indicates acceptance of the revised
          terms.
        </p>
      </article>

      <article className="space-y-2">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">Contact</h2>
        <p className="max-w-prose text-base leading-relaxed text-foreground/80">
          For questions, contact:{" "}
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
