import { useState, useEffect } from "react";
import {useContextCart} from "../../context/CartContext";

function QuantityCart({ product, person }) {
  const { cart, setCart } = useContextCart();

  const handleIncrease = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            persons: item.persons.map((p) =>
              p.personId === person.personId
                ? {
                    ...p,
                    quantity: Math.min(p.quantity + 1, person.stock), // Limita al stock disponible para la persona
                  }
                : p
            ),
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrease = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            persons: item.persons
              .map((p) =>
                p.personId === person.personId
                  ? { ...p, quantity: Math.max(1, p.quantity - 1) }
                  : p
              )
              .filter((p) => p.quantity > 0), // Opcional si no quieres personas con cantidad 0
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleInputChange = (e) => {
    const newQuantity = Math.min(
      parseInt(e.target.value, 10) || 1,
      person.stock // Limita al stock disponible para la persona
    );
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            persons: item.persons.map((p) =>
              p.personId === person.personId
                ? { ...p, quantity: newQuantity }
                : p
            ),
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="quantity-cart">
      <button
        className="remove-button"
        onClick={() => setCart(cart.filter((item) => item.id !== product.id))}
      >
        🗑️
      </button>
      <button className="decrease-button" onClick={handleDecrease}>
        -
      </button>
      <input
        type="number"
        value={
          cart
            .find((item) => item.id === product.id)
            ?.persons.find((p) => p.personId === person.personId)?.quantity || 1
        }
        onChange={handleInputChange}
        min="1"
        max={person.stock} // Agrega el atributo `max` al input
      />
      <button className="increase-button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityCart;
