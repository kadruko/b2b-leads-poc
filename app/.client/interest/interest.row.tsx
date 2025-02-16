import { IndexTable, InlineStack, Thumbnail } from '@shopify/polaris';
import { Interest } from '../../.common/interest/interest';
import { productVariantFormatter } from '../product-variant/product-variant.formatter';

type InterestTableProps = {
  interest: Interest;
  index: number;
};

export function InterestRow({ interest, index }: InterestTableProps) {
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
          {productVariantFormatter.formatText(interest.productVariant)}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>{interest.interestScore}</IndexTable.Cell>
    </IndexTable.Row>
  );
}
