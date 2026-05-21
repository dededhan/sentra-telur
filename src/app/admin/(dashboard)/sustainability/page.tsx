import prisma from "@/lib/prisma";
import SustainabilityClient from "./SustainabilityClient";

export const dynamic = "force-dynamic";

export default async function AdminSustainabilityPage() {
  const sections = await prisma.sustainabilitySection.findMany({
    where: {
      category: "sustainability"
    },
    orderBy: {
      order: "asc"
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Keberlanjutan (Sustainability)</h1>
        <p className="text-gray-500">
          Kelola seksi-seksi untuk halaman "Sustainability". Anda bisa menambahkan seksi baru dengan gambar, judul, dan penjelasan tentang aspek lingkungan, serta mengedit atau menghapus seksi yang ada.
        </p>
      </div>

      <SustainabilityClient initialSections={sections} />
    </div>
  );
}
