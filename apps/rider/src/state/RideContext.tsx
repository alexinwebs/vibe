import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  assignDriver as apiAssignDriver,
  completeTrip as apiCompleteTrip,
  createRide as apiCreateRide,
  mapApiStatusToLocal,
  mapRideTypeToApi,
  startDriverArrival as apiStartDriverArrival,
  startTrip as apiStartTrip,
} from "../api/vibeApi";

export type RideStatus =
  | "idle"
  | "finding"
  | "driver_found"
  | "driver_arriving"
  | "driver_arrived"
  | "in_progress"
  | "completed";

export type SelectedRide = {
  type: "VIBE Go" | "VIBE Comfort" | "VIBE XL";
  price: number;
  eta: number;
};

export type Destination = {
  name: string;
  address?: string;
};

export type RiderRating = 1 | 2 | 3 | 4 | 5;

export type CompletedRide = {
  id: string;
  destination: Destination;
  rideType: SelectedRide["type"];
  fare: number;
  eta: number;

  driverName: string;
  driverRating: number;
  driverVehicle: string;
  driverPlate: string;

  durationSeconds: number;
  completedAt: string;

  riderRating: RiderRating | null;
};

type RideContextValue = {
  rideStatus: RideStatus;

  destination: Destination | null;
  selectedRide: SelectedRide | null;

  etaMinutes: number | null;
  rideMinutes: number;

  driverName: string | null;
  driverRating: number | null;
  driverVehicle: string | null;
  driverPlate: string | null;

  currentCompletedRideId: string | null;
  completedRides: CompletedRide[];

  backendRideId: string | null;
  backendFinalFare: number | null;

  setDestination: (
    destination: Destination,
  ) => void;

  setSelectedRide: (
    ride: SelectedRide,
  ) => void;

  startRide: () => void;
  startDriverArrival: () => void;
  startTrip: () => void;
  completeRide: () => void;

  saveCompletedRide: () => void;

  rateCurrentRide: (
    rating: RiderRating,
  ) => void;

  resetRide: () => void;
  cancelRide: () => void;
};

const RIDE_HISTORY_STORAGE_KEY =
  "@vibe/completed-rides";

const DEMO_RIDER_ID =
  "rider-demo-001";

const RideContext =
  createContext<RideContextValue | null>(null);

