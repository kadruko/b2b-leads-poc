import { Organization, Session } from '@prisma/client';
import { IndexTable } from '@shopify/polaris';
import { EventListItem } from '../../.common/event/event';
import { EVENT_PAGE_SIZE } from '../../.common/event/event.constants';
import { SortOrder } from '../../.common/search.param';
import { EventFilter } from './event.filter';
import { EventRow } from './event.row';

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
          { title: 'Product' },
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
        sortable={[false, false, false, true]}
        sortColumnIndex={3}
        sortDirection={sortDirection}
        onSort={(_, direction) => {
          setSortOrder(
            direction === 'ascending' ? SortOrder.ASC : SortOrder.DESC,
          );
        }}
        selectable={false}
      >
        {events.map((item, index) => (
          <EventRow session={session} item={item} index={index} />
        ))}
      </IndexTable>
    </>
  );
}
