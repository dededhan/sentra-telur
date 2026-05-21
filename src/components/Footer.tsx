import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Footer() {
  let settings = null;
  try {
    settings = await prisma.globalSettings.findFirst();
  } catch (error) {
    console.error("Gagal memuat global settings di footer:", error);
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-700 pb-8">
        {/* Section 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">
            BANG TELOR: Farm Jatiasih
          </h3>
          <p className="whitespace-pre-wrap">{settings?.address || "Cianjur, Cikalong Kulon, Jawa Barat, Indonesia"}</p>
          <p>{settings?.phone || "+62 - 89654032950"}</p>
          <p>{settings?.email || "sentratelur@gmail.com"}</p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 flex flex-col">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/product" className="hover:text-white transition">
              Product
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </ul>
        </div>
      </div>

      {/* Section 3 */}
      <div className="text-center pt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BANG TELOR: Farm Jatiasih. All rights
        reserved.
      </div>
    </footer>
  );
}

