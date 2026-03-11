import { motion } from "framer-motion";
import DeepDive from "./DeepDive";

interface UtilizationSlideProps {
  currentRate: number;
  priorRate: number;
  period: "week" | "month" | "quarter";
  billableHours: number;
  availableHours: number;
  isPaid?: boolean;
}

export default function UtilizationSlide({
  currentRate,
  priorRate,
  period,
  billableHours,
  availableHours,
}: UtilizationSlideProps) {
  const delta = currentRate - priorRate;
  const isUp = delta >= 0;

  const periodLabel =
    period === "week" ? "This Week" : period === "month" ? "This Month" : "This Quarter";
  const priorLabel =
    period === "week" ? "last week" : period === "month" ? "last month" : "last quarter";

  // Mom's interpretation
  const getMomTake = () => {
    if (currentRate >= 80) return "You're running hot. Make sure you're leaving room to breathe.";
    if (currentRate >= 65) return "This is a healthy pace. You've got margin and momentum.";
    if (currentRate >= 50) return "There's room to fill. A good time to plant seeds.";
    return "Light schedule. Let's talk about what's coming next.";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 font-body">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="bg-warm-glow rounded-2xl p-10 md:p-14 shadow-sm">
          {/* Period label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-6"
          >
            {periodLabel} · Utilization
          </motion.p>

          {/* The big number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {currentRate}
            </span>
            <span className="font-display text-3xl md:text-4xl text-muted-foreground ml-1">
              %
            </span>
          </motion.div>

          {/* Supporting number */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground font-body mb-8"
          >
            <span className={isUp ? "text-ahead font-semibold" : "text-behind font-semibold"}>
              {isUp ? "↑" : "↓"} {Math.abs(delta)}%
            </span>{" "}
            vs {priorLabel}
            <span className="text-neutral-detail ml-2 text-base">
              · {billableHours}h of {availableHours}h billed
            </span>
          </motion.p>

          {/* Visual bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-6"
          >
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentRate}%` }}
                transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    currentRate >= 80
                      ? "hsl(var(--behind))"
                      : currentRate >= 50
                        ? "hsl(var(--ahead))"
                        : "hsl(var(--neutral-detail))",
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-detail font-body">
              <span>0%</span>
              <span>100%</span>
            </div>
          </motion.div>

          {/* Mom's take */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
