import React from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DiagnosisPage from './components/DiagnosisPage';
import ChatPage from './components/ChatPage';
import CourierPage from './components/CourierPage';
import EmotionLogPage from './components/EmotionLogPage';

const BottomNav = () => {
  const location = useLocation();
  const hideNav = ['/', '/diagnosis'].includes(location.pathname);
  if (hideNav) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#151220]/95 backdrop-blur-md border-t border-[#2D2640] flex justify-around py-3 z-50 px-4">
      <NavLink to="/chat" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#9B8DC7]' : 'text-gray-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.913 2.658c2.075-.21 4.19-.308 6.33-.287a24.315 24.315 0 016.088.582c1.329.212 2.241 1.472 2.003 2.752A4.732 4.732 0 0019 7.375c0 2.66-2.14 4.75-4.75 4.75a4.747 4.747 0 00-3.251 1.254 24.52 24.52 0 01-6.751 4.075c-1.257.455-2.51-.543-2.41-1.843l.058-.766a24.447 24.447 0 01.239-2.225c.147-.775-.419-1.447-1.213-1.447a4.75 4.75 0 01-4.43-3.251c-.24-1.28.672-2.54 2.003-2.752z" /></svg>
        <span className="text-[10px]">위로봇</span>
      </NavLink>
      <NavLink to="/log" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#9B8DC7]' : 'text-gray-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM12 7a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-4.25a.75.75 0 01-.75-.75v-4.25A.75.75 0 0112 7z" clipRule="evenodd" /></svg>
        <span className="text-[10px]">마음일기</span>
      </NavLink>
      <NavLink to="/courier" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#9B8DC7]' : 'text-gray-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" /><path fillRule="evenodd" d="M3.087 9l.54 9.17c.126 2.14 1.898 3.83 4.04 3.83h8.668c2.14 0 3.913-1.69 4.039-3.83l.54-9.17H3.087zm12.963 4.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm-4.5 0a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" clipRule="evenodd" /></svg>
        <span className="text-[10px]">이별택배</span>
      </NavLink>
      <div className="flex flex-col items-center gap-1 text-gray-700 opacity-50 cursor-not-allowed">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 18.75a.75.75 0 000-1.5H12a.75.75 0 000 1.5h3.75z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" clipRule="evenodd" /></svg>
        <span className="text-[10px]">잇다(준비중)</span>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-[480px] min-h-screen bg-[#1A1625] shadow-2xl overflow-hidden relative flex flex-col">
        <HashRouter>
          <div className="flex-1 overflow-hidden relative">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/diagnosis" element={<DiagnosisPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/courier" element={<CourierPage />} />
              <Route path="/log" element={<EmotionLogPage />} />
            </Routes>
          </div>
          <BottomNav />
        </HashRouter>
      </div>
    </div>
  );
};

export default App;