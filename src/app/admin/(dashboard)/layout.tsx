import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Panel | BANG TELOR",
  robots: "noindex, nofollow", // Mencegah Google index halaman admin
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Simple topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            Sistem Manajemen Konten (CMS)
          </h2>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}

