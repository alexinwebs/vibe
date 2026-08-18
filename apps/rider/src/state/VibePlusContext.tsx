import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type VibePlusContextValue = {
  isVibePlusActive: boolean;
  isLoading: boolean;
  activateVibePlus: () => Promise<void>;
  deactivateVibePlus: () => Promise<void>;
};

const VibePlusContext =
  createContext<VibePlusContextValue | null>(null);

export function VibePlusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVibePlusActive, setIsVibePlusActive] =
    useState(false);

  const [isLoading] = useState(false);

  const activateVibePlus = async () => {
    setIsVibePlusActive(true);
  };

  const deactivateVibePlus = async () => {
    setIsVibePlusActive(false);
  };

  const value = useMemo(
    () => ({
      isVibePlusActive,
      isLoading,
      activateVibePlus,
      deactivateVibePlus,
    }),
    [isVibePlusActive, isLoading],
  );

  return (
    <VibePlusContext.Provider value={value}>
      {children}
    </VibePlusContext.Provider>
  );
}

export function useVibePlus() {
  const context = useContext(VibePlusContext);

  if (!context) {
    throw new Error(
      "useVibePlus must be used inside VibePlusProvider",
    );
  }

  return context;
}