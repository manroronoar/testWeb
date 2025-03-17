"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types';
import ProductList from '../../components/ProductList';
import Cart from '../../components/Cart';
import useCart from '../../hooks/useCart';

const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get('http://localhost:5130/api/Products/ProductAndStock');
  return res.data;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const updateStock = (productID: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === productID
          ? { ...product, quantityInStock: product.quantityInStock - quantity }
          : product
      )
    );
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* ส่วนแสดงรายการสินค้า */}
      <div style={{ flex: 2 }}>
        <h1>Products</h1>
        <ProductList
          products={products}
          onAddToCart={(product, quantity) => addToCart(product, quantity, updateStock)}
        />
      </div>

      {/* ส่วนแสดงตะกร้า */}
      <div style={{ flex: 1 }}>
        <h1>Cart</h1>
        <Cart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}