import { createContext, useContext } from "react";
import { useState } from "react";
import SaleService from "../services/Sales.Service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartDrawerContext } from './CartDrawerContext';
import { usarContexto } from './AuthUsuarioContext';
import { Dialog } from 'primereact/dialog';


const CartContext = createContext();

export const useContextCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "Debe usar este componente dentro de un contexto AuthUsuarioContext"
    );
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { toggleDrawerHandler } = useCartDrawerContext();
  const { isAuthenticated, toggleLoginDialog } = usarContexto();

  const calculateTotal = () => {
    setTotal(cart.reduce((total, product) => total + product.price, 0));
  };

  const addToCart = (person, product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];

        let existingPerson = existingProduct.persons.find(
          (person1) => person1.personId === parseInt(person.personId, 10)
        );

        if (existingPerson) {
          existingPerson.quantity += person.quantity;
        } else {
          person.quantity = 1;
          existingProduct.persons.push(person);
        }

        updatedCart[existingProductIndex] = existingProduct;
      } else {
        const personWithQuantity = {...person, quantity: 1 };
        updatedCart = [
          ...prevCart,
          {
            ...product,
            persons: [personWithQuantity],
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const saveSales = () => {
    if(!isAuthenticated){
      toggleLoginDialog();
      return;
    }

    const sales = JSON.parse(localStorage.getItem("cart")) || [];

    SaleService.createSale(sales)
      .then((response) => {
        toggleDrawerHandler();
        toast("Se guardó la venta correctamente");
      })
      .catch((error) => {
        console.error("Error al guardar la venta:", error);
      });
  }

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart, saveSales}}>
      {children}
    </CartContext.Provider>
  );
}
