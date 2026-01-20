import { z } from 'zod';

/**
 * Environment variable validation schema
 * Ensures all required environment variables are set on startup
 * Prevents runtime errors from missing configuration
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Redis (optional in development, required in production)
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().regex(/^\d+$/, 'REDIS_PORT must be a number').default('6379'),
  REDIS_PASSWORD: z.string().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'STRIPE_PUBLISHABLE_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),

  // OpenAI
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),

  // SendGrid
  SENDGRID_API_KEY: z.string().min(1, 'SENDGRID_API_KEY is required'),
  SENDGRID_FROM_EMAIL: z.string().email('SENDGRID_FROM_EMAIL must be a valid email'),

  // Admin
  ADMIN_PASSWORD: z.string().min(8, 'ADMIN_PASSWORD must be at least 8 characters'),

  // Optional: Analytics
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  TIKTOK_PIXEL_ID: z.string().optional(),

  // Optional: Session secret
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET should be at least 32 characters').optional(),
});

// Validate environment variables on import
export function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);

    // Additional production-specific validations
    if (parsed.NODE_ENV === 'production') {
      if (!parsed.REDIS_PASSWORD) {
        console.warn('⚠️  WARNING: REDIS_PASSWORD not set in production! This is a security risk.');
      }

      if (!parsed.SESSION_SECRET) {
        console.warn('⚠️  WARNING: SESSION_SECRET not set in production! Using default may be insecure.');
      }

      if (parsed.ADMIN_PASSWORD.length < 12) {
        console.warn('⚠️  WARNING: ADMIN_PASSWORD is less than 12 characters. Consider using a stronger password.');
      }
    }

    console.log('✅ Environment variables validated successfully');
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      console.error('\nPlease set all required environment variables before starting the application.');
      process.exit(1);
    }
    throw error;
  }
}

// Export validated environment
export const env = validateEnv();

// Type-safe access to environment variables
export type Env = z.infer<typeof envSchema>;
