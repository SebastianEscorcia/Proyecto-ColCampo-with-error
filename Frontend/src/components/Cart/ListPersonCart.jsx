import '../../Styles/detailsProduct.css';
import QuantityCart from './QuantityCart';

function ListPersonCart({ product }) {
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
          {product.persons.map((person, index) => (
            <tr key={index}>
              <td>{person.personName}</td>
              <td>
                <QuantityCart
                  person={person}
                  product={product}
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
