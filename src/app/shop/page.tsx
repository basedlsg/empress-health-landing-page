"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
  };
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/shopify/products');
      if (response.ok) {
        const { products } = await response.json();
        setProducts(products);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Shop Our Essentials</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <img src={product.featuredImage.url} alt={product.title} className="rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{product.title}</CardTitle>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/shop/${product.handle}`} passHref>
                  <Button>View Product</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}