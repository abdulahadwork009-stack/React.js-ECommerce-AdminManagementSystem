export default function EmptyState({ message = "No products found." }) {
  return <div className="py-16 text-center text-gray-500 dark:text-gray-400">{message}</div>;
}