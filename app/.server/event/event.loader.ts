import { LoaderFunctionArgs } from '@remix-run/node';
import { Session } from '@shopify/shopify-api';
import { EVENT_PAGE_SIZE } from '../../.common/event/event.constants';
import { DEFAULT_PAGE, SearchParam } from '../../.common/search.param';
import { authenticate } from '../../shopify.server';
import { EventQuery } from './event.query';
import { eventService } from './event.service';

export const EventLoader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const [{ events, count }, { organizations }] = await Promise.all([
    loadEvents(request, session),
    loadDistinctOrganizations(session),
  ]);

  return { events, count, session, organizations };
};

const loadEvents = async (request: Request, { shop }: Session) => {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get(SearchParam.PAGE)) || DEFAULT_PAGE;
  const offset = (page - 1) * EVENT_PAGE_SIZE;
  const organizationIds = searchParams.getAll(SearchParam.ORGANIZATION);
  const eventNames = searchParams.getAll(SearchParam.EVENT);
  const query: EventQuery = {
    limit: EVENT_PAGE_SIZE,
    offset,
    organizationIds,
    eventNames,
  };

  const events = await eventService.findMany(shop, query);
  const count = await eventService.count(shop, query);

  return { events, count };
};

const loadDistinctOrganizations = async ({ shop }: Session) => {
  const organizations = await eventService.findOrganizations(shop);
  return { organizations };
};
