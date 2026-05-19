"use client";

import { useState } from "react";
import { ProductImageUploadField } from "@/components/form/ProductImageUploadField";
import { MockupDetailsFields } from "@/components/form/MockupDetailsFields";
import type { AspectRatio } from "@/components/form/types";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { useMockupGenerator } from "@/components/form/useMockupGenerator";
import { ensurePuterLoaded } from "@/components/form/generateMockupClient";

export function MockupForm() {
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const {
    productImagePreviewUrl,
    productImageInputKey,
    productImageError,
    brandName,
    productInfo,
    industry,
    aspectRatio,
    customPrompt,
    isEditPromptOpen,
    isSubmitting,
    submitError,
    generatedImages,
    generationCount,
    canGenerateMore,
    isFormValid,
    setBrandName,
    setProductInfo,
    setIndustry,
    setAspectRatio,
    setCustomPrompt,
    setIsEditPromptOpen,
    handleProductImageChange,
    handleReset,
    startGeneration,
    handleGenerateMore,
  } = useMockupGenerator();

  const previewAspectRatio = (aspectRatio || "16:9") as AspectRatio;
  const fileNameBase = (brandName || "mockup")
    .toLowerCase()
    .replace(/\s+/g, "-");

  async function isPuterSignedIn() {
    await ensurePuterLoaded();
    const puter = (window as unknown as { puter?: any }).puter;
    if (typeof puter?.auth?.isSignedIn === "function") {
      return Boolean(puter.auth.isSignedIn());
    }
    return Boolean(puter?.authToken);
  }

  async function handleOpenLoginPrompt(
    event?: React.FormEvent<HTMLFormElement>,
  ) {
    event?.preventDefault();
    if (!isFormValid || isSubmitting) return;
    const signedIn = await isPuterSignedIn();
    if (signedIn) {
      await startGeneration();
      return;
    }
    setIsLoginPromptOpen(true);
  }

  async function handleContinueGeneration() {
    try {
      await ensurePuterLoaded();
      const puter = (window as unknown as { puter?: any }).puter;
      if (typeof puter?.ui?.authenticateWithPuter === "function") {
        await puter.ui.authenticateWithPuter();
      }
      if (await isPuterSignedIn()) {
        await startGeneration();
      }
    } finally {
      setIsLoginPromptOpen(false);
    }
  }

  return (
    <section className="space-y-5">
      <form
        onSubmit={handleOpenLoginPrompt}
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      >
        <ProductImageUploadField
          inputKey={productImageInputKey}
          previewUrl={productImagePreviewUrl}
          error={productImageError}
          brandName={brandName}
          industry={industry}
          onChange={handleProductImageChange}
          onBrandNameChange={setBrandName}
          onIndustryChange={setIndustry}
        />

        <MockupDetailsFields
          productInfo={productInfo}
          aspectRatio={aspectRatio}
          customPrompt={customPrompt}
          isEditPromptOpen={isEditPromptOpen}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          submitError={submitError}
          onProductInfoChange={setProductInfo}
          onAspectRatioChange={setAspectRatio}
          onCustomPromptChange={setCustomPrompt}
          onGenerateClick={handleOpenLoginPrompt}
        />
        <p className="text-xs text-zinc-500">Generations: {generationCount}</p>
      </form>

      {isSubmitting || generatedImages.length > 0 ? (
        <div className="space-y-4">
          {generatedImages.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="inline-flex h-11 min-w-28 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsEditPromptOpen((value) => !value)}
                disabled={isSubmitting}
                className="inline-flex h-11 min-w-28 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200"
              >
                {isEditPromptOpen ? "Hide" : "Edit"}
              </button>
              <button
                type="button"
                onClick={handleGenerateMore}
                disabled={!canGenerateMore || isSubmitting}
                className="inline-flex h-11 min-w-36 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-200"
              >
                {isSubmitting ? "Generating..." : "Generate More"}
              </button>
            </div>
          ) : null}

          {generatedImages.map((imageUrl, index) => (
            <PreviewCard
              key={`${fileNameBase}-${index + 1}`}
              title={`${brandName || "Mockup"} ${index + 1}`}
              imageUrl={imageUrl}
              aspectRatio={previewAspectRatio}
              isLoading={false}
              downloadFileName={`${fileNameBase}-${index + 1}-gemini-mockup.png`}
            />
          ))}
        </div>
      ) : null}

      {isLoginPromptOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Mockify
              </p>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Before you generate
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Please Login/Signup to generate Images
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Image generation is powered by Puter.js and Gemini.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLoginPromptOpen(false)}
                className="inline-flex h-10 min-w-24 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleContinueGeneration}
                disabled={isSubmitting}
                className="inline-flex h-10 min-w-28 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                {isSubmitting ? "Generating..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
