import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import { formatPrice } from "../../utils/helpers";

export default function ProductsManagement() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=30");
  // CRUD is simulated: the list is kept in localStorage
  const [products, setProducts] = useLocalStorage("admin-products", []);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (data && products.length === 0) setProducts(data.products);
  }, [data, products.length, setProducts]);

  // useCallback: stable function reference
  const deleteProduct = useCallback(
    (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    [setProducts]
  );

  const saveEdit = (e) => {
    e.preventDefault();
    setProducts((prev) => prev.map((p) => (p.id === editing.id ? editing : p)));
    setEditing(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditing((prev) => ({
      ...prev,
      [name]: name === "title" || name === "category" ? value : Number(value),
    }));
  };

  if (loading && products.length === 0) return <Loading message="Loading products..." />;
  if (error && products.length === 0) return <ErrorMessage />;

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700";

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Products Management</h1>

      {products.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img src={p.thumbnail} alt="" className="h-10 w-10 rounded bg-gray-100 object-contain" />
                      <span className="line-clamp-1">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">⭐ {p.rating}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => navigate(`/products/${p.id}`)}>View</Button>
                      <Button variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                      <Button variant="danger" onClick={() => setDeleting(p)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title="Edit Product" onClose={() => setEditing(null)}>
          <form onSubmit={saveEdit} className="space-y-3">
            <input name="title" value={editing.title} onChange={handleEditChange} className={inputClass} placeholder="Title" required />
            <input name="category" value={editing.category} onChange={handleEditChange} className={inputClass} placeholder="Category" required />
            <input name="price" type="number" min="0" step="0.01" value={editing.price} onChange={handleEditChange} className={inputClass} placeholder="Price" required />
            <input name="stock" type="number" min="0" value={editing.stock} onChange={handleEditChange} className={inputClass} placeholder="Stock" required />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete Product" onClose={() => setDeleting(null)}>
          <p className="mb-4">Delete <strong>{deleting.title}</strong>?</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteProduct(deleting.id);
                setDeleting(null);
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}