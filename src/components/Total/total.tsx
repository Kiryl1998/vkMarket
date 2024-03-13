import React from 'react';
import { Product } from '../../store/cards/type';

import style from './style.module.css';

interface CartTotalProps {
  cartItems: Product[];
}

const CartTotal: React.FC<CartTotalProps> = ({ cartItems }) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscountedAmount = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.price -
        ((item.price * item.quantity) / 100) * item.discountPercentage),
    0
  );
  console.log(cartItems);

  return (
    <div className={style.cart_total}>
      <h2>Total</h2>
      <p>Total Amount: ${totalAmount}</p>
      <p>Total Discounted Amount: ${totalDiscountedAmount.toFixed(2)}</p>
    </div>
  );
};

export default CartTotal;
