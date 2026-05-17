import { useEffect, useState } from "react";
import { generateMockupFromForm } from "@/components/form/generateMockupClient";
import type { AspectRatio, MockupFormValues } from "@/components/form/types";

const DEFAULT_ASPECT_RATIO: AspectRatio = "16:9";
const MAX_GENERATIONS = 3;

export function useMockupGenerator() {
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreviewUrl, setProductImagePreviewUrl] = useState("");
  const [productImageInputKey, setProductImageInputKey] = useState(0);
  const [productImageError, setProductImageError] = useState("");
  const [brandName, setBrandName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [industry, setIndustry] = useState("");
  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>(DEFAULT_ASPECT_RATIO);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isEditPromptOpen, setIsEditPromptOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generationCount, setGenerationCount] = useState(0);

  useEffect(
    () => () => {
      if (productImagePreviewUrl) URL.revokeObjectURL(productImagePreviewUrl);
    },
    [productImagePreviewUrl],
  );

  function failGeneration(error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to generate mockup.";
    setSubmitError(message);
    window.alert(message);
  }

  function handleProductImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextFile = event.target.files?.[0];
    if (!nextFile) {
      setProductImageFile(null);
      setProductImagePreviewUrl("");
      setProductImageError("");
      return;
    }
    if (!nextFile.type.startsWith("image/")) {
      setProductImageError("Please upload a valid image file.");
      setProductImageFile(null);
      setProductImagePreviewUrl("");
      return;
    }
    if (productImagePreviewUrl) URL.revokeObjectURL(productImagePreviewUrl);
    setProductImageError("");
    setProductImageFile(nextFile);
    setProductImagePreviewUrl(URL.createObjectURL(nextFile));
  }

  function handleReset() {
    if (productImagePreviewUrl) URL.revokeObjectURL(productImagePreviewUrl);
    setProductImageFile(null);
    setProductImagePreviewUrl("");
    setProductImageInputKey((value) => value + 1);
    setProductImageError("");
    setBrandName("");
    setProductInfo("");
    setIndustry("");
    setAspectRatio(DEFAULT_ASPECT_RATIO);
    setCustomPrompt("");
    setIsEditPromptOpen(false);
    setGeneratedImages([]);
    setGenerationCount(0);
    setSubmitError("");
  }

  const isFormValid =
    Boolean(productImageFile) &&
    brandName.trim().length > 0 &&
    productInfo.trim().length > 0 &&
    industry.trim().length > 0;

  async function runGeneration(nextGenerationCount: number) {
    if (!productImageFile) return;
    const payload: MockupFormValues = {
      productImageFile,
      brandName: brandName.trim(),
      productInfo: productInfo.trim(),
      industry: industry.trim(),
      aspectRatio,
      generationCount: nextGenerationCount,
      customPrompt: customPrompt.trim() || undefined,
    };
    const result = await generateMockupFromForm(payload);
    if (result.data.gemini.imageBase64) {
      const imageUrl = `data:${result.data.gemini.mimeType || "image/png"};base64,${result.data.gemini.imageBase64}`;
      setGeneratedImages((images) =>
        [...images, imageUrl].slice(0, MAX_GENERATIONS),
      );
    }
    setGenerationCount(nextGenerationCount);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid || !productImageFile) return;
    setSubmitError("");
    setIsSubmitting(true);
    setGeneratedImages([]);
    setGenerationCount(0);
    try {
      await runGeneration(1);
    } catch (error) {
      failGeneration(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGenerateMore() {
    if (
      !isFormValid ||
      !productImageFile ||
      isSubmitting ||
      generatedImages.length >= MAX_GENERATIONS
    )
      return;
    setSubmitError("");
    setIsSubmitting(true);
    try {
      await runGeneration(generationCount + 1);
    } catch (error) {
      failGeneration(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const canGenerateMore =
    generatedImages.length > 0 && generatedImages.length < MAX_GENERATIONS;

  return {
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
  };
}
