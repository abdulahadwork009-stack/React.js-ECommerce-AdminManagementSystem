import Container from "../components/Container";
import Card from "../components/Card";

export default function About() {
  return (
    <Container className="py-12">
      <h1 className="mb-4 text-3xl font-bold">About ShopHub</h1>
      <p className="mb-8 max-w-3xl text-gray-600 dark:text-gray-300">
        ShopHub is a React-based e-commerce and admin management system built as a final project.
        It demonstrates authentication, protected routes, API integration, Context, useReducer and more.
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        <Card><h3 className="font-semibold">Our Mission</h3><p className="mt-2 text-sm">Make online shopping simple and fast.</p></Card>
        <Card><h3 className="font-semibold">Our Tech</h3><p className="mt-2 text-sm">React, Vite, React Router and Tailwind CSS.</p></Card>
        <Card><h3 className="font-semibold">Our Data</h3><p className="mt-2 text-sm">Products powered by the DummyJSON API.</p></Card>
      </div>
    </Container>
  );
}