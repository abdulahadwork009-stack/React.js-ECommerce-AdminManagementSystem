import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ADMIN_SIGNUP_CODE, DEMO_ADMIN } from "../utils/helpers";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [storedUser, setUser] = useLocalStorage("auth-user", null);
  const [users, setUsers] = useLocalStorage("registered-users", []);

  // Sirf admin session valid hai
  const user = storedUser?.role === "admin" ? storedUser : null;

  const signup = useCallback(
    ({ name, email, password, adminCode = "" }) => {
      const cleanEmail = email.trim().toLowerCase();

      if (adminCode.trim() !== ADMIN_SIGNUP_CODE) {
        return { success: false, error: "Invalid admin access code." };
      }
      if (cleanEmail === DEMO_ADMIN.email || users.some((u) => u.email === cleanEmail)) {
        return { success: false, error: "An account with this email already exists." };
      }

      setUsers((prev) => [
        ...prev,
        { id: Date.now(), name: name.trim(), email: cleanEmail, password, role: "admin", bio: "" },
      ]);
      return { success: true };
    },
    [users, setUsers]
  );

  const login = useCallback(
    (email, password) => {
      const cleanEmail = email.trim().toLowerCase();

      // 1) demo admin
      if (cleanEmail === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
        setUser({ name: DEMO_ADMIN.name, email: DEMO_ADMIN.email, role: "admin", bio: "Store administrator." });
        return { success: true };
      }

      // 2) signup se bana hua admin
      const found = users.find(
        (u) => u.role === "admin" && u.email === cleanEmail && u.password === password
      );
      if (found) {
        setUser({ id: found.id, name: found.name, email: found.email, role: "admin", bio: found.bio || "" });
        return { success: true };
      }

      return { success: false, error: "Invalid email or password." };
    },
    [users, setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  const updateProfile = useCallback(
    (updates) => {
      const newEmail = updates.email?.trim().toLowerCase();

      if (newEmail && newEmail !== user?.email) {
        const taken =
          newEmail === DEMO_ADMIN.email || users.some((u) => u.email === newEmail && u.id !== user?.id);
        if (taken) return { success: false, error: "This email is already in use." };
      }

      const cleaned = newEmail ? { ...updates, email: newEmail } : updates;
      setUser((prev) => ({ ...prev, ...cleaned }));
      if (user?.id) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...cleaned } : u)));
      }
      return { success: true };
    },
    [user, users, setUser, setUsers]
  );

  const value = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: !!user,
      isAdmin: !!user,
      signup,
      login,
      logout,
      updateProfile,
    }),
    [user, users, signup, login, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);