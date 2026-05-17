export interface GenerateMockupRequest {
  prompt: string;
  style?: string;
}

export interface GenerateMockupResponse {
  imageUrl: string;
  prompt: string;
  generatedPrompt: string;
  provider: "pollinations";
}

export interface ApiErrorResponse {
  error: string;
}
