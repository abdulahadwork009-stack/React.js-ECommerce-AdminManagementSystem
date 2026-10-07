import { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage("orders", []);

  // Purane dummy orders (jin mein items nahi hote) ek baar saaf karo
  useEffect(() => {
    if (orders.some((o) => !Array.isArray(o.items))) {
      setOrders((prev) => prev.filter((o) => Array.isArray(o.items)));
    }
  }, [orders, setOrders]);

  const placeOrder = useCallback(
    ({ customer, email, items, totalItems, total, shipping }) => {
      const lastNumber = orders.reduce(
        (max, o) => Math.max(max, Number(String(o.id).replace("ORD-", "")) || 0),
        1000
      );
      const order = {
        id: `ORD-${lastNumber + 1}`,
        customer,
        email,
        products: totalItems,
        items,
        total,
        status: "Pending",
        date: new Date().toISOString().slice(0, 10),
        shipping,
      };
      setOrders((prev) => [order, ...prev]); // naya order sab se upar
      return order;
    },
    [orders, setOrders]
  );

  const updateOrderStatus = useCallback(
    (id, status) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),
    [setOrders]
  );

  const value = useMemo(
    () => ({ orders, placeOrder, updateOrderStatus }),
    [orders, placeOrder, updateOrderStatus]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export const useOrders = () => useContext(OrdersContext);