import { useContextCart } from "../context/CartContext";
import { usarContexto } from "../context/AuthUsuarioContext";
import Detailcart from "./Cart/DetailCart";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import  FormularioRegistro from "./FormularioRegistro";
import Login from "../Pages/Login";

function CartComponent() {
  const { cart, saveSales } = useContextCart();
  const { showLoginDialog , setShowLoginDialog} = usarContexto();
  
  const calculateTotals = () => {
    const total = cart.reduce((acc, r) => {
      return (
        acc +
        r.persons.reduce(
          (subAcc, per) => subAcc + per.quantity * per.price,
          0
        )
      );
    }, 0);
    return Math.round(total * 1000); 
  };

  return (
    <div className="cart-component">
      <div className="cartBody">
        <h2>Carrito de compras</h2>
        <Detailcart />
      </div>
      <div className="cart-total">
        {" "}
        <div>Valor total: ${calculateTotals()}</div>{" "}
      </div>
      <div className="cartFooter">
        <button onClick={saveSales}>Comprar</button>
      </div>
      <Dialog
        header="Inicial sesión o registrate"
        visible={showLoginDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!showLoginDialog) return;
          setShowLoginDialog(false);
        }}
      >
        <TabView>
          <TabPanel header="Iniciar sesión">
            <Login />
          </TabPanel>
          <TabPanel header="Registrarse">
            <FormularioRegistro />
          </TabPanel>
        </TabView>
      </Dialog>
    </div>
  );
}

export default CartComponent;
