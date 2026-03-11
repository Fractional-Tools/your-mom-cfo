import { motion } from "framer-motion";
import DeepDive from "./DeepDive";

interface ClientGrade {
  name: string;
  grade: "A" | "B" | "C" | "D";
  paysOnTime: boolean;
  steadyWork: boolean;
  lowSwitchCost: boolean;
}

interface ClientGradeSlideProps {
  clients: ClientGrade[];
  isPaid?: boolean;
}

const gradeColor: Record<string, string> = {
  A: "text-ahead",
  B: "text-foreground",
  C: "text-neutral-detail",
  D: "text-behind",
};

const gradeBg: Record<string, string> = {
  A: "bg-ahead/10",
  B: "bg-foreground/5",
  C: "bg-neutral-detail/10",
  D: "bg-behind/10",
};

export default function ClientGradeSlide({ clients, isPaid = false }: ClientGradeSlideProps) {
  const sorted = [...clients].sort((a, b) => a.grade.localeCompare(b.grade));

  const getMomTake = () => {
    const hasD = sorted.some((c) => c.grade === "D");
    const allAB = sorted.every((c) => c.grade === "A" || c.grade === "B");
    if (hasD) return "You have a problem client. You already know which one.";
    if (allAB) return "Good clients. Protect these relationships.";
    return "Most are solid. One could be better.";
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-8"
          >
            Client Health
          </motion.p>

          {/* The grid — one glance */}
          <div className="space-y-4 mb-8">
            {sorted.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                {/* Grade badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-display text-2xl font-bold ${gradeBg[client.grade]} ${gradeColor[client.grade]}`}
                >
                  {client.grade}
                </div>

                {/* Name + dots */}
                <div className="flex-1">
                  <p className="text-foreground font-body font-medium text-base">
                    {client.name}
                  </p>
                  <div className="flex gap-3 mt-1 text-xs text-neutral-detail">
                    <span className={client.paysOnTime ? "text-ahead" : "text-behind"}>
                      {client.paysOnTime ? "✓" : "✗"} Pays on time
                    </span>
                    <span className={client.steadyWork ? "text-ahead" : "text-behind"}>
                      {client.steadyWork ? "✓" : "✗"} Steady
                    </span>
                    <span className={client.lowSwitchCost ? "text-ahead" : "text-behind"}>
                      {client.lowSwitchCost ? "✓" : "✗"} Low friction
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-muted-foreground font-display text-base italic"
          >
            {getMomTake()}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
