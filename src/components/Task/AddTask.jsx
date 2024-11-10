import { useState } from 'react';
import {
  tasksActions,
  useTaskDispatch,
} from './../../reducers/task.reducer.jsx';
import { useActiveTabState } from './../../reducers/activeTab.context.jsx';
import { useProjectState } from './../../reducers/project.reducer.jsx';

export const AddTaskForm = ({ cancelAction, data = null }) => {
  const activeTab = useActiveTabState();
  const projects = useProjectState();
  if (!data) data = { name: '', projectId: '' };
  const [taskData, setTaskData] = useState(data);
  const taskDispatch = useTaskDispatch();
  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <form className="border-[1px] border-gray-400 rounded-md">
      <div className="p-4">
        <div>
          <label className="block invisible h-0 w-0" htmlFor="task-name">
            Name
          </label>
          <input
            className="w-full outline-none"
            type="text"
            id="task-name"
            name="name"
            placeholder="Task name"
            value={taskData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="border-t-[1px] border-t-gray-500 p-4 flex gap-2 text-sm">
        {/* project options */}
        <select
          name="projectId"
          className="mr-auto"
          onChange={handleInputChange}
          value={taskData.projectId || activeTab}
        >
          {projects.map((p) => {
            return (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            );
          })}
        </select>

        <button
          className="px-4 py-1 rounded-md bg-gray-100"
          onClick={(e) => {
            e.preventDefault();
            cancelAction();
            setTaskData(data);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 rounded-md bg-red-400 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault();
            // dispatch add task
            taskDispatch({
              type: tasksActions.ADD_TASK,
              value: {
                ...taskData,
                projectId: taskData.projectId ? taskData.projectId : activeTab,
              },
            });
            // reset form
            setTaskData(data);
          }}
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export const AddTask = ({ projects, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelAction = () => {
    setIsOpen(false);
  };
  return (
    <div className="py-2">
      {!isOpen && (
        <button
          className="w-full border-[1px] border-red-500 rounded-md text-red-500"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add task
        </button>
      )}

      {isOpen && (
        <AddTaskForm
          activeTab={activeTab}
          projects={projects}
          cancelAction={cancelAction}
        />
      )}
    </div>
  );
};
