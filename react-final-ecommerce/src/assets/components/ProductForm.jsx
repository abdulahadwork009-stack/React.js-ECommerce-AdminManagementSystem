import { useState } from "react";
import Button from "./Button";

// Bahar ki website par depend nahi: image na ho to ye inline placeholder dikhega
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#6b7280" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'
  );

const toForm = (p = {}) => ({
  title: p.title ?? "",
  description: p.description ?? "",
  category: p.category ?? "",
  brand: p.brand ?? "",
  price: p.price ?? "",
  stock: p.stock ?? "",
  discountPercentage: p.discountPercentage ?? "",
  thumbnail: p.thumbnail ?? "",
});

export default function ProductForm({ initialValues, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(toForm(initialValues));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Title is required.";
    if (!form.description.trim()) err.description = "Description is required.";
    if (!form.category.trim()) err.category = "Category is required.";
    if (form.price === "" || Number(form.price) <= 0) err.price = "Enter a price greater than 0.";
    if (form.stock === "" || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock)))
      err.stock = "Stock must be a whole number (0 or more).";
    if (
      form.discountPercentage !== "" &&
      (Number(form.discountPercentage) < 0 || Number(form.discountPercentage) > 100)
    )
      err.discountPercentage = "Discount must be between 0 and 100.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim().toLowerCase(),
      brand: form.brand.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      discountPercentage: Number(form.discountPercentage || 0),
      thumbnail: form.thumbnail.trim() || PLACEHOLDER_IMAGE,
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700";

  // Component ki jagah function: har keystroke par input dobara nahi banta, focus nahi jata
  const renderField = ({ name, label, required = false, as = "input", ...rest }) => {
    const Tag = as;
    return (
      <div>
        <label htmlFor={`product-${name}`} className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Tag
          id={`product-${name}`}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={inputClass}
          {...rest}
        />
        {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      {renderField({ name: "title", label: "Title", required: true, placeholder: "e.g. Essence Mascara" })}
      {renderField({ name: "description", label: "Description", required: true, as: "textarea", rows: 3, placeholder: "Short product description" })}
      {renderField({ name: "category", label: "Category", required: true, placeholder: "e.g. beauty, laptops" })}
      {renderField({ name: "brand", label: "Brand (optional)", placeholder: "e.g. Apple" })}
      {renderField({ name: "price", label: "Price ($)", required: true, type: "number", min: "0", step: "0.01", placeholder: "0.00" })}
      {renderField({ name: "stock", label: "Stock (quantity available)", required: true, type: "number", min: "0", placeholder: "0" })}
      {renderField({ name: "discountPercentage", label: "Discount (%) (optional)", type: "number", min: "0", max: "100", placeholder: "0" })}
      {renderField({ name: "thumbnail", label: "Image URL (optional)", placeholder: "https://..." })}
      <Button type="submit" className="w-full">{submitLabel}</Button>
    </form>
  );
}