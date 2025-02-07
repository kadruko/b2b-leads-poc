import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { TitleBar } from '@shopify/app-bridge-react';
import {
  Badge,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  Text,
} from '@shopify/polaris';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  let webPixel = null;
  try {
    const response = await admin.graphql(
      `#graphql
      query {
        webPixel {
          id
          settings
        }
      }
    `,
    );
    const json = await response.json();
    webPixel = json.data.webPixel;
  } catch (error) {
    console.error('Error getting webPixel:', error);
  }

  return Response.json({ webPixel });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  // const settings = JSON.stringify({ accountID: '123' });
  // console.log('settings', settings);
  const response = await admin.graphql(
    `#graphql
      mutation createWebPixel($settings: JSON!) {
        webPixelCreate(webPixel: {settings: $settings}) {
          webPixel {
            settings
            id
          }
        }
      }
    `,
    {
      variables: {
        settings: {
          accountID: '123',
        },
      },
    },
  );
  const json = await response.json();
  const webPixel = json.data.webPixel;

  return Response.json({ webPixel });
};

export default function Index() {
  const { webPixel: loaderWebPixel } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { webPixel: fetcherWebPixel } = fetcher.data || {};
  const createWebPixel = () => fetcher.submit({}, { method: 'POST' });

  const webPixel = fetcherWebPixel || loaderWebPixel;
  const webPixelExists = !!webPixel;

  return (
    <Page>
      <TitleBar title="B2B Leads" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <Text as="h2" variant="headingMd">
                Events by Customer
              </Text>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            {webPixelExists ? (
              <Card>
                <BlockStack gap="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h2" variant="headingMd">
                      Customer Event Tracking
                    </Text>
                    <Badge tone="success">Active</Badge>
                  </InlineGrid>
                  <Text variant="bodyMd" as="p">
                    Web Pixel ID: {webPixel.id}
                  </Text>
                </BlockStack>
              </Card>
            ) : (
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Enable Customer Event Tracking
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Before you can start tracking customer events, you need to
                    configure and enable the responsible Web Pixel.
                  </Text>
                  <InlineStack align="end">
                    <ButtonGroup>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={createWebPixel}
                      >
                        Enable Web Pixel
                      </Button>
                    </ButtonGroup>
                  </InlineStack>
                </BlockStack>
              </Card>
            )}
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
