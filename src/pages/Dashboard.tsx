import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, Star } from "lucide-react";
import { Link } from "react-router-dom";

type ViewMode = "cards" | "list" | "highlight";

// Shared data
const metrics = [
  { label: "On Track", value: "+10%", sub: "ahead of $340k goal", color: "text-ahead" },
  { label: "Utilization", value: "68%", sub: "109h of 160h billed", color: "text-foreground" },
  { label: "Switch Tax", value: "6.5h", sub: "lost per week", color: "text-behind" },
  { label: "Off-Hours", value: "28%", sub: "outside 9–5", color: "text-behind" },
  { label: "Top Rate", value: "$250", sub: "/hr · Acme Corp", color: "text-ahead" },
  { label: "Client Health", value: "B+", sub: "avg across 3 clients", color: "text-foreground" },
];

function CardsView() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="bg-warm-glow rounded-2xl p-6 md:p-8 text-center"
        >
          <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-3">
            {m.label}
          </p>
          <p className={`font-display text-4xl md:text-5xl font-bold ${m.color}`}>
            {m.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function ListView() {
  return (
    <div className="space-y-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="bg-warm-glow rounded-xl px-6 py-5 flex items-center justify-between"
        >
          <div>
            <p className="font-body text-sm font-medium text-foreground">{m.label}</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{m.sub}</p>
          </div>
          <p className={`font-display text-3xl md:text-4xl font-bold ${m.color}`}>
            {m.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function HighlightView() {
  const hero = metrics[0];
  const subs = [metrics[1], metrics[2]];

  return (
    <div className="space-y-4">
      {/* Hero metric */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-warm-glow rounded-2xl p-10 md:p-14 text-center"
      >
        <p className="text-sm font-body text-muted-foreground uppercase tracking-wide mb-4">
          {hero.label}
        </p>
        <p className={`font-display text-7xl md:text-8xl font-bold ${hero.color} leading-none`}>
          {hero.value}
        </p>
        <p className="font-display text-lg text-foreground/70 mt-3">{hero.sub}</p>
      </motion.div>

      {/* Two sub cards */}
      <div className="grid grid-cols-2 gap-4">
        {subs.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="bg-warm-glow rounded-xl p-6 text-center"
          >
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-2">
              {m.label}
            </p>
            <p className={`font-display text-3xl md:text-4xl font-bold ${m.color}`}>
              {m.value}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">{m.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const viewOptions: { mode: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { mode: "cards", icon: LayoutGrid, label: "Cards" },
  { mode: "list", icon: List, label: "List" },
  { mode: "highlight", icon: Star, label: "Highlight" },
];

export default function Dashboard() {
  const [view, setView] = useState<ViewMode>("cards");

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl text-foreground">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">July 1 · Halftime</p>
          </div>
          <Link
            to="/"
            className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
          >
            ← Slides
          </Link>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1 bg-warm-glow rounded-full p-1 mb-8 w-fit">
          {viewOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-full transition-all ${
                view === mode
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          {view === "cards" && <CardsView />}
          {view === "list" && <ListView />}
          {view === "highlight" && <HighlightView />}
        </motion.div>
      </div>
    </div>
  );
}
