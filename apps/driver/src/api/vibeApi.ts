import type {
  Driver,
  Ride,
  RideType,
} from "@vibe/types";

const API_BASE_URL = "http://10.0.2.2:4000";

type DriverResponse = {
  driver: Driver;
};

type RidesResponse = {
  rides: Ride[];
};

type AcceptRideResponse = {
  ride: Ride;
  driver: Driver;
};

async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    },
  );

  if (!response.ok) {
    let message = `VIBE API error: ${response.status}`;

    try {
      const body = await response.json();

      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Ignore invalid error response bodies.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getDriver(
  driverId: string,
): Promise<Driver> {
  const result =
    await apiRequest<DriverResponse>(
      `/drivers/${driverId}`,
    );

  return result.driver;
}

export async function goOnline(
  driverId: string,
): Promise<Driver> {
  const result =
    await apiRequest<DriverResponse>(
      `/drivers/${driverId}/online`,
      {
        method: "POST",
      },
    );

  return result.driver;
}

export async function goOffline(
  driverId: string,
): Promise<Driver> {
  const result =
    await apiRequest<DriverResponse>(
      `/drivers/${driverId}/offline`,
      {
        method: "POST",
      },
    );

  return result.driver;
}

export async function getPendingRides(
  driverId: string,
): Promise<Ride[]> {
  const result =
    await apiRequest<RidesResponse>(
      `/drivers/${driverId}/rides`,
    );

  return result.rides;
}

export async function acceptRide(
  rideId: string,
  driverId: string,
): Promise<AcceptRideResponse> {
  return apiRequest<AcceptRideResponse>(
    `/rides/${rideId}/accept`,
    {
      method: "POST",
      body: JSON.stringify({
        driverId,
      }),
    },
  );
}

export function getRideTypeLabel(
  rideType: RideType,
): string {
  switch (rideType) {
    case "BIKE":
      return "VIBE Go";

    case "AUTO":
      return "VIBE Comfort";

    case "CAB":
      return "VIBE XL";
  }
}
