import { Session } from '@prisma/client';
import { DEFAULT_LOCALE, IndexTable, Text } from '@shopify/polaris';
import { EventListItem } from '../../.common/event/event';
import { productVariantFormatter } from '../product-variant/product-variant.formatter';

type EventRowProps = {
  session: Session;
  item: EventListItem;
  index: number;
};

export function EventRow({ session, item, index }: EventRowProps) {
  const locale = session.locale || DEFAULT_LOCALE;
  const timestampFormat = Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const product = item.products
    .map((p) => productVariantFormatter.formatText(p.productVariant))
    .join(', ');

  const maxLength = 40;
  const truncatedProduct =
    product.length > maxLength
      ? product.substring(0, maxLength) + '...'
      : product;

  return (
    <IndexTable.Row id={item.id} key={item.id} position={index}>
      <IndexTable.Cell>{item.organization.name}</IndexTable.Cell>
      <IndexTable.Cell>{item.name}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" truncate>
          {truncatedProduct}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {timestampFormat.format(new Date(item.timestamp))}
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
