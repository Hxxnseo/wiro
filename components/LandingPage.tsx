import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 text-center overflow-hidden bg-[#1A1625]">
      {/* Stars and Moon decorations remain */}
      <div className="z-10 flex flex-col items-center animate-fade-in-up">
        <div className="text-sm font-bold tracking-[0.2em] text-[#9B8DC7] mb-4 opacity-80">이별 회복 플랫폼</div>
        <div className="text-5xl mb-8 select-none animate-bounce-slow">🌙</div>
        
        <h1 className="text-4xl font-bold text-white mb-2 leading-tight tracking-tighter">
          잊다-잇다
        </h1>
        
        <h2 className="text-lg font-medium text-gray-400 mb-12">
          이별부터 새로운 사랑까지.
        </h2>
        
        <button
          onClick={() => navigate('/diagnosis')}
          className="w-full max-w-xs bg-[#9B8DC7] hover:bg-[#8a7db3] active:bg-[#7a6da3] text-white font-bold py-5 px-8 rounded-full shadow-[0_10px_30px_rgba(155,141,199,0.3)] transition-all duration-300 transform hover:scale-[1.02]"
        >
          회복 여정 시작하기
        </button>
        
        <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
          Psychology based AI Recovery System
        </p>
      </div>
    </div>
  );
};

export default LandingPage;