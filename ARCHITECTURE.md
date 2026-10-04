# VIBE — System Architecture

## 1. Overview

VIBE is a TypeScript monorepo containing two React Native mobile applications and a Fastify backend.

```text
                    ┌──────────────────┐
                    │    Rider App     │
                    │ React Native     │
                    │ Expo + TS        │
                    └────────┬─────────┘
                             │
                             │ HTTP / REST
                             ▼
                    ┌──────────────────┐
                    │   Fastify API    │
                    │ Node.js + TS     │
                    └────────┬─────────┘
                             │
                             │ Ride / Driver state
                             ▼
                    ┌──────────────────┐
                    │   Driver App     │
                    │ React Native     │
                    │ Expo + TS        │
                    └──────────────────┘

                    Shared contracts
                         @vibe/types
```

## 2. Monorepo

```text
apps/
├── rider/
├── driver/
└── api/

packages/
└── types/
```

`@vibe/types` provides shared TypeScript contracts between applications and the API.

## 3. Rider App

Responsibilities:

- Rider-facing UI
- Ride selection
- Ride request creation
- Ride status presentation
- Ride history
- API communication

The mobile app should not be the authority for ride state or business calculations.

## 4. Driver App

Responsibilities:

- Driver-facing UI
- Online/offline state
- Pending ride polling
- Ride acceptance
- Ride lifecycle actions
- Driver availability presentation

The current prototype polls the API for pending rides while the driver is online.

## 5. Backend

The API is built with Fastify and currently uses in-memory JavaScript `Map` structures for riders, drivers and rides.

### Core backend responsibilities

- Validate ride creation input
- Create ride records
- Calculate prototype fares
- Determine commission based on rider plan
- Calculate driver earnings
- Expose pending rides
- Assign drivers
- Validate ride state transitions
- Update driver availability
- Complete rides

## 6. Source of Truth

The backend is the source of truth for:

- Ride ID
- Rider ID
- Driver ID
- Ride type
- Ride status
- Pickup/destination
- Estimated fare
- Final fare
- Earnings
- Driver availability
- Rider subscription plan

## 7. Ride State Machine

```text
SEARCHING
    │
    │ driver accepts
    ▼
DRIVER_ASSIGNED
    │
    │ driver arriving
    ▼
DRIVER_ARRIVING
    │
    │ start
    ▼
RIDE_STARTED
    │
    │ complete
    ▼
RIDE_COMPLETED
```

Invalid transitions should be rejected by the API.

## 8. Driver Availability

A driver has two related concepts in the current backend model:

- `isOnline`
- `isAvailable`

A driver can be online but temporarily unavailable because they are assigned to an active ride.

When a driver accepts a ride:

```text
isAvailable = false
```

When the ride is completed:

```text
isAvailable = true
```

## 9. Driver Request Discovery

The current driver app polls the API every few seconds while online.

The API exposes pending rides where:

```text
status === SEARCHING
AND
 driverId === null
```

This is a prototype mechanism. Production real-time dispatch should eventually use a real-time event mechanism.

## 10. Current Data Storage

Current prototype storage:

```text
JavaScript Map
   ├── riders
   ├── drivers
   └── rides
```

This data disappears when the backend process restarts.

A production version requires persistent storage.

## 11. API Communication

Current mobile-to-backend communication is REST over HTTP.

Android emulator development uses the host-machine alias:

```text
http://10.0.2.2:4000
```

The API itself listens on port `4000` in the current development setup.

## 12. Architecture Principles

1. Backend owns business state.
2. Mobile clients render and request state changes.
3. Shared types reduce contract drift.
4. Ride transitions are explicit.
5. Business calculations happen server-side.
6. Production infrastructure should replace prototype mechanisms incrementally.
