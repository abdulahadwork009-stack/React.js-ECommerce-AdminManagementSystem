import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import ProtectedRoute from "./assets/components/ProtectedRoute";

import Home from "./assets/pages/Home";
import Products from "./assets/pages/Products";
import ProductDetails from "./assets/pages/ProductDetails";
import Cart from "./assets/pages/Cart";
import Checkout from "./assets/pages/Checkout";
import About from "./assets/pages/About";
import Contact from "./assets/pages/Contact";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import NotFound from "./assets/pages/NotFound";

import DashboardLayout from "./assets/pages/dashboard/DashboardLayout";
import Dashboard from "./assets/pages/dashboard/Dashboard";
import ProductsManagement from "./assets/pages/dashboard/ProductsManagement";
import Orders from "./assets/pages/dashboard/Orders";
import Users from "./assets/pages/dashboard/Users";
import Messages from "./assets/pages/dashboard/Messages";
import Profile from "./assets/pages/dashboard/Profile";
import Settings from "./assets/pages/dashboard/Settings";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Dashboard Routes (admin only) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}