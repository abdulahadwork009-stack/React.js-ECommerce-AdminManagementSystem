import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ProductList from "../components/ProductList";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  return (
    <>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Welcome to ShopHub</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            A complete React e-commerce and admin management application — browse products,
            manage your cart and run your store from one place.
          </p>
          <Button variant="secondary" className="mt-8 px-6 py-3 text-base" onClick={() => navigate("/products")}>
            View Products
          </Button>
        </Container>
      </section>

      <Container className="py-12">
        <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
        {loading && <Loading message="Loading products..." />}
        {error && <ErrorMessage message="Something went wrong. Please try again." />}
        {!loading && !error && <ProductList products={products.slice(0, 4)} onAddToCart={addToCart} />}
      </Container>
    </>
  );
}