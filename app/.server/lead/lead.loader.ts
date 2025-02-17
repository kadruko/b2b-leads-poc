import { LoaderFunctionArgs } from '@remix-run/node';
import { Session } from '@shopify/shopify-api';
import { AdminContext } from '@shopify/shopify-app-remix/server';
import { Interest } from '../../.common/interest/interest';
import { Page } from '../../.common/page';
import { authenticate } from '../../shopify.server';
import { interestService } from '../interest/interest.service';
import { leadService } from './lead.service';

export const LeadLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const context = await authenticate.admin(request);

  const organizationId = params.orgId;
  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  const [{ lead }, { interestPage }] = await Promise.all([
    loadLead(context.session, organizationId),
    loadInterests(context as unknown as AdminContext, organizationId),
  ]);
  return { session: context.session, lead, interestPage };
};

const loadLead = async ({ shop }: Session, organizationId: string) => {
  const lead = await leadService.findOne(shop, organizationId);
  return { lead };
};

const loadInterests = async (
  context: AdminContext,
  organizationId: string,
): Promise<{ interestPage: Page<Interest> }> => {
  const interests = await interestService.findMany(context, organizationId);
  return {
    interestPage: {
      items: interests,
      count: interests.length,
    },
  };
};
