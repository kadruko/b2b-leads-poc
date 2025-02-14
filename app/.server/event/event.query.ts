import { SortOrder } from '../../.common/search.param';

export type EventQuery = {
  limit: number;
  offset: number;
  sortOrder: SortOrder;
  organizationIds?: string[];
  eventNames?: string[];
};
