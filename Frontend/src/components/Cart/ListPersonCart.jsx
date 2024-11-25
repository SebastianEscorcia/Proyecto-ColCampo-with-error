import '../../Styles/detailsProduct.css';
import QuantityCart from './QuantityCart';

function ListPersonCart({ persons, onRemovePerson, onUpdateQuantity }) {
  return (
    <div className="product-details">
      <table>
        <thead>
          <tr>
            <th>Campesino</th>
            <th>Cantidad elegida</th>
            <th>Precio c/u</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.personName}</td>
              <td>
                <QuantityCart
                  person={person}
                  maxQuantity={person.stock}
                  onRemove={onRemovePerson}
                  onUpdateQuantity={(personId, newQuantity) =>
                    onUpdateQuantity(personId, newQuantity)
                  }
                />
              </td>
              <td>${person.price*1000}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default ListPersonCart;
