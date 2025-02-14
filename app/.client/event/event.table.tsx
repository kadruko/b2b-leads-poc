import { Organization, Session } from '@prisma/client';
import { DEFAULT_LOCALE, IndexTable } from '@shopify/polaris';
import { EventListItem } from '../../.common/event/event';
import { EVENT_PAGE_SIZE } from '../../.common/event/event.constants';
import { SortOrder } from '../../.common/search.param';
import { EventFilter } from './event.filter';

interface EventTableProps {
  events: EventListItem[];
  count: number;
  session: Session;
  page: number;
  navToPage: (page: number) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
  organizations: Organization[];
  organizationFilter: string[];
  setOrganizationFilter: (organizationIds: string[]) => void;
  eventFilter: string[];
  setEventFilter: (eventNames: string[]) => void;
}

export function EventTable({
  events,
  count,
  session,
  page,
  navToPage,
  sortOrder,
  setSortOrder,
  organizations,
  organizationFilter,
  setOrganizationFilter,
  eventFilter,
  setEventFilter,
}: EventTableProps) {
  const locale = session.locale || DEFAULT_LOCALE;
  const timestampFormat = Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const hasNext = page * EVENT_PAGE_SIZE < count;
  const hasPrevious = page > 1;
  const sortDirection =
    sortOrder === SortOrder.ASC ? 'ascending' : 'descending';

  return (
    <>
      <EventFilter
        filter={{
          organization: organizationFilter,
          event: eventFilter,
        }}
        onFilter={({ organization, event }) => {
          setOrganizationFilter(organization);
          setEventFilter(event);
        }}
        organizations={organizations}
      />
      <IndexTable
        resourceName={{
          singular: 'Event',
          plural: 'Events',
        }}
        itemCount={count}
        headings={[
          { title: 'Organization' },
          { title: 'Event' },
          { title: 'Date' },
        ]}
        pagination={{
          hasNext,
          hasPrevious,
          onNext: () => {
            navToPage(page + 1);
          },
          onPrevious: () => {
            navToPage(page - 1);
          },
        }}
        sortable={[false, false, true]}
        sortColumnIndex={2}
        sortDirection={sortDirection}
        onSort={(_, direction) => {
          setSortOrder(
            direction === 'ascending' ? SortOrder.ASC : SortOrder.DESC,
          );
        }}
        selectable={false}
      >
        {events.map(({ id, name, timestamp, organization }, index) => (
          <IndexTable.Row id={id} key={id} position={index}>
            <IndexTable.Cell>{organization.name}</IndexTable.Cell>
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>
              {timestampFormat.format(new Date(timestamp))}
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </>
  );
}
