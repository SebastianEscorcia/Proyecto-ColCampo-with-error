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
  const [productos, setProductos] = useState([]); // Todos los productos
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados
  const [productosEnPagina, setProductosEnPagina] = useState([]); // Productos en la página actual
  const [filtro, setFiltro] = useState(""); // Filtro actual

  
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [productosPorPagina] = useState(10); // Productos por página
  const [loading, setLoading] = useState(true);

  // Cargar todos los productos al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const productosObtenidos = await productoService.getAllProducts();

        const productosConImagenes = await Promise.all(
          productosObtenidos.map(async (producto) => {
            const image = await ImageService.getImage(producto.image);
            return { ...producto, image, name: producto.name };
          })
        );

        setProductos(productosConImagenes);
        setProductosFiltrados(productosConImagenes); // Inicialmente, todos los productos están filtrados
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Actualizar productos filtrados cuando cambia el filtro
  useEffect(() => {
    if (filtro.trim() === "") {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(
        productos.filter(
          (producto) =>
            producto &&
            producto.name &&
            producto.name.toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }
    setPaginaActual(1); // Reiniciar a la primera página al cambiar el filtro
  }, [filtro, productos]);

  // Calcular los productos de la página actual
  useEffect(() => {
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

    setProductosEnPagina(
      productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto)
    );
  }, [paginaActual, productosFiltrados]);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const registroProducto = async (producto) => {
    const result = await productoService.registrarProducto(producto);
    if (result.success) {
      const nuevoProducto = {
        ...result.data,
        image: await ImageService.getImage(result.data.image),
      };
      setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
    }
    return result;
  };

  const searchProductos = async (searchTerm) => {
    setLoading(true);
    try {
      const resultados = await productoService.searchProducts(searchTerm);
      setProductosFiltrados(resultados); // Actualizar la lista filtrada directamente
    } catch (error) {
      console.error("Error al buscar productos:", error);
    } finally {
      setLoading(false);
    }
  };
  
 

  return (
    <ProductoContext.Provider
      value={{
        productos,
        productosFiltrados, 
        setFiltro, 
        registroProducto,
        searchProductos,  
        loading,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
