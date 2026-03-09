"use client";

import { useState } from "react";
import { initialProducts } from "../lib/dummyData";
import { Product } from "../lib/types";

export default function POSPage() {
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = initialProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.product.id === productId) {
                        const newQuantity = item.quantity + delta;
                        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
    const tax = subtotal * 0.08; // Example 8% tax
    const total = subtotal + tax;

    const handleCheckout = () => {
        if (cart.length === 0) return;
        alert(`Success! Checked out $${total.toFixed(2)}`);
        setCart([]);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)] p-4 max-w-[1600px] mx-auto">
            {/* Products Selection Area */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <i className="ri-search-line text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                            placeholder="Search products by name or category (e.g. lipstick)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                        <i className="ri-barcode-line text-xl"></i>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                disabled={product.stock === 0}
                                className={`flex flex-col text-left bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group ${product.stock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.stock === 0 && (
                                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">OUT OF STOCK</span>
                                        </div>
                                    )}
                                    {product.stock > 0 && product.stock <= 10 && (
                                        <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                            LOW
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 flex flex-col flex-1">
                                    <span className="text-xs font-medium text-rose-600 mb-1">{product.category}</span>
                                    <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-900">${product.sellingPrice.toFixed(2)}</span>
                                        <span className="text-xs text-gray-500">{product.stock} in stock</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-96 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Current Sale</h2>
                    <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <i className="ri-shopping-cart-2-line text-6xl opacity-50"></i>
                            <p className="text-sm">Scan or add items to cart</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product.id} className="flex gap-3 group">
                                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-sm font-medium text-gray-900 leading-tight">{item.product.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <i className="ri-close-line text-lg"></i>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-900">${item.product.sellingPrice.toFixed(2)}</span>
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, -1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 shadow-sm border border-gray-200 text-gray-600"
                                            >
                                                <i className="ri-subtract-line text-xs"></i>
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, 1)}
                                                disabled={item.quantity >= item.product.stock}
                                                className="w-6 h-6 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 shadow-sm border border-gray-200 text-gray-600 disabled:opacity-50"
                                            >
                                                <i className="ri-add-line text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Tax (8%)</span>
                            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-base font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-rose-600">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-500 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <i className="ri-bank-card-line text-xl"></i>
                        Pay ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
}
