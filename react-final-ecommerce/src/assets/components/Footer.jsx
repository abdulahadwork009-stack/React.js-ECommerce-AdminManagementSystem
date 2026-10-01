import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 dark:border-gray-700 dark:bg-gray-800">
      <Container className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} ShopHub. Built with React, Vite &amp; Tailwind.
      </Container>
    </footer>
  );
}