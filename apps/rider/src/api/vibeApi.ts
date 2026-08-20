import type {
  Ride as ApiRide,
  RideStatus as ApiRideStatus,
  RideType as ApiRideType,
} from "@vibe/types";

const API_BASE_URL = "http://10.0.2.2:4000";

export type CreateRideInput = {
  riderId: string;
  rideType: ApiRideType;
  pickupAddress: string;
  destinationAddress: string;
};

type CreateRideResponse = {
  ride: ApiRide;
};

type RideResponse = {
  ride: ApiRide;
};

type AssignDriverResponse = {
  ride: ApiRide;

  driver: {
    id: string;
    name: string;
    phone: string;
    isOnline: boolean;
    isAvailable: boolean;
  };
};

async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const headers = new Headers(
    options?.headers,
  );

  /*
   * Only send Content-Type when a request
   * actually contains a body.
   *
   * These endpoints have no body:
   *
   * POST /rides/:id/assign-driver
   * POST /rides/:id/driver-arriving
   * POST /rides/:id/start
   *
   * Sending application/json with an empty body
   * can cause Fastify to reject the request
   * with HTTP 400.
   */
  if (options?.body !== undefined) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    },
  );

  if (!response.ok) {
    let message =
      `VIBE API error: ${response.status}`;

    try {
      const errorBody =
        await response.json();

      if (
        errorBody &&
        typeof errorBody.message ===
          "string"
      ) {
        message =
          `${message} - ${errorBody.message}`;
      }
    } catch {
      // Ignore non-JSON error responses.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function mapRideTypeToApi(
  rideType:
    | "VIBE Go"
    | "VIBE Comfort"
    | "VIBE XL",
): ApiRideType {
  switch (rideType) {
    case "VIBE Go":
      return "BIKE";

    case "VIBE Comfort":
      return "AUTO";

    case "VIBE XL":
      return "CAB";
  }
}

export function mapApiStatusToLocal(
  status: ApiRideStatus,
):
  | "idle"
  | "finding"
  | "driver_found"
  | "driver_arriving"
  | "driver_arrived"
  | "in_progress"
  | "completed" {
  switch (status) {
    case "DRAFT":
      return "idle";

    case "SEARCHING":
      return "finding";

    case "DRIVER_ASSIGNED":
      return "driver_found";

    case "DRIVER_ARRIVING":
      return "driver_arriving";

    case "RIDE_STARTED":
      return "in_progress";

    case "RIDE_COMPLETED":
      return "completed";

    case "CANCELLED":
      return "idle";
  }
}

export async function createRide(
  input: CreateRideInput,
): Promise<ApiRide> {
  const result =
    await apiRequest<CreateRideResponse>(
      "/rides",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
    );

  return result.ride;
}

export async function assignDriver(
  rideId: string,
): Promise<AssignDriverResponse> {
  return apiRequest<AssignDriverResponse>(
    `/rides/${rideId}/assign-driver`,
    {
      method: "POST",
    },
  );
}

export async function startDriverArrival(
  rideId: string,
): Promise<ApiRide> {
  const result =
    await apiRequest<RideResponse>(
      `/rides/${rideId}/driver-arriving`,
      {
        method: "POST",
      },
    );

  return result.ride;
}

export async function startTrip(
  rideId: string,
): Promise<ApiRide> {
  const result =
    await apiRequest<RideResponse>(
      `/rides/${rideId}/start`,
      {
        method: "POST",
      },
    );

  return result.ride;
}

export async function completeTrip(
  rideId: string,
  finalFare: number,
): Promise<ApiRide> {
  const result =
    await apiRequest<RideResponse>(
      `/rides/${rideId}/complete`,
      {
        method: "POST",
        body: JSON.stringify({
          finalFare,
        }),
      },
    );

  return result.ride;
}

export async function getRide(
  rideId: string,
): Promise<ApiRide> {
  const result =
    await apiRequest<RideResponse>(
      `/rides/${rideId}`,
    );

  return result.ride;
}