import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, BarChart3, RefreshCw } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: BarChart3,
      title: "Your numbers change over time",
      body: "Every week, your revenue, utilization, and client health shift. We track it so you don't have to stare at spreadsheets.",
    },
    {
      icon: Heart,
      title: "Tell us what you care about",
      body: "Pick up to 3 priorities. The slides reshape around what matters to you — not everything, just what counts.",
    },
    {
      icon: RefreshCw,
      title: "Your narrative adapts",
      body: "As your business evolves, so does the story. The system learns your patterns and surfaces what you need to see, when you need to see it.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-lg mx-auto">
        <Link
          to="/slides"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to slides
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
            Your business tells a story.<br />
            We help you read it.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-10">
            Fractional Tools watches your calendar, invoices, and goals — then gives you the simple truth about how you're doing. Like a CFO who also happens to love you.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-warm-glow flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-foreground/60" />
              </div>
              <div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/priorities"
            className="flex items-center justify-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-body font-medium hover:opacity-90 transition-opacity"
          >
            Set your priorities
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/slides"
            className="flex items-center justify-center gap-2 bg-warm-glow text-foreground rounded-full px-6 py-3 text-sm font-body hover:bg-muted transition-colors"
          >
            View your slides
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
