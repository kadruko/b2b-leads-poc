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

  public async upsert(as: string, name: string) {
    const organization = await prisma.organization.upsert({
      where: {
        as,
      },
      update: {
        name,
      },
      create: {
        as,
        name,
      },
    });
    return organization;
  }

  public async findManyByIds(ids: string[]) {
    return await prisma.organization.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  public async find(as: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        as,
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
