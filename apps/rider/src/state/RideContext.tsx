import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type RideStatus =
  | "idle"
  | "finding"
  | "driver_found"
  | "driver_arriving"
  | "in_progress"
  | "completed";

type RideContextValue = {
  rideStatus: RideStatus;

  driverName: string | null;
  driverRating: number | null;
  driverVehicle: string | null;
  driverPlate: string | null;

  startRide: () => void;
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
    clearDriver();

    setRideStatus("finding");

    matchingTimer.current = setTimeout(() => {
      setDriverName("Arjun");
      setDriverRating(4.9);
      setDriverVehicle("Honda Activa");
      setDriverPlate("UP 14 AB 4821");
      setRideStatus("driver_found");

      matchingTimer.current = null;
    }, 3000);
  };

  const resetRide = () => {
    clearMatchingTimer();
    clearDriver();
    setRideStatus("idle");
  };

  const cancelRide = () => {
    clearMatchingTimer();
    clearDriver();
    setRideStatus("idle");
  };

  const value = useMemo<RideContextValue>(
    () => ({
      rideStatus,

      driverName,
      driverRating,
      driverVehicle,
      driverPlate,

      startRide,
      resetRide,
      cancelRide,
    }),
    [
      rideStatus,
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