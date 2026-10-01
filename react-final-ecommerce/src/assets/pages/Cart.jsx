import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Container from "../components/Container";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../utils/helpers";

export default function Cart() {
  const { cart, totalItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Container className="py-8">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <EmptyState message="Your cart is empty." />
          <Link to="/products" className="text-indigo-600 hover:underline">Browse products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <Card className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p>Total items: <strong>{totalItems}</strong></p>
              <p className="text-xl">Total price: <strong>{formatPrice(totalPrice)}</strong></p>
            </div>
            <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
          </Card>
        </div>
      )}
    </Container>
  );
}