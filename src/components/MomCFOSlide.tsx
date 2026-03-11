import { motion } from "framer-motion";

interface MomCFOSlideProps {
  targetRevenue: number;
  currentRevenue: number;
  dayOfYear: number;
  totalDays: number;
}

export default function MomCFOSlide({
  targetRevenue = 340000,
  currentRevenue = 0,
  dayOfYear = 182,
  totalDays = 365,
}: MomCFOSlideProps) {
  const expectedPct = dayOfYear / totalDays;
  const expectedRevenue = targetRevenue * expectedPct;
  const aheadPct = Math.round(
    ((currentRevenue - expectedRevenue) / expectedRevenue) * 100
  );
  const isAhead = aheadPct >= 0;
  const earnedFormatted = `$${Math.round(currentRevenue / 1000)}k`;
  const targetFormatted = `$${Math.round(targetRevenue / 1000)}k`;
  const pctOfYear = Math.round(expectedPct * 100);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 font-body">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        {/* The warm note */}
        <div className="bg-warm-glow rounded-2xl p-10 md:p-14 shadow-sm">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-6"
          >
            July 1 · Halftime Check-in
          </motion.p>

          {/* The headline truth */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-4"
          >
            You're{" "}
            <span className={isAhead ? "text-ahead" : "text-behind"}>
              {Math.abs(aheadPct)}% {isAhead ? "ahead" : "behind"}
            </span>
            .
          </motion.h1>

          {/* The supportive context */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
          >
            Halfway through the year, you've earned{" "}
            <span className="text-foreground font-semibold">{earnedFormatted}</span>{" "}
            of your{" "}
            <span className="text-foreground font-semibold">{targetFormatted}</span>{" "}
            goal.
          </motion.p>

          {/* The progress bar — simple, warm */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-6"
          >
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((currentRevenue / targetRevenue) * 100, 100)}%` }}
                transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
                className="h-full bg-ahead rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-detail font-body">
              <span>Jan</span>
              <span className="text-muted-foreground font-medium">
                ↑ you are here ({pctOfYear}%)
              </span>
              <span>Dec</span>
            </div>
          </motion.div>

          {/* The mom sign-off */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            Keep going. I'm proud of you.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
