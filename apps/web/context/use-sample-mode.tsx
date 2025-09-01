"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type SampleModeContextValue = {
  isSampleMode: boolean;
  toggleSampleMode: () => void;
  setSampleMode: (newValue: boolean) => void;
};

const SampleModeContext = createContext<SampleModeContextValue | null>(null);

export const SampleModeProvider = ({ children }: { children: ReactNode }) => {
  const [isSampleMode, setIsSampleMode] = useState(false);

  const setSampleMode = useCallback(
    (newValue: boolean) => setIsSampleMode(newValue),
    [],
  );

  const toggleSampleMode = useCallback(
    () => setIsSampleMode((prev) => !prev),
    [],
  );

  const contextValue = {
    isSampleMode,
    toggleSampleMode,
    setSampleMode,
  };

  return (
    <SampleModeContext.Provider value={contextValue}>
      {children}
    </SampleModeContext.Provider>
  );
};

export const useSampleMode = () => {
  const ctx = useContext(SampleModeContext);
  if (!ctx) {
    throw new Error("useSampleMode must be used within SampleModeProvider");
  }
  return ctx;
};
