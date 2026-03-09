"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "Dashboard", href: "/", icon: "ri-dashboard-line" },
    { name: "Products", href: "/products", icon: "ri-box-3-line" },
    { name: "POS", href: "/pos", icon: "ri-shopping-cart-2-line" },
    { name: "Sales History", href: "/sales", icon: "ri-history-line" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen flex-col justify-between border-r bg-white w-64">
            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent mb-8">
                    Pomaah Cosmetics
                </h1>

                <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                        ? "bg-rose-50 text-rose-600"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    }`}
                            >
                                <i className={`${item.icon} text-lg`}></i>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-4 text-center text-xs text-gray-500">
                Admin Access
            </div>
        </div>
    );
}
