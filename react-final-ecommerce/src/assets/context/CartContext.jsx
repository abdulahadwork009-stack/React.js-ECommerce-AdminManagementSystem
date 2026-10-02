import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

const CartContext = createContext(null);

function loadCart() {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : initialCartState;
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useCallback: stable references so memoized children don't re-render
  const addToCart = useCallback((product) => dispatch({ type: "ADD_TO_CART", payload: product }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }), []);
  const increaseQuantity = useCallback((id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }), []);
  const decreaseQuantity = useCallback((id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);

  const value = useMemo(
    () => ({
      cart, totalItems, totalPrice,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
    }),
    [cart, totalItems, totalPrice, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);