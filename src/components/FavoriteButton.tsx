import { Heart } from "lucide-react";
import { usePriorities } from "@/contexts/PrioritiesContext";
import type { MetricId } from "@/types/metrics";

interface FavoriteButtonProps {
  metricId: MetricId;
}

export default function FavoriteButton({ metricId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, favorites } = usePriorities();
  const active = isFavorite(metricId);
  const atLimit = favorites.length >= 3 && !active;

  return (
    <button
      onClick={() => toggleFavorite(metricId)}
      disabled={atLimit}
      className={`transition-all ${
        active
          ? "text-behind scale-110"
          : atLimit
            ? "text-muted-foreground/20 cursor-not-allowed"
            : "text-muted-foreground/40 hover:text-behind/60"
      }`}
      title={atLimit ? "You can only pick 3 priorities" : active ? "Remove priority" : "Mark as priority"}
    >
      <Heart className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
    </button>
  );
}
