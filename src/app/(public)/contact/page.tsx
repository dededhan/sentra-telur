import prisma from "@/lib/prisma";
import { MapPin, Phone, Mail } from "lucide-react";

export default async function ContactPage() {
  const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });

  const defaultMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126661.34007886475!2d107.0371427!3d-6.7360216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e685f67b5b5b293%3A0x401e8f1fc28c110!2sCikalongkulon%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

  return (
    <main className="flex-grow bg-gray-50 py-24 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Hubungi Kami
          </h1>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Alamat
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light block">
                  {settings?.address ||
                    "Cianjur, Cikalong Kulon, Jawa Barat, Indonesia"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-4 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex-shrink-0 shadow-sm">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.031 0C5.385 0 0 5.387 0 12.035c0 2.125.553 4.195 1.605 6L.516 24l6.113-1.605c1.761.968 3.731 1.48 5.759 1.48C19.034 23.875 24 18.497 24 11.854 24 5.387 18.618 0 12.031 0zm0 21.86a9.924 9.924 0 01-5.068-1.39l-.364-.216-3.766.988.995-3.669-.236-.376A9.905 9.905 0 012.008 12.04c0-5.525 4.496-10.024 10.022-10.024 5.519 0 10.016 4.499 10.016 10.024 0 5.524-4.497 10.02-10.015 10.02v.001v-.001zm5.5-7.514c-.302-.152-1.787-.882-2.064-.984-.277-.101-.479-.152-.68.152-.202.302-.782.983-.958 1.185-.177.202-.353.227-.655.076-1.5-.758-2.618-1.587-3.568-3.037-.202-.303.022-.294.316-.587.213-.213.303-.353.303-.556 0-.203-.102-.379-.177-.531-.076-.151-.68-1.643-.933-2.25-.246-.593-.497-.512-.68-.521h-.58c-.202 0-.53.076-.807.379-.277.303-1.059 1.036-1.059 2.527s1.084 2.932 1.236 3.134c.152.203 2.138 3.262 5.178 4.57 2.455 1.059 3.125.86 3.705.81 1.026-.089 2.373-1.129 2.701-2.22.327-1.092.327-2.028.226-2.22-.1-.192-.378-.293-.68-.445z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  WhatsApp
                </h3>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, '') || '6289654032950'}?text=${encodeURIComponent(settings?.whatsappText || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#25D366] font-light hover:underline block"
                >
                  {settings?.whatsappNumber || "+62 89654032950"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl flex-shrink-0 shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Email</h3>
                <a
                  href={
                    settings?.email
                      ? `mailto:${settings.email}`
                      : "mailto:sentratelur@gmail.com"
                  }
                  className="text-lg text-orange-600 font-light hover:underline block break-all"
                >
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
