import { useParams } from "react-router-dom";
import { usarProductoContext } from "../context/ProductContext";
import ProductList from "../components/ProductsList";
import { useEffect, useState } from "react";
import "../Styles/pageProductos.css"

function Productos() {
  const { searchTerm } = useParams();
  const { productosFiltrados, setFiltro } = usarProductoContext();
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (searchTerm) {
      setFiltro(searchTerm);
    } else {
      setFiltro(""); // Restaurar todos los productos si no hay filtro
    }
  }, [searchTerm, setFiltro]);

  const handleCategoryChange = (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada);
    setFiltro(categoriaSeleccionada); // Aplica el filtro al contexto
  };

  return (
    <div className="productos-container">
      <aside className="sidebar">
        <h2>Filtros</h2>
        <ul className="filter-list">
          <li onClick={() => handleCategoryChange("")}>Todos</li>
          <li onClick={() => handleCategoryChange("frutas")}>Frutas</li>
          <li onClick={() => handleCategoryChange("verduras")}>Verduras</li>
          <li onClick={() => handleCategoryChange("lácteos")}>Lácteos</li>
        </ul>
      </aside>
      <main className="main-content">
        <h1>Bienvenido a productos</h1>
        {searchTerm && (
          <p className="search-result">Resultados para: <strong>{searchTerm}</strong></p>
        )}
        <ProductList productos={productosFiltrados} />
      </main>
    </div>
  );
}

export default Productos;
