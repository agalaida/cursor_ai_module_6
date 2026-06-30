import { useState } from 'react';
import type { Product } from '../../types/product';
import { RatingStars } from './RatingStars';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge label="Out of Stock" variant="danger" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{product.description}</p>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
}
