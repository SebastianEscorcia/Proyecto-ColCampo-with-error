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
              .filter((p) => p.quantity > 0), 
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
  const handleRemove = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === product.id) {
          const filteredPersons = item.persons.filter(
            (p) => p.personId !== person.personId
          );
          return filteredPersons.length > 0
            ? { ...item, persons: filteredPersons }
            : null; 
        }
        return item;
      }).filter(Boolean); 
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="quantity-cart">
      <button
        className="remove-button"
        onClick={handleRemove}
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
        max={person.stock} 
      />
      <button className="increase-button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityCart;
