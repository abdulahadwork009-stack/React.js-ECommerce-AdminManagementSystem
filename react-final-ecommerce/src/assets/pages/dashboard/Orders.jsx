import { useState, useMemo } from "react";
import { useOrders } from "../../context/OrdersContext";
import { ORDER_STATUSES, statusColor, formatPrice } from "../../utils/helpers";
import EmptyState from "../../components/EmptyState";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewing, setViewing] = useState(null);

  const filteredOrders = useMemo(
    () => orders.filter((o) => statusFilter === "All" || o.status === statusFilter),
    [orders, statusFilter]
  );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
        >
          <option>All</option>
          {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState message="No orders found." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Products</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3">{o.products}</td>
                  <td className="p-3">{formatPrice(o.total)}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="p-3">{o.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setViewing(o)}>View</Button>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
                      >
                        {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <Button variant="danger" onClick={() => updateOrderStatus(o.id, "Cancelled")}>Cancel</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <Modal title={`Order ${viewing.id}`} onClose={() => setViewing(null)}>
          <div className="space-y-3 text-sm">
            <p><strong>Customer:</strong> {viewing.customer}</p>
            {viewing.email && <p><strong>Email:</strong> {viewing.email}</p>}
            {viewing.shipping && (
              <p>
                <strong>Ship to:</strong>{" "}
                {[
                  viewing.shipping.address1,
                  viewing.shipping.address2,
                  viewing.shipping.city,
                  viewing.shipping.state,
                  viewing.shipping.zip,
                  viewing.shipping.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            <p><strong>Date:</strong> {viewing.date}</p>
            <p><strong>Status:</strong> {viewing.status}</p>

            {viewing.items ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {viewing.items.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span className="pr-2">{item.title} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">{viewing.products} item(s)</p>
            )}

            <p className="text-base font-bold">Total: {formatPrice(viewing.total)}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}