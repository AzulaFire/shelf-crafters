// lib/shopify.js
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

function assertEnv() {
  if (!DOMAIN || !TOKEN) return false;
  return true;
}

async function shopifyFetch({ query, variables }) {
  if (!assertEnv()) {
    // Graceful fallback for local UI/dev without env set
    return { data: { products: { edges: [] } } };
  }

  const url = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify request failed: ${res.status} ${text}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json;
}

const FEATURED_PRODUCTS_QUERY = /* GraphQL */ `
  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
          description
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 6) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getFeaturedProducts({ first = 12 } = {}) {
  const json = await shopifyFetch({
    query: FEATURED_PRODUCTS_QUERY,
    variables: { first },
  });

  const edges = json?.data?.products?.edges || [];
  return edges.map(({ node }) => {
    const images = (node?.images?.edges || []).map((e) => e.node);
    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      productType: node.productType || 'Shelving',
      tags: node.tags || [],
      description: node.description || '',
      image: node.featuredImage || images[0] || null,
      images,
      price: node?.priceRange?.minVariantPrice
        ? {
            amount: Number(node.priceRange.minVariantPrice.amount),
            currencyCode: node.priceRange.minVariantPrice.currencyCode,
          }
        : null,
    };
  });
}
