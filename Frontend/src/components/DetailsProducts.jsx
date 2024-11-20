import React from 'react';
import '../Styles/detailsProduct.css';

function DetailsProduct({ producto }) {
  return (
    <div className="details-product">
      <div className="product-card-container">
        <img 
          src={`data:image/jpeg;base64,${producto.imagen}`} 
          alt={producto.name} 
          className="product-image"
        />
      </div>
      <div className="product-details">
        <table>
          <thead>
            <tr>
              <th>Campesino</th>
              <th>Cantidad disponible</th>
              <th>Precio c/u</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{producto.campesino}</td>
              <td>{producto.cantidadDisponible}</td>
              <td>{producto.precio}</td>
              <td>
                <button className="add-to-cart-button">Agregar al carrito</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailsProduct;
