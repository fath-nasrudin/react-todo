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
