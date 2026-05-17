"use client";

import { ProductImageUploadField } from "@/components/form/ProductImageUploadField";
import { MockupDetailsFields } from "@/components/form/MockupDetailsFields";
import type { AspectRatio } from "@/components/form/types";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { useMockupGenerator } from "@/components/form/useMockupGenerator";

export function MockupForm() {
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
    handleSubmit,
    handleGenerateMore,
  } = useMockupGenerator();

  const previewAspectRatio = (aspectRatio || "16:9") as AspectRatio;
  const fileNameBase = (brandName || "mockup")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <section className="space-y-5">
      <form
        onSubmit={handleSubmit}
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
    </section>
  );
}
