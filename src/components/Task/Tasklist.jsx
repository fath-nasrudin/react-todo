import { useTaskState } from '../../../reducers/task.reducer.jsx';

import { TaskItem } from './TaskItem.jsx';
import { AddTask } from './AddTask.jsx';

export const TaskList = ({ activeTab, projects }) => {
  const tasks = useTaskState();
  const filteredTasks = tasks.filter((item) => item.projectId === activeTab);
  return (
    <div>
      <ul>
        {filteredTasks.length ? (
          filteredTasks.map((item) => (
            <TaskItem key={item.id} item={item} projects={projects} />
          ))
        ) : (
          <p className="text-gray-500">No task available</p>
        )}
        <AddTask projects={projects} activeTab={activeTab} />
      </ul>
    </div>
  );
};
