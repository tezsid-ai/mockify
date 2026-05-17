import type {
  GenerateApiErrorResponse,
  GenerateApiSuccessResponse,
  MockupFormValues,
} from "@/components/form/types";

export async function generateMockupFromForm(
  payload: MockupFormValues,
): Promise<GenerateApiSuccessResponse> {
  const formData = new FormData();
  formData.append("productImage", payload.productImageFile);
  formData.append("brandName", payload.brandName);
  formData.append("productInfo", payload.productInfo);
  formData.append("industry", payload.industry);
  formData.append("aspectRatio", payload.aspectRatio);
  formData.append("generationCount", String(payload.generationCount));
  if (payload.customPrompt) {
    formData.append("customPrompt", payload.customPrompt);
  }

  const response = await fetch("/api/generate", {
    method: "POST",
    body: formData,
  });

  const result = (await response.json().catch(() => ({
    success: false,
    error: "Unexpected response format.",
  }))) as GenerateApiSuccessResponse | GenerateApiErrorResponse;

  if (!response.ok || !result.success) {
    const message =
      !result.success && typeof result.error === "string"
        ? result.error
        : "Failed to generate mockup.";
    throw new Error(message);
  }

  return result;
}
