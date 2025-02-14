import { findManyLeads } from '@prisma/client/sql';
import { Lead } from '../../.common/lead/lead';
import prisma from '../../db.server';

class LeadService {
  public async findMany(): Promise<Lead[]> {
    const result = await prisma.$queryRawTyped(findManyLeads());
    const leads: Lead[] = result.map((lead) => {
      let leadScore = 0;
      if (lead.leadScore) {
        leadScore = Number(lead.leadScore.toString());
      }
      return {
        ...lead,
        leadScore,
      };
    });
    return leads;
  }
}

export const leadService = new LeadService();
