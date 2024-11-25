import '../../Styles/detailsProduct.css';
import QuantityCart from './QuantityCart'


function ListPersonCart({ persons, onRemovePerson, onUpdateQuantity }) {
  return (
    <div className="product-details">
      <table>
        <thead>
          <tr>
            <th>Campesino</th>
            <th>Cantidad disponible</th>
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
                  onUpdateQuantity={(newQuantity) =>
                    onUpdateQuantity(person.personId, newQuantity)
                  }
                />
              </td>
              <td>${person.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPersonCart;