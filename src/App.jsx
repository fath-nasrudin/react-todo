import { useReducer } from 'react';
import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { Tablist } from './components/Tablist/Tablist';
import { AddProjectForm } from './components/AddProjectForm.jsx';

import {
  projectReducer,
  createInitialProjectState,
  useProjectState,
  useProjectDispatch,
} from '../reducers/project.reducer';
import { PlusIcon } from 'lucide-react';

const Leftbar = ({ activeTab, handleTabClick }) => {
  const [showForm, setShowForm] = useState(false);
  const allProjects = useProjectState();
  const dispatchProject = useProjectDispatch();

  const defaultTabs = allProjects.filter((p) => p.default === true);
  const projects = allProjects.filter((p) => p.default !== true);

  return (
    <>
      {showForm && (
        <AddProjectForm
          dispatchProject={dispatchProject}
          cancelAction={() => setShowForm(false)}
        />
      )}

      <div className="hidden sm:block basis-[300px] grow-0 shrink-0 bg-gray-100 pt-8">
        <Tablist
          tabsData={defaultTabs}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />

        <div className="mt-8">
          <div className="flex px-4">
            <div className="mr-auto font-semibold">Projects</div>
            <button onClick={() => setShowForm((prev) => !prev)}>
              <PlusIcon
                strokeWidth={1}
                size={28}
                className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-300"
              />
            </button>
          </div>

          <Tablist
            tabsData={projects}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </div>
    </>
  );
};

const Mainbar = ({ activeTab }) => {
  return (
    <div className="flex-1 p-4">
      <TaskList activeTab={activeTab} />
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (e) => {
    setActiveTab(e.target.dataset.tabid);
  };

  return (
    <div className="flex min-h-screen">
      <Leftbar activeTab={activeTab} handleTabClick={handleTabClick} />
      <Mainbar activeTab={activeTab} />
    </div>
  );
}

export default App;
