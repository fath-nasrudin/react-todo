import { useState } from 'react';
import {
  tasksActions,
  useTaskDispatch,
} from '../../../reducers/task.reducer.jsx';
import { useProjectState } from '../../../reducers/project.reducer.jsx';

export const UpdateTaskForm = ({ data, cancelHandler }) => {
  const taskDispatch = useTaskDispatch();
  const projects = useProjectState();
  const [taskData, setTaskData] = useState(data);
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
          value={taskData.projectId || ''}
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
            setTaskData(data);
            cancelHandler();
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 rounded-md bg-red-400 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault();
            // dispatch update task
            taskDispatch({
              type: tasksActions.UPDATE_TASK,
              value: taskData,
              taskId: taskData.id,
            });

            // reset form
            setTaskData(data);
            cancelHandler();
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};
