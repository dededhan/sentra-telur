import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Produk Kami | Sentra Telur Ciampea",
  description: "Daftar produk telur ayam berkualitas dari Sentra Telur Ciampea",
};

export default async function ProductPage() {
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

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
    <main className="flex-grow bg-gray-50 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header/Intro */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Produk Kami
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            SENTRA TELUR: Farm Ciampea sebagai produsen telur melayani segala
            bentuk penjualan telur ayam segar dari skala kecil sampai besar
            termasuk distributor, agen, modern market, horeka, industri food and
            beverage, dan retailer. Area distribusi kami saat ini meliputi Jawa
            Tengah, Jawa Barat, JABODETABEK, Kalimantan Barat, Bali, Nusa
            Tenggara Barat dan Nusa Tenggara Timur.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <ProductCard key={p.id || p.slug} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
