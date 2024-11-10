import { useState } from 'react';
import {
  projectActions,
  useProjectDispatch,
} from '../../reducers/project.reducer';

export const AddProjectForm = ({ cancelAction }) => {
  const dispatchProject = useProjectDispatch();
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
