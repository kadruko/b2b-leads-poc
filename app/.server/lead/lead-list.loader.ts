import { LoaderFunctionArgs } from '@remix-run/node';
import { Session } from '@shopify/shopify-api';
import { authenticate } from '../../shopify.server';
import { leadService } from './lead.service';

export const LeadListLoader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const { leads } = await loadLeads(session);

  return { leads };
};

const loadLeads = async ({ shop }: Session) => {
  const leads = await leadService.findMany(shop);
  return { leads };
};
