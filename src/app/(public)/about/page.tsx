import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AboutPage() {
  const about = await prisma.about.findUnique({ where: { id: 1 } });

  const title = about?.title || "Tentang BANG TELOR: Farm Jatiasih";
  const description =
    about?.description ||
    "BANG TELOR: Farm Jatiasih konsisten dalam memberikan produk terbaik kepada para konsumen. Kami memiliki standar operasional prosedur yang ketat, mulai dari penerimaan bahan baku pakan, produksi pakan ayam, manajemen produksi telur, penelitian kualitas telur, sampai dengan distribusi telur langsung ke tangan konsumen.\n\nKami melayani segala bentuk penjualan dari skala kecil sampai besar termasuk industri food and beverage, HOREKA, dan modern market dengan distribusi mencakup pulau Jawa, Bali, hingga Nusa Tenggara.";
  const image =
    about?.image ||
    "https://images.unsplash.com/photo-1598928506311-c55d4c353f58?q=80&w=800&auto=format&fit=crop";

  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-6 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
            Misi kami adalah memberikan telur berkualitas tinggi dengan standar internasional
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          {/* Kolom Gambar Kiri */}
          <div className="w-full md:w-1/2 group">
            <img
              src={image}
              alt={title}
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px] group-hover:shadow-2xl transition-all duration-500"
            />
          </div>

          {/* Kolom Teks Kanan */}
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Perjalanan Kami
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap font-light space-y-6">
              {description}
            </div>
            <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

