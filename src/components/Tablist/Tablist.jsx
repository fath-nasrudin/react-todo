import { useActiveTabState } from '../../../reducers/activeTab.context';
import { TablistItem } from './TablistItem';

export const Tablist = ({ handleTabClick, tabsData }) => {
  return (
    <ul className="px-4">
      {tabsData.map((item) => (
        <TablistItem
          handleTabClick={handleTabClick}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
};
