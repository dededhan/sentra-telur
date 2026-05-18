import prisma from "@/lib/prisma";

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
    <main className="flex-grow bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Kolom Gambar Kiri */}
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt={title}
            className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
          />
        </div>

        {/* Kolom Teks Kanan */}
        <div className="w-full md:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          {/* Whitespace pre-wrap berguna agar enter/spasi dari CMS nanti bisa ter-render memanjang ke bawah perlahan */}
          <div className="text-xl text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
            {description}
          </div>
        </div>
      </div>
    </main>
  );
}

