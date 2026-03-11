import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";
import ftLogo from "@/assets/ft-logo.png";
import { useSettings } from "@/hooks/use-settings";

export default function IntroSlide() {
  const { settings } = useSettings();

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
              src={profilePhoto}
              alt={settings.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-28 h-28 rounded-full object-cover mb-6 ring-4 ring-background"
            />
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl leading-tight text-foreground mb-2"
            >
              {settings.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-muted-foreground text-sm font-body tracking-wide uppercase mb-8"
            >
              {settings.jobTitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8"
            >
              This is the virtual CFO that keeps him{" "}
              <span className="text-foreground font-semibold">on track</span>,{" "}
              <span className="text-foreground font-semibold">current</span>, and{" "}
              <span className="text-foreground font-semibold">happy</span> about being fractional.
            </motion.p>
            <motion.img
              src={ftLogo}
              alt="Fractional Tools"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="h-6 w-auto dark:invert"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
