export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}