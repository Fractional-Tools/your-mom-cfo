import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MomCFOSlide from "@/components/MomCFOSlide";
import UtilizationSlide from "@/components/UtilizationSlide";
import ContextSwitchSlide from "@/components/ContextSwitchSlide";
import WorkBalanceSlide from "@/components/WorkBalanceSlide";
import ClientValueSlide from "@/components/ClientValueSlide";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide 1 data
  const expectedAtHalftime = 340000 * (182 / 365);
  const currentRevenue = Math.round(expectedAtHalftime * 1.1);

  const totalSlides = 5;

  const goNext = () => setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  const goPrev = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="slide-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <MomCFOSlide
              targetRevenue={340000}
              currentRevenue={currentRevenue}
              dayOfYear={182}
              totalDays={365}
            />
          </motion.div>
        )}
        {currentSlide === 1 && (
          <motion.div
            key="slide-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <UtilizationSlide
              currentRate={68}
              priorRate={61}
              period="month"
              billableHours={109}
              availableHours={160}
            />
          </motion.div>
        )}
        {currentSlide === 2 && (
          <motion.div
            key="slide-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <ContextSwitchSlide
              hoursLostPerWeek={6.5}
              avgSwitchesPerDay={4}
              activeClients={3}
              costPerHour={200}
            />
          </motion.div>
        )}
        {currentSlide === 3 && (
          <motion.div
            key="slide-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <WorkBalanceSlide
              offHoursPct={28}
              weekendHours={6}
              eveningHours={8}
              totalHoursThisWeek={48}
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
    </div>
  );
};

export default Index;
