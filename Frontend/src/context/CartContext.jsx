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
      // Verifica si el producto ya existe en el carrito
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualiza las personas asociadas
        updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];

        // Busca si la persona ya está en el producto
        let existingPerson = existingProduct.persons.find(
          (person1) => person1.personId === parseInt(person.personId, 10)
        );

        if (existingPerson) {
          // Incrementa la cantidad si la persona ya existe
          existingPerson.cantidad += person.cantidad;
        } else {
          // Agrega la nueva persona si no existe
          existingProduct.persons.push(person);
        }

        // Actualiza el carrito con los cambios al producto
        updatedCart[existingProductIndex] = existingProduct;
      } else {
        // Si el producto no existe, agrégalo con la persona asociada
        updatedCart = [
          ...prevCart,
          {
            ...product,
            persons: [person],
          },
        ];
      }

      // Guarda el carrito actualizado en localStorage
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
