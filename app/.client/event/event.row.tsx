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

  let product = '';
  if (item.products.length > 0) {
    const [first] = item.products;
    if (first.productVariant) {
      product = first.productVariant.product.title;
    }
  }

  return (
    <IndexTable.Row id={item.id} key={item.id} position={index}>
      <IndexTable.Cell>{item.organization.name}</IndexTable.Cell>
      <IndexTable.Cell>{item.name}</IndexTable.Cell>
      <IndexTable.Cell>{product}</IndexTable.Cell>
      <IndexTable.Cell>
        {timestampFormat.format(new Date(item.timestamp))}
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
