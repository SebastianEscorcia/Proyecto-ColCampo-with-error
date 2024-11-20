import { usarProductoContext } from '../context/ProductContext';
import '../Styles/productlist.css';
import ProductCard from './ProductCard';
import NotFoundImage from '../assets/not_found.svg';
import LoadingSpinner from '../components/Spinner/LoadingSpinner' 

function ProductList() {
  const { productos, loading } = usarProductoContext();
  if (loading) { return <div className="loading-container"><LoadingSpinner /></div>;; }
  if (!Array.isArray(productos) || productos.length === 0) {
    return (
      <div className="no-products">
        <img src={NotFoundImage} alt="No se encontraron productos" className="not-found-image" />
        <p>No hay productos disponibles.</p>
      </div>
    );
  }
  
  return (
    <section className="product-list">
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto}   />
      ))}
    </section>
  );
}

export default ProductList;
