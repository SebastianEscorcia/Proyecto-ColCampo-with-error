import ProductCard from './ProductCard';
import '../Styles/productlist.css'; 

function ProductList({ products }) {
  return (
    <section className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductList;
