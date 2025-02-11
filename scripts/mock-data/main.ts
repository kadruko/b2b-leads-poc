import prisma from '../../app/db.server';
import { MOCK_EVENTS } from './event.mock';
import { MOCK_ORGANIZATIONS } from './organization.mock';

const gen = async (): Promise<void> => {
  await genOrganizations();
  await genEvents();
};

const genOrganizations = async (): Promise<void> => {
  for (const organization of MOCK_ORGANIZATIONS) {
    await prisma.organization.upsert({
      where: {
        id: organization.id,
      },
      update: organization,
      create: organization,
    });
  }
};

const genEvents = async (): Promise<void> => {
  for (const event of MOCK_EVENTS) {
    await prisma.event.upsert({
      where: {
        id: event.id,
      },
      update: event,
      create: event,
    });
  }
};

void gen();
