import prisma from '../../db.server';

class LeadService {
  public async findMany() {
    return await prisma.organization.findMany();
  }
}

export const leadService = new LeadService();
