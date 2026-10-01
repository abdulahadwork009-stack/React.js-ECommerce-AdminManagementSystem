import { useState, useMemo, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Products() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100");
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const searchRef = useRef(null);

  // useRef: auto-focus the search input on page load
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const categories = useMemo(() => {
    if (!data) return ["all"];
    return ["all", ...new Set(data.products.map((p) => p.category))];
  }, [data]);

  // useMemo: recalculated only when data, search or category change
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.products
      .filter((p) => category === "all" || p.category === category)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
  }, [data, search, category]);

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