"use client"; // อย่าลืมเพิ่มบรรทัดนี้

import { useState } from 'react'; // เพิ่มบรรทัดนี้
import { CartItem, Product } from '../types';

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, updateStock: (productID: string, quantity: number) => void) => {
    if (quantity > product.quantityInStock) {
      alert('Not enough stock');
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productID === product.productID);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    updateStock(product.productID, quantity);
  };

  const updateQuantity = (productID: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productID === productID ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productID: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productID !== productID));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice };
};

export default useCart;