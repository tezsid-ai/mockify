import { MockupForm } from "@/components/form/MockupForm";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 md:px-10">
      <section className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          AI Mockup Generator
        </h1>
        <h2 className="text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
          Transform simple product photos into premium-quality mockups for
          social media, branding, presentations, and online stores — no design
          skills required.
        </h2>
      </section>
      <section className="mt-8">
        <MockupForm />
      </section>
    </main>
  );
}
