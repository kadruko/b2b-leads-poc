import { useLoaderData, useSearchParams } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';
import { EventTable } from '../.client/event/event.table';
import { DEFAULT_PAGE, SearchParam } from '../.common/search.param';
import { EventLoader } from '../.server/event/event.loader';

export const loader = EventLoader;

export default function EventPage() {
  const { events, count, session, organizations } =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(SearchParam.PAGE)) || DEFAULT_PAGE;
  const organizationIds = searchParams.getAll(SearchParam.ORGANIZATION);
  const eventNames = searchParams.getAll(SearchParam.EVENT);

  return (
    <Page>
      <TitleBar title="Events" />
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
