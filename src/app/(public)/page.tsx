import AboutSnippet from "@/components/AboutSnippet";
import PartnerSlider from "@/components/PartnerSlider";
import FAQSection from "@/components/FAQSection";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Award, Zap, Leaf, Users, TrendingUp, Shield } from "lucide-react";

export default async function Home() {
  const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });
  const about = await prisma.about.findUnique({ where: { id: 1 } });
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col font-sans bg-white flex-grow">
      {/* 1. HERO SECTION - Enhanced */}
      <section
        className="relative w-full min-h-[85vh] flex items-center justify-center bg-gray-900 bg-cover bg-center"
        style={{
          backgroundImage: `url(${settings?.heroImage || "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2000&auto=format"})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16">
          <div className="inline-block mb-6 px-6 py-2 bg-orange-500/20 border border-orange-400 rounded-full">
            <span className="text-orange-300 font-semibold text-sm">
              ⭐ Dipercaya Sejak 2006
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            {settings?.heroHeadline || "BANG TELOR: Farm Jatiasih"}
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-8 leading-relaxed font-light">
            Produsen & Supplier Telur Ayam Premium Berkualitas Tinggi untuk
            Industri Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/product"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Jelajahi Produk
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5 STATS SECTION */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black mb-2">18+</div>
              <p className="text-lg font-semibold opacity-90">
                Tahun Pengalaman
              </p>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">30+</div>
              <p className="text-lg font-semibold opacity-90">Mitra Bisnis</p>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">500+</div>
              <p className="text-lg font-semibold opacity-90">
                Pelanggan Aktif
              </p>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">100%</div>
              <p className="text-lg font-semibold opacity-90">
                Kepuasan Kurasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US SECTION */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Mengapa Memilih BANG TELOR?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami berkomitmen memberikan nilai terbaik dengan standar kualitas
              internasional
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Kualitas Premium",
                desc: "Telur berkualitas tinggi dengan nutrisi lengkap",
              },
              {
                icon: Leaf,
                title: "Ramah Lingkungan",
                desc: "Proses produksi berkelanjutan dan bertanggung jawab",
              },
              {
                icon: Zap,
                title: "Pengiriman Cepat",
                desc: "Distribusi jangkauan luas ke seluruh nusantara",
              },
              {
                icon: Users,
                title: "Pelayanan Terpercaya",
                desc: "Tim profesional siap membantu kebutuhan Anda",
              },
              {
                icon: TrendingUp,
                title: "Harga Kompetitif",
                desc: "Pricing yang adil dengan kualitas terjamin",
              },
              {
                icon: Shield,
                title: "Standar Higienis",
                desc: "Sertifikasi dan prosedur keamanan pangan ketat",
              },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Produk Unggulan
              </h2>
              <p className="text-gray-600 text-lg">
                Koleksi telur premium pilihan terbaik kami
              </p>
            </div>
            <Link
              href="/product"
              className="hidden md:block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center md:hidden">
            <Link
              href="/product"
              className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SNIPPET SECTION */}
      <AboutSnippet about={about} />

      {/* 5. PARTNER SECTION */}
      <PartnerSlider partners={partners} />

      {/* 6. COMMITMENT SECTION - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black">
            Komitmen Pada Kualitas
          </h2>
          <p className="text-xl font-light leading-relaxed">
            BANG TELOR: Farm Jatiasih menghadirkan telur berkualitas tinggi
            dengan standar operasional ketat. Dari penerimaan bahan baku,
            produksi pakan ayam, manajemen produksi, penelitian kualitas, hingga
            distribusi langsung ke konsumen—semuanya diawasi dengan cermat.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
            {[
              "Pakan Berkualitas",
              "Manajemen Modern",
              "QC Ketat",
              "Distribusi Cepat",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4"
              >
                <p className="font-semibold text-sm">{item}</p>
              </div>
            ))}
          </div>
          <Link
            href="/product"
            className="inline-block mt-6 px-8 py-4 bg-white text-orange-700 font-bold rounded-xl hover:bg-gray-100 transition shadow-xl hover:shadow-2xl"
          >
            Jelajahi Koleksi Produk
          </Link>
        </div>
      </section>

      {/* 7. VIDEO SECTION - Enhanced */}
      <section className="py-24 px-4 sm:px-8 w-full bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Kenali Farm Kami
            </h2>
            <p className="text-xl text-gray-300">
              Saksikan perjalanan telur berkualitas dari farm hingga meja Anda
            </p>
          </div>
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700">
            {settings?.videoUrl ? (
              <iframe
                src={settings.videoUrl}
                title="Farm Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 bg-gray-800">
                <span className="text-6xl mb-4">🎥</span>
                <p className="text-lg">Video akan ditampilkan di sini</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-200">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Siap Bermitra Dengan Kami?
          </h2>
          <p className="text-xl text-gray-600">
            Hubungi tim profesional kami untuk penawaran khusus dan solusi telur
            berkualitas tinggi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition shadow-lg"
            >
              Hubungi Kami Sekarang
            </Link>
            <Link
              href="/product"
              className="px-8 py-4 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition"
            >
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <FAQSection faqs={faqs} />
    </main>
  );
}
