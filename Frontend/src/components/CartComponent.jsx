import { useContextCart } from "../context/CartContext";
import Detailcart from "./Cart/DetailCart";
function CartComponent({ product }) {
  const { cart } = useContextCart();

  return (
    <div>
      <div className="cartBody">
        <h2>Carrito de compras</h2>
        <Detailcart />

        <div className="cart-details-totals">
          <div className="total">90</div>
          <div className="total">$150.000</div>
        </div>
      </div>
      <div className="cartFooter">
        <button>Comprar</button>
      </div>
    </div>
  );
}

export default CartComponent;
