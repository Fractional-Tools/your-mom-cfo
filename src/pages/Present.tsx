import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import ftLogo from "@/assets/ft-logo.png";
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

const STORY_TITLES = [
  "Meet Alex",
  "The Big Picture",
  "Time Allocation",
  "Context Switching",
  "Work-Life Balance",
  "Client Value",
  "Client Health",
  "Time Off",
  "Growth Capacity",
  "Client Retention",
];

const Present = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const tone: StoryTone = "balanced";
  const isPaid = true;

  const totalSlides = 10;
  const expectedAtHalftime = 340000 * (182 / 365);
  const currentRevenue = Math.round(expectedAtHalftime * 1.1);

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "Escape") {
        if (document.fullscreenElement) document.exitFullscreen();
        else navigate("/");
      }
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, navigate, toggleFullscreen]);

  // Auto-hide controls
  useEffect(() => {
    const showControls = () => {
      setControlsVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      setHideTimer(setTimeout(() => setControlsVisible(false), 3000));
    };
    window.addEventListener("mousemove", showControls);
    return () => {
      window.removeEventListener("mousemove", showControls);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [hideTimer]);

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  };

  const slides = [
    <IntroSlide key="s-intro" />,
    <MomCFOSlide key="s0" targetRevenue={340000} currentRevenue={currentRevenue} dayOfYear={182} totalDays={365} isPaid={isPaid} tone={tone} />,
    <UtilizationSlide key="s1" currentRate={68} priorRate={61} period="month" billableHours={109} availableHours={160} isPaid={isPaid} tone={tone} />,
    <ContextSwitchSlide key="s2" hoursLostPerWeek={6.5} avgSwitchesPerDay={4} activeClients={3} costPerHour={200} isPaid={isPaid} tone={tone} />,
    <WorkBalanceSlide key="s3" offHoursPct={28} weekendHours={6} eveningHours={8} totalHoursThisWeek={48} isPaid={isPaid} tone={tone} />,
    <ClientValueSlide key="s4" clients={[
      { name: "Acme Corp", revenue: 12000, hoursPerMonth: 48 },
      { name: "Bright Labs", revenue: 8000, hoursPerMonth: 32 },
      { name: "Cedar Health", revenue: 5500, hoursPerMonth: 36 },
    ]} isPaid={isPaid} tone={tone} />,
    <ClientGradeSlide key="s5" clients={[
      { name: "Acme Corp", grade: "A", paysOnTime: true, steadyWork: true, lowSwitchCost: true },
      { name: "Bright Labs", grade: "B", paysOnTime: true, steadyWork: true, lowSwitchCost: false },
      { name: "Cedar Health", grade: "C", paysOnTime: false, steadyWork: true, lowSwitchCost: false },
    ]} isPaid={isPaid} tone={tone} />,
    <VacationSlide key="s6" daysTakenThisYear={5} daysPlanned={3} targetDays={20} lastVacationWeeksAgo={10} isPaid={isPaid} tone={tone} />,
    <GrowthSlide key="s7" capacityClients={1.24} currentClients={3} availableHoursPerWeek={20} avgHoursPerClient={16} isPaid={isPaid} tone={tone} />,
    <EngagementSlide key="s8" clients={[
      { name: "Acme Corp", months: 18, active: true },
      { name: "Bright Labs", months: 7, active: true },
      { name: "Cedar Health", months: 3, active: true },
    ]} isPaid={isPaid} tone={tone} />,
  ];

  return (
    <div className="fixed inset-0 bg-background z-[100] overflow-hidden cursor-none" onMouseMove={() => setControlsVisible(true)}>
      {/* Story chapter title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-foreground/5 backdrop-blur-md rounded-full px-6 py-2.5 border border-border/50">
            <span className="text-xs font-mono text-muted-foreground">{currentSlide + 1}/{totalSlides}</span>
            <span className="w-px h-4 bg-border" />
            <span className="text-sm font-medium text-foreground">{STORY_TITLES[currentSlide]}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`present-slide-${currentSlide}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30 z-50">
        <motion.div
          className="h-full bg-foreground/60"
          initial={false}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Controls overlay */}
      <motion.div
        animate={{ opacity: controlsVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-50"
        style={{ cursor: controlsVisible ? "default" : "none" }}
      >
        {/* Top bar */}
        <div className="pointer-events-auto absolute top-6 left-6 flex items-center gap-3">
          <img src={ftLogo} alt="Fractional Tools" className="h-8 w-auto shrink-0 opacity-60 dark:invert" />
        </div>
        <div className="pointer-events-auto absolute top-6 right-6 flex items-center gap-2">
          <button onClick={toggleFullscreen} className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground transition-all">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <button onClick={() => { if (document.fullscreenElement) document.exitFullscreen(); navigate("/"); }} className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side nav arrows */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground disabled:opacity-0 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          disabled={currentSlide === totalSlides - 1}
          className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground/60 hover:text-foreground disabled:opacity-0 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom slide dots */}
        <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
              className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? "bg-foreground scale-125" : "bg-foreground/30 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Click zones for navigation */}
      <div className="absolute inset-0 z-40 flex">
        <div className="w-1/3 h-full cursor-pointer" onClick={goPrev} style={{ cursor: controlsVisible ? "w-resize" : "none" }} />
        <div className="w-1/3 h-full" />
        <div className="w-1/3 h-full cursor-pointer" onClick={goNext} style={{ cursor: controlsVisible ? "e-resize" : "none" }} />
      </div>
    </div>
  );
};

export default Present;
