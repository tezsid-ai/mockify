# Platform Documentation — AI Mockup Generator

## 1. Overview

AI Mockup Generator is a Next.js web platform that converts a user-uploaded product image into AI-generated mockup visuals. Users provide structured product context (brand name, product info, industry, aspect ratio), and the app sends that data to a backend generation route. The backend constructs a detailed prompt and calls Gemini with both text and image input. The result is returned to the frontend as a renderable image for preview and download.

Target audience: marketers, designers, and product/brand teams that need fast concept visuals from a reference product image.

Core value: a guided flow that turns product context plus one image into polished, ad-style mockups.

## 2. How It Works — End-to-End Flow

1. Step 1: User uploads a product image

- The form file input accepts image/\*.
- Client validation rejects non-image files.
- A local preview is shown before submission.

2. Step 2: User enters product information

- Required fields: brandName, productInfo, industry.
- Aspect ratio options are fixed to 16:9 or 9:16.
- customPrompt is optional.

3. Step 3: Backend processing on submit

- Frontend sends multipart form data to POST /api/generate.
- Backend parses fields, validates required values, validates aspectRatio, and clamps generationCount to 1-3.
- A prompt is composed via buildProductMockupPrompt.

4. Step 4: Gemini API call

- The uploaded file is converted to inline base64 image data.
- Gemini request uses role=user with parts: prompt text + inline image.
- Response modalities requested: TEXT and IMAGE.

5. Step 5: Output generation and response

- Backend parses the first candidate response parts.
- It extracts text and imageBase64/mimeType.
- If no image payload is returned, request fails with an error.
- On success, API returns JSON containing prompt, gemini payload, and submitted fields.

6. Step 6: User-visible result

- Frontend converts returned base64 into a data URL.
- Generated image cards are displayed with download links.
- Users can generate more variants up to 3 total images.

## 3. Tech Stack

- Frontend framework: Next.js 16.2.3 with React 19.2.4
- Backend framework/runtime: Next.js Route Handlers (same app runtime)
- Database: None found
- Storage solution: No persistent storage in active generation path; output is returned as base64 data URL.
- AI/ML API: @google/genai with default model gemini-2.5-flash-image (override via GEMINI_MODEL)
- Authentication method: None found
- Hosting/deployment platform: Vercel

## 4. API Integration — Gemini API

- Model used: GEMINI_MODEL or fallback gemini-2.5-flash-image
- Request payload includes:
  - Prompt text built from brand/product/industry/aspect ratio/generationCount/customPrompt
  - inlineData image part: mimeType + base64 data
  - responseModalities: TEXT and IMAGE
- Response handling:
  - Reads response.candidates[0].content.parts
  - Extracts text plus first inline image payload
- Error handling:
  - Missing GEMINI_API_KEY throws an error
  - Non-image or empty upload throws an error
  - Missing returned image payload throws an error
  - API route returns HTTP 400 for validation failures and HTTP 500 for runtime failures
- Rate limits/retry logic:
  - No retry/backoff implementation found
  - Rate limit handling: [TO BE DOCUMENTED]

## 5. Platform Architecture

This implementation is a monolithic Next.js app with frontend and backend in one codebase. The frontend communicates with the backend through a REST-style POST endpoint at /api/generate using multipart/form-data. Processing layers are: client validation/state, API validation, prompt builder, Gemini generation call, and response parsing into frontend-displayable image data.

## 6. Current Limitations

- Aspect ratio is limited to 16:9 and 9:16.
- Generation count is capped at 3.
- Input must be an image MIME type.
- No explicit file size limit is enforced in code.
- No authentication layer is implemented.
- No database persistence for generated assets in the active path.

## 7. Environment & Configuration

- GEMINI_API_KEY — Gemini API key
- GEMINI_MODEL — optional model override

## 8. Deployment

- Live URL: [DEPLOYED_URL]
- Deployment platform: Vercel
- Build/deploy related commands from package scripts:
  - pnpm dev
  - pnpm build
  - pnpm start
  - pnpm lint
  - pnpm format
