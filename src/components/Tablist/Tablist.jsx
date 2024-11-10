import { useActiveTabState } from '../../../reducers/activeTab.context';
import { TablistItem } from './TablistItem';

export const Tablist = ({ tabsData }) => {
  return (
    <ul className="px-4">
      {tabsData.map((item) => (
        <TablistItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
