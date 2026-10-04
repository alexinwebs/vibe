# VIBE — Business Model

## 1. Positioning

VIBE is positioned as a Gen-Z-oriented ride-hailing platform with a clean, simple product experience and a driver-friendly commission model.

The product is not intended to be presented as a direct clone of existing ride-hailing platforms.

## 2. Rider Plans

### Free

- Standard VIBE rider experience
- Current prototype commission: 15%

### VIBE+

- Premium rider plan concept
- Current prototype commission: 0%

The 0% commission is currently implemented as backend business logic for rides associated with a VIBE+ rider.

## 3. Driver Economics

The primary driver-side differentiator is the commission model.

```text
VIBE+ ride
₹500 fare
    ↓
₹0 platform commission
    ↓
₹500 driver earnings
```

```text
Free ride
₹500 fare
    ↓
₹75 platform commission
    ↓
₹425 driver earnings
```

## 4. Why the Model Matters

The model is intended to:

- Make VIBE+ rides attractive to drivers.
- Keep commission logic transparent.
- Give the platform a clear monetization mechanism for free riders.
- Create a business relationship where subscription economics can benefit both sides.

## 5. Prototype Pricing

Current fixed prototype fare values:

- VIBE Go / `BIKE`: ₹80
- VIBE Comfort / `AUTO`: ₹120
- VIBE XL / `CAB`: ₹180

These values are for development and testing and should not be treated as final market pricing.

## 6. Future Business Questions

Before production launch, the project needs decisions around:

- VIBE+ subscription price
- Driver onboarding and verification
- City-specific pricing
- Base fare and per-km/per-minute pricing
- Surge pricing, if any
- Cancellation fees
- Taxes and regulatory requirements
- Payment processing fees
- Driver payout timing
- Refunds
- Promotions and incentives
- Operational support
