import { NextResponse } from "next/server";
import { buildProductMockupPrompt } from "@/lib/promptBuilder";

interface GenerateApiSuccessResponse {
  success: true;
  message: string;
  data: {
    prompt: string;
    gemini: {
      text: string;
      imageBase64: string | null;
      mimeType: string | null;
    };
    brandName: string;
    productInfo: string;
    industry: string;
    aspectRatio: string;
  };
}

interface GenerateApiErrorResponse {
  success: false;
  error: string;
}

function getRequiredTextField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalTextField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getGenerationCount(formData: FormData): number {
  const raw = getOptionalTextField(formData, "generationCount");
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 1;
  return Math.max(1, Math.min(3, parsed));
}

function isValidAspectRatio(value: string): boolean {
  return value === "16:9" || value === "9:16";
}

function getProductImageFile(formData: FormData): File | null {
  const productImage = formData.get("productImage");
  return productImage instanceof File && productImage.size > 0
    ? productImage
    : null;
}

export async function POST(
  request: Request,
): Promise<
  NextResponse<GenerateApiSuccessResponse | GenerateApiErrorResponse>
> {
  try {
    console.log("[generate] POST start");
    const formData = await request.formData();
    console.log("[generate] FormData parsed");
    const productImageFile = getProductImageFile(formData);

    const brandName = getRequiredTextField(formData, "brandName");
    const productInfo = getRequiredTextField(formData, "productInfo");
    const industry = getRequiredTextField(formData, "industry");
    const aspectRatio = getRequiredTextField(formData, "aspectRatio");
    const customPrompt = getOptionalTextField(formData, "customPrompt");
    const generationCount = getGenerationCount(formData);
    console.log("[generate] Fields extracted", {
      hasProductImage: Boolean(productImageFile),
      hasBrandName: Boolean(brandName),
      hasProductInfo: Boolean(productInfo),
      hasIndustry: Boolean(industry),
      aspectRatio,
      generationCount,
    });

    if (
      !productImageFile ||
      !brandName ||
      !productInfo ||
      !industry ||
      !aspectRatio
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "All fields are required: productImage, brandName, productInfo, industry, aspectRatio.",
        },
        { status: 400 },
      );
    }

    if (!isValidAspectRatio(aspectRatio)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid aspectRatio. Supported values are 16:9 and 9:16.",
        },
        { status: 400 },
      );
    }

    const prompt = buildProductMockupPrompt({
      brandName,
      productInfo,
      industry,
      aspectRatio,
      generationCount,
      customPrompt,
    });
    console.log("[generate] Prompt built");

    console.log("[generate] Prompt ready for client generation");

    return NextResponse.json({
      success: true,
      message: "Request received successfully",
      data: {
        prompt,
        gemini: {
          text: "Mockup generated successfully.",
          imageBase64: null,
          mimeType: null,
        },
        brandName,
        productInfo,
        industry,
        aspectRatio,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error.";
    console.error("[generate] Route failure", { message, error });

    return NextResponse.json(
      {
        success: false,
        error: `Failed to process request: ${message}`,
      },
      { status: 500 },
    );
  }
}
