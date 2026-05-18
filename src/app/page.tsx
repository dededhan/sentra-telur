import AboutSnippet from "@/components/AboutSnippet";
import PartnerSlider from "@/components/PartnerSlider";
import FAQSection from "@/components/FAQSection";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });
  const about = await prisma.about.findUnique({ where: { id: 1 } });
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });

  return (
    <main className="flex flex-col font-sans bg-gray-50 flex-grow">
      {/* 1. HERO SECTION */}
      <section 
        className="relative w-full h-[80vh] flex items-center justify-center bg-gray-800 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${settings?.heroImage || 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2000&auto=format'})`, 
          backgroundBlendMode: 'overlay' 
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
            {settings?.heroHeadline || "Selamat datang di SENTRA TELUR: Farm Ciampea"}
          </h1>
          <p className="mt-6 text-xl text-gray-200">
            Dipercaya Sejak Tahun 2006 Sebagai Produsen & Supplier Telur Ayam Kebutuhan Industri Berkualitas
          </p>
        </div>
      </section>

      {/* 2. ABOUT SNIPPET SECTION */}
      <AboutSnippet about={about} />

      {/* 3. PARTNER SECTION */}
      <PartnerSlider partners={partners} />

      {/* 4. COMMITMENT SECTION */}
      <section className="py-24 bg-gradient-to-br from-amber-700 to-orange-900 text-white text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold">Komitmen Pada Proses</h2>
          <p className="text-xl font-light leading-relaxed">
            SENTRA TELUR: Farm Ciampea konsisten dalam memberikan produk terbaik kepada para konsumen. Kami memiliki standar operasional prosedur yang ketat, mulai dari penerimaan bahan baku pakan, produksi pakan ayam, manajemen produksi telur, penelitian kualitas telur, sampai dengan distribusi telur langsung ke tangan konsumen.
          </p>
          <Link href="/product" className="inline-block mt-8 px-8 py-4 bg-white text-orange-900 font-bold rounded-full hover:bg-gray-100 transition shadow-xl">
            Lihat Produk Kami
          </Link>
        </div>
      </section>

      {/* 5. VIDEO SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">The Home For Our Farm</h2>
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200 border border-gray-300">
          {settings?.videoUrl ? (
            <iframe 
              src={settings.videoUrl} 
              title="Farm Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full"
            ></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 bg-gray-100">
              <span className="text-4xl mb-4">🎥</span>
              <p>Video Youtube / MP4 akan ditampilkan di sini (Ditambahkan Server via CMS)</p>
            </div>
          )}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <FAQSection faqs={faqs} />
    </main>
  );
}
