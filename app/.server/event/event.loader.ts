import { LoaderFunctionArgs } from '@remix-run/node';
import { Session } from '@shopify/shopify-api';
import { AdminContext } from '@shopify/shopify-app-remix/server';
import {
  DEFAULT_EVENT_SORT_ORDER,
  EVENT_PAGE_SIZE,
} from '../../.common/event/event.constants';
import {
  DEFAULT_PAGE,
  SearchParam,
  SortOrder,
} from '../../.common/search.param';
import { authenticate } from '../../shopify.server';
import { EventQuery } from './event.query';
import { eventService } from './event.service';

export const EventLoader = async ({ request }: LoaderFunctionArgs) => {
  const adminContext = await authenticate.admin(request);

  const [{ events, count }, { organizations }] = await Promise.all([
    loadEvents(request, adminContext as unknown as AdminContext),
    loadDistinctOrganizations(adminContext.session),
  ]);

  return { events, count, session: adminContext.session, organizations };
};

const loadEvents = async (request: Request, adminContext: AdminContext) => {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get(SearchParam.PAGE)) || DEFAULT_PAGE;
  const offset = (page - 1) * EVENT_PAGE_SIZE;
  const sortOrder =
    searchParams.get(SearchParam.SORT_ORDER) || DEFAULT_EVENT_SORT_ORDER;
  const organizationIds = searchParams.getAll(SearchParam.ORGANIZATION);
  const eventNames = searchParams.getAll(SearchParam.EVENT);
  const query: EventQuery = {
    limit: EVENT_PAGE_SIZE,
    offset,
    sortOrder: sortOrder as SortOrder,
    organizationIds,
    eventNames,
  };

  const events = await eventService.findMany(adminContext, query);
  const count = await eventService.count(adminContext.session.shop, query);

  return { events, count };
};

const loadDistinctOrganizations = async ({ shop }: Session) => {
  const organizations = await eventService.findOrganizations(shop);
  return { organizations };
};
