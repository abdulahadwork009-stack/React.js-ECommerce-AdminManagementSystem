import { Link } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { mockOrders, formatPrice, statusColor } from "../../utils/helpers";

const stats = [
  { label: "Total Products", value: "194" },
  { label: "Total Orders", value: "1,284" },
  { label: "Total Users", value: "3,420" },
  { label: "Total Revenue", value: "$48,920" },
];

export default function Dashboard() {
  const { data } = useFetch("https://dummyjson.com/products?limit=5");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">Recent Orders</h2>
          <ul className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
            {mockOrders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex items-center justify-between py-2">
                <span>{o.id} — {o.customer}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${statusColor[o.status]}`}>{o.status}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Recent Products</h2>
          <ul className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
            {data?.products.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2">
                <span className="truncate pr-2">{p.title}</span>
                <span>{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/products" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">Manage Products</Link>
          <Link to="/dashboard/orders" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">View Orders</Link>
          <Link to="/dashboard/users" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">View Users</Link>
        </div>
      </Card>
    </div>
  );
}