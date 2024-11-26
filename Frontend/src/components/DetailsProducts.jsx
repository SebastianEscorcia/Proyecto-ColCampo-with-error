import React from 'react';
import '../Styles/detailsProduct.css';
import ProductCard from '../components/ProductCard';
import { useContextCart } from '../context/CartContext';

function DetailsProduct({ producto, personas }) {
  const { addToCart, cart } = useContextCart();


  const calculateQuantity = (persona) => {
    debugger;
    const quantity = cart.filter((product) => product.id === persona.id).length;
    return quantity > 0? quantity : persona.stock;
  }

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
                <td>{calculateQuantity(persona)}</td>
                <td>${persona.price}</td>
                <td>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(persona, producto)}
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
