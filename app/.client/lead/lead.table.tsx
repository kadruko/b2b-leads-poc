import { useNavigate } from '@remix-run/react';
import { IndexTable } from '@shopify/polaris';
import { Lead } from '../../.common/lead/lead';

type LeadTableProps = {
  leads: Lead[];
  count: number;
};

export function LeadTable({ leads, count }: LeadTableProps) {
  const navigate = useNavigate();

  return (
    <IndexTable
      resourceName={{
        singular: 'Event',
        plural: 'Events',
      }}
      itemCount={count}
      headings={[{ title: 'Organization' }, { title: 'Score' }]}
      selectable={false}
    >
      {leads.map(({ organizationId, organizationName, leadScore }, index) => (
        <IndexTable.Row
          id={organizationId}
          key={organizationId}
          position={index}
          onClick={() => navigate(`/app/leads/${organizationId}`)}
        >
          <IndexTable.Cell>{organizationName}</IndexTable.Cell>
          <IndexTable.Cell>{leadScore}</IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  );
}
