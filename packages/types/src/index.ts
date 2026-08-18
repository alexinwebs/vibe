export type RideType =
  | "BIKE"
  | "AUTO"
  | "CAB";

export type RideStatus =
  | "DRAFT"
  | "SEARCHING"
  | "DRIVER_ASSIGNED"
  | "DRIVER_ARRIVING"
  | "RIDE_STARTED"
  | "RIDE_COMPLETED"
  | "CANCELLED";

export type SubscriptionPlan =
  | "FREE"
  | "VIBE_PLUS";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export interface EarningsBreakdown {
  fare: number;

  driverEarnings: number;

  vibeCommission: number;

  commissionRate: number;

  isVibePlus: boolean;
}

export interface Ride {
  id: string;

  riderId: string;

  driverId: string | null;

  rideType: RideType;

  status: RideStatus;

  pickupAddress: string;

  destinationAddress: string;

  estimatedFare: number;

  finalFare: number | null;

  earnings: EarningsBreakdown;

  createdAt: string;

  updatedAt: string;
}

export interface Rider {
  id: string;

  name: string;

  phone: string;

  subscriptionPlan: SubscriptionPlan;
}

export interface Driver {
  id: string;

  name: string;

  phone: string;

  isOnline: boolean;

  isAvailable: boolean;
}

export interface Subscription {
  id: string;

  riderId: string;

  plan: SubscriptionPlan;

  startedAt: string;

  expiresAt: string;

  isActive: boolean;
}

export interface Payment {
  id: string;

  rideId: string;

  riderId: string;

  amount: number;

  status: PaymentStatus;

  createdAt: string;
}