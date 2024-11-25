import { usarProductoContext } from "../context/ProductContext";
import "../Styles/productlist.css";
import ProductCard from "./ProductCard";
import NotFoundImage from "../assets/not_found.svg";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";

function ProductList({ productos: productosProp, loading: loadingProp }) {
  const { productos: productosContext, loading: loadingContext } = usarProductoContext();

  // Usa los productos y loading pasados como prop, si están presentes; de lo contrario, usa el contexto
  const productos = productosProp || productosContext;
  const loading = loadingProp !== undefined ? loadingProp : loadingContext;

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (!Array.isArray(productos) || productos.length === 0) {
    return (
      <div className="no-products">
        <img
          src={NotFoundImage}
          alt="No se encontraron productos"
          className="not-found-image"
        />
        <p>No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <section className="product-list">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </section>
  );
}

export default ProductList;
