import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const { authenticated, login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-body">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-foreground" />
        </div>
        <h1 className="font-display text-2xl text-foreground mb-2">Welcome</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter the password to continue</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full bg-background border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 transition-all ${
              error
                ? "border-red-500 focus:ring-red-500/20"
                : "border-border focus:ring-foreground/20"
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full bg-foreground text-background rounded-xl px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  );
}
