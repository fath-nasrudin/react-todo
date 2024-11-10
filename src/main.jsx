import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { TaskProvider } from '../reducers/task.reducer.jsx';
import { ProjectProvider } from '../reducers/project.reducer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ProjectProvider>
  </StrictMode>
);
