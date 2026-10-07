import { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

const ProductsContext = createContext(null);
const API_URL = "https://dummyjson.com/products?limit=0";

export function ProductsProvider({ children }) {
  // null = abhi API se load nahi hua, [] = load ho chuka (khali bhi ho sakta hai)
  const [products, setProducts] = useLocalStorage("store-products", null);
  const { data, loading: fetching, error } = useFetch(products === null ? API_URL : null);

  useEffect(() => {
    if (data && products === null) setProducts(data.products);
  }, [data, products, setProducts]);

  const addProduct = useCallback(
    (product) => {
      setProducts((prev) => {
        const list = prev ?? [];
        const nextId = list.reduce((max, p) => Math.max(max, p.id), 0) + 1;
        return [{ ...product, id: nextId }, ...list]; // naya product sab se pehle
      });
    },
    [setProducts]
  );

  const updateProduct = useCallback(
    (updated) =>
      setProducts((prev) => (prev ?? []).map((p) => (p.id === updated.id ? { ...p, ...updated } : p))),
    [setProducts]
  );

  const deleteProduct = useCallback(
    (id) => setProducts((prev) => (prev ?? []).filter((p) => p.id !== id)),
    [setProducts]
  );

  const loading = products === null && !error;

  const value = useMemo(
    () => ({
      products: products ?? [],
      loading: loading && fetching,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [products, loading, fetching, error, addProduct, updateProduct, deleteProduct]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);