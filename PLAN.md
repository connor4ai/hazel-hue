# Hazel & Hue — Full Rebuild Plan

## Decisions Made
- **Full rebuild**: Mobile app (Expo) + Web landing page + AWS serverless backend
- **Simple monorepo**: Single Expo project root with `/infra` for CDK, `/web` for landing page — no Turborepo
- **Bedrock only**: Claude Vision (Bedrock) for photo analysis + content generation. Defer SageMaker.
- **4 bounded contexts**: Identity+Commerce merged, Content+Engagement merged

## Architecture Overview

### 4 Bounded Contexts

```
┌─────────────────────────────────────────────────────────────┐
│                     HAZEL & HUE SYSTEM                      │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  User Context     │  │  Analysis Context │                │
│  │                   │  │                   │                │
│  │  - Auth (Cognito) │  │  - Photo Ingest   │                │
│  │  - Profile        │  │  - Quality Score  │                │
│  │  - Purchase ($19) │  │  - AI Engine      │                │
│  │  - Entitlements   │  │    (Bedrock)      │                │
│  │  - Refunds        │  │  - Season Detect  │                │
│  │  - Enterprise     │  │  - Color Profile  │                │
│  │    Licensing      │  │                   │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Recommendation   │  │  Experience       │                │
│  │  Context          │  │  Context          │                │
│  │                   │  │                   │                │
│  │  - Palette Gen    │  │  - Sharing        │                │
│  │  - Style Guide    │  │  - Share Images   │                │
│  │  - Makeup Guide   │  │  - Referrals      │                │
│  │  - Hair Guide     │  │  - Analytics      │                │
│  │  - Jewelry Guide  │  │  - Notifications  │                │
│  │  - Celebrity      │  │  - Content/Tips   │                │
│  │    Matches        │  │  - Lock Screen    │                │
│  │  - Wardrobe Check │  │  - Salon Card     │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Context Mapping
```
User ──[Customer/Supplier]──> Analysis
  (entitlement check before processing)

Analysis ──[Published Language]──> Recommendation
  (AnalysisCompleted event triggers palette/guide generation)

User ──[Customer/Supplier]──> Experience
  (user identity for sharing, referrals)

Analysis ──[Published Language]──> Experience
  (events for analytics tracking)
