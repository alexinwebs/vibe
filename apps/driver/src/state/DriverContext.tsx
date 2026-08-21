import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export type DriverStatus =
  | "offline"
  | "online";

type DriverContextValue = {
  driverStatus: DriverStatus;

  driverId: string;
  driverName: string;

  setDriverStatus: (
    status: DriverStatus,
  ) => void;

  goOnline: () => void;
  goOffline: () => void;
};

const DriverContext =
  createContext<DriverContextValue | null>(
    null,
  );

export function DriverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [driverStatus, setDriverStatus] =
    useState<DriverStatus>("offline");

  const driverId =
    "driver-demo-001";

  const driverName =
    "Arjun";

  const goOnline = () => {
    setDriverStatus("online");
  };

  const goOffline = () => {
    setDriverStatus("offline");
  };

  const value =
    useMemo<DriverContextValue>(
      () => ({
        driverStatus,

        driverId,
        driverName,

        setDriverStatus,

        goOnline,
        goOffline,
      }),
      [driverStatus],
    );

  return (
    <DriverContext.Provider
      value={value}
    >
      {children}
    </DriverContext.Provider>
  );
}

export function useDriver() {
  const context =
    useContext(DriverContext);

  if (!context) {
    throw new Error(
      "useDriver must be used inside DriverProvider",
    );
  }

  return context;
}