import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import DetailsProduct from "../components/DetailsProducts";
import { usarProductoContext } from "../context/ProductContext";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import Tile from "../components/Layout/Titles";
import ProductService from "../services/Product.service";

function ProductDetails() {
  const { id } = useParams();
  const { productos } = usarProductoContext();
  const [producto, setProducto] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productoEncontrado = productos.find(
          (product) => product.id === parseInt(id, 10)
        );
        setProducto(productoEncontrado);

        if (productoEncontrado) {
          const personasResponse =
            await ProductService.getDetailsProductsPersonByProduct(id);
          setPersonas(personasResponse);
        }
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, productos]);

  if (!producto || loading) {
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
      <Tile title="Detalles del Producto" />
      <DetailsProduct producto={producto} personas={personas} />
    </div>
  );
}

export default ProductDetails;
