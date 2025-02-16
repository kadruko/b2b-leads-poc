import { IndexTable } from '@shopify/polaris';
import { Interest } from '../../.common/interest/interest';
import { InterestRow } from './interest.row';

type InterestTableProps = {
  interests: Interest[];
  count: number;
};

export function InterestTable({ interests, count }: InterestTableProps) {
  return (
    <IndexTable
      resourceName={{
        singular: 'Product Interest',
        plural: 'Product Interests',
      }}
      itemCount={count}
      headings={[{ title: 'Product Variant' }, { title: 'Score' }]}
      selectable={false}
    >
      {interests.map((interest, index) => (
        <InterestRow interest={interest} index={index} />
      ))}
    </IndexTable>
  );
}
