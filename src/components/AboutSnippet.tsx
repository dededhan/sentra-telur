import Link from "next/link";

export default function AboutSnippet({ about }: { about: any }) {
  const title = about?.title || "Tentang Kami";
  const description =
    about?.description ||
    "SENTRA TELUR: Farm Ciampea adalah peternakan ayam petelur modern yang berdedikasi untuk menghasilkan telur berkualitas tinggi. Kami menerapkan standar ketat dalam setiap proses produksi mulai dari pemilihan pakan hingga pengemasan untuk memastikan kesegaran gizi yang sampai ke meja makan Anda.";
  const image =
    about?.image ||
    "https://images.unsplash.com/photo-1598928506311-c55d4c353f58?q=80&w=800&auto=format&fit=crop";

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2">
        <img
          src={image}
          className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          alt="Tentang Sentra Telur"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {description.substring(0, 200)}...
        </p>
        <Link
          href="/about"
          className="inline-block px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition shadow-md"
        >
          Selengkapnya
        </Link>
      </div>
    </section>
  );
}
