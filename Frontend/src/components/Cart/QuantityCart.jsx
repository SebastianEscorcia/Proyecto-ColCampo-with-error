
function QuantityCart({ person, maxQuantity, onRemove, onUpdateQuantity }) {
  const handleIncrease = () => {
    if (person.stock < maxQuantity) {
      onUpdateQuantity(person.stock + 1);
    }
  };

  const handleDecrease = () => {
    if (person.stock > 0) {
      onUpdateQuantity(person.stock - 1);
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
        disabled={person.stock === 0}
      >
        -
      </button>
      <span>{person.stock}</span>
      <button
        className="increase-button"
        onClick={handleIncrease}
        disabled={person.stock >= maxQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantityCart;
