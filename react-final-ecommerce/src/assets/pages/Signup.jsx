import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { validateEmail } from "../utils/helpers";

export default function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", adminCode: "" });
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!validateEmail(form.email)) err.email = "Enter a valid email.";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) err.confirmPassword = "Passwords do not match.";
    if (!form.adminCode.trim()) err.adminCode = "Admin access code is required.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const result = signup(form);
    if (result.success) {
      navigate("/login", {
        state: { message: "Admin account created successfully. Please login.", success: true },
      });
    } else {
      setSignupError(result.error);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700";

  return (
    <Container className="py-16">
      <Card className="mx-auto max-w-md">
        <h1 className="mb-1 text-2xl font-bold">Create Admin Account</h1>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Only store admins need an account. Customers can shop without signing up.
        </p>
        {signupError && <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">{signupError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input ref={nameRef} name="name" value={form.name} onChange={handleChange} placeholder="Full name" className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" className={inputClass} />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div>
            <input name="adminCode" type="password" value={form.adminCode} onChange={handleChange} placeholder="Admin access code" className={inputClass} />
            {errors.adminCode && <p className="mt-1 text-sm text-red-500">{errors.adminCode}</p>}
          </div>
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <p className="mt-4 text-sm">
          Already have an admin account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </Card>
    </Container>
  );
}