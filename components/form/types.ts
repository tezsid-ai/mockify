export type AspectRatio = "16:9" | "9:16";

export interface MockupFormValues {
  productImageFile: File;
  brandName: string;
  productInfo: string;
  industry: string;
  aspectRatio: AspectRatio;
  customPrompt?: string;
  generationCount: number;
}

export interface GeminiMockupPayload {
  text: string;
  imageBase64: string | null;
  mimeType: string | null;
}

export interface GenerateApiSuccessResponse {
  success: true;
  message: string;
  data: {
    prompt: string;
    gemini: GeminiMockupPayload;
    brandName: string;
    productInfo: string;
    industry: string;
    aspectRatio: AspectRatio;
  };
}

export interface GenerateApiErrorResponse {
  success: false;
  error: string;
}
