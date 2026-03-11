import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GripVertical, Heart } from "lucide-react";
import { usePriorities } from "@/contexts/PrioritiesContext";
import { ALL_METRICS, type MetricId } from "@/types/metrics";

export default function Priorities() {
  const { rankedPriorities, setRankedPriorities, favorites, toggleFavorite } = usePriorities();
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  const items = rankedPriorities.map((id) => ALL_METRICS.find((m) => m.id === id)!);

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    dragOverIdx.current = idx;
  };

  const handleDrop = () => {
    if (draggedIdx === null || dragOverIdx.current === null) return;
    const newOrder = [...rankedPriorities];
    const [moved] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(dragOverIdx.current, 0, moved);
    setRankedPriorities(newOrder);
    setDraggedIdx(null);
    dragOverIdx.current = null;
  };

  const isFav = (id: MetricId) => favorites.includes(id);
  const atLimit = favorites.length >= 3;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <Link
            to="/slides"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to slides
          </Link>
          <Link
            to="/how-it-works"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </Link>
        </div>

        <h1 className="font-display text-2xl text-foreground mb-2">Your Priorities</h1>
        <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
          Drag to rank what matters most. Heart up to 3 — those shape your story.
        </p>
        <p className="text-xs text-muted-foreground/60 mb-8">
          {favorites.length}/3 priorities selected
        </p>

        {/* Draggable list */}
        <div className="space-y-2">
          {items.map((metric, idx) => (
            <motion.div
              key={metric.id}
              layout
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, idx)}
              onDrop={handleDrop}
              className={`flex items-center gap-3 bg-warm-glow rounded-xl px-4 py-4 cursor-grab active:cursor-grabbing transition-all ${
                draggedIdx === idx ? "opacity-50 scale-95" : ""
              }`}
            >
              {/* Rank number */}
              <span className="text-sm font-display text-muted-foreground/50 w-5 text-center">
                {idx + 1}
              </span>

              {/* Drag handle */}
              <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">
                  {metric.label}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {metric.description}
                </p>
              </div>

              {/* Heart */}
              <button
                onClick={() => toggleFavorite(metric.id)}
                disabled={atLimit && !isFav(metric.id)}
                className={`transition-all shrink-0 ${
                  isFav(metric.id)
                    ? "text-behind scale-110"
                    : atLimit
                      ? "text-muted-foreground/15 cursor-not-allowed"
                      : "text-muted-foreground/30 hover:text-behind/60"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav(metric.id) ? "fill-current" : ""}`} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Explanation */}
        <div className="mt-8 bg-warm-glow/50 rounded-xl p-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your top priorities get more attention in your slides. The system learns what you care about
            and builds a narrative around it. You can change these anytime — your story adapts.
          </p>
        </div>
      </div>
    </div>
  );
}
