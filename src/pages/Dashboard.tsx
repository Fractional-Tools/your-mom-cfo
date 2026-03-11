import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, GripVertical, Heart, Circle, ArrowRight, Focus, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import ftLogo from "@/assets/ft-logo.png";
import { usePriorities } from "@/contexts/PrioritiesContext";
import { ALL_METRICS, type MetricId } from "@/types/metrics";

type Tab = "metrics" | "priorities" | "actions";

// ─── Metrics Data ───
const metrics = [
  { label: "On Track", value: "+10%", sub: "ahead of $340k goal", color: "text-ahead", slide: 0 },
  { label: "Utilization", value: "68%", sub: "109h of 160h billed", color: "text-foreground", slide: 1 },
  { label: "Switch Tax", value: "6.5h", sub: "lost per week", color: "text-behind", slide: 2 },
  { label: "Off-Hours", value: "28%", sub: "outside 9–5", color: "text-behind", slide: 3 },
  { label: "Top Rate", value: "$250", sub: "/hr · Acme Corp", color: "text-ahead", slide: 4 },
  { label: "Client Health", value: "B+", sub: "avg across 3 clients", color: "text-foreground", slide: 5 },
];

// ─── Actions Data ───
interface Action {
  text: string;
  urgent: boolean;
}

const ACTIONS_BY_METRIC: Record<MetricId, Action[]> = {
  revenue: [
    { text: "Review Q3 pipeline — do you have enough leads to sustain pace?", urgent: false },
    { text: "Send follow-up invoices for any outstanding payments this week.", urgent: true },
    { text: "Block 2 hours to plan your rate increases for next quarter.", urgent: false },
  ],
  utilization: [
    { text: "Identify your 5 lowest-value hours this week and cut or delegate them.", urgent: true },
    { text: "Reach out to one past client about upcoming project work.", urgent: false },
    { text: "Set a weekly utilization check-in — 10 minutes every Friday.", urgent: false },
  ],
  switching: [
    { text: "Batch client work into dedicated days — start with your two biggest clients.", urgent: true },
    { text: "Move all internal/admin tasks to one block (Monday AM or Friday PM).", urgent: false },
    { text: "Turn off notifications during deep work blocks.", urgent: false },
  ],
  balance: [
    { text: "Block your calendar after 6pm for the next 2 weeks. No exceptions.", urgent: true },
    { text: "Move any weekend client work into Friday afternoon slots.", urgent: true },
    { text: "Set an auto-responder for emails received after hours.", urgent: false },
  ],
  "client-value": [
    { text: "Prepare a rate increase proposal for your lowest-paying client.", urgent: false },
    { text: "Track actual hours per client this month to validate your effective rates.", urgent: true },
    { text: "Identify which client you'd replace first if a better one appeared.", urgent: false },
  ],
  "client-health": [
    { text: "Have a direct conversation with your C-grade client about payment terms.", urgent: true },
    { text: "Send a check-in to your A-grade clients — reinforce the relationship.", urgent: false },
    { text: "Document what makes your best client great. Use it as a filter for new ones.", urgent: false },
  ],
  vacation: [
    { text: "Block at least one long weekend in the next 6 weeks.", urgent: true },
    { text: "Review your calendar for the rest of the year — where can you take 3+ days?", urgent: false },
    { text: "Set a recurring monthly reminder to check your time-off balance.", urgent: false },
  ],
  growth: [
    { text: "Start 2-3 conversations with potential clients this week.", urgent: true },
    { text: "Update your positioning — are you selling the right outcome?", urgent: false },
    { text: "Ask your best client for a referral. Warm intros close 3x faster.", urgent: false },
  ],
  engagement: [
    { text: "Schedule a quarterly check-in with your longest-tenured client.", urgent: false },
    { text: "Propose a longer engagement term at your next client renewal.", urgent: true },
    { text: "Identify what made your shortest engagement end — fix it for the next one.", urgent: false },
  ],
};

type MetricsView = "cards" | "list" | "focus";

