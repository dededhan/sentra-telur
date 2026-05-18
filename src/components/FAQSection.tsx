"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection({ faqs }: { faqs: any[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const defaultFaqs = [
    {
      id: 1,
      question: "Apakah telur selalu segar?",
      answer:
        "Ya, kami menjamin kualitas dengan mendistribusikan telur secara langsung maksimal 24 jam setelah dipanen.",
    },
    {
      id: 2,
      question: "Apakah melayani pengiriman luar kota?",
      answer:
        "Tentu, area distribusi kami saat ini meliputi Jawa Tengah, Jawa Barat, JABODETABEK, Kalimantan Barat, Bali, hingga Nusa Tenggara dengan pengiriman berstandar khusus.",
    },
    {
      id: 3,
      question: "Apakah bisa untuk kebutuhan industri besar?",
      answer:
        "Kami melayani segala bentuk penjualan dari skala kecil sampai besar termasuk industri food and beverage, HOREKA, dan modern market.",
    },
  ];

  const dataToDisplay = faqs?.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Pertanyaan Umum (FAQ)
        </h2>
        <div className="space-y-4">
          {dataToDisplay.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
