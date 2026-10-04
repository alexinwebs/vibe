# VIBE — Architecture Decision Record

This document records important decisions so future development remains consistent.

## ADR-001 — Two Dedicated Mobile Apps

**Decision:** Use separate Rider and Driver applications.

**Reason:** Rider and driver workflows, permissions and interfaces are fundamentally different.

## ADR-002 — Fastify REST API

**Decision:** Use Node.js + Fastify for the backend API.

**Reason:** Fastify provides a lightweight, high-performance TypeScript-friendly foundation for the API.

## ADR-003 — TypeScript Across the Stack

**Decision:** Use TypeScript for mobile applications, backend and shared contracts.

**Reason:** Shared types reduce mismatches between clients and API responses.

## ADR-004 — Shared `@vibe/types` Package

**Decision:** Keep shared domain types in a workspace package.

**Reason:** Rider, Driver and API need a common contract for entities such as rides, riders and drivers.

## ADR-005 — Backend Owns Ride State

**Decision:** Ride lifecycle state is controlled by the backend.

**Reason:** The backend must remain the authoritative source of truth and prevent clients from independently inventing state.

## ADR-006 — Prototype In-Memory Storage

**Decision:** Use JavaScript `Map`s during the early prototype.

**Reason:** It keeps the initial prototype simple while the core workflow is being validated.

**Trade-off:** Data is lost when the API restarts and the approach is not suitable for production.

## ADR-007 — Driver Polling During Prototype

**Decision:** Driver app polls for pending ride requests while online.

**Reason:** Polling is simple to implement while validating the core ride lifecycle.

**Future:** Replace or complement polling with a production real-time event architecture.

## ADR-008 — VIBE Service Branding

**Decision:** Present vehicle categories through VIBE-specific service names.

**Mapping:**

```text
BIKE → VIBE Go
AUTO → VIBE Comfort
CAB  → VIBE XL
```

## ADR-009 — Driver-Focused Commission Model

**Decision:** VIBE+ rides currently use 0% commission and Free rides use 15% commission.

**Reason:** The product concept is intentionally driver-friendly and uses commission as part of the VIBE+ business model.
