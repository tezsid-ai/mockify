import { GoogleGenAI, Modality } from "@google/genai";

interface GeminiPart {
  text?: string;
  inlineData?: { mimeType?: string; data?: string };
}

export interface GeminiGenerationResult {
  text: string;
  imageBase64: string | null;
  mimeType: string | null;
}

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-image";

function getGeminiConfig() {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  return { apiKey, model };
}

function parseGeminiParts(parts: GeminiPart[]): GeminiGenerationResult {
  const text = parts
    .map((part) => part.text || "")
    .join("\n")
    .trim();
  const imagePart = parts.find((part) => part.inlineData?.data);

  return {
    text: text || "Mockup generated successfully.",
    imageBase64: imagePart?.inlineData?.data ?? null,
    mimeType: imagePart?.inlineData?.mimeType ?? null,
  };
}

async function fileToInlineImagePart(file: File): Promise<GeminiPart> {
  if (!file.type.startsWith("image/")) {
    throw new Error(
      "Product image file must be an image for Gemini multimodal input.",
    );
  }

  const bytes = await file.arrayBuffer();
  const data = Buffer.from(bytes).toString("base64");

  if (!data) {
    throw new Error("Product image is empty and cannot be sent to Gemini.");
  }

  return {
    inlineData: {
      mimeType: file.type,
      data,
    },
  };
}

export async function generateMockupWithGemini(
  prompt: string,
  productImageFile: File,
): Promise<GeminiGenerationResult> {
  const { apiKey, model } = getGeminiConfig();

  console.log("[generate] Gemini start", { model });

  try {
    const productImagePart = await fileToInlineImagePart(productImageFile);
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }, productImagePart],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = (response.candidates?.[0]?.content?.parts ||
      []) as GeminiPart[];
    const parsed = parseGeminiParts(parts);

    if (!parsed.imageBase64) {
      throw new Error("Gemini response did not include an image payload.");
    }

    console.log("[generate] Gemini success", {
      hasImage: Boolean(parsed.imageBase64),
      mimeType: parsed.mimeType,
      inputProductImageMimeType: productImageFile.type,
    });

    return parsed;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Gemini error.";
    console.error("[generate] Gemini failure", { model, message, error });
    throw new Error(`Gemini generation failed: ${message}`);
  }
}
