"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { name: "Dashboard", href: "/", icon: "ri-home-smile-2-line" },
    { name: "Products", href: "/products", icon: "ri-vip-crown-2-line" },
    { name: "POS", href: "/pos", icon: "ri-shopping-bag-3-line" },
    { name: "Sales", href: "/sales", icon: "ri-receipt-line" },
];

export default function TopNav() {
    const pathname = usePathname();

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30">
                            <i className="ri-shining-fill text-xl"></i>
                        </div>
                        <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Pomaah Cosmetics
                        </h1>
                        <h1 className="sm:hidden text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Pomaah
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive
                                        ? "bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-200/50"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <i className={`${item.icon} text-lg ${isActive ? 'animate-pulse' : ''}`}></i>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                            <div className="hidden sm:flex flex-col text-right">
                                <span className="text-sm font-bold text-gray-900">Admin User</span>
                                <span className="text-xs text-gray-500">Store Manager</span>
                            </div>
                            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-rose-100 p-0.5">
                                <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <i className="ri-user-smile-line text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white/95 backdrop-blur-md border-t border-rose-100 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full py-1.5 transition-all ${isActive
                                    ? "text-rose-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <i className={`${item.icon} text-xl mb-0.5 ${isActive ? 'animate-pulse' : ''}`}></i>
                            <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
