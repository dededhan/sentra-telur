"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function PartnerSlider({ partners }: { partners: any[] }) {
  const defaultPartners = [
    {
      id: 1,
      name: "Partner 1",
      logoUrl: "https://via.placeholder.com/200x100?text=Logo+Partner+1",
    },
    {
      id: 2,
      name: "Partner 2",
      logoUrl: "https://via.placeholder.com/200x100?text=Logo+Partner+2",
    },
    {
      id: 3,
      name: "Partner 3",
      logoUrl: "https://via.placeholder.com/200x100?text=Logo+Partner+3",
    },
    {
      id: 4,
      name: "Partner 4",
      logoUrl: "https://via.placeholder.com/200x100?text=Logo+Partner+4",
    },
    {
      id: 5,
      name: "Partner 5",
      logoUrl: "https://via.placeholder.com/200x100?text=Logo+Partner+5",
    },
  ];

  const dataToDisplay = partners?.length > 0 ? partners : defaultPartners;

  return (
    <section className="py-16 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">
          Mitra & Partner Kami
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {dataToDisplay.map((p) => (
            <SwiperSlide
              key={p.id}
              className="flex justify-center items-center py-4"
            >
              <img
                src={p.logoUrl}
                alt={p.name}
                className="h-16 object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition duration-300 mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
