import { useLoaderData } from '@remix-run/react';
import { Badge, Box, Card, Layout, Page, Text } from '@shopify/polaris';
import { InterestTable } from '../.client/interest/interest.table';
import { LeadLoader } from '../.server/lead/lead.loader';

export const loader = LeadLoader;

export default function LeadPage() {
  const { session, lead, interestPage } = useLoaderData<typeof loader>();

  return (
    <Page
      backAction={{
        content: 'Back',
        onAction() {
          history.back();
        },
      }}
      title={lead.organizationName}
      titleMetadata={<Badge tone="info">{lead.leadScore.toString()}</Badge>}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">
              Product Interests
            </Text>
            <Box paddingBlockStart="400">
              <InterestTable
                session={session as any}
                interests={interestPage.items as any}
                count={interestPage.count}
              />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card></Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
