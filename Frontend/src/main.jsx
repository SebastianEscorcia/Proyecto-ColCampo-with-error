import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthUsuarioContext";
import { ProductoProvider } from "./context/ProductContext"; // Importa tu proveedor de contexto de productos
import { CartProvider } from "./context/CartContext"; // Importa tu proveedor de contexto de carrito
import { ToastContainer } from "react-toastify";
import { CartDrawerProvider } from "./context/CartDrawerContext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";


createRoot(document.getElementById("root")).render(
  <Router>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <PrimeReactProvider>
      <AuthProvider>
        <CartDrawerProvider>
          <ProductoProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductoProvider>
        </CartDrawerProvider>
      </AuthProvider>
    </PrimeReactProvider>
  </Router>
);
