export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import Link from "next/link";

interface SustainabilitySection {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

const DEFAULT_SECTIONS = [
  {
    id: -1,
    category: "responsibility",
    title: "Pemberdayaan Masyarakat & UMKM Lokal",
    description: "Kami percaya bertumbuh bersama masyarakat adalah inti tanggung jawab kami. BANG TELOR secara rutin mengadakan pelatihan manajemen ternak skala rumah tangga dan mensuplai kebutuhan telur berkualitas tinggi dengan harga khusus bagi pengusaha kuliner mikro (UMKM) di sekitar area Jatiasih untuk meningkatkan kesejahteraan ekonomi warga.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    order: 0,
    createdAt: new Date()
  },
  {
    id: -2,
    category: "responsibility",
    title: "Program Edukasi & Gizi Anak",
    description: "Sebagai produsen protein hewani terpercaya, kami memiliki kepedulian tinggi terhadap penurunan angka stunting. Melalui program CSR berkelanjutan, kami mendistribusikan ribuan butir telur sehat setiap bulan untuk anak-anak balita di posyandu binaan serta menyelenggarakan edukasi gizi seimbang bagi ibu rumah tangga setempat.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    order: 1,
    createdAt: new Date()
  }
];

export default async function ResponsibilityPage() {
  let sections: SustainabilitySection[] = [];
  
  try {
    sections = await prisma.sustainabilitySection.findMany({
      where: {
        category: "responsibility"
      },
      orderBy: {
        order: "asc"
      }
    });
  } catch (error) {
    console.error("Gagal memuat data responsibility:", error);
  }

  // Jika kosong di database, gunakan default agar halaman tetap cantik dan berisi
  const displaySections = sections.length > 0 ? sections : DEFAULT_SECTIONS;

  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-green-50 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-6 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-widest">
            Tanggung Jawab Sosial
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            Responsibility
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Mewujudkan kepedulian sosial yang nyata melalui kontribusi pangan bergizi, pemberdayaan ekonomi lokal, dan kesejahteraan komunitas.
          </p>
        </div>
        
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-teal-200 blur-[100px]" />
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-32">
          {displaySections.map((section, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={section.id} 
                className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Kolom Gambar */}
                <div className="w-full md:w-1/2 group">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl aspect-[4/3]">
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Kolom Teks */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                      Langkah {index + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {section.title}
                  </h2>
                  <div className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
                    {section.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black">
            Ingin Tahu Lebih Banyak Tentang Praktik Sosial Kami?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 font-light max-w-2xl mx-auto">
            Hubungi kami untuk kolaborasi, penyaluran program sosial, atau kemitraan pemberdayaan komunitas.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
