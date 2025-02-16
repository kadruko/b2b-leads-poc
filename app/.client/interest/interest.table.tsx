import { IndexTable } from '@shopify/polaris';
import { Interest } from '../../.common/interest/interest';

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
      headings={[{ title: 'Product' }, { title: 'Score' }]}
      selectable={false}
    >
      {interests.map(({ productVariant, interestScore }, index) => (
        <IndexTable.Row
          id={productVariant?.id || index.toString()}
          key={productVariant?.id || index}
          position={index}
        >
          <IndexTable.Cell>
            {productVariant?.product.title || 'Product not found'}
          </IndexTable.Cell>
          <IndexTable.Cell>{interestScore}</IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  );
}
