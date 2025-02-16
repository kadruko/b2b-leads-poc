import { useLoaderData } from '@remix-run/react';
import { Card, Layout, Page } from '@shopify/polaris';
import { LeadTable } from '../.client/lead/lead.table';
import { LeadListLoader } from '../.server/lead/lead-list.loader';

export const loader = LeadListLoader;

export default function LeadListPage() {
  const { leads } = useLoaderData<typeof loader>();

  return (
    <Page title="Leads">
      <Layout>
        <Layout.Section>
          <Card>
            <LeadTable leads={leads} count={leads.length} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
