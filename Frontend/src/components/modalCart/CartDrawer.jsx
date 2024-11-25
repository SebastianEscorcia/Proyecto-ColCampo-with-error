import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import CartComponent from '../CartComponent';
import "../../Styles/cartDrawer.css";
function CartDrawer({ isOpen, toggleDrawer }) {
  return (
    <Drawer size={600} open={isOpen} onClose={toggleDrawer} direction="right" className="drawerCart">
      <CartComponent />
    </Drawer>
  );
}

export default CartDrawer;
