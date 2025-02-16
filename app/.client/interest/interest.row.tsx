import { IndexTable, InlineStack, Thumbnail } from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';
import { Interest } from '../../.common/interest/interest';

type InterestTableProps = {
  interest: Interest;
  index: number;
};

export function InterestRow({ interest, index }: InterestTableProps) {
  let thumbnailSource: any = ImageIcon;
  let thumbnailAlt = 'Product not found';
  if ((interest.productVariant?.product?.media?.nodes?.length || 0) > 0) {
    thumbnailSource =
      interest.productVariant!.product.media.nodes[0].preview.image.url;
    thumbnailAlt = interest.productVariant!.product.title;
  }

  return (
    <IndexTable.Row id={index.toString()} key={index} position={index}>
      <IndexTable.Cell>
        <InlineStack blockAlign="center" align="start" gap={'300'}>
          <Thumbnail
            source={thumbnailSource}
            size="small"
            alt={thumbnailSource}
          />
          {interest.productVariant?.product.title || 'Product not found'}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>{interest.interestScore}</IndexTable.Cell>
    </IndexTable.Row>
  );
}
