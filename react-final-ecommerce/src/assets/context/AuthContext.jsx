import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

const DEMO_EMAIL = "admin@example.com";
const DEMO_PASSWORD = "admin123";

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("auth-user", null);

  const login = useCallback(
    (email, password) => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setUser({ name: "Admin User", email, role: "Administrator", bio: "Store administrator." });
        return { success: true };
      }
      return { success: false, error: "Invalid email or password." };
    },
    [setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const updateProfile = useCallback(
    (updates) => setUser((prev) => ({ ...prev, ...updates })),
    [setUser]
  );

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout, updateProfile }),
    [user, login, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);