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
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const hasBody =
    options?.body !== undefined &&
    options?.body !== null;

  if (hasBody) {
    headers["Content-Type"] =
      "application/json";
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers: {
        ...headers,
        ...(options?.headers ?? {}),
      },
    },
  );

  if (!response.ok) {
    let message =
      `VIBE API error: ${response.status}`;

    try {
      const body =
        await response.json();

      if (body?.message) {
        message = body.message;
      }
    } catch {
      // Ignore invalid error response.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

/* -------------------------------------------------------------------------- */
/*                                  DRIVER                                    */
/* -------------------------------------------------------------------------- */

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
        body: JSON.stringify({}),
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
        body: JSON.stringify({}),
      },
    );

  return result.driver;
}

/* -------------------------------------------------------------------------- */
/*                                RIDE REQUESTS                               */
/* -------------------------------------------------------------------------- */

export async function getPendingRides(
  driverId: string,
): Promise<Ride[]> {
  const result =
    await apiRequest<RidesResponse>(
      `/drivers/${driverId}/rides`,
    );

  return result.rides;
}

/* -------------------------------------------------------------------------- */
/*                                ACCEPT RIDE                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               RIDE LABELS                                  */
/* -------------------------------------------------------------------------- */

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
