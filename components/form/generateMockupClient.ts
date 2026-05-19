import type {
  GenerateApiErrorResponse,
  GenerateApiSuccessResponse,
  MockupFormValues,
} from "@/components/form/types";

const PUTER_SCRIPT_SRC = "https://js.puter.com/v2/";
const DEFAULT_PUTER_MODEL = "gemini-2.5-flash-image-preview";

type PuterClient = {
  ai?: {
    txt2img: (
      prompt: string,
      options: {
        model?: string;
        input_image?: string;
        input_image_mime_type?: string;
      },
    ) => Promise<HTMLImageElement>;
  };
};

export function getPuterClient(): PuterClient | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { puter?: PuterClient }).puter ?? null;
}

export async function ensurePuterLoaded(): Promise<PuterClient> {
  const existing = getPuterClient();
  if (existing?.ai?.txt2img) return existing;

  if (typeof window === "undefined") {
    throw new Error("Puter.js can only run in the browser.");
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PUTER_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Puter.js script."));
    document.body.appendChild(script);
  });

  const loaded = getPuterClient();
  if (!loaded?.ai?.txt2img) {
    throw new Error("Puter.js loaded but AI features are unavailable.");
  }

  return loaded;
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return btoa(
    Array.from(new Uint8Array(buffer), (byte) =>
      String.fromCharCode(byte),
    ).join(""),
  );
}

async function dataUrlToBase64(
  dataUrl: string,
): Promise<{ base64: string; mimeType: string | null }> {
  const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
  if (!match) {
    return { base64: dataUrl, mimeType: null };
  }
  return { base64: match[2], mimeType: match[1] };
}

async function imageElementToBase64(
  imageElement: HTMLImageElement,
): Promise<{ base64: string; mimeType: string | null }> {
  if (!imageElement.src) {
    throw new Error("Puter.js returned an empty image source.");
  }

  if (imageElement.src.startsWith("data:")) {
    return dataUrlToBase64(imageElement.src);
  }

  const response = await fetch(imageElement.src);
  if (!response.ok) {
    throw new Error("Unable to read generated image data.");
  }

  const blob = await response.blob();
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Failed to read image blob."));
    reader.readAsDataURL(blob);
  });

  return dataUrlToBase64(base64);
}

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

  const puter = await ensurePuterLoaded();
  const txt2img = puter.ai?.txt2img;
  if (!txt2img) {
    throw new Error("Puter.js AI client is unavailable.");
  }
  const inputImageBase64 = await fileToBase64(payload.productImageFile);
  const imageElement = await txt2img(result.data.prompt, {
    model: DEFAULT_PUTER_MODEL,
    input_image: inputImageBase64,
    input_image_mime_type: payload.productImageFile.type,
  });

  const generated = await imageElementToBase64(imageElement);
  if (!generated.base64) {
    throw new Error("Puter.js did not return an image payload.");
  }

  return {
    ...result,
    data: {
      ...result.data,
      gemini: {
        text: "Mockup generated successfully.",
        imageBase64: generated.base64,
        mimeType: generated.mimeType || "image/png",
      },
    },
  };
}
