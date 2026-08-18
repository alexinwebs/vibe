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

type RideContextValue = {
  rideStatus: RideStatus;

  etaMinutes: number | null;

  driverName: string | null;
  driverRating: number | null;
  driverVehicle: string | null;
  driverPlate: string | null;

  startRide: () => void;
  startDriverArrival: () => void;
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

  const [etaMinutes, setEtaMinutes] =
    useState<number | null>(null);

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

  const startRide = () => {
    clearMatchingTimer();

    setRideStatus("finding");
    setEtaMinutes(null);
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

  const resetRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");
    setEtaMinutes(null);

    clearDriver();
  };

  const cancelRide = () => {
    clearMatchingTimer();

    setRideStatus("idle");
    setEtaMinutes(null);

    clearDriver();
  };

  const value = useMemo<RideContextValue>(
    () => ({
      rideStatus,
      etaMinutes,

      driverName,
      driverRating,
      driverVehicle,
      driverPlate,

      startRide,
      startDriverArrival,
      resetRide,
      cancelRide,
    }),
    [
      rideStatus,
      etaMinutes,
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