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
import { AdminContext } from '@shopify/shopify-app-remix/server';
import { WebPixelSettings } from '../.common/web-pixel/web-pixel.settings';
import { webPixelService } from '../.server/web-pixel/web-pixel.service';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const adminContext = await authenticate.admin(request);

  const webPixel = await webPixelService.findOne(
    adminContext as unknown as AdminContext,
  );

  return { webPixel };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const adminContext = await authenticate.admin(request);

  const webPixelSettings: WebPixelSettings = {
    apiURL: process.env.SHOPIFY_APP_URL!,
  };
  const webPixel = await webPixelService.create(
    adminContext as unknown as AdminContext,
    webPixelSettings,
  );

  return { webPixel };
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
                Leads Overview
              </Text>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            {webPixelExists ? (
              <Card>
                <BlockStack gap="200">
                  <InlineGrid columns="1fr auto">
                    <Text as="h2" variant="headingMd">
                      Lead Event Tracking
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
                    Enable Lead Event Tracking
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Before you can start tracking events of possible customers,
                    you need to configure and enable the responsible Web Pixel.
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
