import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import Container from "./Container";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">ShopHub</Link>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>

        <nav className={`${open ? "flex" : "hidden"} absolute left-0 top-16 w-full flex-col gap-1 border-b bg-white p-4 dark:bg-gray-800 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:p-0`}>
          <NavLink to="/" end className={linkClass} onClick={close}>Home</NavLink>
          <NavLink to="/products" className={linkClass} onClick={close}>Products</NavLink>
          <NavLink to="/about" className={linkClass} onClick={close}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={close}>Contact</NavLink>
          <NavLink to="/cart" className={linkClass} onClick={close}>Cart ({totalItems})</NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={close}>Dashboard</NavLink>
              <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass} onClick={close}>Admin Login</NavLink>
          )}

          <button onClick={toggleTheme} className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </Container>
    </header>
  );
}