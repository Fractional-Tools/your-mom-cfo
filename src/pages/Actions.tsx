import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { usePriorities } from "@/contexts/PrioritiesContext";
import { ALL_METRICS, type MetricId } from "@/types/metrics";

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

export default function Actions() {
  const { favorites } = usePriorities();

  const activeMetrics = favorites.length > 0
    ? favorites
    : (["revenue", "utilization", "switching"] as MetricId[]); // fallback if none selected

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Back to slides
          </Link>
          <Link to="/priorities" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Edit priorities
          </Link>
        </div>

        <h1 className="font-display text-2xl text-foreground mb-2">Your Actions</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {favorites.length > 0
            ? `Based on your ${favorites.length} priorities. Do less, better.`
            : "Heart some slides to get personalized actions. Showing defaults for now."}
        </p>

        {/* Action groups */}
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

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 bg-warm-glow/50 rounded-xl p-5"
        >
          <p className="text-xs text-muted-foreground leading-relaxed italic font-display">
            These actions update as your numbers change. Focus on the ones marked "now" first. You don't have to do everything — just the right things.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
