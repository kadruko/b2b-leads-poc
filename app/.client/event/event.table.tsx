import { Organization, Session } from '@prisma/client';
import {
  DEFAULT_LOCALE,
  IndexTable,
  useIndexResourceState,
} from '@shopify/polaris';
import { EventListItem } from '../../.common/event/event';
import { EVENT_PAGE_SIZE } from '../../.common/event/event.constants';
import { EventFilter } from './event.filter';

interface EventTableProps {
  events: EventListItem[];
  count: number;
  session: Session;
  page: number;
  navToPage: (page: number) => void;
  organizations: Organization[];
  organizationFilter: string[];
  setOrganizationFilter: (organizationIds: string[]) => void;
}

export function EventTable({
  events,
  count,
  session,
  page,
  navToPage,
  organizations,
  organizationFilter,
  setOrganizationFilter,
}: EventTableProps) {
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
  const hasNext = page * EVENT_PAGE_SIZE < count;
  const hasPrevious = page > 1;

  return (
    <>
      <EventFilter
        filter={{
          organization: organizationFilter,
        }}
        onFilter={({ organization }) => {
          setOrganizationFilter(organization);
        }}
        organizations={organizations}
      />
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
    </>
  );
}
