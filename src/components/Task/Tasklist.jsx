import { useTaskState } from './../../reducers/task.reducer.jsx';

import { TaskItem } from './TaskItem.jsx';
import { AddTask } from './AddTask.jsx';
import { useActiveTabState } from './../../reducers/activeTab.context.jsx';
import { useProjectState } from '../../reducers/project.reducer.jsx';

export const TaskList = () => {
  const activeTab = useActiveTabState();
  const tasks = useTaskState();
  const projects = useProjectState();
  const currentTab = projects.find((p) => p.id === activeTab);

  const filteredTasks = tasks.filter((item) => item.projectId === activeTab);
  return (
    <div className="mt-8 max-w-screen-md mx-auto">
      <div className="text-3xl font-bold">{currentTab.name}</div>
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
