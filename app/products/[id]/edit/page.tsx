"use client";

import Link from "next/link";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { initialProducts } from "../../../lib/dummyData";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const product = initialProducts.find((p) => p.id === id) || null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API delay instead of actual DB mutation
        setTimeout(() => {
            setIsSubmitting(false);
            router.push("/products");
        }, 800);
    };

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <i className="ri-loader-4-line text-4xl text-rose-600 animate-spin"></i>
                <p className="mt-4 text-gray-500">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/products"
                    className="text-gray-500 hover:text-gray-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100"
                >
                    <i className="ri-arrow-left-line text-xl"></i>
                    <span className="sr-only">Back to Products</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                    <p className="mt-1 text-sm text-gray-500">Update details for {product.name}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 space-y-8">
                    {/* General Information */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">General Information</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        defaultValue={product.name}
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        defaultValue={product.category}
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    >
                                        <option>Face</option>
                                        <option>Lips</option>
                                        <option>Eyes</option>
                                        <option>Skincare</option>
                                        <option>Tools</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="url"
                                        name="image"
                                        id="image"
                                        required
                                        defaultValue={product.image}
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Inventory */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Pricing & Inventory</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div>
                                <label htmlFor="wholesalePrice" className="block text-sm font-medium leading-6 text-gray-900">
                                    Wholesale Price ($)
                                </label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="wholesalePrice"
                                        id="wholesalePrice"
                                        required
                                        step="0.01"
                                        min="0"
                                        defaultValue={product.wholesalePrice}
                                        className="block w-full rounded-lg border-0 py-2.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="sellingPrice" className="block text-sm font-medium leading-6 text-gray-900">
                                    Selling Price ($)
                                </label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        id="sellingPrice"
                                        required
                                        step="0.01"
                                        min="0"
                                        defaultValue={product.sellingPrice}
                                        className="block w-full rounded-lg border-0 py-2.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Current Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        required
                                        min="0"
                                        defaultValue={product.stock}
                                        className="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-red-600 hover:text-red-500 flex items-center gap-1"
                    >
                        <i className="ri-delete-bin-line"></i>
                        Delete Product
                    </button>
                    <div className="flex items-center gap-x-4">
                        <Link
                            href="/products"
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin"></i>
                                    Saving Changes...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
