import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import DetailsProduct from "../components/DetailsProducts";
import { usarProductoContext } from "../context/ProductContext";
import { useState, useEffect } from "react";
import LoadingSpinner from '../components/Spinner/LoadingSpinner'

function ProductDetails() {
  const { id } = useParams();
  const { productos } = usarProductoContext();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const findProduct = (id) => {
      return productos.find((product) => product.id === parseInt(id, 10)); // Encuentra el producto por su ID
    };

    const productoEncontrado = findProduct(id);
    setProducto(productoEncontrado);
  }, [id, productos]);

  if (!producto) {
    return (
      <div>
        <NavBar />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1><strong> Detalles del producto</strong></h1>
      <DetailsProduct producto={producto} />
    </div>
  );
}

export default ProductDetails;
