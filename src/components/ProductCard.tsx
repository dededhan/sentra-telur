import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col h-full group hover:-translate-y-2">
      <div className="overflow-hidden relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format"
          }
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 flex flex-col flex-grow text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors duration-300">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-5 border-t border-gray-200 flex items-center justify-between">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-white transition-all duration-300 group/link w-full justify-between px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-600 hover:to-emerald-600"
          >
            <span>Lihat Detail</span>
            <span className="w-6 h-6 flex items-center justify-center group-hover/link:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
