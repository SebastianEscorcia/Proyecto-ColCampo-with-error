import "../Styles/productcard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ producto, config = {} }) {
  const navigate = useNavigate();

  const defaultConfig = {
    showImage: true,
    showName: true,
    showPrice: false,
    showDescription: false,
    showQuantity: false,
    showCategory: false,
    showTags: false,
    showAddButton: false,
  };

  const finalConfig = { ...defaultConfig, ...config };

  const handleAdd = () => {
    navigate(`/products/details/${producto.id}`);
  };

  return (
    <div className="product-card" onClick={handleAdd}>
      {finalConfig.showImage && (
        <img
          src={`data:image/jpeg;base64,${producto?.image}`}
          alt={producto?.name}
          className="product-image"
        />
      )}

      <div className="product-info">
        {finalConfig.showName && (
          <h3 className="product-name">{producto?.name}</h3>
        )}
        {finalConfig.showPrice && (
          <p className="product-price">Precio: {producto?.price}</p>
        )}
        {finalConfig.showDescription && (
          <p className="product-description">{producto?.descripcion}</p>
        )}
        {finalConfig.showQuantity && (
          <p className="product-quantity">
            Cantidad disponible: {producto?.quantity}
          </p>
        )}
        {finalConfig.showCategory && (
          <p className="product-category">Categoría: {producto?.category}</p>
        )}
        {finalConfig.showTags && (
          <div className="product-tags">
            {producto?.tags?.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {finalConfig.showAddButton && (
        <button className="add-button" onClick={handleAdd}>
          Ver detalles
        </button>
      )}
    </div>
  );
}

export default ProductCard;
