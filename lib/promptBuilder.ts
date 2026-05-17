export interface ProductMockupPromptInput {
  brandName: string;
  productInfo: string;
  industry: string;
  aspectRatio: string;
  generationCount?: number;
  variationInstruction?: string;
  customPrompt?: string;
}

function getVariationInstruction(generationCount: number): string {
  if (generationCount === 2) {
    return "Alternate dramatic lighting, different creative angle, unique composition.";
  }
  if (generationCount === 3) {
    return "Cinematic luxury perspective, bold premium shadows, high-end advertisement composition.";
  }
  return "Elegant premium balanced studio composition.";
}

export function buildProductMockupPrompt(
  input: ProductMockupPromptInput,
): string {
  const brandName = input.brandName.trim();
  const productInfo = input.productInfo.trim();
  const industry = input.industry.trim();
  const aspectRatio = input.aspectRatio.trim();
  const generationCount = Math.max(1, Math.min(3, input.generationCount || 1));
  const variationInstruction = (
    input.variationInstruction || getVariationInstruction(generationCount)
  )
    .trim()
    .replace(/\r\n/g, "\n");
  const customPrompt = (input.customPrompt || "").trim().replace(/\r\n/g, "\n");

  if (!brandName || !productInfo || !industry || !aspectRatio) {
    throw new Error("All prompt fields are required.");
  }

  return [
    "You are a world-class commercial product mockup photographer, luxury branding stylist, and advertising visual designer.",
    "",
    "Transform the provided product reference image into a premium high-end professional studio-quality commercial mockup.",
    "",
    "Analyze the uploaded product image carefully and preserve the original product identity, shape, proportions, and design while enhancing it into a visually stunning advertisement-grade mockup.",
    "",
    "INPUT DETAILS:",
    `Brand Name: ${brandName}`,
    `Product Information: ${productInfo}`,
    `Industry: ${industry}`,
    `Aspect Ratio: ${aspectRatio}`,
    "",
    "MANDATORY TRANSFORMATION RULES:",
    "",
    "1. Preserve the uploaded product's core structure and recognizable appearance.",
    "2. Enhance the product into a polished premium studio-quality version.",
    "3. Improve material realism, texture, lighting, reflections, and finish.",
    "4. Make packaging/product appearance luxurious, modern, and highly marketable.",
    "5. Add realistic professional commercial studio lighting with cinematic soft shadows.",
    "6. Use premium product photography composition with elegant framing.",
    "7. Apply highly realistic reflections and highlights.",
    "8. Create depth and dimensionality for advertisement-grade realism.",
    "9. Ensure background complements the industry:",
    "",
    "   * FMCG/Food -> modern lifestyle/commercial setup",
    "   * Skincare/Cosmetics -> minimal luxury studio background",
    "   * Tech -> sleek futuristic clean background",
    "   * Apparel -> premium fashion/editorial environment",
    "",
    "CAMERA/PHOTO SETTINGS:",
    "Shot on Canon 5D Mark IV, 85mm lens, f/2.8,",
    "studio lighting, ultra realistic, premium reflections,",
    "commercial advertisement photography, 8K resolution, hyperrealistic.",
    "",
    "STYLE DIRECTION:",
    "Create a visually striking premium brand advertisement style mockup suitable for ecommerce, branding, and marketing campaigns.",
    "",
    "Variation Requirement:",
    variationInstruction || "None.",
    "",
    "Additional User Preference:",
    customPrompt || "None.",
    "",
    "RETURN ONLY HIGH-END VISUAL GENERATION RESULT.",
  ].join("\n");
}
