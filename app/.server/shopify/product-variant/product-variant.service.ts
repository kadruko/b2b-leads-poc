import { AdminContext } from '@shopify/shopify-app-remix/server';
import { ProductVariant } from '../product-variant';

class ProductVariantService {
  public async findMany(
    { admin }: AdminContext,
    ids: string[],
  ): Promise<ProductVariant[]> {
    if (ids.length === 0) {
      return [];
    }

    const queries = ids
      .map(
        (id, index) => `
        productVariant${index + 1}: productVariant(id: "gid://shopify/ProductVariant/${id}") {
          id
          title
          product {
              title
          }
          image {
              src
          }
        }
    `,
      )
      .join('\n');

    const response = await admin.graphql(
      `#graphql
      query {
        ${queries}
      }
    `,
    );

    const json = await response.json();
    return Object.values<ProductVariant>(json.data).map((v) => ({
      ...v,
      id: v.id!.split('/').pop(),
    })) as ProductVariant[];
  }
}

export const productVariantService = new ProductVariantService();
