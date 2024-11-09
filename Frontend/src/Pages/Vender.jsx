// Vender.js
import { useState } from 'react';

const Vender = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para crear un nuevo producto
    console.log("Producto creado:", nombreProducto, precioProducto);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Producto:
        <input
          type="text"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
        />
      </label>
      <br />
      <label>
        Precio del Producto:
        <input
          type="text"
          value={precioProducto}
          onChange={(e) => setPrecioProducto(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default Vender;
