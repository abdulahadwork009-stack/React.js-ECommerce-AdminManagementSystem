import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { formatPrice } from "../utils/helpers";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  return (
    <Container className="py-8">
      <Link to="/products" className="mb-6 inline-block text-indigo-600 hover:underline">← Back to Products</Link>

      {loading && <Loading message="Loading product..." />}
      {error && <ErrorMessage message="Something went wrong. Please try again." />}

      {product && (
        <div className="grid gap-8 md:grid-cols-2">
          <img src={product.thumbnail} alt={product.title} className="w-full rounded-xl bg-white object-contain p-4 dark:bg-gray-800" />
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
            <p className="text-2xl font-bold text-indigo-600">{formatPrice(product.price)}</p>
            <ul className="space-y-1 text-sm">
              <li><strong>Category:</strong> <span className="capitalize">{product.category}</span></li>
              <li><strong>Brand:</strong> {product.brand || "N/A"}</li>
              <li><strong>Rating:</strong> ⭐ {product.rating}</li>
              <li><strong>Discount:</strong> {product.discountPercentage}%</li>
              <li><strong>Stock:</strong> {product.stock}</li>
            </ul>
            <Button onClick={() => addToCart(product)} className="mt-4">Add to Cart</Button>
          </div>
        </div>
      )}
    </Container>
  );
}