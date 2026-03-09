export interface Product {
    id: string;
    name: string;
    category: string;
    wholesalePrice: number;
    sellingPrice: number;
    stock: number;
    image: string;
}

export interface SaleItem {
    id: string;
    productId: string;
    quantity: number;
    priceAtSale: number;
    productName: string; // denormalized for easier display
}

export interface Sale {
    id: string;
    date: string;
    items: SaleItem[];
    totalAmount: number;
    profit: number;
}
