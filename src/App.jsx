import { useState } from 'react';
import { TaskList } from './components/Task/Tasklist';
import { PanelLeftIcon } from 'lucide-react';
import { Leftbar } from './components/Leftbar.jsx';
import { MobileLeftbar } from './components/MobileLeftbar.jsx';

const Mainbar = ({ showLeftbar, setShowLeftbar, setShowMobileLeftbar }) => {
  return (
    <div className="flex-1 p-4 max-w-screen-md mx-auto ">
      {/* header */}
      <div className="flex gap-4 items-center">
        {/* desktop button */}
        <button
          className={`hidden ${!showLeftbar ? 'sm:block' : ''}`}
          onClick={() => setShowLeftbar((prev) => !prev)}
        >
          <PanelLeftIcon />
        </button>
        {/* mobile button */}
        <button
          className={`block sm:hidden`}
          onClick={() => setShowMobileLeftbar(true)}
        >
          <PanelLeftIcon />
        </button>

        <div className="text-2xl font-bold text-red-400">ReactTodo</div>
      </div>
      <TaskList />
    </div>
  );
};

function App() {
  const [showLeftbar, setShowLeftbar] = useState(true);
  const [showMobileLeftbar, setShowMobileLeftbar] = useState(true);
  return (
    <div className="flex min-h-screen">
      <Leftbar showLeftbar={showLeftbar} setShowLeftbar={setShowLeftbar} />
      <MobileLeftbar
        showMobileLeftbar={showMobileLeftbar}
        setShowMobileLeftbar={setShowMobileLeftbar}
      />
      <Mainbar
        setShowLeftbar={setShowLeftbar}
        setShowMobileLeftbar={setShowMobileLeftbar}
        showLeftbar={showLeftbar}
      />
    </div>
  );
}

export default App;
