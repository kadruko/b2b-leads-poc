import { findLead, findManyLeads } from '@prisma/client/sql';
import { Lead } from '../../.common/lead/lead';
import prisma from '../../db.server';

class LeadService {
  public async findMany(shop: string): Promise<Lead[]> {
    const result = await prisma.$queryRawTyped(findManyLeads(shop));
    const leads: Lead[] = result.map((lead) => this.map(lead));
    return leads;
  }

  public async findOne(shop: string, organizationId: string): Promise<Lead> {
    const [lead] = await prisma.$queryRawTyped(findLead(shop, organizationId));
    return this.map(lead);
  }

  private map(lead: any): Lead {
    let leadScore = 0;
    if (lead.leadScore) {
      leadScore = Number(lead.leadScore.toString());
    }
    return {
      ...lead,
      leadScore,
    };
  }
}

export const leadService = new LeadService();
