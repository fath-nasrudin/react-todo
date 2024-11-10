import { useReducer } from 'react';
import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { Tablist } from './components/Tablist/Tablist';
import { AddProjectForm } from './components/AddProjectForm.jsx';

import {
  projectReducer,
  createInitialProjectState,
} from '../reducers/project.reducer';
import { PlusIcon } from 'lucide-react';

const Leftbar = ({
  activeTab,
  handleTabClick,
  defaultTabs,
  projects,
  dispatchProject,
}) => {
  const [showForm, setShowForm] = useState(false);

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

const Mainbar = ({ activeTab, projects }) => {
  return (
    <div className="flex-1 p-4">
      <TaskList projects={projects} activeTab={activeTab} />
    </div>
  );
};

function App() {
  const [allProjects, dispatchProject] = useReducer(
    projectReducer,
    null,
    createInitialProjectState
  );

  const defaultTabs = [allProjects[0]];
  const projects = allProjects.filter((p) => p.id !== defaultTabs[0].id);

  const [activeTab, setActiveTab] = useState(() => allProjects[0].id);

  const handleTabClick = (e) => {
    setActiveTab(e.target.dataset.tabid);
  };

  return (
    <div className="flex min-h-screen">
      <Leftbar
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        defaultTabs={defaultTabs}
        projects={projects}
        dispatchProject={dispatchProject}
      />
      <Mainbar projects={allProjects} activeTab={activeTab} />
    </div>
  );
}

export default App;
