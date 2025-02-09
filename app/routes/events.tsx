import { ActionFunctionArgs } from '@remix-run/node';
import { getClientIPAddress } from 'remix-utils/get-client-ip-address';
import { eventMapper } from '../.server/event/event.mapper';
import { eventService } from '../.server/event/event.service';
import { ipLookupService } from '../.server/ip-lookup/ip-lookup.service';
import { organizationService } from '../.server/organization/organization.service';
import { WebPixelEvent } from '../.server/shopify/web-pixel-event';

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Methods':
    'POST, GET, PUT, DELETE, OPTIONS, PATCH, HEAD',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Max-Age': '86400', // 24 hours
};

export function loader() {
  return new Response(null, {
    status: 200,
    headers: RESPONSE_HEADERS,
  });
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

  return new Response(null, {
    status: 202,
    headers: RESPONSE_HEADERS,
  });
};
