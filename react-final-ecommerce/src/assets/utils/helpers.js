export const formatPrice = (n) => `$${Number(n).toFixed(2)}`;

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const mockOrders = [
  { id: "ORD-1001", customer: "Ali Khan", products: 3, total: 249.99, status: "Pending", date: "2026-09-20" },
  { id: "ORD-1002", customer: "Sara Ahmed", products: 1, total: 59.5, status: "Processing", date: "2026-09-21" },
  { id: "ORD-1003", customer: "Usman Tariq", products: 2, total: 120.0, status: "Completed", date: "2026-09-22" },
  { id: "ORD-1004", customer: "Ayesha Noor", products: 5, total: 540.75, status: "Completed", date: "2026-09-23" },
  { id: "ORD-1005", customer: "Hamza Ali", products: 1, total: 19.99, status: "Cancelled", date: "2026-09-24" },
  { id: "ORD-1006", customer: "Zainab Fatima", products: 4, total: 310.0, status: "Processing", date: "2026-09-25" },
];

export const ORDER_STATUSES = ["Pending", "Processing", "Completed", "Cancelled"];

export const statusColor = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};