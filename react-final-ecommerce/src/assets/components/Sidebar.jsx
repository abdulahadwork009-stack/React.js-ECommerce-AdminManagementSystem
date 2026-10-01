import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/products", label: "Products" },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/users", label: "Users" },
  { to: "/dashboard/profile", label: "Profile" },
  { to: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform border-r border-gray-200 bg-white p-4 transition-transform dark:border-gray-700 dark:bg-gray-800 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-6 text-xl font-bold text-indigo-600">Admin Panel</h2>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}