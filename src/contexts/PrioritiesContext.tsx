import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { MetricId } from "@/types/metrics";

const DEFAULT_RANKED: MetricId[] = [
  "revenue", "utilization", "switching", "balance", "client-value", "client-health", "vacation", "growth", "engagement"
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

interface PrioritiesContextType {
  favorites: MetricId[];
  toggleFavorite: (id: MetricId) => void;
  isFavorite: (id: MetricId) => boolean;
  rankedPriorities: MetricId[];
  setRankedPriorities: (ids: MetricId[]) => void;
}

const PrioritiesContext = createContext<PrioritiesContextType | null>(null);

export function PrioritiesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<MetricId[]>(() => loadFromStorage("ft-favorites", []));
  const [rankedPriorities, setRankedPriorities] = useState<MetricId[]>(() => loadFromStorage("ft-ranked", DEFAULT_RANKED));

  useEffect(() => { localStorage.setItem("ft-favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("ft-ranked", JSON.stringify(rankedPriorities)); }, [rankedPriorities]);

  const toggleFavorite = (id: MetricId) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((f) => f !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };

  const isFavorite = (id: MetricId) => favorites.includes(id);

  return (
    <PrioritiesContext.Provider value={{ favorites, toggleFavorite, isFavorite, rankedPriorities, setRankedPriorities }}>
      {children}
    </PrioritiesContext.Provider>
  );
}

export function usePriorities() {
  const ctx = useContext(PrioritiesContext);
  if (!ctx) throw new Error("usePriorities must be used within PrioritiesProvider");
  return ctx;
}
