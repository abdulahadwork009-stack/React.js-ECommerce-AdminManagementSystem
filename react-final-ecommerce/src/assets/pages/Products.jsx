import { useState, useMemo, useRef, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Products() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => category === "all" || p.category === category)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
  }, [products, search, category]);

  return (
    <Container className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar ref={searchRef} value={search} onChange={setSearch} />
        </div>
        <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
      </div>

      {loading && <Loading message="Loading products..." />}
      {error && <ErrorMessage message="Failed to load products. Something went wrong. Please try again." />}
      {!loading && !error && <ProductList products={filteredProducts} onAddToCart={addToCart} />}
    </Container>
  );
}