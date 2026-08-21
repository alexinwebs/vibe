import Fastify from "fastify";
import cors from "@fastify/cors";
import type {
  Driver,
  Ride,
  RideStatus,
  RideType,
  Rider,
} from "@vibe/types";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const riders = new Map<string, Rider>();

const drivers = new Map<string, Driver>();

const rides = new Map<string, Ride>();

/* -------------------------------------------------------------------------- */
/*                                  SEED DATA                                 */
/* -------------------------------------------------------------------------- */

const demoRider: Rider = {
  id: "rider-demo-001",
  name: "Alex",
  phone: "+91XXXXXXXXXX",
  subscriptionPlan: "FREE",
};

const demoDriver: Driver = {
  id: "driver-demo-001",
  name: "Arjun",
  phone: "+91XXXXXXXXXX",
  isOnline: true,
  isAvailable: true,
};

riders.set(demoRider.id, demoRider);

drivers.set(demoDriver.id, demoDriver);

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function getCommissionRate(
  isVibePlus: boolean,
): number {
  return isVibePlus ? 0.1 : 0.15;
}

function calculateEarnings(
  fare: number,
  isVibePlus: boolean,
) {
  const commissionRate =
    getCommissionRate(isVibePlus);

  const vibeCommission =
    Number(
      (fare * commissionRate).toFixed(2),
    );

  const driverEarnings =
    Number(
      (fare - vibeCommission).toFixed(2),
    );

  return {
    fare,
    driverEarnings,
    vibeCommission,
    commissionRate,
    isVibePlus,
  };
}

function calculateFare(
  rideType: RideType,
): number {
  switch (rideType) {
    case "BIKE":
      return 80;

    case "AUTO":
      return 120;

    case "CAB":
      return 180;
  }
}

function findAvailableDriver(): Driver | null {
  for (const driver of drivers.values()) {
    if (
      driver.isOnline &&
      driver.isAvailable
    ) {
      return driver;
    }
  }

  return null;
}

function updateRideStatus(
  ride: Ride,
  status: RideStatus,
): Ride {
  const updatedRide: Ride = {
    ...ride,
    status,
    updatedAt: new Date().toISOString(),
  };

  rides.set(
    updatedRide.id,
    updatedRide,
  );

  return updatedRide;
}

/* -------------------------------------------------------------------------- */
/*                                   ROOT                                     */
/* -------------------------------------------------------------------------- */

app.get("/", async () => {
  return {
    name: "VIBE API",
    message: "Move different. Move VIBE.",
    version: "0.2.0",
  };
});

/* -------------------------------------------------------------------------- */
/*                                  HEALTH                                    */
/* -------------------------------------------------------------------------- */

app.get("/health", async () => {
  return {
    status: "ok",
    service: "vibe-api",
    version: "0.2.0",
  };
});

/* -------------------------------------------------------------------------- */
/*                                   RIDERS                                   */
/* -------------------------------------------------------------------------- */

app.get("/riders/:riderId", async (request, reply) => {
  const { riderId } =
    request.params as {
      riderId: string;
    };

  const rider = riders.get(riderId);

  if (!rider) {
    return reply.status(404).send({
      error: "RIDER_NOT_FOUND",
      message: "Rider was not found.",
    });
  }

  return {
    rider,
  };
});

/* -------------------------------------------------------------------------- */
/*                                   DRIVERS                                  */
/* -------------------------------------------------------------------------- */

app.get("/drivers/:driverId", async (request, reply) => {
  const { driverId } =
    request.params as {
      driverId: string;
    };

  const driver = drivers.get(driverId);

  if (!driver) {
    return reply.status(404).send({
      error: "DRIVER_NOT_FOUND",
      message: "Driver was not found.",
    });
  }

  return {
    driver,
  };
});

app.get("/drivers", async () => {
  return {
    drivers: Array.from(
      drivers.values(),
    ),
  };
});

