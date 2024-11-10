import { createContext, useContext, useReducer } from 'react';

export const createInitialProjectState = () => [
  { id: '1', name: 'Inbox', default: true },
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

  if (action.type === projectActions.UPDATE_PROJECT) {
    return state.map((p) => {
      if (p.id === action.payload.id) {
        return { ...p, ...action.payload };
      }
      return p;
    });
  }

  if (action.type === projectActions.DELETE_PROJECT) {
    return state.filter((s) => s.id !== action.payload.projectId);
  }

  throw Error('Project Action unknown');
};

const ProjectStateContext = createContext(createInitialProjectState());
const ProjectDispatchContext = createContext();
const DefaultTabIdContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    projectReducer,
    null,
    createInitialProjectState
  );

  return (
    <ProjectStateContext.Provider value={state}>
      <ProjectDispatchContext.Provider value={dispatch}>
        <DefaultTabIdContext.Provider value={createInitialProjectState()[0].id}>
          {children}
        </DefaultTabIdContext.Provider>
      </ProjectDispatchContext.Provider>
    </ProjectStateContext.Provider>
  );
};

export const useProjectState = () => useContext(ProjectStateContext);
export const useProjectDispatch = () => useContext(ProjectDispatchContext);
export const useDefaultTabId = () => useContext(DefaultTabIdContext);
