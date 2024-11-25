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
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    setTotal(cart.reduce((total, product) => total + product.price, 0));
  };

  const addToCart = (person, product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];

        let existingPerson = existingProduct.persons.find(
          (person1) => person1.personId === parseInt(person.personId, 10)
        );

        if (existingPerson) {
          existingPerson.cantidad += person.cantidad;
        } else {
          existingProduct.persons.push(person);
        }

        updatedCart[existingProductIndex] = existingProduct;
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            persons: [person],
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
