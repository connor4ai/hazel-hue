/**
 * Loads shopping API credentials from AWS Secrets Manager.
 *
 * Credentials are cached after the first cold-start fetch so subsequent
 * invocations in the same Lambda container reuse the cached values.
 */

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export interface ShoppingSecrets {
  SKIMLINKS_PUBLISHER_ID: string;
  SKIMLINKS_CLIENT_ID: string;
  SKIMLINKS_API_KEY: string;
  IMAGGA_API_KEY: string;
  IMAGGA_API_SECRET: string;
}

let cached: ShoppingSecrets | null = null;

export async function getShoppingSecrets(): Promise<ShoppingSecrets> {
  if (cached) return cached;

  const secretArn = process.env.SHOPPING_SECRET_ARN;
  if (!secretArn) {
    throw new Error('SHOPPING_SECRET_ARN environment variable is not set');
  }

  const client = new SecretsManagerClient({});
  const result = await client.send(
    new GetSecretValueCommand({ SecretId: secretArn }),
  );

  if (!result.SecretString) {
    throw new Error('Shopping secret has no string value');
  }

  const parsed = JSON.parse(result.SecretString) as ShoppingSecrets;

  if (!parsed.SKIMLINKS_PUBLISHER_ID || !parsed.SKIMLINKS_API_KEY) {
    throw new Error(
      'Shopping secret is missing required Skimlinks credentials. ' +
      'Update the secret in AWS Secrets Manager (hazel-hue/shopping-api).',
    );
  }

  cached = parsed;
  return parsed;
}
