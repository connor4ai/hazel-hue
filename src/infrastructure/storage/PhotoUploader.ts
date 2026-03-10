import { apiClient } from '@infrastructure/api/client';
import { endpoints } from '@infrastructure/api/endpoints';

interface PresignedUrlResponse {
  uploadUrl: string;
  photoKey: string;
}

/**
 * Fetches a presigned S3 upload URL for analysis photos.
 */
export async function getPresignedUploadUrl(analysisId: string): Promise<PresignedUrlResponse> {
  return apiClient.get<PresignedUrlResponse>(
    `${endpoints.analysis.presignedUpload}?analysisId=${analysisId}`,
  );
}

/**
 * Uploads a photo to S3 using a presigned URL.
 * Converts the local file URI to a blob and PUTs it directly.
 */
export async function uploadPhoto(presignedUrl: string, fileUri: string): Promise<void> {
  const response = await fetch(fileUri);
  const blob = await response.blob();

  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpeg' },
    body: blob,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Photo upload failed: ${uploadResponse.status}`);
  }
}
