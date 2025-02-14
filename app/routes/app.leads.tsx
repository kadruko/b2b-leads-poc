import { useLoaderData } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import { Card, Layout, Page } from '@shopify/polaris';
import { LeadTable } from '../.client/lead/lead.table';
import { LeadLoader } from '../.server/lead/lead.loader';

export const loader = LeadLoader;

export default function LeadPage() {
  const { leads } = useLoaderData<typeof loader>();

  return (
    <Page>
      <TitleBar title="Leads" />
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
