"use client";

import { useState } from "react";
import { initialSales } from "../lib/dummyData";

export default function SalesHistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("all");

    const filteredSales = initialSales.filter((sale) => {
        const matchesSearch = sale.id.toLowerCase().includes(searchTerm.toLowerCase());

        // Basic date filtering logic using string matching against ISO dates for demo
        const todayStr = new Date().toISOString().split('T')[0];
        const saleDateStr = new Date(sale.date).toISOString().split('T')[0];

        let matchesDate = true;
        const saleDateObj = new Date(sale.date);
        const todayObj = new Date();

        if (dateFilter === "today") {
            matchesDate = todayStr === saleDateStr;
        } else if (dateFilter === "yesterday") {
            // eslint-disable-next-line
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            matchesDate = yesterday === saleDateStr;
        } else if (dateFilter === "week") {
            // Check if within the last 7 days for simplicity
            // eslint-disable-next-line
            const lastWeek = new Date(Date.now() - 7 * 86400000);
            matchesDate = saleDateObj >= lastWeek;
        } else if (dateFilter === "month") {
            matchesDate = saleDateObj.getMonth() === todayObj.getMonth() && saleDateObj.getFullYear() === todayObj.getFullYear();
        } else if (dateFilter === "year") {
            matchesDate = saleDateObj.getFullYear() === todayObj.getFullYear();
        }

        return matchesSearch && matchesDate;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sales History</h1>
                    <p className="mt-2 text-sm text-gray-500">View and manage past transactions.</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1 w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <i className="ri-search-line text-gray-400"></i>
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-lg border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                        placeholder="Search by Receipt ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-auto">
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="block w-full sm:w-48 rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                    >
                        <option value="all">All Dates</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">Past 7 Days</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Receipt ID</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total Amount</th>
                                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Profit</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredSales.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 sm:pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                                <i className="ri-receipt-line text-xl"></i>
                                            </div>
                                            <span className="font-mono text-sm font-medium text-gray-900 uppercase">
                                                #{sale.id}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900">{new Date(sale.date).toLocaleDateString()}</span>
                                            <span className="text-xs">{new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-5 text-sm text-gray-500">
                                        <div className="flex flex-col gap-1">
                                            {sale.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{item.quantity}x</span>
                                                    <span className="truncate max-w-[200px]" title={item.productName}>{item.productName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-bold text-right">
                                        ${sale.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-green-600 font-medium text-right bg-green-50/10">
                                        +${sale.profit.toFixed(2)}
                                    </td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button className="text-gray-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100">
                                            <i className="ri-printer-line text-lg mr-2"></i>
                                            Print
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredSales.length === 0 && (
                        <div className="text-center py-12">
                            <i className="ri-history-line text-4xl text-gray-300 mb-3"></i>
                            <p className="text-sm text-gray-500">No transactions found for the selected criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
