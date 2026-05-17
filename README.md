# Mockify

Mockify is an AI mockup generator that transforms a product image and short product context into premium, studio-style mockups using Google Gemini.

## Overview

Mockify lets you upload a product image, add a brand name, product details, and industry, then generates polished mockups that you can preview and download immediately.

## Features

- Product image upload with preview and validation
- Brand name, product info, and industry inputs
- Aspect ratio selection: `16:9` and `9:16`
- Optional custom prompt for styling guidance
- Up to three mockup variants per request
- Downloadable base64 image results

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Google Gemini API via `@google/genai`

## Routes

- `/` - Main mockup generator experience
- `/disclaimer` - Disclaimer page
- `/privacy-policy` - Privacy Policy page
- `/api/generate` - Route handler for mockup generation (POST)

## API

`POST /api/generate` expects `multipart/form-data` with the following fields:

- `productImage` (file, required)
- `brandName` (string, required)
- `productInfo` (string, required)
- `industry` (string, required)
- `aspectRatio` (`16:9` or `9:16`, required)
- `generationCount` (stringified number, optional)
- `customPrompt` (string, optional)

The response includes the generated prompt, Gemini metadata, and a base64 image payload.

## Data Handling

- No authentication, accounts, or payments
- No database usage in this project
- Inputs are processed in memory to generate the response and are not stored long term

## Environment Variables

| Variable         | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `GEMINI_API_KEY` | Yes      | API key used to authenticate requests to Google Gemini.        |
| `GEMINI_MODEL`   | No       | Optional model override; defaults to `gemini-2.5-flash-image`. |

## Getting Started

### Prerequisites

- Node.js: [NODE_VERSION]
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Run the production server
- `pnpm lint` - Run Biome checks
- `pnpm format` - Format code with Biome

## Documentation

- [Platform Overview](./PLATFORM.md)
- [Data Management](./DATA.md)
- [Pricing Reference](./PRICING.md)
- [Subscription Details](./SUBSCRIPTION.md)

## License

[LICENSE]
