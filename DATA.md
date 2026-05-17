# Data Management & Privacy — AI Mockup Generator

## 1. Overview

AI Mockup Generator processes generation inputs in a Next.js monolith to create mockup images. It sends an uploaded product image and generation fields (brand name, product info, industry, aspect ratio, optional custom prompt) to Google Gemini. The active path is retention-minimized: outputs are returned as base64 data URLs, with no database persistence.

## 2. What Data We Collect

- Product image (uploaded by user)
  - What it is: an image file provided in the form input.
  - Why it is collected: source visual input for mockup generation.
  - Where it goes: sent to backend `/api/generate`, converted to inline base64, then sent to Gemini.
- Brand name, product info, industry
  - What it is: required text fields from the generation form.
  - Why it is collected: inserted into the prompt to control output content/style.
  - Where it goes: posted to `/api/generate`, sent to Gemini in prompt text, and echoed in API success response payload.
- Aspect ratio and custom prompt
  - What it is: generation parameters (`aspectRatio`, optional `customPrompt`).
  - Why it is collected: controls framing and optional user instruction.
  - Where it goes: posted to `/api/generate`, sent in prompt text to Gemini, and returned in API response context.
- Generation count
  - What it is: request parameter (`generationCount`) clamped server-side to 1-3.
  - Why/where: sent to `/api/generate` and used during prompt construction for variation behavior.
- Operational logs
  - What it is: server-side console logs (request lifecycle, boolean field presence, aspect ratio, generation count, Gemini model, output mime type, errors).
  - Why it is collected: debugging and runtime diagnostics.
  - Where it goes: application/server logs on the hosting environment.
- Analytics/telemetry SDKs
  - No analytics SDKs or external telemetry services were found in active code paths.
- IP address/request metadata
  - No custom middleware was found that explicitly captures/stores IP or request metadata in application code.
  - Hosting infrastructure receives standard HTTP request metadata.

## 3. Where Your Data Goes

### a) Google Gemini API

- Service: Google Gemini API via `@google/genai`.
- What is sent: uploaded product image (inline base64 + MIME type) and prompt text containing brandName, productInfo, industry, aspectRatio, generation context, and optional customPrompt.
- Why: to generate mockup visuals.
- Data residency: United States (Google Cloud default region for Gemini API). Note: Data is transferred internationally to Google's US-based servers. Indian users should be aware of this cross-border data transfer.
- Training usage status: Google does not use API request data to train its models when using the Paid API tier. If you are on the Free API tier, Google may use request data to improve its products by default. This platform uses the Paid API tier to ensure user data is not used for model training.

### b) Hosting Platform

- Platform: Vercel
- What it receives: inbound HTTP requests, route execution logs, and runtime error logs.
- Data region: [HOSTING_DATA_REGION]

## 4. Data Retention

- User-uploaded images: processed during request execution and sent to Gemini; no database persistence is implemented in this path.
- Generated output images: returned to the client as base64 data URLs; no server-side persistence is implemented in the active path.
- Form fields (brandName, productInfo, industry, aspectRatio, customPrompt): used for request processing and prompt construction; no database storage path is implemented.
- Server-side logs: runtime console logs exist; retention period depends on hosting/runtime configuration.
  - Log retention: [LOG_RETENTION_PERIOD]

## 5. GDPR Compliance

### a) Legal Basis for Processing

- Legal basis used: Contractual necessity under the Digital Personal Data Protection Act, 2023 (DPDPA) and GDPR where applicable — processing is required to deliver the generation service the user has requested
- Consent mechanism: Users must provide explicit consent by accepting the Terms of Service and Privacy Policy before submitting a generation request, in compliance with India's Digital Personal Data Protection Act, 2023 (DPDPA)

### b) User Rights Under GDPR

Users may request access, deletion (right to be forgotten), portability, and withdrawal of consent.

- Contact for requests: [GDPR_CONTACT_EMAIL]

### c) Data Processing Agreement (DPA)

- Google Gemini API: Google provides contractual terms/DPA options under applicable Google Cloud/API terms.
- Hosting platform DPA: https://vercel.com/legal/dpa
- Platform operator DPA for enterprise clients: Yes — available on request for Business tier and enterprise clients

### d) GDPR Applicability

- If the platform serves EU data subjects, GDPR obligations apply.
- Minimum age policy: This platform is not directed at children under the age of 18 as defined under India's DPDPA. By using this platform, users confirm they are 18 years of age or older.
- Data Protection Officer (DPO): [DPO_NAME_OR_PLACEHOLDER]

## 6. DPDPA Compliance (India)

AI Mockup Generator complies with India's Digital Personal Data Protection Act, 2023 (DPDPA).

- Data Fiduciary: [COMPANY_LEGAL_NAME]
- Users have the right to access, correct, and erase their personal data
- Cross-border data transfer: user data is processed by Google LLC in the United States under contractual safeguards
- Grievance Officer (as required under DPDPA): [GRIEVANCE_OFFICER_NAME], reachable at [GRIEVANCE_OFFICER_EMAIL]
- Contact for data requests: [PRIVACY_CONTACT_EMAIL]

## 7. Data Security

- HTTPS enforcement: no explicit HTTPS enforcement logic was found in application code or middleware.
  - Enforcement status: Enforced automatically by Vercel
- API key handling: Gemini API credentials are read from environment variables (`GEMINI_API_KEY`, optional `GEMINI_MODEL`) and are not hardcoded.
- Input validation: backend validates required fields, aspect ratio (`16:9` or `9:16`), generation count (1-3), and uploaded file as a non-empty image before Gemini submission.
- Authentication: no auth layer is currently implemented in active code paths.
  - Planned auth implementation date: [AUTH_IMPLEMENTATION_DATE]

## 8. Contact & Policy Updates

- Privacy contact: [PRIVACY_CONTACT_EMAIL]
- Last updated: [LAST_UPDATED_DATE]
- Policy update notification method: Users will be notified of material policy changes via email at least 14 days before they take effect, in compliance with DPDPA requirements
