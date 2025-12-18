import React, { useState } from 'react';

const CourierPage: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col h-screen bg-[#1A1625] p-6 animate-fade-in pb-24 overflow-y-auto no-scrollbar">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">이별 택배</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          "물건은 가져가고, 위로는 남기고"<br />
          추억이 깃든 물건을 정리하는 것은 회복의 시작이야.
        </p>
      </header>

      {step === 1 ? (
        <div className="space-y-6 animate-fade-in-up">
          <div className="bg-[#2D2640] p-6 rounded-3xl border border-white/5 shadow-2xl">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-lg font-bold mb-2">어떻게 도와줄까?</h3>
            <p className="text-xs text-gray-400 mb-6">수거된 물건은 네가 선택한 방식으로 처리돼.</p>
            <div className="space-y-3">
              {['보관 서비스 (마음이 준비될 때까지)', '기부하기 (새로운 가치로)', '완전 폐기 (깔끔한 정리)'].map(opt => (
                <button key={opt} onClick={() => setStep(2)} className="w-full py-3 px-4 bg-[#1A1625] rounded-xl text-sm text-left hover:border-[#9B8DC7] border border-transparent transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-[#9B8DC7]/10 p-6 rounded-3xl border border-[#9B8DC7]/20">
            <h4 className="text-[#9B8DC7] font-bold text-sm mb-2">위로 굿즈 증정</h4>
            <p className="text-xs text-gray-300 leading-loose">
              택배 수거 시, WIRO가 준비한 '회복 키트'를 전달해줄게.<br />
              (마음챙김 일기장, 티백 세트, 향초 포함)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-xl font-bold mb-2">신청이 완료되었어</h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            내일 택배 기사님이 방문하실 거야.<br />
            물건을 내놓으며 네 마음도 한결 가벼워지길 바라.
          </p>
          <button onClick={() => setStep(1)} className="text-[#9B8DC7] text-sm underline">돌아가기</button>
        </div>
      )}
    </div>
  );
};

export default CourierPage;