import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import { formatPrice } from "../../utils/helpers";

export default function ProductsManagement() {
  const navigate = useNavigate();
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleAdd = (data) => {
    addProduct({ ...data, rating: 0 });
    setAdding(false);
  };

  const handleEdit = (data) => {
    updateProduct({ ...editing, ...data });
    setEditing(null);
  };

  if (loading) return <Loading message="Loading products..." />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          />
          <Button onClick={() => setAdding(true)}>+ Add Product</Button>
        </div>
      </div>

      {filtered.length === 0 ? (
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
              {filtered.map((p) => (
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

      {adding && (
        <Modal title="Add Product" onClose={() => setAdding(false)}>
          <ProductForm onSubmit={handleAdd} submitLabel="Add Product" />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit Product" onClose={() => setEditing(null)}>
          <ProductForm initialValues={editing} onSubmit={handleEdit} submitLabel="Save Changes" />
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