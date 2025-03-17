import { NextResponse } from 'next/server';
import { UpdateStockRequest } from '../../../types';

export async function POST(request: Request) {
  const updates: UpdateStockRequest[] = await request.json();

  // Logic to update stock in the database
  console.log('Updating stocks:', updates);

  return NextResponse.json({ success: true });
}