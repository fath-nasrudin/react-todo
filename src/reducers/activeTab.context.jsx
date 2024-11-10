import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useDefaultTabId } from './project.reducer';
import { useEffect } from 'react';

const ActiveTabStateContext = createContext();
const ActiveTabSetContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  const defaultTab = useDefaultTabId();
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('active_tab')) || defaultTab
  );

  useEffect(() => {
    localStorage.setItem('active_tab', JSON.stringify(state));
  }, [state]);
  return (
    <ActiveTabStateContext.Provider value={state}>
      <ActiveTabSetContext.Provider
        value={{ set: setState, reset: () => setState(defaultTab) }}
      >
        {children}
      </ActiveTabSetContext.Provider>
    </ActiveTabStateContext.Provider>
  );
};

export const useActiveTabState = () => useContext(ActiveTabStateContext);
export const useActiveTabSet = () => useContext(ActiveTabSetContext);
