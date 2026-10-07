import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ message: "Please login to continue.", from: location }} />;
  }

  // customer dashboard mein nahi ja sakta
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}