import prisma from "@/lib/prisma";
import AboutClient from "./AboutClient";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Tentang Kami</h1>
        <p className="text-gray-500">
          Ubah cerita, visi misi, atau deskripsi singkat perusahaan Anda yang akan tampil di halaman Beranda dan halaman Tentang Kami.
        </p>
      </div>

      <AboutClient initialAbout={about} />
    </div>
  );
}
