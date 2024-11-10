import { TablistItem } from './TablistItem';

export const Tablist = ({ tabsData, handleTabClick, activeTab }) => {
  return (
    <ul className="px-4">
      {tabsData.map((item) => (
        <TablistItem
          handleTabClick={handleTabClick}
          key={item.id}
          item={item}
          activeTab={activeTab}
        />
      ))}
    </ul>
  );
};
