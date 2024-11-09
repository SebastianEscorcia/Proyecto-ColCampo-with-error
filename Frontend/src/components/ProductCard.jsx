import '../Styles/productcard.css'
function ProductCard({ product }) {
  return (
    <div className="product-card">
      {" "}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />{" "}
      <div className="product-info">
        {" "}
        <h3 className="product-name">{product.name}</h3>{" "}
        <p className="product-price">${product.price}</p>{" "}
        <p className="product-description">{product.description}</p>{" "}
      </div>{" "}
    </div>
  );
}

export default ProductCard;