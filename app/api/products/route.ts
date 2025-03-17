import { NextResponse } from 'next/server';

const products = [
  { productID: 'P001', productName: 'shshusawa', unitPrice: 10.00, quantityInStock: 100 },
  { productID: 'P002', productName: 'muxib.lasha', unitPrice: 25.00, quantityInStock: 50 },
  { productID: 'P003', productName: 'usuanwansa@lsd', unitPrice: 20.00, quantityInStock: 75 },
  { productID: 'P004', productName: 'lqlhian', unitPrice: 30.00, quantityInStock: 200 },
  { productID: 'P005', productName: 'usui.fasfun', unitPrice: 15.00, quantityInStock: 120 },
];

export async function GET() {
  return NextResponse.json(products);
}