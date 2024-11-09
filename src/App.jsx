import { useState } from 'react';

const TablistItem = ({ item, handleClick, activeTab }) => {
  return (
    <li
      className={`px-2 rounded-sm  cursor-pointer ${
        activeTab === item.id ? 'bg-red-200' : 'hover:bg-gray-200'
      } `}
      onClick={handleClick}
      data-tabid={item.id}
    >
      {item.name}
    </li>
  );
};

const Tablist = ({ tabsData, handleClick, activeTab }) => {
  return (
    <ul className="px-4">
      {tabsData.map((item) => (
        <TablistItem
          handleClick={handleClick}
          key={item.id}
          item={item}
          activeTab={activeTab}
        />
      ))}
    </ul>
  );
};

const Leftbar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const handleClick = (e) => {
    setActiveTab(e.target.dataset.tabid);
  };

  const tabsData = [
    { id: '1', name: 'Inbox' },
    { id: '2', name: 'Works' },
    { id: '3', name: 'Home' },
  ];

  const tabsData2 = [
    { id: '4', name: 'Inbox' },
    { id: '5', name: 'Works' },
    { id: '6', name: 'Home' },
  ];
  return (
    <div className="hidden sm:block basis-[300px] grow-0 shrink-0 bg-gray-100 pt-8">
      <Tablist
        tabsData={tabsData}
        handleClick={handleClick}
        activeTab={activeTab}
      />

      <Tablist
        tabsData={tabsData2}
        handleClick={handleClick}
        activeTab={activeTab}
      />
    </div>
  );
};

const TaskItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <li className="p-2 border-b-[1px] border-b-slate-200 flex gap-4 items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setIsChecked((prev) => !prev);
          // dispatch an action
        }}
      />
      <div className={`${isChecked ? 'line-through' : null}`}>{item.name}</div>
    </li>
  );
};

const initializeTasks = () => [
  { id: '1', name: 'work on something 1', projectId: '1' },
  { id: '2', name: 'work on something 2', projectId: '1' },
  { id: '3', name: 'work on something 3', projectId: '2' },
  { id: '4', name: 'work on something 4', projectId: '1' },
];

const Mainbar = () => {
  const [tasks, setTasks] = useState(initializeTasks);

  // update task
  return (
    <div className="flex-1 p-4">
      <ul>
        {tasks
          // .filter((item) => item.projectId === '1')
          .map((item) => (
            <TaskItem key={item.id} item={item} />
          ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="flex min-h-screen">
      <Leftbar />
      <Mainbar />
    </div>
  );
}

export default App;
