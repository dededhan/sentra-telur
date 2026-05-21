import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  return {
    title: product
      ? `${product.title} | Bang Telor Jatiasih`
      : "Produk Tidak Ditemukan",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Try fetching from DB
  let product = await prisma.product.findUnique({
    where: { slug },
  });

  // Dummy fallback if no DB products match but the slug matches our dummy ones
  if (!product) {
    const defaultProducts = [
      {
        id: 1,
        title: "Telur Ayam Negeri Premium",
        slug: "telur-ayam-negeri",
        image:
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format&fit=crop",
        description:
          "Telur ayam negeri dengan kualitas terbaik, kaya akan protein dan nutrisi. Diperoleh dari peternakan modern yang menjaga kesehatan ayam secara optimal.",
      },
      {
        id: 2,
        title: "Telur Ayam Omega 3",
        slug: "telur-omega",
        image:
          "https://images.unsplash.com/photo-1587486913049-53fc88980cb6?q=80&w=800&auto=format&fit=crop",
        description:
          "Telur ayam spesial yang dipekaya dengan Omega-3, baik untuk perkembangan otak dan menjaga kesehatan jantung keluarga Anda.",
      },
      {
        id: 3,
        title: "Telur Puyuh Segar",
        slug: "telur-puyuh",
        image:
          "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop",
        description:
          "Telur puyuh berkualitas yang kaya nutrisi. Sangat cocok untuk olahan makanan balita maupun hidangan istimewa keluarga.",
      },
    ];
    product = defaultProducts.find((p) => p.slug === slug) as any;
  }

  if (!product) {
    notFound();
  }

  const waMessage = `Halo, saya tertarik dengan produk ${product.title} dari Bang Telor. Boleh minta info detail dan harganya?`;
  const waURL = `https://wa.me/6289654032950?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="flex-grow bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format"
            }
            alt={product.title}
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            {product.title}
          </h1>
          <div className="prose prose-emerald max-w-none text-gray-600 mb-10 text-lg leading-relaxed whitespace-pre-line text-justify">
            {product.description ||
              "Hubungi kami untuk mendapatkan detail lebih lanjut mengenai kualitas dan ketersediaan produk ini."}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6 fill-current"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.6c-32.9 0-65.1-8.8-93.5-25.5l-6.7-4-69.5 18.2L19.4 334.2l-4.4-7c-18.4-29.3-28.1-63.3-28.1-97.4 0-103.5 84.3-187.8 187.9-187.8 50.1 0 97.3 19.5 132.8 55 35.5 35.5 55 82.7 55 132.9 0 103.6-84.4 187.8-187.9 187.8zM326.6 281.2c-5.6-2.8-33.3-16.5-38.5-18.4-5.1-1.9-8.8-2.8-12.6 2.8-3.7 5.6-14.4 18.4-17.7 22.3-3.3 3.7-6.5 4.2-12.1 1.4-5.6-2.8-23.7-8.8-45.2-27.9-16.7-14.9-28-33.3-31.3-38.9-3.3-5.6-.4-8.6 2.4-11.4 2.5-2.5 5.6-6.5 8.4-9.8 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7.9-7-1.4-10.7-5.2-8.3-12.6-30.6-17.3-41.9-4.5-11-9.1-9.5-12.6-9.7-3.3-.2-7-.2-10.7-.2-3.7 0-9.8 1.4-14.9 7-5.1 5.6-19.5 19.1-19.5 46.5 0 27.4 20 54 22.8 57.7 2.8 3.7 39.3 59.9 95.2 84 13.3 5.7 23.7 9.1 31.8 11.7 13.4 4.3 25.6 3.7 35.3 2.2 10.9-1.7 33.3-13.6 38-26.7 4.7-13.1 4.7-24.3 3.3-26.7-1.4-2.5-5.1-3.8-10.7-6.5z" />
              </svg>
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
