import { useState, useCallback } from "react";

const AUTH_KEY = "ft-authenticated";
const PASSWORD = "fractional";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );

  const login = useCallback((password: string): boolean => {
    if (password === PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }, []);

  return { authenticated, login, logout };
}
