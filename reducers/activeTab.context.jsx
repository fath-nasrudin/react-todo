import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useDefaultTabId } from './project.reducer';

const ActiveTabStateContext = createContext();
const ActiveTabSetContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const defaultTab = useDefaultTabId();
  const [state, setState] = useState(defaultTab);
  return (
    <ActiveTabStateContext.Provider value={state}>
      <ActiveTabSetContext.Provider value={setState}>
        {children}
      </ActiveTabSetContext.Provider>
    </ActiveTabStateContext.Provider>
  );
};

export const useActiveTabState = () => useContext(ActiveTabStateContext);
export const useActiveTabSet = () => useContext(ActiveTabSetContext);
