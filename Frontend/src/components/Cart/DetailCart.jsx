import "../../Styles/cartDrawer.css";
import { useContextCart } from "../../context/CartContext";
import ProductCard from "../ProductCard";
import ListPersonCart from "./ListPersonCart";
function DetailCart() {
  const { cart, setCart } = useContextCart();

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

  const handleUpdateQuantity = (productId, personId, newStock) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                persons: product.persons.map((person) =>
                  person.personId === personId
                    ? { ...person, stock: newStock }
                    : person
                ),
              }
            : product
        )
        .filter((product) => product.persons.some((p) => p.stock > 0)) 
    );
  };

  return (
    <div className="detail-cart">
      {cart.map((product) => (
        <div key={product.id} className="container-details">
          {/* Componente del producto */}
          <ProductCard product={product} />

          {/* Tabla de personas asociadas */}
          <ListPersonCart
            persons={product.persons}
            onRemovePerson={(personId) => handleRemovePerson(product.id, personId)}
            onUpdateQuantity={(personId, newStock) =>
              handleUpdateQuantity(product.id, personId, newStock)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default DetailCart;
