import prisma from "@/lib/prisma";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

export default async function AdminProductPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>
        <p className="text-gray-500">
          Atur daftar produk Anda di sini. Unggah gambar berkualitas baik agar terlihat menarik di halaman utama.
        </p>
      </div>

      <ProductClient products={products} />
    </div>
  );
}
