import { useReducer } from 'react';
import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { Tablist } from './components/Tablist/Tablist';
import { taskReducer, createInitialTaskState } from '../reducers/task.reducer';
import {
  projectReducer,
  createInitialProjectState,
  projectActions,
} from '../reducers/project.reducer';
import { PlusIcon } from 'lucide-react';

const AddProjectForm = ({ cancelAction, dispatchProject }) => {
  const data = { name: '' };
  const [projectData, setProjectData] = useState(data);
  const handleInputChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/10 flex justify-center items-start">
      <div className="min-w-96 mt-36 p-4 rounded-md bg-white">
        <form className="border-[1px] border-gray-400 rounded-md">
          <div className="p-4">
            <div>
              <label className="block invisible h-0 w-0" htmlFor="project-name">
                Name
              </label>
              <input
                className="w-full outline-none"
                type="text"
                id="project-name"
                name="name"
                placeholder="Project name"
                value={projectData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="border-t-[1px] border-t-gray-500 p-4 flex gap-2 text-sm justify-end">
            <button
              className="px-4 py-1 rounded-md bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                cancelAction();
                setProjectData(data);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 rounded-md bg-gray-600 text-white font-semibold disabled:cursor-not-allowed"
              disabled={!projectData.name}
              onClick={(e) => {
                e.preventDefault();
                // dispatch add project
                dispatchProject({
                  type: projectActions.ADD_PROJECT,
                  value: projectData,
                });
                // reset form
                setProjectData(data);
                cancelAction();
              }}
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  const [allProjects, dispatchProject] = useReducer(
    projectReducer,
    null,
    createInitialProjectState
  );

  const defaultTabs = [allProjects[0]];
  const projects = allProjects.filter((p) => p.id !== defaultTabs[0].id);

  const [activeTab, setActiveTab] = useState(() => allProjects[0].id);

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
        defaultTabs={defaultTabs}
        projects={projects}
        dispatchProject={dispatchProject}
      />
      <Mainbar
        projects={allProjects}
        activeTab={activeTab}
        tasks={tasks}
        taskDispatch={taskDispatch}
      />
    </div>
  );
}

export default App;
