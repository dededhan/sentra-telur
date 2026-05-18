const fs = require("fs");
const content = `import prisma from "@/lib/prisma";
import { MapPin, Phone, Mail } from "lucide-react";

export default async function ContactPage() {
  const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });

  const defaultMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126661.34007886475!2d107.0371427!3d-6.7360216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e685f67b5b5b293%3A0x401e8f1fc28c110!2sCikalongkulon%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

  return (
    <main className="flex-grow bg-gray-50 py-24 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 font-light">
            Kami siap melayani dan mendengarkan kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-12">
            
            <div className="flex items-start gap-5">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl flex-shrink-0 shadow-sm">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Alamat</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light block">
                  {settings?.address || "Cianjur, Cikalong Kulon, Jawa Barat, Indonesia"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl flex-shrink-0 shadow-sm">
                <Phone className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Telepon</h3>
                <p className="text-lg text-gray-600 font-light block">
                  {settings?.phone || "+62 - 81222401023"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl flex-shrink-0 shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Email</h3>
                <a href={settings?.email ? \`mailto:\${settings.email}\` : "mailto:sentratelur@gmail.com"} className="text-lg text-orange-600 font-light hover:underline block break-all">
                  {settings?.email || "sentratelur@gmail.com"}
                </a>
              </div>
            </div>

          </div>

          <div className="w-full lg:w-2/3 h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-inner bg-gray-200">
            <iframe
              src={settings?.mapEmbedUrl || defaultMap}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
          
        </div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync("src/app/contact/page.tsx", content, { encoding: "utf8" });
