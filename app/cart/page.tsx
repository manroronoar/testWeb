"use client";

import Cart from '../../components/Cart';
import useCart from '../../hooks/useCart';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  console.log('Cart:', cart);

  return (
    <div>
      <h1>Cart</h1>
      <Cart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}