import { LoaderFunctionArgs } from '@remix-run/node';
import { Session } from '@shopify/shopify-api';
import { authenticate } from '../../shopify.server';
import { leadService } from './lead.service';

export const LeadLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const organizationId = params.orgId;
  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  const { lead } = await loadLead(session, organizationId);
  return { lead };
};

const loadLead = async ({ shop }: Session, organizationId: string) => {
  const lead = await leadService.findOne(shop, organizationId);
  return { lead };
};
