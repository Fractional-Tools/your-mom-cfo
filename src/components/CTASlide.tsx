import { motion } from "framer-motion";
import ftLogo from "@/assets/ft-logo.png";

export default function CTASlide() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 font-body">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="bg-warm-glow rounded-2xl p-10 md:p-14 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <motion.img
              src={ftLogo}
              alt="Fractional Tools"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-10 w-auto mb-8 dark:invert"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-4"
            >
              How it works
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="font-display text-3xl md:text-4xl leading-tight text-foreground mb-6"
            >
              Your virtual CFO,{" "}
              <span className="text-foreground/60">powered by the tools you already use.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-display text-lg md:text-xl text-foreground/80 leading-relaxed mb-10"
            >
              Connect your existing software — calendar, invoicing, time tracking — and get a
              personalized engagement report that keeps you on track, every month.
            </motion.p>

            <motion.a
              href="https://Fractional.tools"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-8 py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors mb-4"
            >
              Start your 30-day free trial →
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-xs text-muted-foreground"
            >
              No credit card required
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
