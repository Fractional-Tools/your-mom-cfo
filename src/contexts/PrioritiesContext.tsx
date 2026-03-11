import { createContext, useContext, useState, ReactNode } from "react";
import type { MetricId } from "@/types/metrics";

interface PrioritiesContextType {
  favorites: MetricId[];
  toggleFavorite: (id: MetricId) => void;
  isFavorite: (id: MetricId) => boolean;
  rankedPriorities: MetricId[];
  setRankedPriorities: (ids: MetricId[]) => void;
}

const PrioritiesContext = createContext<PrioritiesContextType | null>(null);

export function PrioritiesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<MetricId[]>([]);
  const [rankedPriorities, setRankedPriorities] = useState<MetricId[]>([
    "revenue", "utilization", "switching", "balance", "client-value", "client-health"
  ]);

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
