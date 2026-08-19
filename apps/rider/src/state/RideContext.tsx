import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  }, [completedRides, historyLoaded]);

  const startRide = () => {
    clearMatchingTimer();

    setRideStatus("finding");
    setEtaMinutes(null);
    setRideMinutes(0);
    setCurrentCompletedRideId(null);

    clearDriver();

    matchingTimer.current = setTimeout(() => {
      setDriverName("Arjun");
      setDriverRating(4.9);
      setDriverVehicle("Honda Activa");
      setDriverPlate("UP 14 AB 4821");

      setRideStatus("driver_found");
      setEtaMinutes(null);

      matchingTimer.current = null;
    }, 3000);
  };

  const startDriverArrival = () => {
    clearMatchingTimer();

    setRideStatus("driver_arriving");
    setEtaMinutes(3);
    setRideMinutes(0);
  };

  const startTrip = () => {
    setEtaMinutes(null);
    setRideMinutes(0);
    setRideStatus("in_progress");
  };

  const completeRide = () => {
    clearMatchingTimer();

    setRideStatus("completed");
    setEtaMinutes(null);
  };

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

    const completedRide: CompletedRide = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      destination: {
        name: destination.name,
        address: destination.address,
      },

      rideType: selectedRide.type,
      fare: selectedRide.price,
      eta: selectedRide.eta,

      driverName,
      driverRating,
      driverVehicle,
      driverPlate,

      durationSeconds: rideMinutes,
      completedAt: new Date().toISOString(),

      riderRating: null,
    };

    setCurrentCompletedRideId(
      completedRide.id,
    );

    setCompletedRides((current) => [
      completedRide,
      ...current,
    ]);
  };

  const rateCurrentRide = (
    rating: RiderRating,
  ) => {
    if (!currentCompletedRideId) {
      return;
    }

    setCompletedRides((current) =>
      current.map((ride) =>
        ride.id === currentCompletedRideId
          ? {
              ...ride,
              riderRating: rating,
            }
          : ride,
      ),
    );
  };

  useEffect(() => {
    if (
      rideStatus !== "driver_arriving" ||
      etaMinutes === null
    ) {
      return;
    }

    if (etaMinutes <= 0) {
      setRideStatus("driver_arrived");
      return;
    }

    const timer = setTimeout(() => {
      setEtaMinutes((current) => {
        if (current === null) {
          return null;
        }

        return Math.max(0, current - 1);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [rideStatus, etaMinutes]);

  useEffect(() => {
    if (rideStatus !== "in_progress") {
      return;
    }

    const timer = setInterval(() => {
      setRideMinutes(
        (current) => current + 1,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [rideStatus]);

  const resetRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");
    setEtaMinutes(null);
    setRideMinutes(0);

    setDestination(null);
    setSelectedRide(null);

    setCurrentCompletedRideId(null);

    clearDriver();
  };

  const cancelRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");
    setEtaMinutes(null);
    setRideMinutes(0);

    setDestination(null);
    setSelectedRide(null);

    setCurrentCompletedRideId(null);

    clearDriver();
  };

  const value = useMemo<RideContextValue>(
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
    ],
  );

  return (
    <RideContext.Provider value={value}>
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const context = useContext(RideContext);

  if (!context) {
    throw new Error(
      "useRide must be used inside RideProvider",
    );
  }

  return context;
}