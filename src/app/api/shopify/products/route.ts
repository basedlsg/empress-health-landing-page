import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

async function shopifyFetch(query: string) {
  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN!,
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  if (handle) {
    const { data } = await shopifyFetch(`
      query {
        product(handle: "${handle}") {
          id
          handle
          title
          description
          featuredImage {
            url
          }
        }
      }
    `);
    return NextResponse.json({ product: data.product });
  }

  const { data } = await shopifyFetch(`
    query {
      products(first: 10) {
        edges {
          node {
            id
            handle
            title
            description
            featuredImage {
              url
            }
          }
        }
      }
    }
  `);

  return NextResponse.json({ products: data.products.edges.map((edge: any) => edge.node) });
}