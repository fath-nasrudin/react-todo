export const createInitialProjectState = () => [
  { id: '1', name: 'Inbox' },
  { id: '2', name: 'Works' },
  { id: '3', name: 'Home' },
];

export const projectActions = {
  ADD_PROJECT: 'project/add',
  UPDATE_PROJECT: 'project/update',
  DELETE_PROJECT: 'project/delete',
};

export const projectReducer = (state, action) => {
  if (action.type === projectActions.ADD_PROJECT) {
    const newProject = {
      id: Date.now().toString(),
      name: action.value.name,
    };
    return [...state, newProject];
  }

  throw Error('Project Action unknown');
};
