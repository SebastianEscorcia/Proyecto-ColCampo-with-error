import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import CartComponent from '../CartComponent';
function CartDrawer({ isOpen, toggleDrawer }) {
  return (
    <Drawer open={isOpen} onClose={toggleDrawer} direction="right" className="bla bla bla">
      <CartComponent />
    </Drawer>
  );
}

export default CartDrawer;
