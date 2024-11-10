import { useState } from 'react';
import { PencilLineIcon } from 'lucide-react';
import {
  tasksActions,
  useTaskDispatch,
} from '../../../reducers/task.reducer.jsx';
import { Trash2Icon } from 'lucide-react';
import { UpdateTaskForm } from './UpdateTaskForm.jsx';

export const TaskItem = ({ item, projects }) => {
  const [isEdit, setIsEdit] = useState(false);
  const taskDispatch = useTaskDispatch();

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
            <button
              onClick={() => {
                // dispatch delete task action
                taskDispatch({
                  type: tasksActions.DELETE_TASK,
                  taskId: item.id,
                });
              }}
            >
              <Trash2Icon
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
