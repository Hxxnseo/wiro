import React, { useState, useEffect } from 'react';
import { EmotionEntry } from '../types';

const EmotionLogPage: React.FC = () => {
  const [logs, setLogs] = useState<EmotionEntry[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState('😶');
  const [note, setNote] = useState('');

  const emojis = ['😢', '😠', '🫠', '😶', '🩹', '🫂', '🌙', '🌊', '💔', '🕊️'];

  useEffect(() => {
    const savedLogs = localStorage.getItem('wiro_emotion_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveLog = () => {
    if (!note.trim()) return;

    const newLog: EmotionEntry = {
      id: Date.now().toString(),
      emoji: selectedEmoji,
      note: note.trim(),
      timestamp: Date.now(),
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('wiro_emotion_logs', JSON.stringify(updatedLogs));
    setNote('');
  };

  const deleteLog = (id: string) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    setLogs(updatedLogs);
    localStorage.setItem('wiro_emotion_logs', JSON.stringify(updatedLogs));
  };

  return (
    <div className="flex flex-col h-screen bg-[#1A1625] p-6 animate-fade-in pb-24 overflow-y-auto no-scrollbar">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">마음 일기</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          오늘 네 마음의 날씨는 어때?<br />
          아주 작은 감정이라도 괜찮아, 기록해두자.
        </p>
      </header>

      {/* Input Section */}
      <section className="bg-[#2D2640] p-5 rounded-3xl border border-white/5 shadow-xl mb-8 animate-fade-in-up">
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar mb-4">
          {emojis.map(e => (
            <button
              key={e}
              onClick={() => setSelectedEmoji(e)}
              className={`text-2xl p-2 rounded-xl transition-all ${selectedEmoji === e ? 'bg-[#9B8DC7] scale-110' : 'bg-[#1A1625] grayscale opacity-50'}`}
            >
              {e}
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="어떤 기분이 들어?"
          className="w-full bg-[#1A1625] text-white rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B8DC7]/50 resize-none h-24 mb-4"
        />
        <button
          onClick={saveLog}
          disabled={!note.trim()}
          className="w-full bg-[#9B8DC7] text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-30"
        >
          기록하기
        </button>
      </section>

      {/* History Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-[#9B8DC7] uppercase tracking-widest mb-2 px-1">최근 기록</h3>
        {logs.length === 0 ? (
          <div className="text-center py-12 text-gray-600 italic text-sm">
            아직 기록된 마음이 없어.<br />천천히 시작해보자.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-[#2D2640]/50 border border-white/5 p-4 rounded-2xl flex gap-4 animate-fade-in group">
              <div className="text-3xl flex-shrink-0 pt-1">{log.emoji}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-gray-500">
                    {new Date(log.timestamp).toLocaleString('ko-KR', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <button onClick={() => deleteLog(log.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {log.note}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default EmotionLogPage;