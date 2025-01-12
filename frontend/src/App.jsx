import Header from './components/Header';
import { Outlet } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Calling handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 w-full">
      <Header onClick={handleToggle} />
      <ToastContainer theme="dark" />
      <div className="flex gap-2">
        {/* <Sidebar isOpen={isOpen} /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
