export default function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="mx-auto my-8 max-w-md rounded-lg bg-red-50 p-4 text-center text-red-700 dark:bg-red-900/30 dark:text-red-300">
      {message}
    </div>
  );
}