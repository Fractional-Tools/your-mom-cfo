import { motion } from "framer-motion";
import DeepDive from "./DeepDive";

interface Client {
  name: string;
  revenue: number;
  hoursPerMonth: number;
}

interface ClientValueSlideProps {
  clients: Client[];
  isPaid?: boolean;
}

export default function ClientValueSlide({ clients }: ClientValueSlideProps) {
  const sorted = [...clients].sort(
    (a, b) => b.revenue / b.hoursPerMonth - a.revenue / a.hoursPerMonth
  );

  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  const topRate = Math.round(top.revenue / top.hoursPerMonth);
  const bottomRate = Math.round(bottom.revenue / bottom.hoursPerMonth);
  const gap = topRate - bottomRate;

  const getMomTake = () => {
    if (gap > 100)
      return "That's a big gap. Think about whether the low end is worth your time.";
    if (gap > 50)
      return "Some clients pay you more per hour than others. That's normal — just stay aware.";
    return "Your clients are pretty balanced. That's a stable book of business.";
  };

  const maxRevenue = Math.max(...sorted.map((c) => c.revenue));

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
            {clients.length} Clients · Value Ranked
          </motion.p>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-2"
          >
            <span className="font-display text-4xl md:text-5xl text-foreground leading-tight">
              ${bottomRate}–${topRate}
            </span>
            <span className="font-display text-xl md:text-2xl text-muted-foreground ml-2">
              /hr range
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-display text-lg text-foreground/70 mb-8"
          >
            Your effective rate varies by client
          </motion.p>

          {/* Client list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="space-y-4 mb-8"
          >
            {sorted.map((client, i) => {
              const rate = Math.round(client.revenue / client.hoursPerMonth);
              const isTop = i === 0;
              const isBottom = i === sorted.length - 1;

              return (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.15, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-body text-foreground font-medium">
                      {client.name}
                    </span>
                    <span
                      className={`text-sm font-body font-semibold ${
                        isTop
                          ? "text-ahead"
                          : isBottom
                            ? "text-behind"
                            : "text-foreground"
                      }`}
                    >
                      ${rate}/hr
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(client.revenue / maxRevenue) * 100}%`,
                      }}
                      transition={{
                        delay: 1.2 + i * 0.15,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full ${
                        isTop
                          ? "bg-ahead"
                          : isBottom
                            ? "bg-behind"
                            : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-neutral-detail">
                    <span>{client.hoursPerMonth}h/mo</span>
                    <span>${(client.revenue / 1000).toFixed(0)}k/mo</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mom's take */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
