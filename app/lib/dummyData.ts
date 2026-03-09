import { Product, Sale } from "./types";

export const initialProducts: Product[] = [
    {
        id: "p1",
        name: "Radiant Glow Foundation",
        category: "Face",
        wholesalePrice: 50,
        sellingPrice: 85,
        stock: 24,
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: "p2",
        name: "Classic Red Lipstick",
        category: "Lips",
        wholesalePrice: 20,
        sellingPrice: 45,
        stock: 15,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: "p3",
        name: "Volumizing Mascara",
        category: "Eyes",
        wholesalePrice: 15,
        sellingPrice: 35,
        stock: 8, // Low stock example
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: "p4",
        name: "Rose Blush Palette",
        category: "Face",
        wholesalePrice: 30,
        sellingPrice: 60,
        stock: 45,
        image: "https://images.unsplash.com/photo-1512496015851-a1c86946ae4e?q=80&w=200&auto=format&fit=crop",
    },
];

export const initialSales: Sale[] = [
    {
        id: "s1",
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        totalAmount: 130, // 85 (foundation) + 45 (lipstick)
        profit: 60, // (85 - 50) + (45 - 20)
        items: [
            { id: "si1", productId: "p1", productName: "Radiant Glow Foundation", quantity: 1, priceAtSale: 85 },
            { id: "si2", productId: "p2", productName: "Classic Red Lipstick", quantity: 1, priceAtSale: 45 },
        ],
    },
    {
        id: "s2",
        date: new Date().toISOString(), // Today
        totalAmount: 70, // 2 * 35 (mascara)
        profit: 40, // 2 * (35 - 15)
        items: [
            { id: "si3", productId: "p3", productName: "Volumizing Mascara", quantity: 2, priceAtSale: 35 },
        ],
    },
];
