import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./assets/context/ThemeContext.jsx";
import { AuthProvider } from "./assets/context/AuthContext.jsx";
import { ProductsProvider } from "./assets/context/ProductsContext.jsx";
import { OrdersProvider } from "./assets/context/OrdersContext.jsx";
import { MessagesProvider } from "./assets/context/MessagesContext.jsx";
import { CartProvider } from "./assets/context/CartContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductsProvider>
            <OrdersProvider>
              <MessagesProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </MessagesProvider>
            </OrdersProvider>
          </ProductsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);