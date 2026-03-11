import profilePhoto from "@/assets/profile-photo.jpg";
import ftLogo from "@/assets/ft-logo.png";

export default function IntroSlide() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center text-center max-w-lg">
        <img
          src={profilePhoto}
          alt="Alex Reyes"
          className="w-32 h-32 rounded-full object-cover mb-6 ring-4 ring-warm-glow"
        />
        <h1 className="font-display text-4xl text-foreground mb-2">Alex Reyes</h1>
        <p className="text-muted-foreground text-lg mb-8">Fractional Chief Product Officer</p>
        <p className="text-foreground/80 text-base leading-relaxed font-body italic">
          "This is the virtual CFO that keeps him on track, current, and happy about being fractional."
        </p>
        <img
          src={ftLogo}
          alt="Fractional Tools"
          className="h-6 w-auto mt-10 opacity-40 dark:invert"
        />
      </div>
    </div>
  );
}
