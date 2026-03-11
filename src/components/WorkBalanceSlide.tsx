import { motion } from "framer-motion";
import DeepDive from "./DeepDive";
import UpgradeNudge from "./UpgradeNudge";
import FavoriteButton from "./FavoriteButton";
import type { StoryTone } from "@/types/tone";

interface WorkBalanceSlideProps {
  offHoursPct: number;
  weekendHours: number;
  eveningHours: number;
  totalHoursThisWeek: number;
  isPaid?: boolean;
  tone?: StoryTone;
}

export default function WorkBalanceSlide({
  offHoursPct,
  weekendHours,
  eveningHours,
  totalHoursThisWeek,
  isPaid = false,
  tone = "balanced",
}: WorkBalanceSlideProps) {
  const coreHours = totalHoursThisWeek - weekendHours - eveningHours;

  const getMomTake = () => {
    if (tone === "wins") {
      if (offHoursPct < 20) return "Great boundaries. You're protecting your time.";
      return `${coreHours}h in core hours — that's your foundation. It's solid.`;
    }
    if (tone === "issues") {
      if (offHoursPct >= 25) return `${weekendHours + eveningHours}h outside core hours. That's not scalable.`;
      return "Watch evenings. Small creep becomes big burnout.";
    }
    if (offHoursPct >= 40)
      return "Honey, this isn't sustainable. You're building a job, not a business.";
    if (offHoursPct >= 25)
      return "You're leaking into your off-hours. Let's protect your weekends.";
    if (offHoursPct >= 15)
      return "A little spillover is normal. Just watch the trend.";
    return "You're keeping good boundaries. That's how you last.";
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
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-6"
          >
            This Month · Work-Life Balance
          </motion.p>

          {/* Headline number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {offHoursPct}
            </span>
            <span className="font-display text-3xl md:text-4xl text-muted-foreground ml-1">
              %
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            of your hours are outside 9–5
          </motion.p>

          {/* Breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-8"
          >
            {/* Stacked bar */}
            <div className="h-3 bg-background rounded-full overflow-hidden flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(coreHours / totalHoursThisWeek) * 100}%` }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-ahead"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(eveningHours / totalHoursThisWeek) * 100}%` }}
                transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                className="h-full"
                style={{ backgroundColor: "hsl(36 70% 60%)" }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(weekendHours / totalHoursThisWeek) * 100}%` }}
                transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-behind"
              />
            </div>

            {/* Legend */}
            <div className="flex gap-5 mt-3 text-xs font-body text-neutral-detail">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ahead inline-block" />
                Core {coreHours}h
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "hsl(36 70% 60%)" }} />
                Evenings {eveningHours}h
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-behind inline-block" />
                Weekends {weekendHours}h
              </span>
            </div>
          </motion.div>

          {/* Mom's take */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>

          {!isPaid && (
            <UpgradeNudge hint="See which clients are pushing you into off-hours." />
          )}

          {isPaid && (
            <DeepDive
              details={[
                `${eveningHours} evening hours and ${weekendHours} weekend hours this period`,
                `${totalHoursThisWeek}h total — ${totalHoursThisWeek > 40 ? `${totalHoursThisWeek - 40}h over a standard week` : "within a standard week"}`,
                `Off-hours work has been ${offHoursPct > 20 ? "trending up" : "steady"} over 3 months`,
              ]}
              recommendation={offHoursPct > 25
                ? "Block your calendar after 6pm. Move recurring client work into core hours — even if it means a harder conversation."
                : "You're managing boundaries well. Keep your weekend blocks protected."}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
