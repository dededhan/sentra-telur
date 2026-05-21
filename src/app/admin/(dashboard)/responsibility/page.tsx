import prisma from "@/lib/prisma";
import ResponsibilityClient from "./ResponsibilityClient";

export const dynamic = "force-dynamic";

export default async function AdminResponsibilityPage() {
  const sections = await prisma.sustainabilitySection.findMany({
    where: {
      category: "responsibility"
    },
    orderBy: {
      order: "asc"
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Tanggung Jawab (Responsibility)</h1>
        <p className="text-gray-500">
          Kelola seksi-seksi untuk halaman "Responsibility". Anda bisa menambahkan seksi baru dengan gambar, judul, dan penjelasan tentang program kepedulian sosial, serta mengedit atau menghapus seksi yang ada.
        </p>
      </div>

      <ResponsibilityClient initialSections={sections} />
    </div>
  );
}
