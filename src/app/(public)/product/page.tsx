export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Produk Kami | BANG TELOR Jatiasih",
  description: "Daftar produk telur ayam berkualitas dari BANG TELOR Jatiasih",
};

export default async function ProductPage() {
  let dbProducts: any[] = [];
  try {
    dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal memuat data produk:", error);
  }

  // Dummy products if DB is empty for initial showing
  const defaultProducts = [
    {
      id: 1,
      title: "Telur Ayam Negeri Premium",
      slug: "telur-ayam-negeri",
      image:
        "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format&fit=crop",
      description: "",
    },
    {
      id: 2,
      title: "Telur Ayam Omega 3",
      slug: "telur-omega",
      image:
        "https://images.unsplash.com/photo-1587486913049-53fc88980cb6?q=80&w=800&auto=format&fit=crop",
      description: "",
    },
    {
      id: 3,
      title: "Telur Puyuh Segar",
      slug: "telur-puyuh",
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop",
      description: "",
    },
  ];

  const products = dbProducts.length > 0 ? dbProducts : defaultProducts;

  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-emerald-600 to-green-500 px-4 py-20 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            Produk Unggulan Kami
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto">
            Telur berkualitas premium dengan standar ketat untuk memenuhi
            kebutuhan industri Indonesia
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              BANG TELOR: Farm Jatiasih melayani segala bentuk penjualan telur
              ayam segar dari skala kecil hingga besar untuk distributor, agen,
              modern market, HOREKA, industri food and beverage, dan retailer.
              Jangkauan distribusi kami mencakup Jawa Tengah, Jawa Barat,
              JABODETABEK, Kalimantan Barat, Bali, Nusa Tenggara Barat, dan Nusa
              Tenggara Timur.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {products.map((p) => (
              <ProductCard key={p.id || p.slug} product={p} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
