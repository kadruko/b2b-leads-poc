import { ImageIcon } from '@shopify/polaris-icons';
import { ProductVariant } from '../../.server/shopify/product-variant/product-variant';

const PRODUCT_NOT_FOUND = 'Product not found';

class ProductVariantFormatter {
  public formatText(productVariant?: ProductVariant) {
    let productTitle = productVariant?.product.title || PRODUCT_NOT_FOUND;
    if ((productVariant?.product.variantsCount.count || 1) > 1) {
      productTitle += ': ' + productVariant!.title;
    }
    return productTitle;
  }

  public formatThumbnailSource(productVariant?: ProductVariant) {
    let imageSource: any = ImageIcon;
    if ((productVariant?.product?.media?.nodes?.length || 0) > 0) {
      imageSource = productVariant!.product.media.nodes[0].preview.image.url;
    }
    return imageSource;
  }

  public formatThumbnailAlt(productVariant?: ProductVariant) {
    let alt = PRODUCT_NOT_FOUND;
    if ((productVariant?.product?.media?.nodes?.length || 0) > 0) {
      alt = productVariant!.product.media.nodes[0].preview.image.altText;
    }
    return alt;
  }
}

export const productVariantFormatter = new ProductVariantFormatter();
