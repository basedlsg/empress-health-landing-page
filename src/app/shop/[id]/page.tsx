"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatedIndicatorNavbar } from "@/components/navbars/animated-indicator-navbar";
import { MinimalCenteredFooter } from "@/components/footers/minimal-centered-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
          } else {
            setError('Failed to load product');
          }
          return;
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBackToShop = () => {
    router.push('/shop');
  };

  const handleRetry = () => {
    setError(null);
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/products/${id}`);
          
          if (!response.ok) {
            if (response.status === 404) {
              setError('Product not found');
            } else {
              setError('Failed to load product');
            }
            return;
          }

          const productData = await response.json();
          setProduct(productData);
        } catch (err) {
          setError('Network error. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  };

  const ProductSkeleton = () => (
    <div className="min-h-screen bg-[#FAF8F5]">
      <AnimatedIndicatorNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-6 w-24 bg-[#F5F2EF] rounded mb-6"></div>
          
          {/* Breadcrumb skeleton */}
          <div className="h-4 w-48 bg-[#F5F2EF] rounded mb-8"></div>
          
          {/* Main content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image skeleton */}
            <div className="aspect-square bg-[#F5F2EF] rounded-lg"></div>
            
            {/* Details skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-[#F5F2EF] rounded"></div>
              <div className="h-6 w-24 bg-[#F5F2EF] rounded"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-[#F5F2EF] rounded"></div>
                <div className="h-4 w-full bg-[#F5F2EF] rounded"></div>
                <div className="h-4 w-2/3 bg-[#F5F2EF] rounded"></div>
              </div>
              <div className="h-12 w-32 bg-[#F5F2EF] rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      <MinimalCenteredFooter />
    </div>
  );

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <AnimatedIndicatorNavbar />
        
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md mx-4 bg-white border-[#E8E0E5]">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 text-[#6B5B73] mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-[#4A235A] mb-2">
                {error === 'Product not found' ? 'Product Not Found' : 'Something Went Wrong'}
              </h2>
              <p className="text-[#6B5B73]">
                {error === 'Product not found' 
                  ? 'The product you\'re looking for doesn\'t exist or has been removed.'
                  : 'We encountered an error while loading the product. Please try again.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleBackToShop} className="border-[#4A235A] text-[#4A235A] hover:bg-[#4A235A] hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              {error !== 'Product not found' && (
                <Button onClick={handleRetry} className="bg-[#4A235A] hover:bg-[#D7BCE8] hover:text-[#4A235A] text-white">
                  Try Again
                </Button>
              )}
            </div>
          </Card>
        </div>
        
        <MinimalCenteredFooter />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <AnimatedIndicatorNavbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Shop */}
          <button
            onClick={handleBackToShop}
            className="flex items-center text-[#4A235A] hover:text-[#D7BCE8] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </button>
          
          {/* Breadcrumb */}
          <nav className="text-sm text-[#6B5B73] mb-8">
            <span 
              onClick={handleBackToShop}
              className="hover:text-[#4A235A] cursor-pointer transition-colors"
            >
              Shop
            </span>
            <span className="mx-2">›</span>
            <span className="text-[#4A235A]">{product.title}</span>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="order-1">
              <div className="aspect-square rounded-lg overflow-hidden bg-white border-[#E8E0E5] border">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F5F2EF]">
                    <div className="text-center text-[#6B5B73]">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-2" />
                      <p>Product Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="order-2 lg:py-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-serif text-[#4A235A] mb-4">
                    {product.title}
                  </h1>
                  <p className="text-2xl font-semibold text-[#2D1B33]">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-[#6B5B73] leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="bg-[#4A235A] hover:bg-[#D7BCE8] hover:text-[#4A235A] text-white transition-all duration-300 px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <MinimalCenteredFooter />
    </div>
  );
}