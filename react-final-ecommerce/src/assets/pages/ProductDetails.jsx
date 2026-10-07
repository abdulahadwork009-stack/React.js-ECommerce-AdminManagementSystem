import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { formatPrice } from "../utils/helpers";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading: listLoading, error: listError } = useProducts();
  const { addToCart } = useCart();

  // 1) store ki list (API + admin ke changes) mein dhoondo
  const storeProduct = products.find((p) => String(p.id) === id);

  // 2) store load hi na ho saka ho to API se sirf yeh ek product fetch karo
  const { data: fetched, error: fetchError } = useFetch(
    listError && !storeProduct ? `https://dummyjson.com/products/${id}` : null
  );

  const product = storeProduct || (fetched && String(fetched.id) === id ? fetched : null);

  let status = "found";
  if (!product) {
    if (listLoading) status = "loading";
    else if (listError) status = fetchError ? "error" : "loading";
    else status = "notfound";
  }

  return (
    <Container className="py-8">
      <Link to="/products" className="mb-6 inline-block text-indigo-600 hover:underline">← Back to Products</Link>

      {status === "loading" && <Loading message="Loading product..." />}
      {status === "error" && <ErrorMessage message="Something went wrong. Please try again." />}
      {status === "notfound" && <ErrorMessage message="Product not found." />}

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