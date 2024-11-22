
import {useContextCart} from '../context/CartContext';

function CartComponent({ product }) {
    const {cart, addToCart}= useContextCart();
    
  return (
    <div>
      <h2>Carrito</h2>
      {cart.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  )
}

export default CartComponent