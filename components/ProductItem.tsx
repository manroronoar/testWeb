"use client";

import { useState } from 'react';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <li>
      <h3>{product.productName}</h3>
      <p>Price: ${product.unitPrice}</p>
      <p>In Stock: {product.quantityInStock}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        max={product.quantityInStock}
      />
      <button onClick={() => onAddToCart(product, quantity)}>Add to Cart</button>
    </li>
  );
};

export default ProductItem;