import {
  useActiveTabSet,
  useActiveTabState,
} from './../../reducers/activeTab.context';
import { tasksActions, useTaskDispatch } from './../../reducers/task.reducer';
import {
  projectActions,
  useProjectDispatch,
} from './../../reducers/project.reducer';
import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { AddProjectForm } from '../AddProjectForm';

export const TablistItem = ({ item }) => {
  const projectDispatch = useProjectDispatch();
  const taskDispatch = useTaskDispatch();
  const activeTab = useActiveTabState();
  const { set: setActiveTab, reset: resetActiveTab } = useActiveTabSet();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && (
        <AddProjectForm
          project={item}
          cancelAction={() => setShowForm(false)}
        />
      )}
      <li
        className={`p-2 rounded-md  cursor-pointer ${
          activeTab === item.id ? 'bg-red-200' : 'hover:bg-gray-200'
        } flex justify-between`}
        onClick={(e) => setActiveTab(e.target.dataset.tabid)}
        data-tabid={item.id}
      >
        {item.name}

        {/* settings */}
        {!item.default && (
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowForm(true);
              }}
            >
              <PencilLineIcon
                strokeWidth={1}
                size={28}
                className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-300"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // dispatch delete task action
                projectDispatch({
                  type: projectActions.DELETE_PROJECT,
                  payload: { projectId: item.id },
                });

                // delete related tasks
                taskDispatch({
                  type: tasksActions.DELETE_TASK_BY_PROJECTID,
                  payload: { projectId: item.id },
                });

                //
                resetActiveTab();
              }}
            >
              <Trash2Icon
                strokeWidth={1}
                size={28}
                className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-300"
              />
            </button>
          </div>
        )}
      </li>
    </>
  );
};