// ─── Metrics Tab ───
function MetricsTab() {
  const navigate = useNavigate();
  const [view, setView] = useState<MetricsView>("cards");
  const [focusIdx, setFocusIdx] = useState(0);

  const primary = metrics[focusIdx];
  const sub1 = metrics[(focusIdx + 1) % metrics.length];
  const sub2 = metrics[(focusIdx + 2) % metrics.length];

  return (
    <div>
      {/* View toggle */}
      <div className="flex items-center gap-1 bg-warm-glow rounded-full p-1 mb-5 w-fit">
        <button
          onClick={() => setView("cards")}
          className={`p-1.5 rounded-full transition-all ${
            view === "cards" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Card view"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-1.5 rounded-full transition-all ${
            view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
          title="List view"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setView("focus")}
          className={`p-1.5 rounded-full transition-all ${
            view === "focus" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Focus view"
        >
          <Focus className="w-3.5 h-3.5" />
        </button>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => navigate(`/?slide=${m.slide}`)}
              className="bg-warm-glow rounded-2xl p-6 md:p-8 text-center cursor-pointer hover:ring-2 hover:ring-foreground/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
      ) : view === "list" ? (
        <div className="space-y-2">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              onClick={() => navigate(`/?slide=${m.slide}`)}
              className="flex items-center justify-between bg-warm-glow rounded-xl px-5 py-4 cursor-pointer hover:ring-2 hover:ring-foreground/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-body text-foreground font-medium">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.sub}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-display text-2xl font-bold ${m.color}`}>{m.value}</p>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Focus view — one hero metric + two supporting */
        <div>
          {/* Primary metric */}
          <motion.div
            key={`focus-${focusIdx}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(`/?slide=${primary.slide}`)}
            className="bg-warm-glow rounded-2xl p-10 md:p-14 text-center cursor-pointer hover:ring-2 hover:ring-foreground/10 transition-all mb-4"
          >
            <p className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-4">
              {primary.label}
            </p>
            <p className={`font-display text-6xl md:text-7xl font-bold ${primary.color} mb-3`}>
              {primary.value}
            </p>
            <p className="text-sm text-muted-foreground font-body">{primary.sub}</p>
          </motion.div>

          {/* Two sub-metrics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[sub1, sub2].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.35 }}
                onClick={() => navigate(`/?slide=${m.slide}`)}
                className="bg-warm-glow rounded-xl p-5 text-center cursor-pointer hover:ring-2 hover:ring-foreground/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-2">
                  {m.label}
                </p>
                <p className={`font-display text-2xl font-bold ${m.color}`}>{m.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Cycle through metrics */}
          <div className="flex justify-center gap-2">
            {metrics.map((_, i) => (
              <button
                key={i}
                onClick={() => setFocusIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === focusIdx ? "bg-foreground scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Priorities Tab ───
function PrioritiesTab() {
  const { rankedPriorities, setRankedPriorities, favorites, toggleFavorite } = usePriorities();
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  const items = rankedPriorities.map((id) => ALL_METRICS.find((m) => m.id === id)!);

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
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
    <div>
      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
        Drag to rank what matters most. Heart up to 3 — those shape your story.
      </p>
      <p className="text-xs text-muted-foreground/60 mb-6">
        {favorites.length}/3 priorities selected
      </p>

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
            <span className="text-sm font-display text-muted-foreground/50 w-5 text-center">
              {idx + 1}
            </span>
            <GripVertical className="w-4 h-4 text-muted-foreground/30 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground truncate">{metric.description}</p>
            </div>
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

      <div className="mt-8 bg-warm-glow/50 rounded-xl p-5">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your top priorities get more attention in your slides. The system learns what you care about
          and builds a narrative around it.
        </p>
      </div>
    </div>
  );
}

// ─── Actions Tab ───
function ActionsTab() {
  const { favorites } = usePriorities();

  const activeMetrics = favorites.length > 0
    ? favorites
    : (["revenue", "utilization", "switching"] as MetricId[]);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
        {favorites.length > 0
          ? `Based on your ${favorites.length} priorities. Do less, better.`
          : "Heart some priorities to get personalized actions. Showing defaults for now."}
      </p>

      <div className="space-y-8">
        {activeMetrics.map((metricId, groupIdx) => {
          const metric = ALL_METRICS.find((m) => m.id === metricId)!;
          const actions = ACTIONS_BY_METRIC[metricId];

          return (
            <motion.div
              key={metricId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.12, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-display text-base font-medium text-foreground">
                  {metric.label}
                </h2>
                <span className="text-xs text-muted-foreground/50">·</span>
                <span className="text-xs text-muted-foreground">{metric.description}</span>
              </div>

              <div className="space-y-2">
                {actions.map((action, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIdx * 0.12 + i * 0.08, duration: 0.35 }}
                    className="flex items-start gap-3 bg-warm-glow rounded-xl px-4 py-3.5"
                  >
                    <Circle className="w-4 h-4 text-muted-foreground/30 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-foreground leading-relaxed">
                        {action.text}
                      </p>
                    </div>
                    {action.urgent && (
                      <span className="text-xs font-body text-behind font-medium shrink-0 mt-0.5">
                        now
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 bg-warm-glow/50 rounded-xl p-5"
      >
        <p className="text-xs text-muted-foreground leading-relaxed italic font-display">
          These actions update as your numbers change. Focus on the ones marked "now" first.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Tab config ───
const tabs: { id: Tab; label: string }[] = [
  { id: "metrics", label: "Metrics" },
  { id: "priorities", label: "Priorities" },
  { id: "actions", label: "Actions" },
];

// ─── Main Dashboard ───
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("metrics");
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-2xl mx-auto">
        {/* Logo + Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={ftLogo} alt="Fractional Tools" className="h-8 w-auto shrink-0" />
            <div>
              <h1 className="font-display text-2xl text-foreground">Your Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">July 1 · Halftime</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-warm-glow rounded-full p-1 shadow-sm">
              <button
                onClick={() => setIsPaid(false)}
                className={`text-xs font-body px-3 py-1 rounded-full transition-all ${
                  !isPaid
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setIsPaid(true)}
                className={`text-xs font-body px-3 py-1 rounded-full transition-all ${
                  isPaid
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pro
              </button>
            </div>
            <Link
              to="/"
              className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              ← Slides
            </Link>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-warm-glow rounded-full p-1 mb-8 w-fit">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`text-xs px-5 py-2 rounded-full transition-all ${
                activeTab === id
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          {activeTab === "metrics" && <MetricsTab />}
          {activeTab === "priorities" && <PrioritiesTab />}
          {activeTab === "actions" && <ActionsTab />}
        </motion.div>
      </div>
    </div>
  );
}