```

### Project Structure (Simple Monorepo)

```
hazel-hue/
├── app/                          # Expo Router pages
│   ├── (auth)/
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home / start analysis
│   │   ├── results.tsx           # Past analyses list
│   │   └── profile.tsx           # Settings & account
│   ├── analysis/
│   │   ├── onboard.tsx           # Photo tips + quality guide
│   │   ├── capture.tsx           # Camera / upload
│   │   ├── checkout.tsx          # $19 payment gate
│   │   ├── processing.tsx        # Animated processing theater
│   │   └── [id].tsx              # Full results experience
│   ├── _layout.tsx
│   └── +not-found.tsx
│
├── src/
│   ├── domain/                   # Pure business logic (no deps)
│   │   ├── user/
│   │   │   ├── entities/
│   │   │   │   ├── User.ts
│   │   │   │   ├── Purchase.ts
│   │   │   │   └── Entitlement.ts
│   │   │   ├── services/
│   │   │   │   └── EntitlementChecker.ts
│   │   │   └── repositories/
│   │   │       └── IUserRepository.ts
│   │   │
│   │   ├── analysis/
│   │   │   ├── entities/
│   │   │   │   ├── Analysis.ts
│   │   │   │   ├── PhotoSubmission.ts
│   │   │   │   ├── ColorProfile.ts
│   │   │   │   └── QualityScore.ts
│   │   │   ├── events/
│   │   │   │   ├── AnalysisRequested.ts
│   │   │   │   ├── AnalysisCompleted.ts
│   │   │   │   └── AnalysisFailed.ts
│   │   │   └── repositories/
│   │   │       └── IAnalysisRepository.ts
│   │   │
│   │   ├── recommendation/
│   │   │   ├── entities/
│   │   │   │   ├── Palette.ts
│   │   │   │   ├── StyleGuide.ts
│   │   │   │   ├── MakeupGuide.ts
│   │   │   │   ├── HairGuide.ts
│   │   │   │   ├── JewelryGuide.ts
│   │   │   │   └── SeasonSiblings.ts
│   │   │   └── services/
│   │   │       └── PaletteGenerator.ts
│   │   │
│   │   └── shared/
│   │       ├── types/
│   │       │   ├── Season.ts       # 12 seasonal types enum
│   │       │   ├── Undertone.ts    # warm | cool | neutral
│   │       │   ├── Chroma.ts       # bright | soft | muted
│   │       │   ├── ContrastLevel.ts
│   │       │   └── ValueObjects.ts # UserId, AnalysisId, etc.
│   │       └── errors/
│   │           └── DomainError.ts
│   │
│   ├── application/              # Use cases (orchestration)
│   │   ├── user/
│   │   │   ├── CreatePurchase.ts
│   │   │   ├── CheckEntitlement.ts
│   │   │   ├── ProcessRefund.ts
│   │   │   └── UpdateProfile.ts
│   │   ├── analysis/
│   │   │   ├── RequestAnalysis.ts
│   │   │   ├── GetAnalysisResult.ts
│   │   │   └── CheckPhotoQuality.ts
│   │   └── recommendation/
│   │       ├── GetPalette.ts
│   │       └── GetStyleGuide.ts
│   │
│   ├── infrastructure/           # External integrations
│   │   ├── api/
│   │   │   ├── client.ts         # Axios/fetch wrapper
│   │   │   ├── interceptors.ts   # Auth token injection
│   │   │   └── endpoints.ts      # API route constants
│   │   ├── auth/
│   │   │   └── CognitoAuthProvider.ts
│   │   ├── payments/
│   │   │   └── RevenueCatProvider.ts
│   │   ├── storage/
│   │   │   └── SecureStorage.ts
│   │   └── repositories/
│   │       ├── ApiAnalysisRepository.ts
│   │       └── ApiUserRepository.ts
│   │
│   ├── presentation/             # UI layer
│   │   ├── hooks/
│   │   │   ├── useAnalysis.ts
│   │   │   ├── usePalette.ts
│   │   │   ├── usePurchase.ts
│   │   │   └── usePhotoCapture.ts
│   │   ├── components/
│   │   │   ├── brand/            # Hazel & Hue design system
│   │   │   │   ├── BotanicalDivider.tsx
│   │   │   │   ├── WatercolorBackground.tsx
│   │   │   │   ├── HandLetterHeading.tsx
│   │   │   │   ├── PaintySwatchCard.tsx
│   │   │   │   └── OrganicCard.tsx
│   │   │   ├── ui/               # Primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Typography.tsx
│   │   │   │   └── ColorSwatch.tsx
│   │   │   ├── analysis/
│   │   │   │   ├── CameraCapture.tsx
│   │   │   │   ├── QualityIndicator.tsx
│   │   │   │   └── ProcessingTheater.tsx
│   │   │   ├── results/
│   │   │   │   ├── SeasonReveal.tsx
│   │   │   │   ├── ColorStory.tsx
│   │   │   │   ├── PaletteGrid.tsx
│   │   │   │   ├── DrapeRoom.tsx
│   │   │   │   ├── LookbookSection.tsx
│   │   │   │   ├── MakeupGuide.tsx
│   │   │   │   ├── JewelryGuide.tsx
│   │   │   │   ├── HairGuide.tsx
│   │   │   │   ├── SeasonSiblings.tsx
│   │   │   │   ├── ColorsToAvoid.tsx
│   │   │   │   ├── Toolkit.tsx
│   │   │   │   └── ShareRefer.tsx
│   │   │   └── commerce/
│   │   │       ├── CheckoutSheet.tsx
│   │   │       └── PriceAnchor.tsx
│   │   ├── theme/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   └── animations.ts
│   │   └── animations/
│   │       ├── seasonReveal.ts
│   │       ├── botanicalGrow.ts
│   │       ├── watercolorBloom.ts
│   │       └── paletteDrops.ts
│   │
│   └── config/
│       ├── env.ts
│       ├── constants.ts
│       └── featureFlags.ts
│
├── web/                          # Landing page (React/Vite or Next.js)
│   ├── src/
│   │   ├── pages/
│   │   │   └── index.tsx         # Conversion-focused landing
│   │   └── components/
│   │       ├── Hero.tsx
│   │       ├── SocialProof.tsx
│   │       ├── ResultsPreview.tsx
│   │       └── PricingCTA.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── infra/                        # AWS CDK
│   ├── bin/
│   │   └── hazel-hue.ts
│   ├── lib/
│   │   ├── stacks/
│   │   │   ├── AuthStack.ts      # Cognito
│   │   │   ├── DataStack.ts      # DynamoDB + S3
│   │   │   ├── ApiStack.ts       # API Gateway + Lambda
│   │   │   ├── ProcessingStack.ts # SQS + processing Lambdas
│   │   │   └── CdnStack.ts       # CloudFront
│   │   └── constructs/
│   │       ├── AnalysisLambda.ts
│   │       └── SingleTableDynamo.ts
│   ├── lambdas/
│   │   ├── user/
│   │   │   ├── createPurchase.ts
│   │   │   ├── checkEntitlement.ts
│   │   │   └── processRefund.ts
│   │   ├── analysis/
│   │   │   ├── requestAnalysis.ts
│   │   │   ├── processAnalysis.ts  # SQS consumer
│   │   │   ├── getResult.ts
│   │   │   └── checkPhotoQuality.ts
│   │   ├── recommendation/
│   │   │   ├── generatePalette.ts
│   │   │   ├── generateStyleGuide.ts
│   │   │   └── generateGuides.ts
│   │   ├── experience/
│   │   │   ├── generateShareImage.ts
│   │   │   ├── generateLockScreen.ts
│   │   │   ├── generateSalonCard.ts
│   │   │   └── createReferral.ts
│   │   └── shared/
│   │       ├── middleware.ts
│   │       └── dynamodb.ts
│   ├── package.json
│   ├── cdk.json
│   └── tsconfig.json
│
├── assets/                       # Shared design assets
│   ├── illustrations/            # Botanical SVGs
│   ├── textures/                 # Watercolor PNGs
│   ├── animations/               # Lottie JSON files
│   └── fonts/                    # Custom typography
│
├── app.json                      # Expo config
├── tsconfig.json
├── package.json
├── tailwind.config.js            # NativeWind config
└── .github/
    └── workflows/
        ├── ci.yml                # Lint + type-check + test
        ├── deploy-infra.yml      # CDK deploy
        └── build-mobile.yml      # EAS Build
