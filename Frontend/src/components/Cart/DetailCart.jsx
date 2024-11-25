import "../../Styles/cartDrawer.css";
import { useContextCart } from "../../context/CartContext";
import ProductCard from "../ProductCard";
import ListPersonCart from "./ListPersonCart";

function DetailCart({ handleUpdateQuantity }) {
  const { cart, setCart } = useContextCart();

  const handleRemoveProduct = (productId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto del carrito?")) {
      setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productId)
      );
    }
  };

  const handleRemovePerson = (productId, personId) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                persons: product.persons.filter(
                  (person) => person.personId !== personId
                ),
              }
            : product
        )
        .filter((product) => product.persons.length > 0) 
    );
  };

  return (
    <div className="detail-cart">
      {cart.map((product) => (
        <div key={product.id} className="container-details">
          <button className="remove-product-button" onClick={() => handleRemoveProduct(product.id)}>×</button>
          {/* Componente del producto */}
          <ProductCard product={product} />

          {/* Tabla de personas asociadas */}
          <ListPersonCart
            persons={product.persons}
            onRemovePerson={(personId) => handleRemovePerson(product.id, personId)}
            onUpdateQuantity={(personId, newQuantity) => handleUpdateQuantity(product.id, personId, newQuantity)}
          />
        </div>
      ))}
    </div>
  );
}

export default DetailCart;
