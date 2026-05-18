const fs = require('fs');
const code = \import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group'>
      <div className='overflow-hidden relative aspect-[4/3]'>
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800&auto=format'} 
          alt={product.title} 
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
        />
      </div>
      <div className='p-6 flex flex-col flex-grow text-left'>
        <h3 className='text-xl font-bold text-gray-900 mb-2'>{product.title}</h3>
        {product.description && (
          <p className='text-gray-500 text-sm line-clamp-2 mb-4'>{product.description}</p>
        )}
        <div className='mt-auto pt-4 border-t border-gray-100 flex items-center justify-between'>
          <Link 
            href={\/product/\\}
            className='inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group/link'
          >
            Lihat Detail
            <ArrowRight className='w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform' />
          </Link>
        </div>
      </div>
    </div>
  );
}\;
fs.writeFileSync('src/components/ProductCard.tsx', code, 'utf8');
