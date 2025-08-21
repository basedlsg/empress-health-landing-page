"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
  };
}

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [handle, setHandle] = useState<string>('');

  useEffect(() => {
    const getParams = async () => {
      const { handle: handleParam } = await params;
      setHandle(handleParam);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!handle) return;
    
    const fetchProduct = async () => {
      const response = await fetch(`/api/shopify/products?handle=${handle}`);
      if (response.ok) {
        const { product } = await response.json();
        setProduct(product);
      }
    };
    fetchProduct();
  }, [handle]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={product.featuredImage.url} alt={product.title} className="rounded-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-muted-foreground mb-8">{product.description}</p>
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </main>
  );
}