export function RideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rideStatus, setRideStatus] =
    useState<RideStatus>("idle");

  const [destination, setDestination] =
    useState<Destination | null>(null);

  const [selectedRide, setSelectedRide] =
    useState<SelectedRide | null>(null);

  const [etaMinutes, setEtaMinutes] =
    useState<number | null>(null);

  const [rideMinutes, setRideMinutes] =
    useState(0);

  const [driverName, setDriverName] =
    useState<string | null>(null);

  const [driverRating, setDriverRating] =
    useState<number | null>(null);

  const [driverVehicle, setDriverVehicle] =
    useState<string | null>(null);

  const [driverPlate, setDriverPlate] =
    useState<string | null>(null);

  const [backendRideId, setBackendRideId] =
    useState<string | null>(null);

  const [backendFinalFare, setBackendFinalFare] =
    useState<number | null>(null);

  const [
    currentCompletedRideId,
    setCurrentCompletedRideId,
  ] = useState<string | null>(null);

  const [completedRides, setCompletedRides] =
    useState<CompletedRide[]>([]);

  const [historyLoaded, setHistoryLoaded] =
    useState(false);

  const matchingTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const clearMatchingTimer = () => {
    if (matchingTimer.current) {
      clearTimeout(matchingTimer.current);
      matchingTimer.current = null;
    }
  };

  const clearDriver = () => {
    setDriverName(null);
    setDriverRating(null);
    setDriverVehicle(null);
    setDriverPlate(null);
  };

  /*
   * --------------------------------------------------
   * LOAD RIDE HISTORY
   * --------------------------------------------------
   */

  useEffect(() => {
    let mounted = true;

    const loadRideHistory = async () => {
      try {
        const storedHistory =
          await AsyncStorage.getItem(
            RIDE_HISTORY_STORAGE_KEY,
          );

        if (!storedHistory) {
          if (mounted) {
            setHistoryLoaded(true);
          }

          return;
        }

        const parsedHistory =
          JSON.parse(storedHistory);

        if (
          Array.isArray(parsedHistory) &&
          mounted
        ) {
          const normalizedHistory =
            parsedHistory.map(
              (ride: CompletedRide) => ({
                ...ride,
                riderRating:
                  ride.riderRating ?? null,
              }),
            );

          setCompletedRides(
            normalizedHistory,
          );
        }
      } catch (error) {
        console.warn(
          "Failed to load ride history:",
          error,
        );
      } finally {
        if (mounted) {
          setHistoryLoaded(true);
        }
      }
    };

    loadRideHistory();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * --------------------------------------------------
   * SAVE RIDE HISTORY
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!historyLoaded) {
      return;
    }

    const persistRideHistory = async () => {
      try {
        await AsyncStorage.setItem(
          RIDE_HISTORY_STORAGE_KEY,
          JSON.stringify(completedRides),
        );
      } catch (error) {
        console.warn(
          "Failed to save ride history:",
          error,
        );
      }
    };

    persistRideHistory();
  }, [
    completedRides,
    historyLoaded,
  ]);

  /*
   * --------------------------------------------------
   * CREATE RIDE
   * --------------------------------------------------
   */

  const startRide = () => {
    clearMatchingTimer();

    if (!destination) {
      console.warn(
        "Cannot create ride without destination.",
      );

      return;
    }

    if (!selectedRide) {
      console.warn(
        "Cannot create ride without selected ride.",
      );

      return;
    }

    const pickupAddress =
      "Current location";

    const destinationAddress =
      destination.address ??
      destination.name;

    setRideStatus("finding");
    setEtaMinutes(null);
    setRideMinutes(0);

    setBackendRideId(null);
    setBackendFinalFare(null);
    setCurrentCompletedRideId(null);

    clearDriver();

    const createBackendRide =
      async () => {
        try {
          const ride =
            await apiCreateRide({
              riderId: DEMO_RIDER_ID,

              rideType:
                mapRideTypeToApi(
                  selectedRide.type,
                ),

              pickupAddress,

              destinationAddress,
            });

          setBackendRideId(ride.id);

          setRideStatus(
            mapApiStatusToLocal(
              ride.status,
            ),
          );

          /*
           * The backend is now searching.
           *
           * For the current prototype we automatically
           * assign the demo driver after a short delay.
           *
           * This is intentionally still simulated,
           * but the actual ride state transition happens
           * through the backend API.
           */

          matchingTimer.current =
            setTimeout(
              async () => {
                try {
                  const result =
                    await apiAssignDriver(
                      ride.id,
                    );

                  setDriverName(
                    result.driver.name,
                  );

                  /*
                   * The backend Driver type currently
                   * doesn't expose a rating, so retain
                   * the existing prototype rating.
                   */

                  setDriverRating(4.9);

                  setDriverVehicle(
                    result.driver.name ===
                    "Arjun"
                      ? "Honda Activa"
                      : "Vehicle",
                  );

                  setDriverPlate(
                    "UP 14 AB 4821",
                  );

                  setRideStatus(
                    mapApiStatusToLocal(
                      result.ride.status,
                    ),
                  );

                  setEtaMinutes(null);

                  matchingTimer.current =
                    null;
                } catch (error) {
                  console.warn(
                    "Failed to assign driver:",
                    error,
                  );
                }
              },
              3000,
            );
        } catch (error) {
          console.warn(
            "Failed to create ride:",
            error,
          );

          setRideStatus("idle");
          setBackendRideId(null);
        }
      };

    createBackendRide();
  };

  /*
   * --------------------------------------------------
   * DRIVER ARRIVING
   * --------------------------------------------------
   */

  const startDriverArrival = () => {
    clearMatchingTimer();

    if (!backendRideId) {
      console.warn(
        "Cannot start driver arrival without backend ride ID.",
      );

      return;
    }

    const startBackendArrival =
      async () => {
        try {
          const ride =
            await apiStartDriverArrival(
              backendRideId,
            );

          setRideStatus(
            mapApiStatusToLocal(
              ride.status,
            ),
          );

          setEtaMinutes(3);
          setRideMinutes(0);
        } catch (error) {
          console.warn(
            "Failed to start driver arrival:",
            error,
          );
        }
      };

    startBackendArrival();
  };

  /*
   * --------------------------------------------------
   * START TRIP
   * --------------------------------------------------
   */

  const startTrip = () => {
    clearMatchingTimer();

    if (!backendRideId) {
      console.warn(
        "Cannot start trip without backend ride ID.",
      );

      return;
    }

    const startBackendTrip =
      async () => {
        try {
          const ride =
            await apiStartTrip(
              backendRideId,
            );

          setEtaMinutes(null);
          setRideMinutes(0);

          setRideStatus(
            mapApiStatusToLocal(
              ride.status,
            ),
          );
        } catch (error) {
          console.warn(
            "Failed to start trip:",
            error,
          );
        }
      };

    startBackendTrip();
  };

  /*
   * --------------------------------------------------
   * COMPLETE RIDE
   * --------------------------------------------------
   */

  const completeRide = () => {
    clearMatchingTimer();

    if (!backendRideId) {
      console.warn(
        "Cannot complete ride without backend ride ID.",
      );

      return;
    }

    const finalFare =
      selectedRide?.price ?? 0;

    const completeBackendTrip =
      async () => {
        try {
          const ride =
            await apiCompleteTrip(
              backendRideId,
              finalFare,
            );

          setBackendFinalFare(
            ride.finalFare,
          );

          /*
           * This changes the state from
           * "in_progress" to "completed".
           *
           * The ride timer effect below therefore
           * cleans itself up immediately.
           */

          setRideStatus(
            mapApiStatusToLocal(
              ride.status,
            ),
          );

          setEtaMinutes(null);
        } catch (error) {
          console.warn(
            "Failed to complete ride:",
            error,
          );
        }
      };

    completeBackendTrip();
  };

  /*
   * --------------------------------------------------
   * SAVE COMPLETED RIDE LOCALLY
   * --------------------------------------------------
   */

  const saveCompletedRide = () => {
    if (
      !destination ||
      !selectedRide ||
      !driverName ||
      driverRating === null ||
      !driverVehicle ||
      !driverPlate
    ) {
      return;
    }

    if (currentCompletedRideId) {
      return;
    }

    const completedFare =
      backendFinalFare ??
      selectedRide.price;

    const completedRide: CompletedRide = {
      id:
        backendRideId ??
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      destination: {
        name: destination.name,
        address: destination.address,
      },

      rideType:
        selectedRide.type,

      fare: completedFare,

      eta: selectedRide.eta,

      driverName,

      driverRating,

      driverVehicle,

      driverPlate,

      durationSeconds:
        rideMinutes,

      completedAt:
        new Date().toISOString(),

      riderRating: null,
    };

    setCurrentCompletedRideId(
      completedRide.id,
    );

    setCompletedRides(
      (current) => [
        completedRide,
        ...current,
      ],
    );
  };

  /*
   * --------------------------------------------------
   * RATE CURRENT RIDE
   * --------------------------------------------------
   */

  const rateCurrentRide = (
    rating: RiderRating,
  ) => {
    if (!currentCompletedRideId) {
      return;
    }

    setCompletedRides(
      (current) =>
        current.map((ride) =>
          ride.id ===
          currentCompletedRideId
            ? {
                ...ride,
                riderRating:
                  rating,
              }
            : ride,
        ),
    );
  };

  /*
   * --------------------------------------------------
   * DRIVER ARRIVAL COUNTDOWN
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      rideStatus !==
        "driver_arriving" ||
      etaMinutes === null
    ) {
      return;
    }

    if (etaMinutes <= 0) {
      setRideStatus(
        "driver_arrived",
      );

      return;
    }

    const timer =
      setTimeout(() => {
        setEtaMinutes(
          (current) => {
            if (
              current === null
            ) {
              return null;
            }

            return Math.max(
              0,
              current - 1,
            );
          },
        );
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, [
    rideStatus,
    etaMinutes,
  ]);

  /*
   * --------------------------------------------------
   * RIDE TIMER
   * --------------------------------------------------
   */

  useEffect(() => {
    if (
      rideStatus !==
      "in_progress"
    ) {
      return;
    }

    const timer =
      setInterval(() => {
        setRideMinutes(
          (current) =>
            current + 1,
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [rideStatus]);

  /*
   * --------------------------------------------------
   * RESET
   * --------------------------------------------------
   */

  const resetRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");

    setEtaMinutes(null);

    setRideMinutes(0);

    setDestination(null);

    setSelectedRide(null);

    setBackendRideId(null);

    setBackendFinalFare(null);

    setCurrentCompletedRideId(
      null,
    );

    clearDriver();
  };

  /*
   * --------------------------------------------------
   * CANCEL
   * --------------------------------------------------
   */

  const cancelRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");

    setEtaMinutes(null);

    setRideMinutes(0);

    setDestination(null);

    setSelectedRide(null);

    setBackendRideId(null);

    setBackendFinalFare(null);

    setCurrentCompletedRideId(
      null,
    );

    clearDriver();
  };

  /*
   * --------------------------------------------------
   * CONTEXT VALUE
   * --------------------------------------------------
   */

  const value =
    useMemo<RideContextValue>(
      () => ({
        rideStatus,

        destination,

        selectedRide,

        etaMinutes,

        rideMinutes,

        driverName,

        driverRating,

        driverVehicle,

        driverPlate,

        currentCompletedRideId,

        completedRides,

        backendRideId,

        backendFinalFare,

        setDestination,

        setSelectedRide,

        startRide,

        startDriverArrival,

        startTrip,

        completeRide,

        saveCompletedRide,

        rateCurrentRide,

        resetRide,

        cancelRide,
      }),
      [
        rideStatus,
        destination,
        selectedRide,
        etaMinutes,
        rideMinutes,
        driverName,
        driverRating,
        driverVehicle,
        driverPlate,
        currentCompletedRideId,
        completedRides,
        backendRideId,
        backendFinalFare,
      ],
    );

  return (
    <RideContext.Provider
      value={value}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const context =
    useContext(RideContext);

  if (!context) {
    throw new Error(
      "useRide must be used inside RideProvider",
    );
  }

  return context;
}