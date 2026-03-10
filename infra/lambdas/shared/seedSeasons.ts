/**
 * One-time seed script for populating season reference data in DynamoDB.
 * Run via: npx ts-node infra/lambdas/shared/seedSeasons.ts
 * Or deploy as a CDK custom resource.
 */
import { putItem } from './dynamodb';

interface SeasonSeedData {
  season: string;
  family: string;
  displayName: string;
  poeticDescription: string;
  accentColor: string;
  temperature: 'warm' | 'cool';
  value: 'light' | 'medium' | 'deep';
  chroma: 'bright' | 'soft' | 'true';
}

const SEASONS: SeasonSeedData[] = [
  { season: 'LIGHT_SPRING', family: 'SPRING', displayName: 'Light Spring', poeticDescription: 'Delicate, warm, and luminous — like morning sunlight on peach blossoms', accentColor: '#FFB347', temperature: 'warm', value: 'light', chroma: 'soft' },
  { season: 'TRUE_SPRING', family: 'SPRING', displayName: 'True Spring', poeticDescription: 'Vibrant, warm, and alive — like a garden in full bloom', accentColor: '#FF6B35', temperature: 'warm', value: 'medium', chroma: 'true' },
  { season: 'BRIGHT_SPRING', family: 'SPRING', displayName: 'Bright Spring', poeticDescription: 'Electric, clear, and radiant — like tropical flowers in noon sun', accentColor: '#FF4F81', temperature: 'warm', value: 'medium', chroma: 'bright' },
  { season: 'LIGHT_SUMMER', family: 'SUMMER', displayName: 'Light Summer', poeticDescription: 'Soft, cool, and ethereal — like lavender fields in morning mist', accentColor: '#B19CD9', temperature: 'cool', value: 'light', chroma: 'soft' },
  { season: 'TRUE_SUMMER', family: 'SUMMER', displayName: 'True Summer', poeticDescription: 'Cool, muted, and graceful — like a cloudy seaside in soft light', accentColor: '#7B9EBF', temperature: 'cool', value: 'medium', chroma: 'true' },
  { season: 'SOFT_SUMMER', family: 'SUMMER', displayName: 'Soft Summer', poeticDescription: 'Gentle, blended, and smoky — like twilight over a still lake', accentColor: '#8E9AAF', temperature: 'cool', value: 'medium', chroma: 'soft' },
  { season: 'SOFT_AUTUMN', family: 'AUTUMN', displayName: 'Soft Autumn', poeticDescription: 'Warm, muted, and golden — like sunlight through autumn leaves', accentColor: '#C4A882', temperature: 'warm', value: 'medium', chroma: 'soft' },
  { season: 'TRUE_AUTUMN', family: 'AUTUMN', displayName: 'True Autumn', poeticDescription: 'Rich, warm, and earthy — like a harvest table at golden hour', accentColor: '#B5651D', temperature: 'warm', value: 'medium', chroma: 'true' },
  { season: 'DEEP_AUTUMN', family: 'AUTUMN', displayName: 'Deep Autumn', poeticDescription: 'Intense, warm, and grounded — like aged mahogany and deep amber', accentColor: '#8B4513', temperature: 'warm', value: 'deep', chroma: 'true' },
  { season: 'DEEP_WINTER', family: 'WINTER', displayName: 'Deep Winter', poeticDescription: 'Bold, cool, and dramatic — like a midnight sky over fresh snow', accentColor: '#2C1654', temperature: 'cool', value: 'deep', chroma: 'true' },
  { season: 'TRUE_WINTER', family: 'WINTER', displayName: 'True Winter', poeticDescription: 'Crisp, cool, and striking — like ice crystals catching winter light', accentColor: '#1E3A5F', temperature: 'cool', value: 'medium', chroma: 'true' },
  { season: 'BRIGHT_WINTER', family: 'WINTER', displayName: 'Bright Winter', poeticDescription: 'Vivid, icy, and electric — like jewels on a bed of fresh snow', accentColor: '#E91E63', temperature: 'cool', value: 'medium', chroma: 'bright' },
];

export async function seedSeasons(): Promise<void> {
  console.log('Seeding 12 season reference records...');

  for (const data of SEASONS) {
    await putItem({
      PK: `SEASON#${data.season}`,
      SK: 'INFO',
      ...data,
      GSI3PK: `FAMILY#${data.family}`,
      GSI3SK: data.season,
    });
    console.log(`  ✓ ${data.displayName}`);
  }

  console.log('Done.');
}

// Lambda handler for CDK custom resource trigger
export const handler = async (): Promise<void> => {
  await seedSeasons();
};
