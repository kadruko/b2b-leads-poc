import prisma from '../../db.server';

class OrganizationService {
  public async create(as: string, name: string) {
    const organization = await prisma.organization.create({
      data: {
        as,
        name,
      },
    });
    return organization;
  }

  public async exists(as: string) {
    const count = await prisma.organization.count({
      where: {
        as,
      },
    });
    return count > 0;
  }
}

export const organizationService = new OrganizationService();
