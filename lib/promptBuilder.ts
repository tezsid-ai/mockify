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
    return `
Use dramatic side lighting, diagonal hero framing,
strong cinematic shadows, suspended dynamic elements,
high-fashion commercial advertisement composition,
premium luxury campaign atmosphere.
`;
  }

  if (generationCount === 3) {
    return `
Use bold cinematic luxury perspective, ultra premium reflections,
deep contrast lighting, macro realism, intense advertisement styling,
hero-centered composition with powerful visual depth.
`;
  }

  return `
Use elegant premium balanced studio composition,
soft cinematic lighting, realistic shadows,
clean luxury advertisement presentation.
`;
}

function getIndustryVisualDirection(industry: string): string {
  const key = industry.toLowerCase();

  // FOOD / FMCG
  if (
    key.includes("food") ||
    key.includes("snack") ||
    key.includes("beverage") ||
    key.includes("fmcg") ||
    key.includes("chocolate")
  ) {
    return `
Use cinematic premium food advertisement styling with floating ingredients,
melted textures, liquid splashes, crumbs, glossy reflections,
rich contrast, dramatic commercial lighting, macro food realism,
luxury packaging focus, dynamic energy composition,
high-end snack campaign aesthetics.
`;
  }

  // STATIONERY
  if (
    key.includes("stationery") ||
    key.includes("notebook") ||
    key.includes("education") ||
    key.includes("school")
  ) {
    return `
Use elegant editorial stationery photography with premium bookstore aesthetics,
paper textures, floating pages, pencils, academic luxury styling,
soft cinematic shadows, creative desk composition,
minimal premium educational branding atmosphere,
modern commercial stationery advertisement style.
`;
  }

  // SKINCARE / BEAUTY
  if (
    key.includes("cosmetic") ||
    key.includes("skincare") ||
    key.includes("beauty") ||
    key.includes("makeup")
  ) {
    return `
Use minimal luxury cosmetic advertisement styling with marble surfaces,
glass reflections, water splashes, soft gradients,
clean premium beauty campaign aesthetics,
soft glow lighting, elegant reflections,
ultra clean composition with modern luxury atmosphere.
`;
  }

  // TECH
  if (
    key.includes("tech") ||
    key.includes("electronics") ||
    key.includes("gadget")
  ) {
    return `
Use futuristic premium tech advertisement styling with metallic surfaces,
neon glow accents, sleek reflections, dark cinematic environment,
dramatic rim lighting, ultra-clean composition,
high-end futuristic product launch aesthetics,
modern luxury technology campaign style.
`;
  }

  // FASHION / APPAREL
  if (
    key.includes("fashion") ||
    key.includes("apparel") ||
    key.includes("clothing")
  ) {
    return `
Use premium editorial fashion campaign styling with luxury fabric textures,
soft dramatic lighting, modern luxury environment,
high-end magazine advertisement composition,
elegant shadows, premium branding aesthetics,
fashion studio photography atmosphere.
`;
  }

  // PERFUME / FRAGRANCE
  if (
    key.includes("perfume") ||
    key.includes("fragrance")
  ) {
    return `
Use ultra luxury perfume campaign aesthetics with smoke effects,
glass reflections, dark premium environment,
gold accents, cinematic spotlight lighting,
marble or glossy surfaces, elegant premium shadows,
high-end fragrance commercial photography style.
`;
  }

  // DEFAULT
  return `
Use premium commercial product photography with cinematic lighting,
luxury composition, realistic reflections,
elegant advertisement styling, studio-quality presentation,
high-end modern branding aesthetics.
`;
}

