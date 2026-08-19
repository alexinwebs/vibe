import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type RideStatus =
  | "idle"
  | "finding"
  | "driver_found"
  | "driver_arriving"
  | "driver_arrived"
  | "in_progress"
  | "completed";

export type RideType =
  | "VIBE Go"
  | "VIBE Comfort"
  | "VIBE XL";

export type Destination = {
  name: string;
  address: string;
};

export type SelectedRide = {
  type: RideType;
  price: number;
  eta: number;
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

  setDestination: (
    destination: Destination,
  ) => void;

  setSelectedRide: (
    ride: SelectedRide,
  ) => void;

  startRide: () => void;
  startDriverArrival: () => void;
  startTrip: () => void;

  resetRide: () => void;
  cancelRide: () => void;
};

const RideContext =
  createContext<RideContextValue | null>(null);

export function RideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rideStatus, setRideStatus] =
    useState<RideStatus>("idle");

  const [destination, setDestinationState] =
    useState<Destination | null>(null);

  const [selectedRide, setSelectedRideState] =
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

  const setDestination = (
    nextDestination: Destination,
  ) => {
    setDestinationState(nextDestination);
  };

  const setSelectedRide = (
    ride: SelectedRide,
  ) => {
    setSelectedRideState(ride);
  };

  const startRide = () => {
    clearMatchingTimer();

    setRideStatus("finding");
    setEtaMinutes(null);
    setRideMinutes(0);

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

    setDestinationState(null);
    setSelectedRideState(null);

    setEtaMinutes(null);
    setRideMinutes(0);

    clearDriver();
  };

  const cancelRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");

    setDestinationState(null);
    setSelectedRideState(null);

    setEtaMinutes(null);
    setRideMinutes(0);

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

      setDestination,
      setSelectedRide,

      startRide,
      startDriverArrival,
      startTrip,

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