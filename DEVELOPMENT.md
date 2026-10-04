# VIBE — Development Guide

## Prerequisites

The current development environment uses:

- Node.js
- pnpm
- Expo
- Android Studio / Android Emulator for Android testing
- Git

## Repository

The VIBE repository is organized as a pnpm workspace monorepo.

```text
apps/rider
apps/driver
apps/api
packages/types
```

## Install Dependencies

From the repository root:

```bash
pnpm install
```

## Start the API

From the repository root, use the workspace command appropriate to the API package.

Typical development command:

```bash
pnpm --filter api dev
```

The current local API uses port `4000`.

## Start Rider

```bash
pnpm --filter rider start
```

For Android:

```bash
pnpm --filter rider android
```

## Start Driver

```bash
pnpm --filter driver start
```

For Android:

```bash
pnpm --filter driver android
```

## Android Emulator API Address

Inside an Android Emulator, `localhost` refers to the emulator itself.

To access the API running on the development machine:

```text
http://10.0.2.2:4000
```

## TypeScript Checks

Examples used during development:

```bash
pnpm --filter api exec tsc --noEmit
```

```bash
pnpm --filter driver exec tsc --noEmit
```

Use the equivalent Rider command when validating the Rider workspace.

## API Smoke Test

Health check:

```bash
curl -s http://localhost:4000/health
```

Create a development ride:

```bash
curl -s -X POST \
  http://localhost:4000/rides \
  -H "Content-Type: application/json" \
  -d '{
    "riderId": "rider-demo-001",
    "rideType": "AUTO",
    "pickupAddress": "Ghaziabad",
    "destinationAddress": "Delhi"
  }'
```

## Development Workflow

Recommended workflow:

```text
1. Make a focused change
        ↓
2. Run TypeScript checks
        ↓
3. Run the affected app
        ↓
4. Test the real flow
        ↓
5. Review git diff
        ↓
6. Commit
        ↓
7. Push
```

## Prototype Development Rules

- Keep backend business logic server-side.
- Keep shared contracts in `@vibe/types`.
- Do not silently change ride state from the client.
- Avoid adding production claims to documentation until the feature is actually implemented.
- Prefer small, testable milestones.
