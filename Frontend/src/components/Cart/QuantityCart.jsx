import { useState, useEffect } from 'react';

function QuantityCart({ person, maxQuantity, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(person.selectedQuantity ?? 1); // Inicializar en la cantidad seleccionada o 1

  useEffect(() => {
    setQuantity(person.selectedQuantity ?? 1); // Actualizar si la cantidad seleccionada cambia
  }, [person.selectedQuantity]);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onUpdateQuantity(person.personId, newQuantity); // Pasar también el personId
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(person.personId, newQuantity); // Pasar también el personId
    }
  };

  const handleInputChange = (e) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
      onUpdateQuantity(person.personId, newQuantity); // Pasar también el personId
    } else if (newQuantity < 1) {
      setQuantity(1);
      onUpdateQuantity(person.personId, 1); // Pasar también el personId
    }
  };

  return (
    <div className="quantity-cart">
      <button className="remove-button" onClick={() => onRemove(person.personId)}>
        🗑️
      </button>
      <button
        className="decrease-button"
        onClick={handleDecrease}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleInputChange} 
        min="1" 
        max={maxQuantity} 
      />
      <button
        className="increase-button"
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantityCart;
