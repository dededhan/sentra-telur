import prisma from "@/lib/prisma";
import FAQClient from "./FAQClient";

export const dynamic = "force-dynamic";

export default async function AdminFAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: {
      id: "desc", // Tampilkan yang terbaru di atas jika belum menggunakan drag-and-drop
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kelola FAQ</h1>
        <p className="text-gray-500">
          Atur pertanyaan yang sering diajukan beserta jawabannya yang akan ditampilkan di halaman depan.
        </p>
      </div>

      <FAQClient faqs={faqs} />
    </div>
  );
}
