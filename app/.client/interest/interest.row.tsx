import { Session } from '@prisma/client';
import {
  IndexTable,
  InlineStack,
  Link,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import { Interest } from '../../.common/interest/interest';
import { productVariantFormatter } from '../product-variant/product-variant.formatter';

type InterestTableProps = {
  session: Session;
  interest: Interest;
  index: number;
};

export function InterestRow({ session, interest, index }: InterestTableProps) {
  const shopUrl = `https://admin.shopify.com/store/${session.shop}`;
  let productUrl;
  if (interest.productVariant?.product.id) {
    productUrl = `${shopUrl}/products/${interest.productVariant.product.id}`;
  }

  return (
    <IndexTable.Row id={index.toString()} key={index} position={index}>
      <IndexTable.Cell>
        <InlineStack blockAlign="center" align="start" gap={'300'}>
          <Thumbnail
            source={productVariantFormatter.formatThumbnailSource(
              interest.productVariant,
            )}
            size="small"
            alt={productVariantFormatter.formatThumbnailAlt(
              interest.productVariant,
            )}
          />
          {productUrl ? (
            <Link url={productUrl} removeUnderline>
              {productVariantFormatter.formatText(interest.productVariant)}
            </Link>
          ) : (
            <Text as="span">
              {productVariantFormatter.formatText(interest.productVariant)}
            </Text>
          )}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>{interest.interestScore}</IndexTable.Cell>
    </IndexTable.Row>
  );
}
