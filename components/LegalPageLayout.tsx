import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  children: ReactNode;
  showBack?: boolean;
}

const CONTACT_EMAIL = "[CONTACT EMAIL PLACEHOLDER]";

export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  children,
  showBack = false,
}: LegalPageLayoutProps) {
  return (
    <main className="flex-1">
      <section className="bg-foreground/5">
        <div className="mx-auto max-w-4xl px-6 py-6">
          {showBack ? (
            <a
              href="/"
              className="inline-flex px-4 py-1 border-white border-[1px] rounded-2xl text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              &larr; Back
            </a>
          ) : null}
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">{lastUpdated}</p>
          <p className="mt-3 text-base leading-relaxed text-foreground/70">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-6">
        <div className="space-y-4">{children}</div>
      </section>

      <section className="bg-foreground/5">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center">
          <p className="text-base font-medium text-foreground">
            Have questions? We&#39;re here to help.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 inline-flex text-base font-medium text-foreground underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </main>
  );
}
