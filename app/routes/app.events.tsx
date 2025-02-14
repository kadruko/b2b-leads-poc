import { useLoaderData, useSearchParams } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';
import { EventTable } from '../.client/event/event.table';
import {
  DEFAULT_PAGE,
  SEARCH_PARAM_ORGANIZATION,
  SEARCH_PARAM_PAGE,
} from '../.common/search.params';
import { EventLoader } from '../.server/event/event.loader';

export const loader = EventLoader;

export default function EventPage() {
  const { events, count, session, organizations } =
    useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(SEARCH_PARAM_PAGE)) || DEFAULT_PAGE;
  const organizationIds = searchParams.getAll(SEARCH_PARAM_ORGANIZATION);

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
                searchParams.set(SEARCH_PARAM_PAGE, page.toString());
                setSearchParams(searchParams);
              }}
              organizations={organizations}
              organizationFilter={organizationIds}
              setOrganizationFilter={(organizationIds) => {
                searchParams.delete(SEARCH_PARAM_PAGE);
                searchParams.delete(SEARCH_PARAM_ORGANIZATION);
                organizationIds.forEach((id) =>
                  searchParams.append(SEARCH_PARAM_ORGANIZATION, id),
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
