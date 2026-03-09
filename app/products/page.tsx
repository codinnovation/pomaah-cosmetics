"use client";

import { useState } from "react";
import Link from "next/link";
import { initialProducts } from "../lib/dummyData";

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = initialProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="mt-2 text-sm text-gray-500">Manage your cosmetic inventory.</p>
                </div>
                <Link
                    href="/products/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors"
                >
                    <i className="ri-add-line text-lg"></i>
                    Add New Product
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1 max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="ri-search-line text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                        placeholder="Search products by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Wholesale</th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Retail</th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Stock</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 sm:pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                                                <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                                            </div>
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right">
                                        ${product.wholesalePrice.toFixed(2)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-medium text-right">
                                        ${product.sellingPrice.toFixed(2)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 text-right">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.stock < 10 ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10" : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                                            }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                                            >
                                                <i className="ri-edit-box-line text-lg"></i>
                                                <span className="sr-only">Edit</span>
                                            </Link>
                                            <button className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50">
                                                <i className="ri-delete-bin-line text-lg"></i>
                                                <span className="sr-only">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <i className="ri-box-3-line text-4xl text-gray-300 mb-3"></i>
                            <p className="text-sm text-gray-500">No products found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
