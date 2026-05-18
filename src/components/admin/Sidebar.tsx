import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  HelpCircle,
  Settings,
  LogOut,
  Egg,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Kelola Produk", icon: Package, href: "/admin/products" },
    { name: "Kelola FAQ", icon: HelpCircle, href: "/admin/faq" },
    { name: "Pengaturan Profil", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm text-gray-800">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3 text-orange-600">
        <Egg className="w-8 h-8 flex-shrink-0" />
        <span className="font-bold text-xl tracking-tight leading-none">
          Sentra Telur
          <br />
          <span className="text-sm text-gray-500 font-medium">Panel Admin</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Area */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Keluar (Logout)
        </button>
      </div>
    </div>
  );
}
