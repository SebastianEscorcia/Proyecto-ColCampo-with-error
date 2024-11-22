import React from 'react';
import '../Styles/detailsProduct.css';
import ProductCard from '../components/ProductCard';
import { useContextCart } from '../context/CartContext';

function DetailsProduct({ producto, personas }) {
  const { addToCart } = useContextCart();

  return (
    <div className="details-product">
      <ProductCard producto={producto} />
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
            {personas.map((persona, index) => (
              <tr key={index}>
                <td>{persona.personName}</td>
                <td>{persona.stock}</td>
                <td>${persona.price}</td>
                <td>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(persona)}
                  >
                    Agregar al carrito
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailsProduct;
