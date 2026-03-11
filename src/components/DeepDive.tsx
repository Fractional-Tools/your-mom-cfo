import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DeepDiveProps {
  details: string[];
  recommendation: string;
}

export default function DeepDive({ details, recommendation }: DeepDiveProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="mt-6 border-t border-border pt-4"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-sm font-body font-medium text-foreground/70 group-hover:text-foreground transition-colors">
          Dig deeper
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {/* Data points */}
              <div className="space-y-2">
                {details.map((detail, i) => (
                  <p key={i} className="text-sm font-body text-foreground/70 flex items-start gap-2">
                    <span className="text-neutral-detail mt-0.5">·</span>
                    {detail}
                  </p>
                ))}
              </div>

              {/* Recommendation */}
              <div className="bg-background rounded-xl p-4 mt-3">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">
                  Recommendation
                </p>
                <p className="text-sm font-display text-foreground leading-relaxed">
                  {recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
