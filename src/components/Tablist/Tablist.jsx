export const TablistItem = ({ item, handleTabClick, activeTab }) => {
  return (
    <li
      className={`px-2 rounded-sm  cursor-pointer ${
        activeTab === item.id ? 'bg-red-200' : 'hover:bg-gray-200'
      } `}
      onClick={handleTabClick}
      data-tabid={item.id}
    >
      {item.name}
    </li>
  );
};

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
