import { motion } from "framer-motion";
import DeepDive from "./DeepDive";
import UpgradeNudge from "./UpgradeNudge";
import FavoriteButton from "./FavoriteButton";
import type { StoryTone } from "@/types/tone";

interface GrowthSlideProps {
  capacityClients: number; // e.g. 1.24
  currentClients: number;
  availableHoursPerWeek: number;
  avgHoursPerClient: number;
  isPaid?: boolean;
  tone?: StoryTone;
}

export default function GrowthSlide({
  capacityClients,
  currentClients,
  availableHoursPerWeek,
  avgHoursPerClient,
  isPaid = false,
  tone = "balanced",
}: GrowthSlideProps) {
  const wholeClients = Math.floor(capacityClients);
  const fractional = Math.round((capacityClients % 1) * 100);
  const maxClients = currentClients + capacityClients;

  const getMomTake = () => {
    if (tone === "wins") {
      if (capacityClients >= 1) return "You have room to grow without burning out. That's a good position.";
      return "You're nearly full. That means your pricing has room to go up.";
    }
    if (tone === "issues") {
      if (capacityClients < 0.5) return "You're at capacity. Any new work means dropping something.";
      return `${availableHoursPerWeek}h free per week. That's revenue sitting on the shelf.`;
    }
    if (capacityClients >= 1.5) return "You've got bandwidth. Time to fill it or raise your rates.";
    if (capacityClients >= 0.75) return "Room for one more. Be selective about who fills that slot.";
    if (capacityClients >= 0.25) return "Tight but manageable. A small project could fit.";
    return "You're full. Protect your capacity or something will break.";
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
              Growth · Capacity
            </motion.p>
            <FavoriteButton metricId="growth" />
          </div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {capacityClients.toFixed(2)}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            more clients could fit
          </motion.p>

          {/* Visual — client slots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex gap-2 mb-3">
              {Array.from({ length: currentClients }).map((_, i) => (
                <motion.div
                  key={`filled-${i}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1, duration: 0.3 }}
                  className="h-10 flex-1 rounded-lg bg-ahead flex items-center justify-center"
                >
                  <span className="text-xs text-primary-foreground font-body font-medium">
                    Client {i + 1}
                  </span>
                </motion.div>
              ))}
              {wholeClients > 0 && Array.from({ length: wholeClients }).map((_, i) => (
                <motion.div
                  key={`open-${i}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + (currentClients + i) * 0.1, duration: 0.3 }}
                  className="h-10 flex-1 rounded-lg border-2 border-dashed border-ahead/40 flex items-center justify-center"
                >
                  <span className="text-xs text-ahead/60 font-body">Open</span>
                </motion.div>
              ))}
              {fractional > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + (currentClients + wholeClients) * 0.1, duration: 0.3 }}
                  className="h-10 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden"
                  style={{ flex: capacityClients % 1 }}
                >
                  <span className="text-xs text-muted-foreground/40 font-body">{fractional}%</span>
                </motion.div>
              )}
            </div>
            <p className="text-xs text-neutral-detail font-body">
              {availableHoursPerWeek}h available · {avgHoursPerClient}h avg per client
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>

          {!isPaid && (
            <UpgradeNudge hint="See what adding a client would do to your utilization and balance." />
          )}

          {isPaid && (
            <DeepDive
              details={[
                `${currentClients} active clients using ~${currentClients * avgHoursPerClient}h/week`,
                `${availableHoursPerWeek}h free could support ${capacityClients.toFixed(1)} more at your avg rate`,
                `Adding 1 client would push utilization to ~${Math.round(((currentClients * avgHoursPerClient + avgHoursPerClient) / 40) * 100)}%`,
              ]}
              recommendation={capacityClients >= 1
                ? "You have clear room. Start conversations now — it takes 4-6 weeks to close a fractional deal."
                : "You're near capacity. If you want to grow, consider raising rates on existing clients to free up hours."}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
