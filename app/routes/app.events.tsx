import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';
import { EventTable } from '../.client/event/event.table';
import { EVENT_PAGE_SIZE } from '../.common/event/event.constants';
import { DEFAULT_PAGE, SEARCH_PARAM_PAGE } from '../.common/search.params';
import { eventService } from '../.server/event/event.service';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get(SEARCH_PARAM_PAGE)) || DEFAULT_PAGE;
  const offset = (page - 1) * EVENT_PAGE_SIZE;
  const events = await eventService.findMany(session.shop, {
    limit: EVENT_PAGE_SIZE,
    offset,
  });
  const count = await eventService.count(session.shop);

  return { events, count, session };
};

export default function EventPage() {
  const { session, events, count } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get(SEARCH_PARAM_PAGE)) || DEFAULT_PAGE;

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
                setSearchParams({ ...searchParams, page: page.toString() });
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
