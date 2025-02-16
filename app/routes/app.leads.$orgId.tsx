import { useLoaderData } from '@remix-run/react';
import { Card, Page } from '@shopify/polaris';
import { LeadLoader } from '../.server/lead/lead.loader';

export const loader = LeadLoader;

export default function LeadPage() {
  const { lead } = useLoaderData<typeof loader>();

  return (
    <Page
      backAction={{
        content: 'Back',
        onAction() {
          history.back();
        },
      }}
      title={lead.organizationName}
    >
      <Card></Card>
    </Page>
  );
}
