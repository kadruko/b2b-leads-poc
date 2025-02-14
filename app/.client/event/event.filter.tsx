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

enum EventFilterKey {
  ORGANIZATION = 'organization',
}

enum EventFilterLabel {
  ORGANIZATION = 'Organization',
}

export function EventFilter({
  filter,
  onFilter,
  organizations,
}: EventFilterProps) {
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
  const appliedFilters = [];
  if (filter.organization.length > 0) {
    const filterOrganizations = organizations.filter((organization) =>
      filter.organization.includes(organization.id),
    );
    const organizationNames = filterOrganizations.map(
      (organization) => organization.name,
    );
    appliedFilters.push({
      key: EventFilterKey.ORGANIZATION,
      label: `${EventFilterLabel.ORGANIZATION}: ${organizationNames.join(', ')}`,
      onRemove: () => onFilter({ ...filter, organization: [] }),
    });
  }

  return (
    <IndexFilters
      onQueryChange={() => {}}
      onQueryClear={() => {}}
      hideQueryField
      tabs={[]}
      selected={0}
      filters={[
        {
          key: EventFilterKey.ORGANIZATION,
          label: EventFilterLabel.ORGANIZATION,
          filter: (
            <OrganizationChoiceList
              organizations={organizations}
              selected={filter.organization}
              onChange={(organization) => onFilter({ ...filter, organization })}
            />
          ),
        },
      ]}
      appliedFilters={appliedFilters}
      onClearAll={() => {}}
      mode={mode}
      setMode={setMode}
    />
  );
}
