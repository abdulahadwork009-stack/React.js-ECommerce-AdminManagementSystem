import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { validateEmail, DEMO_ADMIN } from "../utils/helpers";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};

    if (!form.email.trim()) {
      err.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      err.email = "Enter a valid email.";
    }

    if (!form.password) {
      err.password = "Password is required.";
    }

    setErrors(err);

    if (Object.keys(err).length) return;

    const result = login(form.email, form.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setLoginError(result.error);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700";

  const stateMessage = location.state?.message;

  const messageClass = location.state?.success
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-800";

  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Login</h1>

        {stateMessage && (
          <p className={`mb-4 rounded-lg p-3 ${messageClass}`}>
            {stateMessage}
          </p>
        )}

        {loginError && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {loginError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input
              ref={emailRef}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={inputClass}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Need an admin account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline"
          >
            Create one
          </Link>
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Demo admin: {DEMO_ADMIN.email} / {DEMO_ADMIN.password}
        </p>
      </Card>
    </Container>
  );
}