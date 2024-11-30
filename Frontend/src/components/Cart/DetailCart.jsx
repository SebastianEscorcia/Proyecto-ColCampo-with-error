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
  };
  
  const sumTotalPrice = (product) => {
    const total = product.persons.reduce(
      (acc, r) => acc + r.quantity * r.price,
      0
    );
    return Math.round(total * 1000); 
  };

  return (
    <div className="detail-cart">
      {cart.map((product) => {
        
        return (
          <>
            <div key={product.id} className="container-details">
              <button 
                className="remove-product-button"
                onClick={() => {
                  
                  handleRemoveProduct(product.id);
                }}
              >
                ×
              </button>
              
              <ProductCard producto={{ ...product, image: product.image || "" }} />

              
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
