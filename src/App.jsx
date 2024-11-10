import { useReducer } from 'react';
import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { Tablist } from './components/Tablist/Tablist';
import { taskReducer, createInitialTaskState } from '../reducers/task.reducer';

const createInitialProjectState = () => [
  { id: '1', name: 'Inbox' },
  { id: '2', name: 'Works' },
  { id: '3', name: 'Home' },
];

const projectReducer = (state, action) => {};

const Leftbar = ({ activeTab, handleTabClick, tabsData, projectDispatch }) => {
  return (
    <div className="hidden sm:block basis-[300px] grow-0 shrink-0 bg-gray-100 pt-8">
      <Tablist
        tabsData={tabsData}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    </div>
  );
};

const Mainbar = ({ tasks, taskDispatch, activeTab, projects }) => {
  // update task

  return (
    <div className="flex-1 p-4">
      <TaskList
        projects={projects}
        activeTab={activeTab}
        tasks={tasks}
        taskDispatch={taskDispatch}
      />
    </div>
  );
};

function App() {
  const [tabsData, projectDispatch] = useReducer(
    projectReducer,
    null,
    createInitialProjectState
  );

  const [activeTab, setActiveTab] = useState(() => tabsData[0].id);

  const [tasks, taskDispatch] = useReducer(
    taskReducer,
    null,
    createInitialTaskState
  );

  const handleTabClick = (e) => {
    setActiveTab(e.target.dataset.tabid);
  };

  return (
    <div className="flex min-h-screen">
      <Leftbar
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        tabsData={tabsData}
        projectDispatch={projectDispatch}
      />
      <Mainbar
        projects={tabsData}
        activeTab={activeTab}
        tasks={tasks}
        taskDispatch={taskDispatch}
      />
    </div>
  );
}

export default App;
