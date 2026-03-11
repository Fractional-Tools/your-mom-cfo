import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Sun, AlertTriangle, Scale, Presentation } from "lucide-react";
import ftLogo from "@/assets/ft-logo.png";
import ProfileFooter from "@/components/ProfileFooter";
import IntroSlide from "@/components/IntroSlide";
import MomCFOSlide from "@/components/MomCFOSlide";
import UtilizationSlide from "@/components/UtilizationSlide";
import ContextSwitchSlide from "@/components/ContextSwitchSlide";
import WorkBalanceSlide from "@/components/WorkBalanceSlide";
import ClientValueSlide from "@/components/ClientValueSlide";
import ClientGradeSlide from "@/components/ClientGradeSlide";
import VacationSlide from "@/components/VacationSlide";
import GrowthSlide from "@/components/GrowthSlide";
import EngagementSlide from "@/components/EngagementSlide";
import type { StoryTone } from "@/types/tone";

const toneOptions: { mode: StoryTone; icon: typeof Sun; label: string }[] = [
  { mode: "wins", icon: Sun, label: "What's working" },
  { mode: "balanced", icon: Scale, label: "Balanced" },
  { mode: "issues", icon: AlertTriangle, label: "What needs change" },
];

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialSlide = Number(searchParams.get("slide") || 0);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isPaid, setIsPaid] = useState(false);
  const [tone, setTone] = useState<StoryTone>("balanced");

  const expectedAtHalftime = 340000 * (182 / 365);
  const currentRevenue = Math.round(expectedAtHalftime * 1.1);

  const totalSlides = 10;

  const goNext = () => setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  const goPrev = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  return (
    <div className="relative min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <img src={ftLogo} alt="Fractional Tools" className="h-8 w-auto shrink-0 dark:invert" />
        <Link
          to="/dashboard"
          className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors bg-warm-glow rounded-full px-4 py-2 shadow-sm"
        >
          Dashboard →
        </Link>
        <Link
          to="/present"
          className="flex items-center gap-1.5 text-xs font-body text-background bg-foreground hover:bg-foreground/90 transition-colors rounded-full px-4 py-2 shadow-sm"
        >
          <Presentation className="w-3.5 h-3.5" />
          Present
        </Link>
        {/* Tone switcher */}
        <div className="flex items-center gap-1 bg-warm-glow rounded-full p-1 shadow-sm">
          {toneOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setTone(mode)}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all ${
                tone === mode
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-warm-glow rounded-full px-4 py-2 shadow-sm">
        <button
          onClick={() => setIsPaid(false)}
          className={`text-xs font-body px-3 py-1 rounded-full transition-all ${
            !isPaid
              ? "bg-foreground text-background font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Free
        </button>
        <button
          onClick={() => setIsPaid(true)}
          className={`text-xs font-body px-3 py-1 rounded-full transition-all ${
            isPaid
              ? "bg-foreground text-background font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Pro
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div key="slide-0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <IntroSlide />
          </motion.div>
        )}
        {currentSlide === 1 && (
          <motion.div key="slide-1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <MomCFOSlide targetRevenue={340000} currentRevenue={currentRevenue} dayOfYear={182} totalDays={365} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 2 && (
          <motion.div key="slide-2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <UtilizationSlide currentRate={68} priorRate={61} period="month" billableHours={109} availableHours={160} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 3 && (
          <motion.div key="slide-3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <ContextSwitchSlide hoursLostPerWeek={6.5} avgSwitchesPerDay={4} activeClients={3} costPerHour={200} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 4 && (
          <motion.div key="slide-4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <WorkBalanceSlide offHoursPct={28} weekendHours={6} eveningHours={8} totalHoursThisWeek={48} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 5 && (
          <motion.div key="slide-5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <ClientValueSlide
              clients={[
                { name: "Acme Corp", revenue: 12000, hoursPerMonth: 48 },
                { name: "Bright Labs", revenue: 8000, hoursPerMonth: 32 },
                { name: "Cedar Health", revenue: 5500, hoursPerMonth: 36 },
              ]}
              isPaid={isPaid} tone={tone}
            />
          </motion.div>
        )}
        {currentSlide === 6 && (
          <motion.div key="slide-6" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <ClientGradeSlide
              clients={[
                { name: "Acme Corp", grade: "A", paysOnTime: true, steadyWork: true, lowSwitchCost: true },
                { name: "Bright Labs", grade: "B", paysOnTime: true, steadyWork: true, lowSwitchCost: false },
                { name: "Cedar Health", grade: "C", paysOnTime: false, steadyWork: true, lowSwitchCost: false },
              ]}
              isPaid={isPaid} tone={tone}
            />
          </motion.div>
        )}
        {currentSlide === 7 && (
          <motion.div key="slide-7" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <VacationSlide daysTakenThisYear={5} daysPlanned={3} targetDays={20} lastVacationWeeksAgo={10} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 8 && (
          <motion.div key="slide-8" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <GrowthSlide capacityClients={1.24} currentClients={3} availableHoursPerWeek={20} avgHoursPerClient={16} isPaid={isPaid} tone={tone} />
          </motion.div>
        )}
        {currentSlide === 9 && (
          <motion.div key="slide-9" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <EngagementSlide
              clients={[
                { name: "Acme Corp", months: 18, active: true },
                { name: "Bright Labs", months: 7, active: true },
                { name: "Cedar Health", months: 3, active: true },
              ]}
              isPaid={isPaid} tone={tone}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors text-sm font-body"
        >
          ←
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide
                  ? "bg-foreground scale-125"
                  : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors text-sm font-body"
        >
          →
        </button>
      </div>

      <ProfileFooter />
    </div>
  );
};

export default Index;
