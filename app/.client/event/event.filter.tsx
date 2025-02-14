import { Organization } from '@prisma/client';
import {
  IndexFilters,
  IndexFiltersMode,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import { OrganizationChoiceList } from '../organization/organization.choice-list';

type EventFilter = {
  organization: string[];
};

type EventFilterProps = {
  filter: EventFilter;
  onFilter: (filter: EventFilter) => void;

  organizations: Organization[];
};

export function EventFilter({
  filter,
  onFilter,
  organizations,
}: EventFilterProps) {
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);

  return (
    <IndexFilters
      onQueryChange={() => {}}
      onQueryClear={() => {}}
      hideQueryField
      tabs={[]}
      selected={0}
      filters={[
        {
          key: 'organization',
          label: 'Organization',
          filter: (
            <OrganizationChoiceList
              organizations={organizations}
              selected={filter.organization}
              onChange={(organization) => onFilter({ ...filter, organization })}
            />
          ),
        },
      ]}
      appliedFilters={[]}
      onClearAll={() => {}}
      mode={mode}
      setMode={setMode}
    />
  );
}
