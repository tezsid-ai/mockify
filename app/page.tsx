import { MockupForm } from "@/components/form/MockupForm";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 md:px-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Mockify</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Turn a product image into a clean, premium mockup in minutes.
        </p>
      </section>
      <section className="mt-8">
        <MockupForm />
      </section>
    </main>
  );
}