```

---

## DynamoDB Single-Table Design

### Access Patterns & Key Design

```
PK                          SK                              Data
─────────────────────────── ─────────────────────────────── ──────────────────
USER#<userId>               PROFILE                         name, email, prefs, createdAt
USER#<userId>               PURCHASE#<purchaseId>           amount, status, platform, receiptId, createdAt
USER#<userId>               ENTITLEMENT#<type>              type=ANALYSIS, grantedAt, expiresAt (null=forever)
USER#<userId>               ANALYSIS#<analysisId>           status, season, confidence, photoKey, createdAt
USER#<userId>               REFERRAL#<code>                 code, usesCount, credit

ANALYSIS#<analysisId>       METADATA                        userId, status, season, photoKey, qualityScore, createdAt
ANALYSIS#<analysisId>       RESULT#palette                  colors[], neutrals[], accents[], statements[]
ANALYSIS#<analysisId>       RESULT#colorstory               narrative, undertone, chroma, contrast
ANALYSIS#<analysisId>       RESULT#styleguide               outfits[], patterns[], fabrics[]
ANALYSIS#<analysisId>       RESULT#makeup                   foundation, lips[], eyes[], blush, yourRed
ANALYSIS#<analysisId>       RESULT#hair                     bestColors[], avoid[], highlights, salonTerms
ANALYSIS#<analysisId>       RESULT#jewelry                  metals[], gemstones[], avoidMetals[]
ANALYSIS#<analysisId>       RESULT#siblings                 celebrities[] {name, imageUrl}
ANALYSIS#<analysisId>       RESULT#avoid                    colors[] {hex, name, reason}
ANALYSIS#<analysisId>       RESULT#drapes                   comparisons[] {goodHex, badHex, position}

SEASON#<seasonName>         INFO                            description, poeticLine, accentColor
SEASON#<seasonName>         CELEBRITIES                     celebrities[] (reference data)
SEASON#<seasonName>         PALETTE#default                 defaultColors[] (reference data)

REFERRAL#<code>             METADATA                        ownerUserId, discount, credit, usesCount
SHARE#<shareId>             METADATA                        analysisId, userId, platform, createdAt

