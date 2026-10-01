export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}