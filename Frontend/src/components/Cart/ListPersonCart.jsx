
function ListPersonCart(persona) {
  return(

    <>
      <h2>Persona: {persona.nombre}</h2>
      <table>
        <thead>
          <tr>
            <th>Campesino</th>
            <th>Cantidad</th>
            <th>Precio c/u</th>
          </tr>
        </thead>
        <tbody>
          {persona.map((campesino) => (
            <tr key={campesino.id}>
              <td>{campesino.nombre}</td>
              <td>{campesino.cantidad}</td>
              <td>{campesino.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
    
}

export default ListPersonCart