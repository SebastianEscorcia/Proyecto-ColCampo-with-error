import { createContext, useContext, useState } from "react";

// Crear el contexto
const CartDrawerContext = createContext();

// Hook personalizado para usar el contexto
export const useCartDrawerContext = () => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error(
      "Debe usar este componente dentro de un CartDrawerProvider"
    );
  }
  return context;
};

// Proveedor del contexto
export function CartDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <CartDrawerContext.Provider value={{ isOpen, toggleDrawerHandler }}>
      {children}
    </CartDrawerContext.Provider>
  );
}
