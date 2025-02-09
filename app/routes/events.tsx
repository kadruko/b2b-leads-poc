import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { cors } from 'remix-utils/cors';
import { getClientIPAddress } from 'remix-utils/get-client-ip-address';
import { eventMapper } from '../.server/event/event.mapper';
import { eventService } from '../.server/event/event.service';
import { ipLookupService } from '../.server/ip-lookup/ip-lookup.service';
import { organizationService } from '../.server/organization/organization.service';
import { WebPixelEvent } from '../.server/shopify/web-pixel-event';

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
};

const CORS_OPTIONS = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
  maxAge: 86400,
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await cors(
    request,
    new Response(null, {
      status: 200,
      headers: RESPONSE_HEADERS,
    }),
    CORS_OPTIONS,
  );
}

export const action = async ({
  request,
}: ActionFunctionArgs & {
  request: { socket: any };
}) => {
  const ipAddress = getClientIPAddress(request);
  console.log('CLIENT_IP', ipAddress);
  if (ipAddress) {
    const ipInfo = await ipLookupService.lookup(ipAddress);
    console.log(ipInfo);

    const organization = await organizationService.upsert(
      ipInfo.as,
      ipInfo.org,
    );

    const body = await request.text();
    const webPixelEvent: WebPixelEvent = JSON.parse(body);
    const shop = webPixelEvent.context.document.location.hostname;
    const event = eventMapper.fromWebPixelEvent(
      shop,
      organization.id,
      webPixelEvent,
    );
    await eventService.create(event);
  }

  return await cors(
    request,
    new Response(null, {
      status: 202,
      headers: RESPONSE_HEADERS,
    }),
    CORS_OPTIONS,
  );
};
