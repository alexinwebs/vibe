export type RideStatus =
  | "DRAFT"
  | "DESTINATION_SELECTED"
  | "RIDE_SELECTED"
  | "REQUESTED"
  | "SEARCHING_DRIVER"
  | "DRIVER_ASSIGNED"
  | "DRIVER_ARRIVING"
  | "DRIVER_AT_PICKUP"
  | "OTP_VERIFIED"
  | "RIDE_IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type RideType = "BIKE" | "AUTO" | "CAB";

export interface Ride {
  id: string;
  riderId: string;
  driverId: string | null;

  pickup: {
    latitude: number;
    longitude: number;
    address: string;
  };

  destination: {
    latitude: number;
    longitude: number;
    address: string;
  };

  rideType: RideType;

  estimatedFare: number;
  finalFare: number | null;

  status: RideStatus;

  otpVerified: boolean;

  createdAt: string;
  updatedAt: string;
}