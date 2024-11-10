export const tasksActions = {
  UPDATE_TASK: 'task/update',
  ADD_TASK: 'task/add',
  DELETE_TASK: 'task/delete',
};

export const createInitialTaskState = () => [
  { id: '1', name: 'work on something 1', isDone: false, projectId: '1' },
  { id: '2', name: 'work on something 2', isDone: true, projectId: '1' },
  { id: '3', name: 'work on something 3', isDone: false, projectId: '2' },
  { id: '4', name: 'work on something 4', isDone: true, projectId: '1' },
];

export const taskReducer = (state, action) => {
  switch (action.type) {
    case tasksActions.UPDATE_TASK: {
      return state.map((item) => {
        if (item.id === action.taskId) {
          return { ...item, ...action.value };
        }
        return item;
      });
    }

    case tasksActions.ADD_TASK: {
      const taskData = action.value;
      const newTask = {
        id: Date.now().toString(),
        name: taskData.name,
        isDone: taskData.isDone || false,
        projectId: taskData.projectId,
      };
      return [...state, newTask];
    }

    case tasksActions.DELETE_TASK: {
      return state.filter((task) => task.id !== action.taskId);
    }

    default:
      throw Error('Unknown action.');
  }
};
