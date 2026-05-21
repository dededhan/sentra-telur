export const dynamic = "force-dynamic";

import AboutSnippet from "@/components/AboutSnippet";
import PartnerSlider from "@/components/PartnerSlider";
import FAQSection from "@/components/FAQSection";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Award, Zap, Leaf, Users, TrendingUp, Shield, MapPin } from "lucide-react";

export default async function Home() {
  let settings = null;
  let about = null;
  let partners: any[] = [];
  let faqs: any[] = [];
  let products: any[] = [];

  try {
    settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });
    about = await prisma.about.findUnique({ where: { id: 1 } });
    partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
    faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
    products = await prisma.product.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal memuat data homepage:", error);
  }

  return (
    <main className="flex flex-col font-sans bg-white flex-grow">
      {/* 1. HERO SECTION - Enhanced with Video Background */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Looping MP4 Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 z-0"
        >
          <source
            src={
              settings?.heroImage && settings.heroImage.endsWith(".mp4")
                ? settings.heroImage
                : "https://assets.mixkit.co/videos/preview/mixkit-chickens-in-a-farm-yard-48768-large.mp4"
            }
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16">
          <div className="inline-block mb-6 px-6 py-2 bg-emerald-500/20 border border-emerald-400 rounded-full">
            <span className="text-emerald-300 font-semibold text-sm">
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
          <div className="flex gap-6 justify-center items-center">
            {/* Google Maps Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings?.address || "BANG TELOR Farm Jatiasih")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border-2 border-emerald-400"
              title="Lokasi Google Maps"
            >
              <MapPin className="w-6 h-6" />
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "6289654032950"}?text=${encodeURIComponent(settings?.whatsappText || "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border-2 border-green-400"
              title="Hubungi WhatsApp"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 0C5.385 0 0 5.387 0 12.035c0 2.125.553 4.195 1.605 6L.516 24l6.113-1.605c1.761.968 3.731 1.48 5.759 1.48C19.034 23.875 24 18.497 24 11.854 24 5.387 18.618 0 12.031 0zm0 21.86a9.924 9.924 0 01-5.068-1.39l-.364-.216-3.766.988.995-3.669-.236-.376A9.905 9.905 0 012.008 12.04c0-5.525 4.496-10.024 10.022-10.024 5.519 0 10.016 4.499 10.016 10.024 0 5.524-4.497 10.02-10.015 10.02v.001v-.001zm5.5-7.514c-.302-.152-1.787-.882-2.064-.984-.277-.101-.479-.152-.68.152-.202.302-.782.983-.958 1.185-.177.202-.353.227-.655.076-1.5-.758-2.618-1.587-3.568-3.037-.202-.303.022-.294.316-.587.213-.213.303-.353.303-.556 0-.203-.102-.379-.177-.531-.076-.151-.68-1.643-.933-2.25-.246-.593-.497-.512-.68-.521h-.58c-.202 0-.53.076-.807.379-.277.303-1.059 1.036-1.059 2.527s1.084 2.932 1.236 3.134c.152.203 2.138 3.262 5.178 4.57 2.455 1.059 3.125.86 3.705.81 1.026-.089 2.373-1.129 2.701-2.22.327-1.092.327-2.028.226-2.22-.1-.192-.378-.293-.68-.445z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 1.5 STATS SECTION */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-500 text-white py-12 px-4">
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
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-emerald-600" />
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

      {/* 2.5 COMPANY CORE VALUES SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">
                ⭐ Budaya & Karakter
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Nilai Inti Perusahaan
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Menciptakan dan memelihara nilai inti perusahaan adalah hal terpenting di <span className="font-bold text-emerald-600">Bang Telor</span>. Nilai inti ini berfungsi sebagai dasar landasan operasional, memandu setiap pengambilan keputusan, dan mencerminkan komitmen kami terhadap integritas, pertumbuhan dan keberlanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                src: "/core-values/berintegritas.jpg",
                title: "Berintegritas",
                desc: "Selalu memegang teguh kejujuran dan standar moral tertinggi dalam setiap tindakan.",
              },
              {
                src: "/core-values/kolaboratif.jpg",
                title: "Kolaboratif",
                desc: "Bekerja sama secara harmonis untuk mencapai hasil terbaik bagi seluruh mitra.",
              },
              {
                src: "/core-values/tuntas_berkualitas.jpg",
                title: "Tuntas Berkualitas",
                desc: "Menyelesaikan setiap tugas dengan standar kualitas produk terbaik tanpa kompromi.",
              },
              {
                src: "/core-values/bertumbuh.jpg",
                title: "Bertumbuh",
                desc: "Senantiasa berinovasi dan terus berkembang bersama demi masa depan yang berkelanjutan.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                      Core Value 0{i + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                </div>
              </div>
            ))}
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
              className="hidden md:block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
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
              className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
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
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white text-center px-4 relative overflow-hidden">
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
            className="inline-block mt-6 px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-gray-100 transition shadow-xl hover:shadow-2xl"
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
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-200">
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
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-lg"
            >
              Hubungi Kami Sekarang
            </Link>
            <Link
              href="/product"
              className="px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition"
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