app.get(
  "/drivers/:driverId/rides",
  async (request, reply) => {
    const { driverId } =
      request.params as {
        driverId: string;
      };

    const driver = drivers.get(driverId);

    if (!driver) {
      return reply.status(404).send({
        error: "DRIVER_NOT_FOUND",
        message: "Driver was not found.",
      });
    }

    const pendingRides =
      Array.from(rides.values())
        .filter(
          (ride) =>
            ride.status === "SEARCHING" &&
            ride.driverId === null,
        )
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime(),
        );

    return {
      rides: pendingRides,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                           DRIVER AVAILABILITY                              */
/* -------------------------------------------------------------------------- */

app.post(
  "/drivers/:driverId/online",
  async (request, reply) => {
    const { driverId } =
      request.params as {
        driverId: string;
      };

    const driver = drivers.get(driverId);

    if (!driver) {
      return reply.status(404).send({
        error: "DRIVER_NOT_FOUND",
        message: "Driver was not found.",
      });
    }

    const updatedDriver: Driver = {
      ...driver,
      isOnline: true,
      isAvailable: true,
    };

    drivers.set(
      updatedDriver.id,
      updatedDriver,
    );

    return {
      driver: updatedDriver,
    };
  },
);

app.post(
  "/drivers/:driverId/offline",
  async (request, reply) => {
    const { driverId } =
      request.params as {
        driverId: string;
      };

    const driver = drivers.get(driverId);

    if (!driver) {
      return reply.status(404).send({
        error: "DRIVER_NOT_FOUND",
        message: "Driver was not found.",
      });
    }

    const updatedDriver: Driver = {
      ...driver,
      isOnline: false,
      isAvailable: false,
    };

    drivers.set(
      updatedDriver.id,
      updatedDriver,
    );

    return {
      driver: updatedDriver,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                                    RIDES                                   */
/* -------------------------------------------------------------------------- */

app.post("/rides", async (request, reply) => {
  const body =
    request.body as {
      riderId?: string;
      rideType?: RideType;
      pickupAddress?: string;
      destinationAddress?: string;
    };

  if (!body.riderId) {
    return reply.status(400).send({
      error: "RIDER_ID_REQUIRED",
      message: "riderId is required.",
    });
  }

  if (!body.rideType) {
    return reply.status(400).send({
      error: "RIDE_TYPE_REQUIRED",
      message: "rideType is required.",
    });
  }

  if (
    !["BIKE", "AUTO", "CAB"].includes(
      body.rideType,
    )
  ) {
    return reply.status(400).send({
      error: "INVALID_RIDE_TYPE",
      message:
        "rideType must be BIKE, AUTO, or CAB.",
    });
  }

  if (!body.pickupAddress) {
    return reply.status(400).send({
      error: "PICKUP_REQUIRED",
      message:
        "pickupAddress is required.",
    });
  }

  if (!body.destinationAddress) {
    return reply.status(400).send({
      error: "DESTINATION_REQUIRED",
      message:
        "destinationAddress is required.",
    });
  }

  const rider = riders.get(body.riderId);

  if (!rider) {
    return reply.status(404).send({
      error: "RIDER_NOT_FOUND",
      message: "Rider was not found.",
    });
  }

  const estimatedFare =
    calculateFare(body.rideType);

  const isVibePlus =
    rider.subscriptionPlan === "VIBE_PLUS";

  const earnings =
    calculateEarnings(
      estimatedFare,
      isVibePlus,
    );

  const now =
    new Date().toISOString();

  const ride: Ride = {
    id: createId("ride"),

    riderId: rider.id,

    driverId: null,

    rideType: body.rideType,

    status: "SEARCHING",

    pickupAddress:
      body.pickupAddress,

    destinationAddress:
      body.destinationAddress,

    estimatedFare,

    finalFare: null,

    earnings,

    createdAt: now,

    updatedAt: now,
  };

  rides.set(ride.id, ride);

  return reply.status(201).send({
    ride,
  });
});

/* -------------------------------------------------------------------------- */
/*                              FIND DRIVER                                   */
/* -------------------------------------------------------------------------- */

app.post(
  "/rides/:rideId/assign-driver",
  async (request, reply) => {
    const { rideId } =
      request.params as {
        rideId: string;
      };

    const ride = rides.get(rideId);

    if (!ride) {
      return reply.status(404).send({
        error: "RIDE_NOT_FOUND",
        message: "Ride was not found.",
      });
    }

    if (ride.status !== "SEARCHING") {
      return reply.status(409).send({
        error: "INVALID_RIDE_STATUS",
        message:
          "A driver can only be assigned while the ride is searching.",
      });
    }

    const driver =
      findAvailableDriver();

    if (!driver) {
      return reply.status(409).send({
        error: "NO_DRIVER_AVAILABLE",
        message:
          "No available driver was found.",
      });
    }

    drivers.set(driver.id, {
      ...driver,
      isAvailable: false,
    });

    const updatedRide: Ride = {
      ...ride,
      driverId: driver.id,
      status: "DRIVER_ASSIGNED",
      updatedAt:
        new Date().toISOString(),
    };

    rides.set(
      updatedRide.id,
      updatedRide,
    );

    return {
      ride: updatedRide,
      driver,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                              DRIVER ARRIVAL                                */
/* -------------------------------------------------------------------------- */

app.post(
  "/rides/:rideId/driver-arriving",
  async (request, reply) => {
    const { rideId } =
      request.params as {
        rideId: string;
      };

    const ride = rides.get(rideId);

    if (!ride) {
      return reply.status(404).send({
        error: "RIDE_NOT_FOUND",
        message: "Ride was not found.",
      });
    }

    if (
      ride.status !== "DRIVER_ASSIGNED"
    ) {
      return reply.status(409).send({
        error: "INVALID_RIDE_STATUS",
        message:
          "Driver arrival can only start after driver assignment.",
      });
    }

    const updatedRide =
      updateRideStatus(
        ride,
        "DRIVER_ARRIVING",
      );

    return {
      ride: updatedRide,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                              START RIDE                                    */
/* -------------------------------------------------------------------------- */

app.post(
  "/rides/:rideId/start",
  async (request, reply) => {
    const { rideId } =
      request.params as {
        rideId: string;
      };

    const ride = rides.get(rideId);

    if (!ride) {
      return reply.status(404).send({
        error: "RIDE_NOT_FOUND",
        message: "Ride was not found.",
      });
    }

    if (
      ride.status !== "DRIVER_ARRIVING" &&
      ride.status !== "DRIVER_ASSIGNED"
    ) {
      return reply.status(409).send({
        error: "INVALID_RIDE_STATUS",
        message:
          "Ride cannot be started from its current status.",
      });
    }

    const updatedRide =
      updateRideStatus(
        ride,
        "RIDE_STARTED",
      );

    return {
      ride: updatedRide,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                              COMPLETE RIDE                                 */
/* -------------------------------------------------------------------------- */

app.post(
  "/rides/:rideId/complete",
  async (request, reply) => {
    const { rideId } =
      request.params as {
        rideId: string;
      };

    const body =
      request.body as {
        finalFare?: number;
      };

    const ride = rides.get(rideId);

    if (!ride) {
      return reply.status(404).send({
        error: "RIDE_NOT_FOUND",
        message: "Ride was not found.",
      });
    }

    if (
      ride.status !== "RIDE_STARTED"
    ) {
      return reply.status(409).send({
        error: "INVALID_RIDE_STATUS",
        message:
          "Only started rides can be completed.",
      });
    }

    const finalFare =
      body.finalFare ??
      ride.estimatedFare;

    const updatedRide: Ride = {
      ...ride,

      status: "RIDE_COMPLETED",

      finalFare,

      earnings:
        calculateEarnings(
          finalFare,
          ride.earnings.isVibePlus,
        ),

      updatedAt:
        new Date().toISOString(),
    };

    rides.set(
      updatedRide.id,
      updatedRide,
    );

    if (updatedRide.driverId) {
      const driver =
        drivers.get(
          updatedRide.driverId,
        );

      if (driver) {
        drivers.set(driver.id, {
          ...driver,
          isAvailable: true,
        });
      }
    }

    return {
      ride: updatedRide,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                                GET RIDE                                    */
/* -------------------------------------------------------------------------- */

app.get(
  "/rides/:rideId",
  async (request, reply) => {
    const { rideId } =
      request.params as {
        rideId: string;
      };

    const ride = rides.get(rideId);

    if (!ride) {
      return reply.status(404).send({
        error: "RIDE_NOT_FOUND",
        message: "Ride was not found.",
      });
    }

    return {
      ride,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                              RIDE HISTORY                                  */
/* -------------------------------------------------------------------------- */

app.get(
  "/riders/:riderId/rides",
  async (request, reply) => {
    const { riderId } =
      request.params as {
        riderId: string;
      };

    const rider = riders.get(riderId);

    if (!rider) {
      return reply.status(404).send({
        error: "RIDER_NOT_FOUND",
        message: "Rider was not found.",
      });
    }

    const riderRides =
      Array.from(rides.values())
        .filter(
          (ride) =>
            ride.riderId === riderId,
        )
        .sort(
          (a, b) =>
            new Date(
              b.createdAt,
            ).getTime() -
            new Date(
              a.createdAt,
            ).getTime(),
        );

    return {
      rides: riderRides,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                                  SERVER                                    */
/* -------------------------------------------------------------------------- */

const port = Number(
  process.env.PORT ?? 4000,
);

const host =
  process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({
    port,
    host,
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}