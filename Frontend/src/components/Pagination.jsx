import "../Styles/pagination.css";

function Pagination({ paginaActual, totalPaginas, cambiarPagina }) {
    return (
      <div className="pagination">
        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${
              paginaActual === index + 1 ? "active" : ""
            }`}
            onClick={() => cambiarPagina(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  }
  export default Pagination;
  