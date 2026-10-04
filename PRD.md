# VIBE — Product Requirements Document

**Status:** Active development  
**Product:** VIBE  
**Category:** Ride-hailing / mobility  
**Audience:** Riders and drivers  
**Platform:** Mobile applications + backend API

## 1. Product Vision

VIBE aims to provide a ride-hailing experience that feels fast, clean, simple and human while giving drivers a more transparent, driver-friendly earning model.

The product is intentionally designed with a Gen-Z-oriented brand and experience rather than copying the presentation of traditional ride-hailing platforms.

## 2. Problem

Ride-hailing products have two major sides:

1. Riders need a simple way to request and complete trips.
2. Drivers need a reliable flow for receiving trips and understanding their earnings.

VIBE addresses both through dedicated Rider and Driver applications connected to one backend system.

## 3. Goals

### Primary goals

- Provide a simple ride-request flow.
- Provide drivers with a complete ride workflow.
- Keep ride state controlled by the backend.
- Calculate fare and driver earnings consistently.
- Create a clear driver-focused commission model.
- Build the project with a maintainable TypeScript monorepo.

### Secondary goals

- Establish a foundation for maps, real-time communication, payments and production infrastructure.
- Keep the product identity distinct through VIBE service names and a clean visual system.

## 4. Non-Goals for the Current Prototype

The current prototype does not yet attempt to provide:

- Production authentication
- Persistent user accounts
- Production GPS tracking
- Production maps/navigation
- Payment processing
- Production driver payouts
- Production-grade safety/verification systems
- Large-scale real-time dispatch

## 5. User Types

### Rider

A user who requests a ride from a pickup location to a destination.

### Driver

A user who becomes available to receive ride requests, accepts trips and completes them.

## 6. Services

| Internal ride type | Product name | Vehicle category |
|---|---|---|
| `BIKE` | VIBE Go | Bike |
| `AUTO` | VIBE Comfort | Auto |
| `CAB` | VIBE XL | Cab |

The internal API uses the stable enum values while the UI exposes the VIBE product names.

## 7. Core Rider Requirements

### R1 — Select service

The rider must be able to choose a VIBE service.

### R2 — Request ride

The rider must be able to submit:

- Rider ID
- Ride type
- Pickup address
- Destination address

### R3 — Receive ride lifecycle updates

The rider experience must represent the ride's current backend state.

### R4 — View history

The rider should be able to view completed rides.

## 8. Core Driver Requirements

### D1 — Driver availability

Driver can switch between online and offline states.

### D2 — Pending requests

Online drivers can receive rides in `SEARCHING` state that have no assigned driver.

### D3 — Accept ride

A driver can accept an available ride.

### D4 — Arrive

The driver can transition an assigned ride to `DRIVER_ARRIVING`.

### D5 — Start ride

The driver can start the ride.

### D6 — Complete ride

The driver can complete a started ride.

### D7 — Availability recovery

After completing a ride, the driver becomes available again.

## 9. Ride Lifecycle

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

The backend is the source of truth for these states.

## 10. Business Model

### Commission

- VIBE+ rider → 0% platform commission
- Free rider → 15% platform commission

### Example

For a ₹500 final fare:

```text
VIBE+:
₹500 fare
₹0 commission
₹500 driver earnings

Free:
₹500 fare
₹75 commission
₹425 driver earnings
```

The current backend stores earnings information with the ride and recalculates earnings when a ride is completed.

## 11. Fare Model — Current Prototype

The current prototype uses fixed fares by internal ride type:

| Ride type | Current estimated fare |
|---|---:|
| `BIKE` | ₹80 |
| `AUTO` | ₹120 |
| `CAB` | ₹180 |

These are prototype values, not production pricing.

## 12. Functional Success Criteria

A core end-to-end flow is considered working when:

1. Rider creates a ride.
2. Ride appears as an available request for an online driver.
3. Driver accepts it.
4. Ride becomes `DRIVER_ASSIGNED`.
5. Driver marks arriving.
6. Ride becomes `DRIVER_ARRIVING`.
7. Driver starts ride.
8. Ride becomes `RIDE_STARTED`.
9. Driver completes ride.
10. Ride becomes `RIDE_COMPLETED`.
11. Driver becomes available again.
12. Final fare and earnings are stored on the ride.

## 13. Future Product Requirements

Future versions can introduce:

- Authentication and account recovery
- OTP verification
- Persistent database
- Maps and GPS
- Real-time driver location
- Real-time ride events
- Driver matching
- Payments
- Driver payouts
- Ratings and reviews
- Safety tools
- Ride receipts
- Notifications
- Admin operations
