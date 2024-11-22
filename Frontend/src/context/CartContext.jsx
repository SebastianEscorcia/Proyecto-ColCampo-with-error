import { createContext, useContext } from "react";
import { useState } from "react";
const CartContext = createContext();

export const useContextCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "Debe usar este componente dentro de un contexto AuthUsuarioContext"
    );
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
