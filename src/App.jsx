import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { Tablist } from './components/Tablist/Tablist';
import { AddProjectForm } from './components/AddProjectForm.jsx';
import {
  useProjectState,
  useProjectDispatch,
} from './reducers/project.reducer';
import { PlusIcon } from 'lucide-react';
import { PanelLeftIcon } from 'lucide-react';

const Leftbar = ({ showLeftbar, setShowLeftbar }) => {
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

      <div
        className={`hidden ${
          showLeftbar ? 'sm:block' : ''
        } basis-[300px] grow-0 shrink-0 bg-gray-100`}
      >
        {/* leftbar header */}
        <div className="p-4 flex">
          <div className="text-xl font-semibold mr-auto">User</div>

          {showLeftbar && (
            <button onClick={() => setShowLeftbar((prev) => !prev)}>
              <PanelLeftIcon strokeWidth={1} />
            </button>
          )}
        </div>
        <Tablist tabsData={defaultTabs} />

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

          <Tablist tabsData={projects} />
        </div>
      </div>
    </>
  );
};

const Mainbar = ({ showLeftbar, setShowLeftbar }) => {
  return (
    <div className="flex-1 p-4">
      <div className="flex gap-4 items-center">
        <button
          className={`block ${showLeftbar ? 'sm:hidden' : ''}`}
          onClick={() => setShowLeftbar((prev) => !prev)}
        >
          <PanelLeftIcon />
        </button>

        <div className="text-2xl font-bold text-red-400">ReactTodo</div>
      </div>
      <TaskList />
    </div>
  );
};

function App() {
  const [showLeftbar, setShowLeftbar] = useState(true);
  return (
    <div className="flex min-h-screen">
      <Leftbar showLeftbar={showLeftbar} setShowLeftbar={setShowLeftbar} />
      <Mainbar setShowLeftbar={setShowLeftbar} showLeftbar={showLeftbar} />
    </div>
  );
}

export default App;
