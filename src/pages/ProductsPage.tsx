import { useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import type { Product } from '../types/product';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium sound quality with active noise cancellation. Up to 30 hours battery life.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 328,
    inStock: true,
  },
  {
    id: '2',
    title: 'Mechanical Keyboard',
    description: 'Tactile switches, RGB backlight, compact TKL layout. Perfect for coding and gaming.',
    price: 129.00,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    rating: 4,
    reviewCount: 215,
    inStock: true,
  },
  {
    id: '3',
    title: 'Ergonomic Mouse',
    description: 'Designed to reduce wrist strain. Programmable buttons and precision optical sensor.',
    price: 79.95,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    rating: 4,
    reviewCount: 143,
    inStock: false,
  },
  {
    id: '4',
    title: '4K USB-C Monitor',
    description: '27-inch IPS display with 99% sRGB, USB-C power delivery and built-in speakers.',
    price: 499.00,
    imageUrl: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400&h=300&fit=crop',
    rating: 5,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: '5',
    title: 'Portable SSD 1TB',
    description: 'Blazing-fast transfer speeds up to 1050 MB/s. Compact and shock-resistant.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 412,
    inStock: true,
  },
  {
    id: '6',
    title: 'Smart Webcam 1080p',
    description: 'Auto-focus, built-in microphone, low-light correction. Works with all video platforms.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70a3?w=400&h=300&fit=crop',
    rating: 3.5,
    reviewCount: 67,
    inStock: true,
  },
];

export function ProductsPage() {
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{SAMPLE_PRODUCTS.length} items available</p>
        <div className="mb-6">
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-16">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
