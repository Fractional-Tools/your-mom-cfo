import { motion } from "framer-motion";
import DeepDive from "./DeepDive";
import UpgradeNudge from "./UpgradeNudge";
import FavoriteButton from "./FavoriteButton";
import type { StoryTone } from "@/types/tone";

interface ContextSwitchSlideProps {
  hoursLostPerWeek: number;
  avgSwitchesPerDay: number;
  activeClients: number;
  costPerHour: number;
  isPaid?: boolean;
  tone?: StoryTone;
}

export default function ContextSwitchSlide({
  hoursLostPerWeek,
  avgSwitchesPerDay,
  activeClients,
  costPerHour,
  isPaid = false,
  tone = "balanced",
}: ContextSwitchSlideProps) {
  const weeklyDollarCost = Math.round(hoursLostPerWeek * costPerHour);
  const monthlyCost = weeklyDollarCost * 4;

  const getMomTake = () => {
    if (tone === "wins") {
      if (hoursLostPerWeek < 4) return "You're batching well. Your switch cost is low.";
      return `${activeClients} clients and still productive. You're handling the juggle.`;
    }
    if (tone === "issues") {
      return `${hoursLostPerWeek}h/week gone — that's $${monthlyCost.toLocaleString()}/mo you can't bill.`;
    }
    if (hoursLostPerWeek >= 8)
      return "That's a full day gone. We need to batch your weeks better.";
    if (hoursLostPerWeek >= 5)
      return "Half a day, every week. Let's look at your client schedule.";
    if (hoursLostPerWeek >= 3)
      return "Not bad, but there's money on the table. Small tweaks help.";
    return "You're managing this well. Keep batching your days.";
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
            {activeClients} Active Clients · Switch Tax
          </motion.p>

          {/* Headline number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {hoursLostPerWeek}
            </span>
            <span className="font-display text-2xl md:text-3xl text-muted-foreground ml-2">
              hrs/week
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            lost to switching between clients
          </motion.p>

          {/* Supporting stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex gap-6 mb-8"
          >
            <div>
              <p className="text-3xl font-display text-behind font-semibold">
                ${monthlyCost.toLocaleString()}
              </p>
              <p className="text-xs text-neutral-detail font-body mt-1">
                monthly cost
              </p>
            </div>
            <div className="border-l border-border pl-6">
              <p className="text-3xl font-display text-foreground font-semibold">
                {avgSwitchesPerDay}
              </p>
              <p className="text-xs text-neutral-detail font-body mt-1">
                switches/day
              </p>
            </div>
          </motion.div>

          {/* Mom's take */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>

          {!isPaid && (
            <UpgradeNudge hint="Get a plan to cut your switch tax in half." />
          )}

          {isPaid && (
            <DeepDive
              details={[
                `${avgSwitchesPerDay} switches/day across ${activeClients} clients`,
                `Each switch costs ~23 minutes of refocus time`,
                `Batching client days could recover ${Math.round(hoursLostPerWeek * 0.6)}+ hrs/week`,
              ]}
              recommendation="Dedicate full days to single clients. Even 2 batch days per week can cut your switch tax in half."
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
