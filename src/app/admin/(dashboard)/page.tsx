import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const totalProducts = await prisma.product.count();
  const totalFaqs = await prisma.fAQ.count();
  const totalPartners = await prisma.partner.count();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang di Panel Admin! 🎉
          </h1>
          <p className="text-gray-500 mt-2">
            Dari sini Anda bisa mengatur produk, konten profil, dan FAQ website
            BANG TELOR Jatiasih dengan sangat mudah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Total Produk</h3>
          <p className="text-4xl font-extrabold text-orange-600">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Total FAQ
          </h3>
          <p className="text-4xl font-extrabold text-blue-600">{totalFaqs}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Total Partner
          </h3>
          <p className="text-4xl font-extrabold text-amber-500">{totalPartners}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Status Web</h3>
          <p className="text-xl font-bold text-green-600 mt-2 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>{" "}
            Online
          </p>
        </div>
      </div>
    </div>
  );
}

