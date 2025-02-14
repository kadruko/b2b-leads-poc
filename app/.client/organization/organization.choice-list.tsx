import { Organization } from '@prisma/client';
import { ChoiceList } from '@shopify/polaris';

type OrganizationChoiceListProps = {
  organizations: Organization[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function OrganizationChoiceList({
  organizations,
  selected,
  onChange,
}: OrganizationChoiceListProps) {
  return (
    <ChoiceList
      title="Organization"
      titleHidden
      choices={organizations.map((organization) => ({
        label: organization.name,
        value: organization.id,
      }))}
      selected={selected}
      onChange={onChange}
      allowMultiple
    />
  );
}
