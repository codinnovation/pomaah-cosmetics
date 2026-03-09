import { initialProducts, initialSales } from "./lib/dummyData";
import Link from "next/link";

export default function Home() {
  const totalProducts = initialProducts.length;
  const totalInventoryValue = initialProducts.reduce((sum, item) => sum + (item.stock * item.wholesalePrice), 0);
  const totalSales = initialSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalProfit = initialSales.reduce((sum, sale) => sum + sale.profit, 0);

  const lowStockItems = initialProducts.filter(item => item.stock < 10);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header section with abstract background */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-8 sm:px-8 sm:py-12 shadow-2xl">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-rose-500 opacity-20 blur-3xl mix-blend-screen"></div>
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-500 opacity-20 blur-3xl mix-blend-screen"></div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Welcome back, <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Pomaah Cosmetics</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mt-4 sm:mt-2">
            Here&apos;s what&apos;s happening with your store today. Track your inventory, review recent sales, and monitor your profit margins all in one place.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-100 transition-all duration-300">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-50 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30">
              <i className="ri-wallet-3-line text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">${totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Profit */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-100 transition-all duration-300">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-50 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-rose-500/30">
              <i className="ri-line-chart-fill text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Profit</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">${totalProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-100 transition-all duration-300">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-50 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
              <i className="ri-shopping-bag-3-line text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-100 transition-all duration-300">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-50 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30">
              <i className="ri-funds-box-line text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Inventory Value</p>
              <p className="text-3xl font-bold tracking-tight text-gray-900">${totalInventoryValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        {/* Recent Sales */}
        <div className="rounded-3xl bg-white shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <i className="ri-history-line"></i>
              </div>
              Recent Sales
            </h3>
            <Link href="/sales" className="text-sm font-semibold text-rose-600 hover:text-rose-700">View All</Link>
          </div>
          <div className="p-0 flex-1">
            <ul className="divide-y divide-gray-50">
              {initialSales.slice(0, 5).map((sale) => (
                <li key={sale.id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors shrink-0">
                      <i className="ri-receipt-line text-lg sm:text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-0.5">Sale #{sale.id.toUpperCase()}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {new Date(sale.date).toLocaleDateString()} <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> {sale.items.reduce((acc, curr) => acc + curr.quantity, 0)} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900 mb-0.5">${sale.totalAmount.toFixed(2)}</p>
                    <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
                      +${sale.profit.toFixed(2)} profit
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-3xl bg-white shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-60"></div>
          <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <i className="ri-error-warning-fill"></i>
              </div>
              <span className="hidden sm:inline">Low Stock Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </h3>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
              {lowStockItems.length} Warnings
            </span>
          </div>
          <div className="p-4 sm:p-6 flex-1">
            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50/50 transition-colors">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-xl shadow-sm border border-white shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-1 leading-tight">{item.name}</p>
                        <span className="text-xs font-medium text-amber-700 bg-amber-100/50 px-2 py-0.5 rounded-md inline-block">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-2 border-t border-amber-100/50 sm:border-0 pt-3 sm:pt-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs sm:text-sm font-bold text-amber-700 shadow-sm ring-1 ring-inset ring-amber-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        {item.stock} left
                      </span>
                      <Link href={`/products/${item.id}/edit`} className="text-xs font-semibold text-rose-600 hover:text-rose-500">Restock Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-checkbox-circle-fill text-4xl"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Inventory Looking Good</h4>
                <p className="text-sm text-gray-500 max-w-sm">All of your products are sufficiently stocked. No immediate action required.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
