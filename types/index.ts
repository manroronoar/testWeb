export interface Product {
    productID: string;
    productName: string;
    unitPrice: number;
    quantityInStock: number;
  }
  
  export interface CartItem {
    productID: string;
    productName: string;
    unitPrice: number;
    quantity: number;
  }
  
  export interface UpdateStockRequest {
    productID: string;
    quantityInStock: number;
  }