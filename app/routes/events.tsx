import { ActionFunctionArgs } from '@remix-run/node';
import { getClientIPAddress } from 'remix-utils/get-client-ip-address';
import { ipLookupService } from '../.server/ip-lookup/ip-lookup.service';
import { organizationService } from '../.server/organization/organization.service';
import { WebPixelEvent } from '../.server/shopify/web-pixel-event';

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

    const organizationExists = await organizationService.exists(ipInfo.as);
    if (!organizationExists) {
      await organizationService.create(ipInfo.as, ipInfo.org);
    }

    console.log('EVENT_RECEIVED');
    const body = await request.text();
    const event: WebPixelEvent = JSON.parse(body);
    console.log('PAYLOAD', event);
  }

  return new Response(null, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
