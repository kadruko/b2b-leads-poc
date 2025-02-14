import { ChoiceList } from '@shopify/polaris';
import { ALLOWED_EVENT_NAMES } from '../../.common/event/event.constants';

type EventNameChoiceListProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function EventNameChoiceList({
  selected,
  onChange,
}: EventNameChoiceListProps) {
  return (
    <ChoiceList
      title="Event"
      titleHidden
      choices={ALLOWED_EVENT_NAMES.map((name) => ({
        label: name,
        value: name,
      }))}
      selected={selected}
      onChange={onChange}
      allowMultiple
    />
  );
}
