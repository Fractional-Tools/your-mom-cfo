import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Sun, Scale, AlertTriangle, Check, LogOut } from "lucide-react";
import { useSettings, type Pronouns } from "@/hooks/use-settings";
import { useAuth } from "@/hooks/use-auth";
import type { StoryTone } from "@/types/tone";
import { AVATARS } from "@/lib/avatars";
import ftLogo from "@/assets/ft-logo.png";

const toneOptions: { mode: StoryTone; icon: typeof Sun; label: string; description: string }[] = [
  { mode: "wins", icon: Sun, label: "What's working", description: "Focus on positive trends and achievements" },
  { mode: "balanced", icon: Scale, label: "Balanced", description: "Mix of wins and areas for improvement" },
  { mode: "issues", icon: AlertTriangle, label: "What needs change", description: "Focus on areas that need attention" },
];

export default function Settings() {
  const { settings, setSettings } = useSettings();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(settings.name);
  const [jobTitle, setJobTitle] = useState(settings.jobTitle);
  const [concurrentClients, setConcurrentClients] = useState(String(settings.concurrentClients));
  const [revenueGoal, setRevenueGoal] = useState(String(settings.revenueGoal / 1000));
  const [vacationWeeks, setVacationWeeks] = useState(String(settings.vacationWeeks));
  const [conferences, setConferences] = useState(String(settings.conferences));
  const [yearsFractional, setYearsFractional] = useState(String(settings.yearsFractional));
  const [targetBillRate, setTargetBillRate] = useState(String(settings.targetBillRate));
  const [tone, setTone] = useState<StoryTone>(settings.tone);
  const [avatarId, setAvatarId] = useState(settings.avatarId);
  const [pronouns, setPronouns] = useState<Pronouns>(settings.pronouns);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSettings({
      name,
      jobTitle,
      concurrentClients: Number(concurrentClients) || 3,
      revenueGoal: (Number(revenueGoal) || 370) * 1000,
      vacationWeeks: Number(vacationWeeks) || 4,
      conferences: Number(conferences) || 3,
      yearsFractional: Number(yearsFractional) || 2,
      targetBillRate: Number(targetBillRate) || 200,
      tone,
      avatarId,
      pronouns,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-body">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <img src={ftLogo} alt="Fractional Tools" className="h-7 w-auto dark:invert" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground text-sm mb-10">
            These values are used across your slides and profile.
          </p>

          <div className="space-y-6">
            {/* Avatar picker */}
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-3">
                Profile Photo
              </label>
              <div className="grid grid-cols-5 gap-3">
                {AVATARS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAvatarId(a.id)}
                    className={`relative rounded-full overflow-hidden aspect-square border-2 transition-all ${
                      avatarId === a.id
                        ? "border-foreground ring-2 ring-foreground/20 scale-105"
                        : "border-transparent hover:border-foreground/30"
                    }`}
                  >
                    <img src={a.src} alt={a.label} className="w-full h-full object-cover" />
                    {avatarId === a.id && (
                      <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                        <Check className="w-5 h-5 text-background" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pronouns */}
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-3">
                Pronouns
              </label>
              <div className="flex gap-2">
                {([
                  { value: "he" as Pronouns, label: "He / Him" },
                  { value: "she" as Pronouns, label: "She / Her" },
                  { value: "they" as Pronouns, label: "They / Them" },
                ]).map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPronouns(p.value)}
                    className={`flex-1 text-sm rounded-xl py-3 transition-all border ${
                      pronouns === p.value
                        ? "bg-foreground text-background border-foreground font-medium"
                        : "bg-background border-border text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone selector */}
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-3">
                Slide Tone
              </label>
              <div className="grid gap-2">
                {toneOptions.map(({ mode, icon: Icon, label, description }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTone(mode)}
                    className={`flex items-center gap-3 w-full rounded-xl p-4 text-left transition-all border ${
                      tone === mode
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background border-border hover:border-foreground/30"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className={`text-xs mt-0.5 ${tone === mode ? "text-background/70" : "text-muted-foreground"}`}>
                        {description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Alex Reyes"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={inputClass}
                placeholder="Fractional Chief Product Officer"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Concurrent Clients
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={concurrentClients}
                onChange={(e) => setConcurrentClients(e.target.value)}
                className={inputClass}
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Revenue Goal (k/year)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  min="1"
                  value={revenueGoal}
                  onChange={(e) => setRevenueGoal(e.target.value)}
                  className={`${inputClass} pl-8`}
                  placeholder="370"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">k</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Vacation Weeks / Year
              </label>
              <input
                type="number"
                min="0"
                max="52"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(e.target.value)}
                className={inputClass}
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Conferences / Year
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={conferences}
                onChange={(e) => setConferences(e.target.value)}
                className={inputClass}
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Years as Fractional
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={yearsFractional}
                onChange={(e) => setYearsFractional(e.target.value)}
                className={inputClass}
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Target Bill Rate
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  min="1"
                  value={targetBillRate}
                  onChange={(e) => setTargetBillRate(e.target.value)}
                  className={`${inputClass} pl-8`}
                  placeholder="200"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">/hr</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-10 w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-xl px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved ✓" : "Save Settings"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
