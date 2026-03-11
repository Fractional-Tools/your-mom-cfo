import { motion } from "framer-motion";
import DeepDive from "./DeepDive";
import UpgradeNudge from "./UpgradeNudge";
import FavoriteButton from "./FavoriteButton";
import type { StoryTone } from "@/types/tone";

interface VacationSlideProps {
  daysTakenThisYear: number;
  daysPlanned: number;
  targetDays: number;
  lastVacationWeeksAgo: number;
  isPaid?: boolean;
  tone?: StoryTone;
}

export default function VacationSlide({
  daysTakenThisYear,
  daysPlanned,
  targetDays,
  lastVacationWeeksAgo,
  isPaid = false,
  tone = "balanced",
}: VacationSlideProps) {
  const totalScheduled = daysTakenThisYear + daysPlanned;
  const remaining = Math.max(targetDays - totalScheduled, 0);
  const pctUsed = Math.round((daysTakenThisYear / targetDays) * 100);

  const getMomTake = () => {
    if (tone === "wins") {
      if (daysTakenThisYear >= targetDays * 0.4)
        return "You're actually taking time off. That's rare for a solo operator.";
      return `${daysPlanned} days planned ahead. That's smart.`;
    }
    if (tone === "issues") {
      if (lastVacationWeeksAgo > 12)
        return `${lastVacationWeeksAgo} weeks since your last break. That's too long.`;
      if (remaining > 10)
        return `${remaining} days unscheduled. You won't take them unless you book them.`;
      return "Rest isn't a reward. It's infrastructure.";
    }
    if (lastVacationWeeksAgo > 16)
      return "You haven't taken a real break in months. Schedule something.";
    if (remaining > 10)
      return "You have time off available. Use it before the year runs away.";
    if (daysTakenThisYear >= targetDays * 0.5)
      return "Good rhythm. You're treating rest like the business tool it is.";
    return "Time off keeps you sharp. Plan your next break.";
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
          <div className="flex items-start justify-between mb-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-muted-foreground text-sm font-body tracking-wide uppercase"
            >
              This Year · Time Off
            </motion.p>
            <FavoriteButton metricId="vacation" />
          </div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {daysTakenThisYear}
            </span>
            <span className="font-display text-2xl md:text-3xl text-muted-foreground ml-2">
              of {targetDays} days
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            taken off so far
          </motion.p>

          {/* Visual breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-6"
          >
            <div className="h-3 bg-background rounded-full overflow-hidden flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(daysTakenThisYear / targetDays) * 100}%` }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-ahead"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(daysPlanned / targetDays) * 100}%` }}
                transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-ahead/30"
              />
            </div>
            <div className="flex gap-5 mt-3 text-xs font-body text-neutral-detail">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ahead inline-block" />
                Taken {daysTakenThisYear}d
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ahead/30 inline-block" />
                Planned {daysPlanned}d
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-background border border-border inline-block" />
                Open {remaining}d
              </span>
            </div>
          </motion.div>

          {/* Last break callout */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="text-sm text-muted-foreground font-body mb-6"
          >
            Last time off:{" "}
            <span className={lastVacationWeeksAgo > 8 ? "text-behind font-medium" : "text-foreground"}>
              {lastVacationWeeksAgo} weeks ago
            </span>
          </motion.p>

          {/* Mom's take */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>

          {!isPaid && (
            <UpgradeNudge hint="See how time off correlates with your best revenue months." />
          )}

          {isPaid && (
            <DeepDive
              details={[
                `${pctUsed}% of your time-off budget used at the halfway mark`,
                `${remaining} days still unscheduled — book them or lose them`,
                lastVacationWeeksAgo > 8
                  ? "Research shows productivity drops sharply after 8 weeks without a break"
                  : "Your break cadence is healthy — keep it up",
              ]}
              recommendation={remaining > 5
                ? "Block at least one long weekend in the next 6 weeks. Even 3 days resets your capacity."
                : "You're using your time well. Make sure planned days stay protected — don't let clients erode them."}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
