const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

function getBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(
      'VITE_API_BASE_URL is not set. Add it to your .env file (e.g. VITE_API_BASE_URL=https://abc123.execute-api.us-east-1.amazonaws.com)',
    );
  }
  return API_BASE_URL.replace(/\/$/, '');
}

function getAnonymousId(): string {
  const key = 'hazel-hue-anon-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export interface RequestAnalysisResponse {
  analysisId: string;
  uploadUrl: string;
  photoKey: string;
}

export interface PollStatusResponse {
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  season: string | null;
  failureReason: string | null;
}

export interface AnalysisResultResponse {
  id: string;
  status: string;
  season: string;
  confidenceScore: number;
  colorProfile: {
    undertone: string;
    chroma: string;
    contrastLevel: string;
    dominantSkinHex: string;
    dominantHairHex: string;
    dominantEyeHex: string;
  };
  createdAt: string;
  completedAt: string;
  results: Record<string, unknown>;
}

export async function requestAnalysis(): Promise<RequestAnalysisResponse> {
  const res = await fetch(`${getBaseUrl()}/analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Anonymous-Id': getAnonymousId(),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function uploadPhoto(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: file,
  });
  if (!res.ok) {
    throw new Error(`Photo upload failed: ${res.status}`);
  }
}

export async function pollStatus(analysisId: string): Promise<PollStatusResponse> {
  const res = await fetch(`${getBaseUrl()}/analysis/${analysisId}/status`, {
    headers: { 'X-Anonymous-Id': getAnonymousId() },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Poll failed: ${res.status}`);
  }
  return res.json();
}

export async function getAnalysisResult(analysisId: string): Promise<AnalysisResultResponse> {
  const res = await fetch(`${getBaseUrl()}/analysis/${analysisId}`, {
    headers: { 'X-Anonymous-Id': getAnonymousId() },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Get result failed: ${res.status}`);
  }
  return res.json();
}
