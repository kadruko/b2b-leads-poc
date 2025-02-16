import { useLoaderData, useSearchParams } from '@remix-run/react';
import { Card, Layout, Page } from '@shopify/polaris';
import { EventTable } from '../.client/event/event.table';
import { DEFAULT_EVENT_SORT_ORDER } from '../.common/event/event.constants';
import { DEFAULT_PAGE, SearchParam, SortOrder } from '../.common/search.param';
import { EventLoader } from '../.server/event/event.loader';

export const loader = EventLoader;

export default function EventPage() {
  const { events, count, session, organizations } =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(SearchParam.PAGE)) || DEFAULT_PAGE;
  const organizationIds = searchParams.getAll(SearchParam.ORGANIZATION);
  const eventNames = searchParams.getAll(SearchParam.EVENT);
  const sortOrder =
    searchParams.get(SearchParam.SORT_ORDER) || DEFAULT_EVENT_SORT_ORDER;

  return (
    <Page title="Events">
      <Layout>
        <Layout.Section>
          <Card>
            <EventTable
              events={events as any}
              count={count}
              page={page}
              session={session as any}
              navToPage={(page) => {
                searchParams.set(SearchParam.PAGE, page.toString());
                setSearchParams(searchParams);
              }}
              sortOrder={sortOrder as SortOrder}
              setSortOrder={(sortOrder) => {
                searchParams.delete(SearchParam.PAGE);
                searchParams.set(SearchParam.SORT_ORDER, sortOrder);
                setSearchParams(searchParams);
              }}
              organizations={organizations}
              organizationFilter={organizationIds}
              setOrganizationFilter={(organizationIds) => {
                searchParams.delete(SearchParam.PAGE);
                searchParams.delete(SearchParam.ORGANIZATION);
                organizationIds.forEach((id) =>
                  searchParams.append(SearchParam.ORGANIZATION, id),
                );
                setSearchParams(searchParams);
              }}
              eventFilter={eventNames}
              setEventFilter={(eventNames) => {
                searchParams.delete(SearchParam.PAGE);
                searchParams.delete(SearchParam.EVENT);
                eventNames.forEach((name) =>
                  searchParams.append(SearchParam.EVENT, name),
                );
                setSearchParams(searchParams);
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
