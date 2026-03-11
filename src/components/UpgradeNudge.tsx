import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface UpgradeNudgeProps {
  hint: string;
}

export default function UpgradeNudge({ hint }: UpgradeNudgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.6 }}
      className="mt-6 border-t border-border pt-4 flex items-start gap-2.5"
    >
      <Sparkles className="w-3.5 h-3.5 text-muted-foreground/60 mt-0.5 shrink-0" />
      <p className="text-xs font-body text-muted-foreground/70 leading-relaxed">
        {hint}{" "}
        <span className="text-foreground/50 font-medium">Upgrade to Pro →</span>
      </p>
    </motion.div>
  );
}
