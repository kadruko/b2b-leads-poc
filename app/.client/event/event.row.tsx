import { Session } from '@prisma/client';
import { DEFAULT_LOCALE, IndexTable } from '@shopify/polaris';
import { EventListItem } from '../../.common/event/event';

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
    .map((p) => (p.productVariant ? p.productVariant.product.title : ''))
    .filter((title) => title)
    .join(', ');

  const maxLength = 30;
  const truncatedProduct =
    product.length > maxLength
      ? product.substring(0, maxLength) + '...'
      : product;

  return (
    <IndexTable.Row id={item.id} key={item.id} position={index}>
      <IndexTable.Cell>{item.organization.name}</IndexTable.Cell>
      <IndexTable.Cell>{item.name}</IndexTable.Cell>
      <IndexTable.Cell>{truncatedProduct}</IndexTable.Cell>
      <IndexTable.Cell>
        {timestampFormat.format(new Date(item.timestamp))}
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
