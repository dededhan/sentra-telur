export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import Link from "next/link";

interface SustainabilitySection {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

const DEFAULT_SECTIONS = [
  {
    id: -1,
    title: "Pemberdayaan Pakan Alami & Ramah Lingkungan",
    description: "Kami menerapkan sistem pertanian sirkular di mana pakan ayam diproduksi dengan meminimalkan jejak karbon. Kami bekerja sama dengan petani lokal untuk menyediakan bahan baku jagung dan bekatul berkualitas tinggi, menyeimbangkan ekosistem tani sekitar sekaligus mengurangi polusi logistik.",
    imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop",
    order: 0,
    createdAt: new Date()
  },
  {
    id: -2,
    title: "Pengelolaan Limbah Organik Zero-Waste",
    description: "Kotoran ayam dari peternakan kami tidak dibuang begitu saja. Melalui proses fermentasi modern, kami mengubah seluruh limbah menjadi pupuk organik bermutu tinggi yang dibagikan secara gratis kepada komunitas petani sekitar untuk menyuburkan lahan mereka. Langkah nyata kami mewujudkan pertanian berkelanjutan tanpa limbah berbahaya.",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800&auto=format&fit=crop",
    order: 1,
    createdAt: new Date()
  }
];

export default async function SustainabilityPage() {
  let sections: SustainabilitySection[] = [];
  
  try {
    sections = await prisma.sustainabilitySection.findMany({
      orderBy: {
        order: "asc"
      }
    });
  } catch (error) {
    console.error("Gagal memuat data sustainability:", error);
  }

  // Jika kosong di database, gunakan default agar halaman tetap cantik dan berisi
  const displaySections = sections.length > 0 ? sections : DEFAULT_SECTIONS;

  return (
    <main className="flex-grow bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-green-50 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-6 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-widest">
            Komitmen Kami
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            Responsibility & Sustainability
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Menghasilkan telur berkualitas tinggi sembari menjaga harmoni alam dan berkontribusi secara sosial bagi masyarakat berkelanjutan.
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
            Ingin Tahu Lebih Banyak Tentang Praktik Kami?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 font-light max-w-2xl mx-auto">
            Hubungi kami untuk kolaborasi, kunjungan kemitraan, atau informasi detail tentang operasional peternakan kami.
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
