import { createContext, useContext, useEffect, useState } from "react";
import ProductoService from "../services/Product.service";
import ImageService from "../services/Image.service";

export const ProductoContext = createContext();

export const usarProductoContext = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error(
      "usarProductoContext debe ser usado dentro de un ProductoProvider"
    );
  }
  return context;
};

const productoService = ProductoService;

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para la carga

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true); // Inicia la carga
      try {
        const productosObtenidos = await productoService.getAllProducts();
        
        // Usamos Promise.all para esperar a que todas las imágenes se obtengan
        const productosConImagenes = await Promise.all(productosObtenidos.map(async (producto) => {
          const imagen = await ImageService.getImage(producto.image);
          return { ...producto, imagen };
        }));

        setProductos(productosConImagenes);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProductos();
  }, []);

  const registroProducto = async (producto) => {
    const result = await productoService.registrarProducto(producto);
    if (result.success) {
      setProductos([...productos, result.data]);
    }
    return result;
  };

  return (
    <ProductoContext.Provider value={{ productos, registroProducto, loading }}>
      {children}
    </ProductoContext.Provider>
  );
};
