import { motion } from "framer-motion";
import DeepDive from "./DeepDive";
import UpgradeNudge from "./UpgradeNudge";
import FavoriteButton from "./FavoriteButton";
import type { StoryTone } from "@/types/tone";

interface ClientEngagement {
  name: string;
  months: number;
  active: boolean;
}

interface EngagementSlideProps {
  clients: ClientEngagement[];
  isPaid?: boolean;
  tone?: StoryTone;
}

export default function EngagementSlide({
  clients,
  isPaid = false,
  tone = "balanced",
}: EngagementSlideProps) {
  const avgMonths = Math.round(clients.reduce((s, c) => s + c.months, 0) / clients.length);
  const longest = [...clients].sort((a, b) => b.months - a.months)[0];
  const shortest = [...clients].sort((a, b) => a.months - b.months)[0];
  const shortCount = clients.filter((c) => c.months < 6).length;

  const getMomTake = () => {
    if (tone === "wins") {
      if (avgMonths >= 12) return "Your clients stick around. That's trust you've earned.";
      return `${longest.name} has been with you ${longest.months} months. That's your anchor.`;
    }
    if (tone === "issues") {
      if (shortCount > 1) return `${shortCount} clients under 6 months. Your pipeline needs to be always on.`;
      if (avgMonths < 6) return "Short engagements mean constant selling. That's expensive time.";
      return `${shortest.name} is your newest. Watch if it has staying power.`;
    }
    if (avgMonths >= 12) return "Long relationships mean less selling and more earning. Keep it up.";
    if (avgMonths >= 6) return "Decent tenure. Focus on deepening, not just maintaining.";
    return "Short average tenure. Invest in retention or budget for constant pipeline.";
  };

  const maxMonths = Math.max(...clients.map((c) => c.months));

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
              Client Retention
            </motion.p>
            <FavoriteButton metricId="engagement" />
          </div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-7xl md:text-8xl text-foreground leading-none">
              {avgMonths}
            </span>
            <span className="font-display text-2xl md:text-3xl text-muted-foreground ml-2">
              months
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            average engagement length
          </motion.p>

          {/* Client timeline bars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="space-y-3 mb-8"
          >
            {[...clients].sort((a, b) => b.months - a.months).map((client, i) => {
              const isLong = client.months >= 12;
              const isShort = client.months < 6;
              return (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.12, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-body text-foreground font-medium">
                      {client.name}
                    </span>
                    <span className={`text-sm font-body font-semibold ${
                      isLong ? "text-ahead" : isShort ? "text-behind" : "text-foreground"
                    }`}>
                      {client.months}mo
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(client.months / maxMonths) * 100}%` }}
                      transition={{ delay: 1.2 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        isLong ? "bg-ahead" : isShort ? "bg-behind" : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
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
            <UpgradeNudge hint="See your retention trend and churn risk by client." />
          )}

          {isPaid && (
            <DeepDive
              details={[
                `Longest: ${longest.name} at ${longest.months} months`,
                `Shortest: ${shortest.name} at ${shortest.months} months`,
                shortCount > 0
                  ? `${shortCount} client${shortCount > 1 ? "s" : ""} under 6 months — higher churn risk`
                  : "All clients past 6 months — strong retention",
              ]}
              recommendation={avgMonths < 6
                ? "Short tenures mean you're always selling. Aim for 12+ month engagements — adjust your proposals to build in longer commitments."
                : "Your retention is solid. Double down on what makes clients stay — ask your longest client what keeps them."}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
