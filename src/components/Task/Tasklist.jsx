import { useTaskState } from '../../../reducers/task.reducer.jsx';

import { TaskItem } from './TaskItem.jsx';
import { AddTask } from './AddTask.jsx';
import { useActiveTabState } from '../../../reducers/activeTab.context.jsx';

export const TaskList = () => {
  const activeTab = useActiveTabState();
  const tasks = useTaskState();

  const filteredTasks = tasks.filter((item) => item.projectId === activeTab);
  return (
    <div>
      <ul>
        {filteredTasks.length ? (
          filteredTasks.map((item) => <TaskItem key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500">No task available</p>
        )}
        <AddTask activeTab={activeTab} />
      </ul>
    </div>
  );
};
