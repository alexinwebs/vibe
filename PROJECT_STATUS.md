# VIBE — Project Status

**Last documented state:** October 2026  
**Status:** Working locally / active development

## 1. Current Architecture

- Rider: React Native + Expo + TypeScript
- Driver: React Native + Expo + TypeScript
- Backend: Node.js + Fastify + TypeScript
- Shared package: `@vibe/types`
- Package management: pnpm workspaces
- Storage: in-memory `Map`s
- API port: `4000`

## 2. Confirmed Working Flow

The following core flow has been implemented and tested locally:

```text
Rider creates ride
        ↓
Driver sees request
        ↓
Driver accepts
        ↓
Driver arriving
        ↓
Ride starts
        ↓
Ride completes
        ↓
Driver becomes available again
```

## 3. Rider

### Working

- Ride selection
- Ride creation
- Backend communication
- Ride lifecycle screens/flow
- Ride history
- VIBE service labels

### Remaining

- Production authentication
- Persistent user data
- Production location tracking
- Real-time status infrastructure

## 4. Driver

### Working

- Online/offline
- Pending ride polling
- Ride acceptance
- Driver arriving
- Start ride
- Complete ride
- Driver availability reset
- VIBE service labels

### Remaining

- Driver authentication
- Persistent driver profile
- Production location tracking
- Real-time dispatch
- Production payout flow

## 5. Backend

### Working

- Rider lookup
- Driver lookup
- Ride creation
- Pending ride discovery
- Ride acceptance
- Driver assignment
- Ride state transitions
- Fare calculation
- Commission calculation
- Driver earnings
- Driver availability
- Ride retrieval
- Rider ride history

### Remaining

- Persistent database
- Authentication/authorization
- Production validation and rate limiting
- Real-time transport
- Production observability
- Production deployment

## 6. Important Prototype Limitations

### In-memory data

Restarting the API process resets the current data.

### Demo identities

The current development flow uses demo rider and driver identities.

### Polling

The Driver app currently polls for pending rides rather than using a production real-time event system.

### Local networking

Android Emulator development uses `10.0.2.2` to reach the host machine's local API.

## 7. Definition of Current Milestone

The core prototype milestone is complete when the local Rider → Backend → Driver → Backend ride lifecycle can be executed end-to-end.

That milestone is currently working.

## 8. Next Major Milestone

The next major engineering milestone is to move from prototype infrastructure toward a real platform foundation:

1. Authentication
2. Database persistence
3. Strong API validation
4. Rider/driver accounts
5. Real-time ride updates
6. Maps/GPS
7. Payments
8. Deployment
