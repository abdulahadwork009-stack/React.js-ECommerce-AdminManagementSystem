import { useState, useMemo, memo, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../../components/EmptyState";
import Button from "../../components/Button";
import { DEMO_ADMIN } from "../../utils/helpers";

// React.memo: a row only re-renders when its own props change
const UserRow = memo(function UserRow({ user, onToggleStatus }) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3 capitalize">{user.role}</td>
      <td className="p-3">
        <span className={`rounded-full px-2 py-0.5 text-xs ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
          {user.status}
        </span>
      </td>
      <td className="p-3">
        <Button variant="outline" onClick={() => onToggleStatus(user.id)}>
          {user.status === "Active" ? "Deactivate" : "Activate"}
        </Button>
      </td>
    </tr>
  );
});

export default function Users() {
  const { users: registeredUsers } = useAuth();
  const [search, setSearch] = useState("");
  const [statusOverrides, setStatusOverrides] = useState({});

  const users = useMemo(() => {
    // registered users append hote hain, isliye reverse karke latest sabse upar
    const registered = registeredUsers
      .filter((u) => u.role === "admin")
      .map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }))
      .reverse();

    const all = [
      ...registered,
      { id: "demo-admin", name: DEMO_ADMIN.name, email: DEMO_ADMIN.email, role: "admin" },
    ];

    // ek email sirf ek baar
    const seen = new Set();
    return all
      .filter((u) => !seen.has(u.email) && seen.add(u.email))
      .map((u) => ({ ...u, status: statusOverrides[u.id] ?? "Active" }));
  }, [registeredUsers, statusOverrides]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const toggleStatus = useCallback((id) => {
    setStatusOverrides((prev) => ({
      ...prev,
      [id]: (prev[id] ?? "Active") === "Active" ? "Inactive" : "Active",
    }));
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState message="No users found." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <UserRow key={u.id} user={u} onToggleStatus={toggleStatus} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}