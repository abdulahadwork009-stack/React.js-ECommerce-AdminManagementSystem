import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open sidebar">☰</button>
            <Link to="/" className="text-sm text-indigo-600 hover:underline">← Store</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm sm:inline">{user?.name}</span>
            <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}