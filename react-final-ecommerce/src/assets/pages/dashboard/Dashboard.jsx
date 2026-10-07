import { useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useProducts } from "../../context/ProductsContext";
import { useOrders } from "../../context/OrdersContext";
import { useMessages } from "../../context/MessagesContext";
import { useAuth } from "../../context/AuthContext";
import { formatPrice, statusColor, DEMO_ADMIN } from "../../utils/helpers";

export default function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { messages, unreadCount } = useMessages();
  const { users: registeredUsers } = useAuth();

  const revenue = useMemo(
    () => orders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.total, 0),
    [orders]
  );

  const usersCount = useMemo(() => {
    const emails = new Set(registeredUsers.filter((u) => u.role === "admin").map((u) => u.email));
    emails.add(DEMO_ADMIN.email);
    return emails.size;
  }, [registeredUsers]);

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Total Users", value: usersCount },
    { label: "Total Revenue", value: formatPrice(revenue) },
    { label: "Unread Messages", value: unreadCount },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="mb-3 font-semibold">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">No orders found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex items-center justify-between py-2">
                  <span className="truncate pr-2">{o.id} — {o.customer}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${statusColor[o.status]}`}>{o.status}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Recent Products</h2>
          {products.length === 0 ? (
            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">No products found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
              {products.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2">
                  <span className="truncate pr-2">{p.title}</span>
                  <span>{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Recent Messages</h2>
          {messages.length === 0 ? (
            <p className="py-4 text-sm text-gray-500 dark:text-gray-400">No messages found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-center justify-between py-2">
                  <span className="truncate pr-2">{m.name} — {m.subject}</span>
                  {!m.read && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">New</span>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/products" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">Manage Products</Link>
          <Link to="/dashboard/orders" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">View Orders</Link>
          <Link to="/dashboard/users" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">View Users</Link>
          <Link to="/dashboard/messages" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">View Messages</Link>
        </div>
      </Card>
    </div>
  );
}