import { AdminContext } from '@shopify/shopify-app-remix/server';
import { WebPixel } from '../../.common/web-pixel/web-pixel';
import { WebPixelSettings } from '../../.common/web-pixel/web-pixel.settings';

class WebPixelService {
  public async create(
    { admin }: AdminContext,
    settings: WebPixelSettings,
  ): Promise<WebPixel> {
    const response = await admin.graphql(
      `#graphql
        mutation createWebPixel($settings: JSON!) {
          webPixelCreate(webPixel: {settings: $settings}) {
            webPixel {
              id
            }
          }
        }
      `,
      {
        variables: {
          settings,
        },
      },
    );
    const json = await response.json();
    const webPixel = json.data.webPixel;
    return webPixel;
  }

  public async findOne(adminContext: AdminContext): Promise<WebPixel | null> {
    let webPixel: WebPixel | null = null;
    try {
      webPixel = await this.findOneOrFail(adminContext);
    } catch (error) {
      console.error('Error getting WebPixel:', error);
    }
    return webPixel;
  }

  public async findOneOrFail({ admin }: AdminContext): Promise<WebPixel> {
    const response = await admin.graphql(
      `#graphql
      query {
        webPixel {
          id
        }
      }
    `,
    );
    const json = await response.json();
    const webPixel = json.data.webPixel;
    return webPixel;
  }
}

export const webPixelService = new WebPixelService();
