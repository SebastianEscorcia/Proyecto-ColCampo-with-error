import { useContextCart } from "../context/CartContext";
import { usarContexto } from "../context/AuthUsuarioContext";
import { useState } from "react";
import Detailcart from "./Cart/DetailCart";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import  FormularioRegistro from "./FormularioRegistro";
import Login from "../Pages/Login";

function CartComponent({ product }) {
  const { cart, setCart, saveSales } = useContextCart();
  const { showLoginDialog } = usarContexto();

  const calculateTotals = () => {
    return (
      cart.reduce((acc, r) => {
        return (
          acc +
          r.persons.reduce(
            (subAcc, per) => subAcc + per.quantity * per.price,
            0
          )
        );
      }, 0) * 1000
    );
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
        header="Autenticación"
        visible={showLoginDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
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
