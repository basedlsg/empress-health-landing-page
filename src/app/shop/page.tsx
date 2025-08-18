"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedIndicatorNavbar } from '@/components/navbars/animated-indicator-navbar';
import { MinimalCenteredFooter } from '@/components/footers/minimal-centered-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductSkeleton = () => (
    <Card className="bg-[#FAF8F5] border-[#E8E0E5] rounded-lg overflow-hidden transition-all duration-300">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-[#F5F2EF] animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-[#F5F2EF] rounded animate-pulse"></div>
          <div className="h-5 bg-[#F5F2EF] rounded animate-pulse w-20"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#F5F2EF] rounded animate-pulse"></div>
            <div className="h-4 bg-[#F5F2EF] rounded animate-pulse w-3/4"></div>
          </div>
          <div className="h-10 bg-[#F5F2EF] rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="bg-[#FAF8F5] border-[#E8E0E5] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#4A235A] hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-[#F5F2EF] flex items-center justify-center relative overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-[#6B5B73] text-sm font-medium">Product Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 space-y-4">
          <h3
            className="font-display text-xl font-semibold text-[#4A235A] group-hover:text-[#2D1B33] transition-colors duration-300"
          >
            {product.title}
          </h3>
          <div className="text-2xl font-bold text-[#4A235A]">
            ${product.price.toFixed(2)}
          </div>
          <p className="text-[#6B5B73] text-sm leading-relaxed line-clamp-3">
            {product.description}
          </p>
          <Link href={`/shop/${product.id}`}>
            <Button
              className="w-full bg-[#4A235A] hover:bg-[#D7BCE8] hover:text-[#4A235A] text-white font-medium py-2.5 rounded-lg transition-all duration-300 group-hover:shadow-md"
            >
              Subscribe
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="font-display text-2xl font-semibold text-[#2D1B33] mb-4">
        Unable to Load Products
      </h3>
      <p className="text-[#6B5B73] mb-8 max-w-md mx-auto">
        We're having trouble connecting to our product catalog. Please try again.
      </p>
      <Button
        onClick={fetchProducts}
        className="bg-[#4A235A] hover:bg-[#D7BCE8] hover:text-[#4A235A] text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-300"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <AnimatedIndicatorNavbar />
      
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A235A] mb-6">
              Empress Shop
            </h1>
            <p className="text-lg sm:text-xl text-[#6B5B73] leading-relaxed max-w-2xl mx-auto">
              Discover our curated collection of premium wellness products designed to support your journey to optimal health and vitality.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <ErrorState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))
                : products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <div className="font-display text-2xl font-semibold text-[#2D1B33] mb-4">
                No Products Available
              </div>
              <p className="text-[#6B5B73] max-w-md mx-auto">
                We're currently updating our product catalog. Please check back soon for new wellness products.
              </p>
            </div>
          )}
        </div>
      </main>

      <MinimalCenteredFooter />
    </div>
  );
}