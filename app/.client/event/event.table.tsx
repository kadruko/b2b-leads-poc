import { Session } from '@prisma/client';
import {
  DEFAULT_LOCALE,
  IndexTable,
  useIndexResourceState,
} from '@shopify/polaris';
import { EventListItem } from '../../.server/event/event';

interface EventTableProps {
  events: EventListItem[];
  count: number;
  session: Session;
}

export function EventTable({ events, count, session }: EventTableProps) {
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(events);
  const locale = session.locale || DEFAULT_LOCALE;
  const timestampFormat = Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <IndexTable
      resourceName={{
        singular: 'Event',
        plural: 'Events',
      }}
      itemCount={count}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={[
        { title: 'Organization' },
        { title: 'Event' },
        { title: 'Date' },
      ]}
    >
      {events.map(({ id, name, timestamp, organization }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>{organization.name}</IndexTable.Cell>
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>
            {timestampFormat.format(new Date(timestamp))}
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  );
}
