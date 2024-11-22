import "../../Styles/cartDrawer.css";
import { useContextCart } from "../../context/CartContext";
import ProductCard from "../ProductCard";
function DetailCart() {
  const { cart } = useContextCart();

  return cart.map(
    (product, index) => (
      console.log("...................."),
      console.log(product),
      (
        <div className="container-details">
          <ProductCard key={index} product={product}></ProductCard>
        </div>
      )
    )
  );
}

export default DetailCart;
