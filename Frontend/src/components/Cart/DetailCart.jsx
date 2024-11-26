import "../../Styles/cartDrawer.css";
import { useContextCart } from "../../context/CartContext";
import ProductCard from "../ProductCard";
import ListPersonCart from "./ListPersonCart";

function DetailCart() {
  const { cart, setCart } = useContextCart();

  const handleRemoveProduct = (productId) => {
    if (
      window.confirm(
        "¿Está seguro de que desea eliminar este producto del carrito?"
      )
    ) {
      setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productId)
      );
    }
  };


  const sumTotal = (product) => {
    return product.persons.reduce((total, person) => total + person.quantity, 0); 
  }

  const sumTotalPrice = (product) => {
    debugger;
    return (product.persons.reduce((acc, r) => acc + (r.quantity * r.price), 0)) * 1000;
  }

  return (
    <div className="detail-cart">
      {cart.map((product) => {
        // Añadir debugger aquí
        debugger; // Esto detendrá la ejecución cuando se ejecute este punto del código.

        return (
          <>
            <div key={product.id} className="container-details">
              <button
                className="remove-product-button"
                onClick={() => {
                  debugger; // Detiene la ejecución justo antes de manejar la eliminación.
                  handleRemoveProduct(product.id);
                }}
              >
                ×
              </button>
              {/* Componente del producto */}
              <ProductCard product={product} />

              {/* Tabla de personas asociadas */}
              <ListPersonCart product={product} />
            </div>
            {cart.length > 0 && (
              <div className="cart-details-totals">
                <div className="total">{sumTotal(product)}</div>
                <div className="total">$ {sumTotalPrice(product)}</div>
              </div>
            )}
            <br />
          </>
        );
      })}
    </div>
  );
}

export default DetailCart;