# Enterprise (future-ready)
TENANT#<tenantId>           CONFIG                          name, brandColors, logo, apiKey
TENANT#<tenantId>           USAGE#<YYYY-MM>                 analysisCount, apiCalls
TENANT#<tenantId>           USER#<userId>                   tenantUserProfile
```

### GSIs

| GSI Name       | PK              | SK              | Purpose                                |
|----------------|-----------------|-----------------|----------------------------------------|
| GSI1           | GSI1PK (email)  | GSI1SK (entity) | Look up user by email                  |
| GSI2           | GSI2PK (status) | GSI2SK (date)   | Query analyses by status (processing, complete, failed) |
| GSI3           | GSI3PK (season) | GSI3SK (date)   | Analytics: analyses per season         |
| GSI4           | GSI4PK (tenant) | GSI4SK (date)   | Enterprise: analyses per tenant        |

---

## Payment Flow ($19 One-Time)

### Mobile (iOS/Android) — RevenueCat
```
1. User captures photo → app stores photo locally
2. User taps "Get My Colors — $19"
3. RevenueCat presents native IAP sheet (Apple Pay / Google Pay)
4. On success: RevenueCat webhook → Lambda validates receipt
5. Lambda creates PURCHASE + ENTITLEMENT records in DynamoDB
6. Client polls entitlement endpoint → proceeds to processing
7. SQS message queued for async analysis
```

### Web — Stripe
```
1. User captures/uploads photo → stored in memory
2. User taps "Get My Colors — $19"
3. Stripe Checkout (or Payment Intent with Apple Pay/Google Pay via Payment Request Button)
4. On success: Stripe webhook → Lambda creates PURCHASE + ENTITLEMENT
5. Client receives confirmation → proceeds to processing
6. SQS message queued for async analysis
```

### Key Rules
- **Never** create account before payment — use anonymous session
- Photo uploaded to S3 (presigned URL) only after payment succeeds
- RevenueCat handles receipt validation, entitlement management, and cross-platform sync
- Refund: RevenueCat webhook for IAP refunds, Stripe webhook for web refunds
- Fraud prevention: rate-limit refund requests per device fingerprint

---

## Analysis Pipeline (Bedrock/Claude)

### Flow
```
Photo Upload (S3)
    │
    ▼
SQS Queue (analysisRequests)
    │
    ▼
Lambda: processAnalysis
    ├── 1. Validate photo quality (resolution, lighting, face detection)
    │      → Use Rekognition for face detection + quality metrics
    │      → Reject if below threshold (return quality feedback)
    │
    ├── 2. Color extraction
    │      → Extract dominant skin, hair, eye colors from photo
    │      → Use Rekognition for face landmarks + crop
    │      → Sample colors from forehead, cheek, lip, hair, eye regions
    │
    ├── 3. Season classification (Claude Vision via Bedrock)
    │      → Send cropped face photo + extracted colors to Claude
    │      → Structured prompt requesting:
    │        - Season (1 of 12)
    │        - Undertone (warm/cool/neutral)
    │        - Chroma (bright/soft/muted)
    │        - Contrast level (low/medium/high)
    │        - Confidence score (0-100)
    │      → Response: JSON with classification
    │
    ├── 4. Generate results package (Claude via Bedrock)
    │      → Parallel invocations for each section:
    │        - Color story narrative
    │        - Palette (24-30 colors with names)
    │        - Style guide (outfit concepts)
    │        - Makeup recommendations
    │        - Hair recommendations
    │        - Jewelry/metals guide
    │        - Colors to avoid
    │      → Each prompt includes: season, undertone, chroma, contrast
    │      → Each response: structured JSON
    │
    ├── 5. Store results
    │      → Write all RESULT# items to DynamoDB
    │      → Update ANALYSIS# status to COMPLETE
    │
    └── 6. Notify client
         → EventBridge event: AnalysisCompleted
         → Client polling endpoint returns results
