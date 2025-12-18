import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // 강화된 진단 데이터 상태
  const [duration, setDuration] = useState('');
  const [breakupType, setBreakupType] = useState('');
  const [attachment, setAttachment] = useState('');
  const [struggle, setStruggle] = useState('');
  const [emotion, setEmotion] = useState('');

  const durations = [
    { label: '풋풋한 시작 (1년 미만)', value: '단기' },
    { label: '깊어진 우리 (1~3년)', value: '중기' },
    { label: '삶의 일부 (3년 이상)', value: '장기' },
  ];

  const breakupTypes = [
    { label: '내가 먼저 말했어 (통보)', value: '통보' },
    { label: '상대방이 이별을 고했어 (차임)', value: '차임' },
    { label: '서로 합의 하에 헤어졌어 (합의)', value: '합의' },
    { label: '갑자기 연락이 끊겼어 (잠수/환승)', value: '충격' },
  ];

  const attachmentStyles = [
    { label: '불안형 (떠날까 봐 늘 불안했어)', value: '불안형' },
    { label: '회피형 (너무 가까우면 답답했어)', value: '회피형' },
    { label: '공포회피 (가까워지고 싶은데 무서워)', value: '공포회피' },
    { label: '안정형 (헤어져도 나를 믿어)', value: '안정형' },
  ];

  const struggles = [
    { label: '잠을 못 자고 입맛이 없어', value: '신체증상' },
    { label: '자꾸 그 사람 SNS를 확인해', value: '집착' },
    { label: '내 잘못인 것 같아 자책하게 돼', value: '자책' },
    { label: '아무것도 하기 싫고 무기력해', value: '무기력' },
  ];

  const emotions = [
    { label: '그리움과 미련', value: '미련' },
    { label: '분노와 억울함', value: '분노' },
    { label: '우울과 공허함', value: '우울' },
    { label: '차라리 후련해', value: '후련' },
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      navigate('/chat', { state: { duration, breakupType, attachment, struggle, emotion } });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col h-screen p-6 justify-between bg-[#1A1625] animate-fade-in relative z-10 overflow-hidden">
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <button onClick={handleBack} className={`text-gray-500 transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <div className="flex gap-1.5 flex-1 mx-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#9B8DC7]' : 'bg-[#2D2640]'}`}></div>
            ))}
          </div>
          <span className="text-[10px] text-[#9B8DC7] font-bold">{step}/5</span>
        </div>

        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">두 사람은 얼마나 만났어?</h2>
            <p className="text-gray-400 mb-8 text-sm">너희들의 시간을 알려줘.</p>
            <div className="space-y-3">
              {durations.map((d) => (
                <button key={d.value} onClick={() => setDuration(d.value)} className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${duration === d.value ? 'border-[#9B8DC7] bg-[#2D2640]' : 'border-transparent bg-[#2D2640]/50'}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">어떻게 헤어지게 됐어?</h2>
            <p className="text-gray-400 mb-8 text-sm">이별의 상황을 이해하고 싶어.</p>
            <div className="space-y-3">
              {breakupTypes.map((b) => (
                <button key={b.value} onClick={() => setBreakupType(b.value)} className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${breakupType === b.value ? 'border-[#9B8DC7] bg-[#2D2640]' : 'border-transparent bg-[#2D2640]/50'}`}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">연애할 때 넌 어떤 모습이었어?</h2>
            <p className="text-gray-400 mb-8 text-sm">너의 애착 성향을 확인해볼게.</p>
            <div className="space-y-3">
              {attachmentStyles.map((a) => (
                <button key={a.value} onClick={() => setAttachment(a.value)} className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${attachment === a.value ? 'border-[#9B8DC7] bg-[#2D2640]' : 'border-transparent bg-[#2D2640]/50'}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">지금 너를 가장 괴롭히는 건 뭐야?</h2>
            <p className="text-gray-400 mb-8 text-sm">심리적인 증상을 체크해볼게.</p>
            <div className="space-y-3">
              {struggles.map((s) => (
                <button key={s.value} onClick={() => setStruggle(s.value)} className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${struggle === s.value ? 'border-[#9B8DC7] bg-[#2D2640]' : 'border-transparent bg-[#2D2640]/50'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-2">지금 이 순간, 네 마음은?</h2>
            <p className="text-gray-400 mb-8 text-sm">가장 크게 느껴지는 감정을 골라줘.</p>
            <div className="space-y-3">
              {emotions.map((e) => (
                <button key={e.value} onClick={() => setEmotion(e.value)} className={`w-full p-4 rounded-2xl text-left border-2 transition-all ${emotion === e.value ? 'border-[#9B8DC7] bg-[#2D2640]' : 'border-transparent bg-[#2D2640]/50'}`}>
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={
          (step === 1 && !duration) || 
          (step === 2 && !breakupType) || 
          (step === 3 && !attachment) || 
          (step === 4 && !struggle) || 
          (step === 5 && !emotion)
        }
        className="w-full bg-[#9B8DC7] disabled:opacity-30 text-white font-bold py-4 rounded-full shadow-lg mb-8 transition-all active:scale-95"
      >
        {step < 5 ? '다음으로' : '치유 여정 시작하기'}
      </button>
    </div>
  );
};

export default DiagnosisPage;