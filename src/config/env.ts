const ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.hazelandhue.com',
  COGNITO_USER_POOL_ID: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID ?? '',
  COGNITO_CLIENT_ID: process.env.EXPO_PUBLIC_COGNITO_CLIENT_ID ?? '',
  COGNITO_REGION: process.env.EXPO_PUBLIC_COGNITO_REGION ?? 'us-east-1',
  S3_BUCKET_NAME: process.env.EXPO_PUBLIC_S3_BUCKET_NAME ?? '',
  S3_REGION: process.env.EXPO_PUBLIC_S3_REGION ?? 'us-east-1',
} as const;

export default ENV;
