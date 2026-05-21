"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  HelpCircle,
  Settings,
  LogOut,
  Egg,
  Info,
  Menu,
  X,
  Leaf
} from "lucide-react";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Kelola Produk", icon: Package, href: "/admin/product" },
    { name: "Kelola FAQ", icon: HelpCircle, href: "/admin/faq" },
    { name: "Tentang Kami", icon: Info, href: "/admin/about" },
    { name: "Sustainability", icon: Leaf, href: "/admin/sustainability" },
    { name: "Pengaturan Profil", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-3 right-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:relative top-0 left-0 h-full bg-white border-r border-gray-100 flex flex-col shadow-xl md:shadow-sm text-gray-800 z-50 transition-transform duration-300 w-64
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 text-emerald-600">
          <Egg className="w-8 h-8 flex-shrink-0" />
          <span className="font-bold text-xl tracking-tight leading-none">
            BANG TELOR
            <br />
            <span className="text-sm text-gray-500 font-medium">Panel Admin</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Area */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar (Logout)
          </button>
        </div>
      </div>
    </>
  );
}
