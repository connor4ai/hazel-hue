# Architecture Rework: DDD → Pragmatic 3-Layer

## Problem

The current `src/` directory uses full DDD patterns that add ceremony without value at this scale:
- **Branded types** (`UserId`, `AnalysisId`) with factory functions — just use `string`
- **Repository interfaces** (`IAnalysisRepository`, `IUserRepository`) — there's only one implementation each (the API), and we're not swapping backends
- **Domain events** (`AnalysisEvents.ts`) — not consumed by anything, no event bus
- **Use case classes** (`application/` layer) — thin wrappers that add indirection between hooks and API calls
- **Aggregate root functions** (`createAnalysis`, `markPhotoUploaded`, etc.) — server creates these, client just reads/posts; these state transitions don't happen client-side
- **Domain service interfaces** (`IPaletteGenerator`) — only one implementation, no reason to abstract

Meanwhile, the **web app** (`web/src/data/seasons.ts`) has **duplicated types** (`ShoppableProduct`, `ProductCategory`, `ClickSource`, `ColorSwatch` ≈ `PaletteColor`, `StyleGuideData` ≈ `StyleGuide`, etc.) that drift from the mobile app's definitions.

## Target: 3-Layer Architecture

```
src/
  domain/          ← Shared types, interfaces, constants, enums, pure utilities
  services/        ← API client, API calls, coordination logic, platform-specific integrations
  presentation/    ← Hooks, stores, components, screens, theme, animations (stays per-client)

web/src/
  (imports from src/domain/ for shared types)
  services/        ← Web-specific API calls (Stripe vs RevenueCat, etc.)
  components/      ← Web-specific UI
  hooks/           ← Web-specific hooks
```

## What Changes

### 1. Flatten `src/domain/` — keep types, drop DDD machinery

**Keep (as flat files, no bounded context folders):**
- `src/domain/types.ts` — All interfaces: `Analysis`, `User`, `Purchase`, `Entitlement`, `ColorProfile`, `QualityScore`, `Palette`, `StyleGuide`, `MakeupGuide`, `HairGuide`, `JewelryGuide`, `NailGuide`, `AccessoryGuide`, `SeasonSiblings`, `PhotoSubmission`
- `src/domain/season.ts` — `Season` enum, `SeasonFamily`, `SeasonMetadata`, `SEASON_METADATA`, helper functions
- `src/domain/shopping.ts` — `ShoppableProduct`, `ProductCategory`, `ClickSource`, `ProductSearchRequest`, `ProductFeed`, `ProductClickEvent`
- `src/domain/color-matcher.ts` — CIEDE2000 implementation (pure math, legitimately reusable between clients)
- `src/domain/constants.ts` — `ANALYSIS_PRICE_CENTS` and any other shared constants
- `src/domain/errors.ts` — Simplified error types (just extend Error with a code, drop DomainError/PhotoQualityError/EntitlementError hierarchy unless actually caught distinctly)

**Delete:**
- Branded type system (`ValueObjects.ts`) — replace `UserId` etc. with `string`
- Repository interfaces (`IAnalysisRepository`, `IUserRepository`) — only one impl each
- Domain events (`AnalysisEvents.ts`) — unused event sourcing infrastructure
- Aggregate root state-transition functions (`createAnalysis`, `markPhotoUploaded`, `markProcessing`, etc.) — server handles these
- `IPaletteGenerator` interface — only one implementation
- `PaletteGenerator.ts` domain service interface
- `EntitlementChecker.ts` domain service — inline the simple `.find()` logic where needed, or keep as a tiny util in domain if used by multiple services

### 2. Merge `application/` + `infrastructure/` → `src/services/`

The application layer use cases are thin wrappers. The infrastructure layer is just API calls. Merge them:

- `src/services/api.ts` — API client (keep from `infrastructure/api/client.ts`)
- `src/services/endpoints.ts` — API endpoint definitions (keep from `infrastructure/api/endpoints.ts`)
- `src/services/analysis.ts` — `requestAnalysis()`, `getAnalysisResult()`, `checkPhotoQuality()`, `pollAnalysisStatus()` — direct API calls, no repo indirection
- `src/services/user.ts` — `getUser()`, `updateProfile()`, `getPurchases()`, `getEntitlements()`
- `src/services/purchase.ts` — `createPurchase()`, `processRefund()` — calls API directly
- `src/services/auth.ts` — Cognito auth provider (from `infrastructure/auth/`)
- `src/services/payments.ts` — RevenueCat provider (from `infrastructure/payments/`)
- `src/services/photo.ts` — Photo upload logic (from `infrastructure/storage/PhotoUploader.ts`)
- `src/services/storage.ts` — Secure storage (from `infrastructure/storage/SecureStorage.ts`)
- `src/services/sharing.ts` — Share gate (from `infrastructure/sharing/`)
- `src/services/shopping.ts` — Product search, feed, click tracking API calls

### 3. Keep `src/presentation/` as-is

The presentation layer is already well-organized. No structural changes needed — just update imports to use `@domain/*` and `@services/*` instead of `@application/*` and `@infrastructure/*`.

### 4. Web app: import shared types from `src/domain/`

- Delete duplicated types from `web/src/data/seasons.ts`
- Import `ShoppableProduct`, `ProductCategory`, `ClickSource` from `src/domain/shopping`
- Import season types from `src/domain/season`
- Keep web-specific result shape (`SeasonResult`) in web if it genuinely differs
- `ColorSwatch` in web becomes `PaletteColor` from domain (same shape: `{ hex, name }`)
- Web's `StyleGuideData`, `JewelryData`, `HairData`, `NailData`, `AccessoryData` become imports from domain types (they're structurally identical to `StyleGuide`, `JewelryGuide`, etc. minus the `analysisId` field — can use `Omit<StyleGuide, 'analysisId'>` or just share the full type)

### 5. Update path aliases

```json
// tsconfig.json
"paths": {
  "@domain/*": ["src/domain/*"],
  "@services/*": ["src/services/*"],
  "@presentation/*": ["src/presentation/*"],
  "@config/*": ["src/config/*"],
  "@assets/*": ["assets/*"]
}
```

Remove `@application/*` and `@infrastructure/*`.

### 6. Update tests

- Move test files alongside their source (or into `src/domain/__tests__/`, `src/services/__tests__/`)
- Update imports in all test files
- Drop tests for deleted DDD machinery (branded types, events, aggregate functions)
- Keep tests for: color matcher (CIEDE2000), quality score logic, entitlement checking, season helpers

### 7. Update PLAN.md

Replace the DDD/bounded-context architecture section with the simpler 3-layer description.

## Execution Order

1. Create new `src/domain/` flat files (types.ts, season.ts, shopping.ts, etc.)
2. Create new `src/services/` directory with merged files
3. Update `tsconfig.json` path aliases
4. Update all imports in `src/presentation/`
5. Update web app to import from `src/domain/`
6. Update/move tests
7. Delete old `src/domain/*/`, `src/application/`, `src/infrastructure/`
8. Update PLAN.md
9. Run typecheck + lint to verify
