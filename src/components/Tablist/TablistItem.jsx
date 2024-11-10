import { useActiveTabState } from '../../../reducers/activeTab.context';
import { useProjectDispatch } from './../../../reducers/project.reducer';
import { PencilLineIcon, Trash2Icon } from 'lucide-react';

export const TablistItem = ({ item, handleTabClick }) => {
  const projectDispatch = useProjectDispatch();
  const activeTab = useActiveTabState();

  return (
    <li
      className={`px-2 rounded-sm  cursor-pointer ${
        activeTab === item.id ? 'bg-red-200' : 'hover:bg-gray-200'
      } flex justify-between`}
      onClick={handleTabClick}
      data-tabid={item.id}
    >
      {item.name}

      {/* settings */}
      {!item.default && (
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // setIsEdit(true);
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
              // taskDispatch({
              //   type: tasksActions.DELETE_TASK,
              //   taskId: item.id,
              // });
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
  );
};
