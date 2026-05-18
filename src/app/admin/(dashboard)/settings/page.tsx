import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const globalSettings = await prisma.globalSettings.findFirst();
  const partners = await prisma.partner.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
        <p className="text-gray-500">
          Kelola informasi kontak, gambar beranda, dan daftar partner/klien Anda.
        </p>
      </div>

      <SettingsClient 
        initialSettings={globalSettings} 
        initialPartners={partners} 
      />
    </div>
  );
}
