import React from 'react';
import { ArrowUpRight, FileSpreadsheet } from 'lucide-react';
import { ProductItem } from '../data/siteData';
import { ProductTechnicalDiagram } from './ProductTechnicalDiagram';

interface ProductCardProps {
  product: ProductItem;
  onViewDetails: (product: ProductItem) => void;
  onRequestQuoteForProduct: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestQuoteForProduct,
}) => {
  return (
    <article className="group bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-orange-500/70 hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Technical Visual Header */}
        <ProductTechnicalDiagram
          visualType={product.visualType}
          code={product.code}
        />

        {/* Card Content */}
        <div className="p-6">
          {/* Unboxed clean metadata with typographic separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono-tabular">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ø {product.barDiameterRange.split('(')[0].trim()}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {product.oneLineDescription}
          </p>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-orange-600 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
          title={`View technical specification table for ${product.name}`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
          <span>Technical Specs</span>
        </button>
      </div>
    </article>
  );
};