```

### Prompt Strategy
- **System prompt**: Establishes Claude as expert colorist with deep knowledge of seasonal color analysis, fashion, and beauty
- **Season classification prompt**: Photo + extracted colors → structured season output
- **Content prompts**: Season + color profile → section-specific content. Each section has its own tailored prompt.
- **Caching**: Season reference data (celebrity matches, default palettes) cached in DynamoDB. Only user-specific content (color story, style guide) generated per analysis.
- **Cost control**: ~$0.30-0.50 per analysis in Bedrock costs. At $19 revenue, excellent margin.

---

## Share Image Generation

```
Lambda: generateShareImage
├── Input: analysisId, template (instagram_story | square | lock_screen)
├── Uses: Sharp (image processing) + SVG templates
├── Process:
│   1. Load user's palette colors from DynamoDB
│   2. Load SVG template (botanical frame, season-specific)
│   3. Inject palette colors into SVG template
│   4. Render SVG → PNG via Sharp
│   5. Composite user photo (if included) with template
│   6. Store generated image in S3 (7-day TTL)
│   7. Return presigned URL
├── Templates:
│   - Instagram Story (1080x1920): Season name + palette + botanical frame
│   - Square (1080x1080): Season reveal card
│   - Lock Screen (1170x2532): Palette wallpaper
│   - Salon Card (1050x600): Hair recs + palette
└── Branded: Hazel & Hue watermark + URL on all share images
```

---

## CI/CD Pipeline

### GitHub Actions

**ci.yml** — On every PR/push:
```
- Checkout
- Setup Node 20
- Install deps (npm ci)
- TypeScript check (tsc --noEmit)
- Lint (ESLint)
- Unit tests (Vitest)
- CDK synth (validate infra)
```

**deploy-infra.yml** — On merge to main:
```
- CDK diff
- CDK deploy (with approval for prod)
- Run integration tests against deployed stack
```

**build-mobile.yml** — On tag/manual trigger:
```
- EAS Build (iOS + Android)
- Upload to TestFlight / Play Console internal track
```

---

## What to Defer (Not MVP)

| Feature | Phase | Rationale |
|---------|-------|-----------|
| Wardrobe Check | Phase 5 | Add-on purchase — build after core loop proven |
| Color of the Day widget | Phase 5 | Engagement feature — needs user base first |
| Season Match social | Phase 5 | Social features need critical mass |
| Enterprise multi-tenant | Phase 5 | Build after consumer traction proves the tech |
| Admin dashboard | Phase 5 | Manual ops work fine initially |
| Full API docs | Phase 5 | Not needed until enterprise sales |
| Salon card (Apple Wallet) | Phase 4 | Nice-to-have — image version ships in Phase 3 |
| PDF results email | Phase 3 | Important but not blocking launch |
| A/B testing framework | Phase 4 | Premature before traffic |
| Push notifications | Phase 4 | Need content strategy first |

---

## Phase 1: Foundation — Task Breakdown

### Week 1: Project Setup + Infrastructure

1. **Initialize Expo project with Expo SDK 54+**
   - `npx create-expo-app@latest hazel-hue-app --template tabs`
   - Configure TypeScript strict mode
   - Set up Expo Router file-based navigation
   - Configure `app.json` / `app.config.ts`
   - Set up `eas.json` for EAS Build profiles (development, preview, production)

2. **Install and configure core dependencies**
   - NativeWind (Tailwind for RN) + tailwind.config.js
   - TanStack Query for server state
   - Zustand for client state
   - Expo SecureStore
   - React Native Reanimated
   - lottie-react-native

3. **Set up CDK infrastructure project**
   - `mkdir infra && cd infra && npx cdk init app --language typescript`
   - AuthStack: Cognito User Pool with Apple + Google federation
   - DataStack: DynamoDB single-table + S3 bucket (photos, 24h lifecycle rule)
   - ApiStack: HTTP API Gateway + Cognito authorizer
   - ProcessingStack: SQS queue + processing Lambda

4. **DynamoDB single-table implementation**
   - Define table with PK/SK + 4 GSIs
   - Create shared DynamoDB helper (put, get, query, update)
   - Seed Season reference data (12 seasons with default palettes, descriptions, celebrities)

5. **CI/CD pipeline**
   - GitHub Actions: ci.yml (lint, type-check, test)
   - GitHub Actions: deploy-infra.yml (CDK deploy)
   - GitHub Actions: build-mobile.yml (EAS Build)
   - Branch protection on `main`

### Week 2: Auth + Domain Foundation

6. **Cognito auth integration**
   - Sign-in with Apple
   - Sign-in with Google
   - Email/password fallback
   - CognitoAuthProvider.ts on client
   - JWT token management (refresh flow)
   - Auth state in Zustand store

7. **Domain layer — shared types**
   - Season.ts (12-season enum with metadata)
   - Undertone.ts, Chroma.ts, ContrastLevel.ts
   - ValueObjects.ts (UserId, AnalysisId, PurchaseId — branded types)
   - DomainError.ts (base error class)

8. **Domain layer — entities**
   - User entity (user context)
   - Analysis entity (analysis context)
   - ColorProfile value object
   - QualityScore value object
   - Purchase entity
   - Entitlement entity
   - Palette entity
   - Domain events (AnalysisRequested, AnalysisCompleted, AnalysisFailed)

9. **Application layer — use cases**
   - RequestAnalysis use case
   - CheckPhotoQuality use case
   - CreatePurchase use case
   - CheckEntitlement use case
   - GetAnalysisResult use case

10. **Repository interfaces + API implementations**
    - IAnalysisRepository, IUserRepository
    - ApiAnalysisRepository, ApiUserRepository
    - API client with Cognito auth interceptor

### Week 3: Design System + Navigation

11. **Typography setup**
    - Install display font (Fraunces or Recoleta — warm serif)
    - Install body font (Satoshi or Cabinet Grotesk)
    - Install script accent font
    - Typography component with semantic variants (h1-h6, body, caption, label)

12. **Color theme**
    - colors.ts: brand palette (Hazel, Cream, Sage, Terracotta, Dusty Rose, Charcoal)
    - Season-specific accent colors (Spring=coral, Summer=lavender, Autumn=sienna, Winter=plum)
    - Dark mode: defer (not MVP)

13. **Brand components (design system)**
    - BotanicalDivider — SVG vine/leaf dividers between sections
    - WatercolorBackground — texture overlay component
    - HandLetterHeading — display text with script accents
    - OrganicCard — card with organic border (not sharp rectangles)
    - PaintySwatchCard — color swatch with painterly edges
    - Button — primary/secondary/ghost variants with brand styling
    - ColorSwatch — single color display with name

14. **App navigation shell**
    - (tabs) layout with bottom tab bar (Home, Results, Profile)
    - (auth) layout for sign-in/sign-up flows
    - analysis/ flow (onboard → capture → checkout → processing → [id])
    - Navigation transitions with Reanimated

15. **Landing page scaffold (web/)**
    - Vite + React + Tailwind project in /web
    - Responsive hero section
    - Social proof section
    - Results preview section (blurred teaser)
    - Pricing CTA
    - Deploy to CloudFront (CdnStack)

---

## Phase 2: Core Analysis + Payment (Weeks 4-7)

16. Photo capture screen with real-time quality guidance
17. S3 presigned upload flow (photo → S3 after payment)
18. RevenueCat integration ($19 one-time non-consumable)
19. Stripe integration for web (Payment Intent + Apple Pay)
20. Checkout screen (sunk-cost psychology, price anchoring)
21. Anonymous session → email collection during processing wait
22. SQS-driven analysis pipeline Lambda
23. Rekognition face detection + color region sampling
24. Claude Vision (Bedrock) season classification
25. Claude (Bedrock) content generation (parallel prompts for each section)
26. Results storage in DynamoDB (all RESULT# items)
27. Processing theater animation (45-second storytelling sequence)
28. Basic results screen (reveal + color story + palette)

## Phase 3: Full Results Experience (Weeks 8-11)

29. Season Reveal animation (botanical vine + watercolor wash + confetti)
30. Color Story section (Claude-generated narrative)
31. Interactive Palette Grid (tap to expand, organized by category)
32. Drape Room (side-by-side swatch comparison carousel)
33. Lookbook / Style Guide (outfit concepts with illustrations)
34. Makeup Guide (foundation, lips, eyes, blush, "your red")
35. Hair Guide (colors, salon terminology card)
36. Jewelry & Metals guide
37. Season Siblings (celebrity matches)
38. Colors to Avoid section
39. Toolkit section (lock screen, salon card, shopping card)
40. Share image generation Lambda (Instagram Story template)
41. Lock screen wallpaper generator Lambda
42. Past results list screen
43. PDF results generation (email delivery)

## Phase 4: Conversion + Launch (Weeks 12-14)

44. Landing page polish (conversion-optimized copy, A/B headline)
45. SEO implementation (meta tags, OG images, structured data)
46. Analytics integration (Mixpanel or PostHog)
47. Referral system ($5 give/get with referral codes)
48. App Store submission (TestFlight → review)
49. ASO (screenshots, preview video, description optimization)
50. Social proof mechanics (analysis counter, testimonials)
51. Satisfaction guarantee + refund flow

## Phase 5: Growth + Enterprise (Weeks 15+)

52. Wardrobe Check add-on
53. Color of the Day widget
54. Season Match social feature
55. Enterprise API + multi-tenant DynamoDB
56. White-label theming system
57. Admin dashboard (React web)
58. API documentation (OpenAPI spec)

---

## Key Architecture Decisions & Rationale

### Why 4 contexts instead of 6
- **User** (Identity+Commerce): A user's purchases and entitlements are tightly coupled to their identity. Splitting them means cross-context calls for every entitlement check. For a solo dev, keeping them together eliminates that overhead.
- **Experience** (Content+Engagement): Sharing, referrals, and educational content all serve the same goal — post-analysis engagement. They share the same user touchpoints.

### Why Bedrock-only (no SageMaker)
- Claude Vision can analyze photos AND generate content in one pipeline
- Eliminates the need to train/deploy a custom ML model
- ~$0.30-0.50 per analysis in API costs vs. $100+/month SageMaker endpoint
- If accuracy needs improvement later, add Rekognition for face/color extraction as a preprocessing step (cheaper than SageMaker)
- SageMaker becomes valuable only at >100K analyses/month where custom model accuracy gains justify the cost

### Why simple monorepo (no Turborepo)
- One developer = one build. Turborepo's parallel task orchestration doesn't help when you're the only one running builds.
- Expo's own build system (EAS) handles mobile builds. CDK handles infra builds. They're already separate.
- Path aliases in tsconfig.json give you module boundaries without workspace overhead.
- If you hire devs later, migrating to Turborepo takes ~2 hours. Not worth the upfront cost.

### Why RevenueCat instead of raw StoreKit/Google Play Billing
- Handles receipt validation server-side (critical for preventing fraud)
- Cross-platform entitlement management
- Built-in analytics (MRR, conversion rates, cohort analysis)
- Webhook integration for server-side purchase processing
- Saves 2-3 weeks of building custom IAP validation

---

## DDD Principles Applied Pragmatically

### What we DO follow strictly:
1. **Ubiquitous language**: Season, Palette, Analysis, Drape, Undertone — used consistently in code, UI, and communication
2. **Entity boundaries**: Analysis is an aggregate root. Results are value objects owned by Analysis. Purchases are entities in the User aggregate.
3. **Domain events**: AnalysisRequested, AnalysisCompleted, AnalysisFailed drive the pipeline via SQS/EventBridge
4. **Repository pattern**: Domain depends on interfaces, infrastructure provides implementations
5. **Use cases**: Application layer orchestrates domain logic without leaking infrastructure concerns

### What we RELAX for solo dev speed:
1. **No CQRS**: Single read/write model is fine at this scale. Add read projections only if performance demands it.
2. **No event sourcing**: DynamoDB items are the source of truth. Event sourcing adds complexity without clear benefit here.
3. **Shared kernel for types**: Season, Undertone, etc. live in `domain/shared/` and are used across contexts. Strict DDD would have each context define its own. Not worth it for a solo dev.
4. **Thin application layer**: Some use cases may be simple pass-throughs to repositories. That's fine — they exist for when business rules grow, not for ceremony.

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Accuracy across diverse skin tones | Prompt engineering + Rekognition preprocessing. Build test suite of 50+ diverse photos. |
| Photo quality variance | Strict quality gate with real-time feedback. Use Rekognition face detection confidence. |
| Apple App Store rejection | No "before/after" claims. Frame as "color palette recommendation" not "analysis." Follow health/beauty guidelines. Budget 3 submissions. |
| Celebrity images (legal) | Use illustrated portraits or public domain images. Link to Wikipedia, don't host photos. |
| Bedrock rate limits at scale | Request limit increase early. Implement retry with exponential backoff. Cache season reference data. |
| $19 price sensitivity | Satisfaction guarantee + comparison to $300 in-person. A/B test $14.99 vs $19.99 vs $24.99. |
