import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';
import { EventTable } from '../.client/event/event.table';
import { eventService } from '../.server/event/event.service';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const events = await eventService.findMany(session.shop);
  const count = await eventService.count(session.shop);

  return { events, count, session };
};

export default function EventPage() {
  const { session, events, count } = useLoaderData<typeof loader>();

  return (
    <Page>
      <TitleBar title="Events" />
      <Layout>
        <Layout.Section>
          <Card>
            <EventTable
              events={events as any}
              count={count}
              session={session as any}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
