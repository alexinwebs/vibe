# ⚡ VIBE

> **Your ride. Your vibe. No awkward energy.**

VIBE is a **Gen-Z focused, open-source ride-hailing platform** being built to make getting from A → B feel less boring.

Clean UI. Fast flows. Zero unnecessary nonsense.

And yes — **VIBE is vibe coded.** 🤖

## What is VIBE?

VIBE is a mobility platform with dedicated **Rider** and **Driver** mobile applications connected through a shared backend API.

The project focuses on building the complete ride workflow instead of only a booking interface:

```text
Rider requests ride
        ↓
Backend creates ride
        ↓
Driver receives request
        ↓
Driver accepts
        ↓
Driver arriving
        ↓
Ride started
        ↓
Ride completed
        ↓
Fare & earnings calculated
```

## Core Differentiator: Driver-First Commission Model

VIBE is designed around a driver-friendly commission model:

| Rider plan | Platform commission | Driver receives |
|---|---:|---:|
| **VIBE+** | **0%** | Full ride fare |
| **Free** | **15%** | 85% of ride fare |

Example for a ₹500 completed ride:

- VIBE+ → driver receives ₹500
- Free → driver receives ₹425

The backend calculates the fare, commission and driver earnings when the ride is completed.

## VIBE Services

- ⚡ **VIBE Go** — bike rides
- 🛺 **VIBE Comfort** — auto rides
- 🚕 **VIBE XL** — cab rides

## Applications

### Rider App

- Select a VIBE service
- Request rides
- Follow ride status
- View ride history

### Driver App

- Go online/offline
- Receive ride requests
- Accept rides
- Mark driver as arriving
- Start rides
- Complete rides
- Become available again after completion

## Current Ride States

```text
SEARCHING
    ↓
DRIVER_ASSIGNED
    ↓
DRIVER_ARRIVING
    ↓
RIDE_STARTED
    ↓
RIDE_COMPLETED
```

## Architecture

```text
┌──────────────────┐
│    Rider App     │
│ React Native     │
│ + Expo           │
└────────┬─────────┘
         │ REST API
         ▼
┌──────────────────┐
│   VIBE Backend   │
│ Node.js +        │
│ Fastify          │
└────────┬─────────┘
         │ REST API
         ▼
┌──────────────────┐
│    Driver App    │
│ React Native     │
│ + Expo           │
└──────────────────┘
```

The monorepo also contains a shared TypeScript package, `@vibe/types`, used for common data contracts.

## Tech Stack

### Mobile
- React Native
- Expo SDK 57
- TypeScript
- React Navigation

### Backend
- Node.js
- Fastify
- TypeScript
- REST API
- `@fastify/cors`

### Monorepo & Development
- pnpm Workspaces
- Shared TypeScript package
- Git
- GitHub
- VS Code
- Android Emulator
- Postman / cURL

## Repository Structure

```text
VIBE/
├── apps/
│   ├── rider/      # Rider React Native app
│   ├── driver/     # Driver React Native app
│   └── api/        # Fastify backend
├── packages/
│   └── types/      # Shared TypeScript types
├── docs/            # Product and technical documentation
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Current Status

VIBE is a **working local development project / prototype**.

### Working

- Rider app
- Driver app
- Fastify backend
- Ride creation
- Driver online/offline state
- Driver ride requests
- Ride acceptance
- Driver arriving state
- Ride start
- Ride completion
- Driver availability management
- Fare calculation
- Commission calculation
- Driver earnings calculation
- Ride history
- Shared TypeScript types

### Not yet production-ready

- Authentication
- Persistent database
- Maps/GPS
- Real-time WebSocket infrastructure
- Payment integration
- Production deployment
- Production-grade safety systems
- Advanced driver matching

See [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) for the current detailed status.

## Documentation

- [`docs/PRD.md`](docs/PRD.md) — Product Requirements Document
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — System architecture
- [`docs/API.md`](docs/API.md) — Backend API contract
- [`docs/BUSINESS_MODEL.md`](docs/BUSINESS_MODEL.md) — Commission and product model
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — Development roadmap
- [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) — Current implementation status
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — Local development workflow
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — Contribution guide
- [`docs/SECURITY.md`](docs/SECURITY.md) — Security notes and future requirements
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — Project milestones

## Vibe Coded

VIBE is developed using an **AI-assisted development workflow**. AI is used as a development multiplier for coding, debugging, architecture exploration, documentation and prototyping, while product direction and implementation decisions remain developer-driven.

> **AI-assisted doesn't mean AI-only.**

## Project Status Disclaimer

VIBE is currently a development project and is **not a production ride-hailing service**. The current backend uses in-memory data and is intended for development and experimentation.

---

<p align="center">

# ⚡ VIBE

### Your ride. Your vibe. No awkward energy.

</p>
