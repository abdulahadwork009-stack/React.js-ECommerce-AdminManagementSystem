import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
      <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
    </div>
  );
}