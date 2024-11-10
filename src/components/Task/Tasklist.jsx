import { useState } from 'react';
import { PencilLineIcon } from 'lucide-react';
import { tasksActions } from '../../../reducers/task.reducer';

const TaskItem = ({ item, taskDispatch, projects }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isEdit && (
        <UpdateTaskForm
          taskDispatch={taskDispatch}
          data={item}
          projects={projects}
          cancelHandler={() => setIsEdit(false)}
        />
      )}
      {!isEdit && (
        <li className="p-2 border-b-[1px] border-b-slate-200 flex gap-4 items-center">
          <input
            type="checkbox"
            checked={item.isDone}
            onChange={() => {
              taskDispatch({
                type: tasksActions.UPDATE_TASK,
                value: { isDone: !item.isDone },
                taskId: item.id,
              });
            }}
          />
          <div className={`mr-auto ${item.isDone ? 'line-through' : null}`}>
            {item.name}
          </div>
          <div className="flex items-center">
            <button onClick={() => setIsEdit(true)}>
              <PencilLineIcon
                strokeWidth={1}
                size={28}
                className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-300"
              />
            </button>
          </div>
        </li>
      )}
    </>
  );
};

const UpdateTaskForm = ({ taskDispatch, projects, data, cancelHandler }) => {
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

const AddTaskForm = ({
  taskDispatch,
  projects,
  activeTab,
  cancelAction,
  data = null,
}) => {
  if (!data) data = { name: '', projectId: '' };
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

const AddTask = ({ taskDispatch, projects, activeTab }) => {
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
          taskDispatch={taskDispatch}
          cancelAction={cancelAction}
        />
      )}
    </div>
  );
};

export const TaskList = ({ tasks, taskDispatch, activeTab, projects }) => {
  const filteredTasks = tasks.filter((item) => item.projectId === activeTab);
  return (
    <div>
      <ul>
        {filteredTasks.length ? (
          filteredTasks.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              taskDispatch={taskDispatch}
              projects={projects}
            />
          ))
        ) : (
          <p className="text-gray-500">No task available</p>
        )}
        <AddTask
          taskDispatch={taskDispatch}
          projects={projects}
          activeTab={activeTab}
        />
      </ul>
    </div>
  );
};
