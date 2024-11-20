import '../Styles/productcard.css';
import { useNavigate } from "react-router-dom";

function ProductCard({ producto }) {
  
  const navigate = useNavigate();
  console.log(producto);

  const handleAdd = () => {
    navigate(`/products/details/${producto.id}`);
  };
  
  return (
    <div className="product-card" onClick={handleAdd}>
      <img 
        src={`data:image/jpeg;base64,${producto.imagen}`}
        alt={producto.name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{producto.name}</h3>
        <p className="product-price">${producto.precio}</p>
        <p className="product-description">{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default ProductCard;
