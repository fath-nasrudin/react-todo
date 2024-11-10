import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { TaskProvider } from './reducers/task.reducer.jsx';
import { ProjectProvider } from './reducers/project.reducer.jsx';
import { ActiveTabProvider } from './reducers/activeTab.context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <ActiveTabProvider>
          <App />
        </ActiveTabProvider>
      </TaskProvider>
    </ProjectProvider>
  </StrictMode>
);
