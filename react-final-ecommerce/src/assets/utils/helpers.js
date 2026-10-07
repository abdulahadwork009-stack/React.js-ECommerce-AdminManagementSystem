export const formatPrice = (n) => `$${Number(n).toFixed(2)}`;

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ORDER_STATUSES = ["Pending", "Processing", "Completed", "Cancelled"];

export const statusColor = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

// Naya admin signup karte waqt ye code dena parta hai
export const ADMIN_SIGNUP_CODE = "ADMIN2026";

// Demo admin (login page par dikhaya jata hai)
export const DEMO_ADMIN = {
  name: "Ali",
  email: "ali@gmail.com",
  password: "123456789",
};