function getDynamicVisualElements(
  productInfo: string,
  industry: string,
): string {
  const text = `${productInfo} ${industry}`.toLowerCase();

  // FOOD
  if (
    text.includes("chocolate") ||
    text.includes("snack") ||
    text.includes("food")
  ) {
    return `
Include floating ingredients, chocolate splashes,
caramel drips, crumbs, nuts, dynamic liquid motion,
rich texture detailing and cinematic food particles.
`;
  }

  // NOTEBOOK / STATIONERY
  if (
    text.includes("notebook") ||
    text.includes("stationery") ||
    text.includes("book")
  ) {
    return `
Include floating papers, pencils, desk accessories,
subtle magical particles, creative academic environment,
premium paper texture realism and elegant composition props.
`;
  }

  // SKINCARE
  if (
    text.includes("skincare") ||
    text.includes("beauty") ||
    text.includes("cosmetic")
  ) {
    return `
Include water droplets, soft mist, floating petals,
glass reflections, smooth liquid textures,
minimal luxury beauty styling elements.
`;
  }

  // TECH
  if (
    text.includes("tech") ||
    text.includes("electronics")
  ) {
    return `
Include futuristic glow effects, energy trails,
metallic reflections, abstract tech particles,
sleek modern surfaces and cinematic neon accents.
`;
  }

  return `
Include subtle premium visual elements,
realistic reflections, cinematic particles,
luxury commercial styling details.
`;
}

export function buildProductMockupPrompt(
  input: ProductMockupPromptInput,
): string {
  const brandName = input.brandName.trim();
  const productInfo = input.productInfo.trim();
  const industry = input.industry.trim();
  const aspectRatio = input.aspectRatio.trim();

  const generationCount = Math.max(
    1,
    Math.min(3, input.generationCount || 1),
  );

  const variationInstruction = (
    input.variationInstruction ||
    getVariationInstruction(generationCount)
  )
    .trim()
    .replace(/\r\n/g, "\n");

  const customPrompt = (
    input.customPrompt || ""
  )
    .trim()
    .replace(/\r\n/g, "\n");

  if (!brandName || !productInfo || !industry || !aspectRatio) {
    throw new Error("All prompt fields are required.");
  }

  const industryVisualDirection =
    getIndustryVisualDirection(industry);

  const dynamicVisualElements =
    getDynamicVisualElements(productInfo, industry);

  return `
You are a world-class luxury commercial product photographer,
premium advertising art director,
cinematic branding designer,
and hyperrealistic product visualization expert.

Transform the uploaded reference product image into an ultra premium
studio-quality commercial advertisement mockup.

Carefully analyze the uploaded image and preserve:
- original product identity
- packaging structure
- proportions
- logo placement
- recognizable product appearance

while upgrading it into a luxury advertisement-grade visual.

INPUT DETAILS:
Brand Name: ${brandName}
Product Information: ${productInfo}
Industry: ${industry}
Aspect Ratio: ${aspectRatio}

VISUAL DIRECTION:
${industryVisualDirection}

DYNAMIC VISUAL ELEMENTS:
${dynamicVisualElements}

MANDATORY QUALITY REQUIREMENTS:
- Ultra realistic material textures
- Cinematic studio lighting
- Premium glossy reflections
- Luxury advertisement composition
- Realistic soft shadows
- Hyper detailed product finish
- Commercial campaign aesthetics
- Elegant visual depth
- High-end branding presentation
- Advertisement-grade realism
- Macro detail enhancement
- Dynamic premium environment
- Sophisticated luxury atmosphere

COMPOSITION STYLE:
- Hero-centered product framing
- Cinematic depth of field
- Premium commercial photography angle
- Clean visual hierarchy
- Balanced luxury composition
- Modern high-end advertisement aesthetics

CAMERA SETTINGS:
Shot on Canon EOS R5,
85mm lens,
f/2.8,
studio lighting,
ultra realistic,
commercial photography,
8K resolution,
hyper detailed,
premium reflections,
cinematic realism.

VARIATION STYLE:
${variationInstruction}

ADDITIONAL USER INSTRUCTION:
${customPrompt || "None."}

FINAL OUTPUT STYLE:
Create a visually stunning,
luxury commercial campaign quality mockup suitable for:
- ecommerce banners
- billboard advertisements
- social media campaigns
- premium brand launches
- product showcase marketing

The final result must look like a real-world
high-budget commercial advertisement photograph.
`.trim();
}