import { useContextCart } from "../context/CartContext";
import Detailcart from "./Cart/DetailCart";
import { useState, useEffect } from "react";

function CartComponent({ product }) {
  const { cart, setCart } = useContextCart();
  const [totalStock, setTotalStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotals = (cart) => {
    const totalStockSum = cart.reduce(
      (sum, product) =>
        sum +
        product.persons.reduce(
          (personSum, person) => personSum + (person.selectedQuantity ?? 1),
          0
        ),
      0
    );

    const totalPriceSum = cart.reduce(
      (sum, product) =>
        sum +
        product.persons.reduce(
          (personSum, person) =>
            personSum + (person.selectedQuantity ?? 1) * person.price *1000,
          0
        ),
      0
    );

    setTotalStock(totalStockSum);
    setTotalPrice(totalPriceSum);
  };

  // Function to update quantity in cart
  const handleUpdateQuantity = (productId, personId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) => ({
        ...product,
        persons: product.persons.map((person) =>
          product.id === productId && person.personId === personId
            ? { ...person, selectedQuantity: newQuantity }
            : person
        ),
      }));
      calculateTotals(updatedCart);
      return updatedCart;
    });
  };

  useEffect(() => {
    calculateTotals(cart);
  }, [cart]);

  return (
    <div className="cart-component">
      <div className="cartBody">
        <h2>Carrito de compras</h2>
        <Detailcart handleUpdateQuantity={handleUpdateQuantity} />
        {cart.length > 0 && (
          <div className="cart-details-totals">
            <div className="total">{totalStock}</div>
            <div className="total">${totalPrice.toLocaleString()}</div>
            
          </div>
        )}
      </div>
      <div className="cart-total"> <div>Valor total: ${totalPrice.toLocaleString()}</div> </div>
      <div className="cartFooter">
        <button>Comprar</button>
      </div>
    </div>
  );
}

export default CartComponent;
