import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '../../shopify.server';
import { leadService } from './lead.service';

export const LeadLoader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  const { leads } = await loadLeads();

  return { leads };
};

const loadLeads = async () => {
  const leads = await leadService.findMany();
  return { leads };
};
