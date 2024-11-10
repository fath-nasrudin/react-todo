import { PlusIcon } from 'lucide-react';
import { PanelLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Tablist } from './Tablist/Tablist';
import { AddProjectForm } from './AddProjectForm.jsx';
import {
  useProjectState,
  useProjectDispatch,
} from '../reducers/project.reducer';

export const MobileLeftbar = ({ showMobileLeftbar, setShowMobileLeftbar }) => {
  const [showForm, setShowForm] = useState(false);
  const allProjects = useProjectState();
  const dispatchProject = useProjectDispatch();

  const defaultTabs = allProjects.filter((p) => p.default === true);
  const projects = allProjects.filter((p) => p.default !== true);

  return (
    <div
      className={`sm:hidden ${
        showMobileLeftbar ? 'block' : 'hidden'
      } fixed top-0 left-0 w-full h-full bg-black/20`}
    >
      {showForm && (
        <AddProjectForm
          dispatchProject={dispatchProject}
          cancelAction={() => setShowForm(false)}
        />
      )}

      <div
        className={`sm:hidden ${
          showMobileLeftbar ? 'block' : 'hidden'
        } max-w-[300px] h-full bg-gray-100`}
      >
        {/* leftbar header */}
        <div className="p-4 flex">
          <div className="text-xl font-semibold mr-auto">User</div>

          {showMobileLeftbar && (
            <button onClick={() => setShowMobileLeftbar((prev) => !prev)}>
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
    </div>
  );
};
