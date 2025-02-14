import { Organization } from '@prisma/client';
import { CreateEvent } from '../../.common/event/event';
import prisma from '../../db.server';
import { organizationService } from '../organization/organization.service';
import { EventQuery } from './event.query';

class EventService {
  public async create(event: CreateEvent) {
    return await prisma.event.create({ data: event });
  }

  public async findMany(shop: string, query: EventQuery) {
    const { organizationId } = this.filter(query);

    return await prisma.event.findMany({
      skip: query.offset,
      take: query.limit,
      where: {
        shop,
        organizationId,
      },
      include: { organization: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  public async count(shop: string, query: EventQuery) {
    const { organizationId } = this.filter(query);

    return await prisma.event.count({
      where: { shop, organizationId },
    });
  }

  public async findOrganizations(shop: string): Promise<Organization[]> {
    const events = await prisma.event.findMany({
      distinct: ['organizationId'],
      where: { shop },
    });
    const organizationIds = events.map((event) => event.organizationId);
    const organizations =
      await organizationService.findManyByIds(organizationIds);
    return organizations;
  }

  private filter({ organizationIds }: EventQuery) {
    let organizationId;
    if (organizationIds?.length || 0 > 0) {
      organizationId = {
        in: organizationIds,
      };
    }

    return { organizationId };
  }
}

export const eventService = new EventService();
