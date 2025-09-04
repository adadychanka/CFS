"use client";

import { useEffect, useState } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Load after mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to read sessionStorage.", err);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  // Sync sessionStorage when value changes
  useEffect(() => {
    if (!hydrated) return; // avoid overwriting before we read
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to write sessionStorage", err);
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
