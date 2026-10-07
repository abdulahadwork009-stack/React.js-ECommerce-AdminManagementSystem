import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { formatPrice, validateEmail } from "../utils/helpers";

const initialForm = {
  email: "",
  fullName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const emailRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    emailRef.current?.focus(); // page khulte hi pehla input focus
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!validateEmail(form.email)) err.email = "Enter a valid email.";
    if (!form.fullName.trim()) err.fullName = "Full name is required.";
    if (!form.address1.trim()) err.address1 = "Street address is required.";
    if (!form.city.trim()) err.city = "City is required.";
    if (!form.zip.trim()) err.zip = "Zip / postal code is required.";
    if (!form.country.trim()) err.country = "Country is required.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const order = placeOrder({
      customer: form.fullName.trim(),
      email: form.email.trim(),
      items: cart,
      totalItems,
      total: totalPrice,
      shipping: {
        address1: form.address1.trim(),
        address2: form.address2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        zip: form.zip.trim(),
        country: form.country.trim(),
      },
    });
    clearCart();
    setPlacedOrder(order);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700";

  // component ki jagah function: har keystroke par input dobara nahi banta, focus nahi jata
  const renderField = (name, label, required = false, extra = {}) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
        {label} {required && "*"}
      </label>
      <input name={name} value={form[name]} onChange={handleChange} className={inputClass} {...extra} />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

  // Order place ho gaya
  if (placedOrder) {
    return (
      <Container className="py-12">
        <Card className="mx-auto max-w-lg text-center">
          <h1 className="mb-2 text-2xl font-bold text-green-600">Thank you! Your order has been placed.</h1>
          <p className="mb-1">Order ID: <strong>{placedOrder.id}</strong></p>
          <p className="mb-1">Total: <strong>{formatPrice(placedOrder.total)}</strong></p>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            We will contact you at {placedOrder.email}.
          </p>
          <Link to="/products" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Continue Shopping
          </Link>
        </Card>
      </Container>
    );
  }

  // Cart khali
  if (cart.length === 0) {
    return (
      <Container className="py-12 text-center">
        <EmptyState message="Your cart is empty." />
        <Link to="/products" className="text-indigo-600 hover:underline">Browse products</Link>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Link to="/cart" className="mb-4 inline-block text-sm text-indigo-600 hover:underline">← Back to Cart</Link>
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: form */}
        <div className="lg:col-span-2">
          <Card>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
              <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wide">Contact Information</h2>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Email *</label>
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-wide">Shipping Address</h2>
                {renderField("fullName", "Full Name", true)}
                {renderField("address1", "Street Address", true)}
                {renderField("address2", "Apartment, suite, etc. (optional)")}
                <div className="grid gap-3 sm:grid-cols-3">
                  {renderField("city", "City", true)}
                  {renderField("state", "State / Province")}
                  {renderField("zip", "Zip / Postal Code", true)}
                </div>
                {renderField("country", "Country", true)}
              </section>
            </form>
          </Card>
        </div>

        {/* Right: order summary */}
        <div>
          <Card className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide">Order Summary</h2>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-lg bg-gray-100 object-contain dark:bg-gray-700" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <span className="flex-1 truncate text-sm">{item.title}</span>
                  <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button type="submit" form="checkout-form" className="w-full">Place Order</Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}