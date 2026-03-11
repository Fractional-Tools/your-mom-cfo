import { useState, useEffect, useCallback } from "react";

export interface AppSettings {
  name: string;
  jobTitle: string;
  concurrentClients: number;
  revenueGoal: number;
  vacationWeeks: number;
  conferences: number;
  yearsFractional: number;
  targetBillRate: number;
}

const STORAGE_KEY = "ft-settings";

const DEFAULTS: AppSettings = {
  name: "Alex Reyes",
  jobTitle: "Fractional Chief Product Officer",
  concurrentClients: 3,
  revenueGoal: 370000,
  vacationWeeks: 4,
  conferences: 3,
  yearsFractional: 2,
  targetBillRate: 200,
};

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULTS;
}

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setSettingsState(loadSettings());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, setSettings };
}
