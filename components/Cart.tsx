"use client";

import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productID: string, quantity: number) => void;
  onRemoveFromCart: (productID: string) => void;
  onClearCart: () => void; // เพิ่ม prop นี้
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart, totalPrice }) => {
  const handleCheckout = async () => {
    try {
      const updates = cart.map((item) => ({
        productID: item.productID,
        quantityInStock: item.quantity,
      }));
      console.log(JSON.stringify(updates));
      const response = await fetch('http://localhost:5130/api/Stock/UpdateStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        alert('ชำระเงินสำเร็จ และอัปเดตสต็อกเรียบร้อย');
        onClearCart(); // เรียกใช้ onClearCart เพื่อล้างตะกร้า
      } else {
        alert('เกิดข้อผิดพลาดในการชำระเงิน');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productID}>
            <h3>{item.productName}</h3>
            <p>Price: ${item.unitPrice}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.productID, Number(e.target.value))}
              min="1"
            />
            <button onClick={() => onRemoveFromCart(item.productID)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice.toFixed(2)}</p>

      {/* ปุ่มชำระเงิน */}
      <button onClick={handleCheckout} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>
        ชำระเงิน
      </button>
    </div>
  );
};

export default Cart;