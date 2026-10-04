# VIBE — API Reference

**Base URL (local):** `http://localhost:4000`

For Android Emulator clients, the host machine is reachable through:

```text
http://10.0.2.2:4000
```

## Common Response Pattern

Successful endpoints return JSON.

Errors use an HTTP error status and a response containing a `message` field in the current implementation.

## Routes

### `GET /`

Basic API response.

### `GET /health`

Health check.

---

# Riders

## `GET /riders/:riderId`

Get a rider by ID.

Demo rider currently used by the prototype:

```text
rider-demo-001
```

## `GET /riders/:riderId/rides`

Get rides belonging to a rider.

---

# Drivers

## `GET /drivers`

Get drivers.

## `GET /drivers/:driverId`

Get a driver by ID.

Demo driver currently used by the prototype:

```text
driver-demo-001
```

## `GET /drivers/:driverId/rides`

Get pending ride requests available to the driver.

Current filtering is based on:

```text
status = SEARCHING
driverId = null
```

## `POST /drivers/:driverId/online`

Set driver online.

## `POST /drivers/:driverId/offline`

Set driver offline.

---

# Rides

## `POST /rides`

Create a ride.

### Request

```json
{
  "riderId": "rider-demo-001",
  "rideType": "AUTO",
  "pickupAddress": "Ghaziabad",
  "destinationAddress": "Delhi"
}
```

Allowed ride types:

```text
BIKE
AUTO
CAB
```

### Response shape

```json
{
  "ride": {}
}
```

The created ride starts in:

```text
SEARCHING
```

## `POST /rides/:rideId/assign-driver`

Assign a driver to a ride.

> This route exists in the current backend. The Driver app's normal acceptance flow uses `/accept`.

## `POST /rides/:rideId/accept`

Accept a ride for a driver.

### Request

```json
{
  "driverId": "driver-demo-001"
}
```

Successful acceptance results in:

```text
ride.status = DRIVER_ASSIGNED
driver.isAvailable = false
```

## `POST /rides/:rideId/driver-arriving`

Transition an assigned ride to:

```text
DRIVER_ARRIVING
```

## `POST /rides/:rideId/start`

Start a ride.

Allowed source states in the current implementation include:

```text
DRIVER_ARRIVING
DRIVER_ASSIGNED
```

Result:

```text
RIDE_STARTED
```

## `POST /rides/:rideId/complete`

Complete a started ride.

### Optional request body

```json
{
  "finalFare": 150
}
```

If `finalFare` is omitted, the current implementation uses the ride's estimated fare.

Result:

```text
RIDE_COMPLETED
```

The driver is also made available again after successful completion.

## `GET /rides/:rideId`

Get a ride by ID.

---

# Prototype Fare Model

Current estimated fares:

| Ride type | Fare |
|---|---:|
| `BIKE` | ₹80 |
| `AUTO` | ₹120 |
| `CAB` | ₹180 |

These are prototype values.

# Commission Model

| Rider plan | Commission |
|---|---:|
| `VIBE_PLUS` | 0% |
| `FREE` | 15% |

Driver earnings are recalculated when a ride is completed.

# Ride Object — Conceptual Shape

The shared `Ride` type currently contains fields including:

```text
id
riderId
driverId
rideType
status
pickupAddress
destinationAddress
estimatedFare
finalFare
earnings
createdAt
updatedAt
```

The exact TypeScript type in `packages/types` is the authoritative contract.
