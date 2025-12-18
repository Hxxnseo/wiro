import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Chat } from '@google/genai';
import { Message } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';

interface ChatMessage extends Message {
  mission?: string;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diag = location.state as any;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recoveryScore, setRecoveryScore] = useState(15);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const parseMessage = (rawText: string): { text: string; mission?: string } => {
    const missionRegex = /\[MISSION\](.*?)\[\/MISSION\]/i;
    const match = rawText.match(missionRegex);
    
    if (match) {
      return {
        text: rawText.replace(missionRegex, '').trim(),
        mission: match[1].trim()
      };
    }
    return { text: rawText };
  };

  useEffect(() => {
    // 모든 진단 데이터를 세션 생성 시 전달
    chatSessionRef.current = createChatSession(
      diag?.duration, 
      diag?.breakupType, 
      diag?.attachment, 
      diag?.struggle, 
      diag?.emotion
    );
    
    const initialRaw = diag ? 
      `안녕, 오늘 많이 힘들었지? ${diag.struggle === '신체증상' ? '몸은 좀 괜찮아? 잠은 좀 잤는지 걱정돼.' : diag.struggle === '자책' ? '자꾸 네 잘못인 것만 같아서 마음이 무겁구나.' : '네 마음이 얼마나 공허할지 내가 다 느껴져.'} [MISSION] 따뜻한 물 한 잔 마시기 [/MISSION] 지금 네 머릿속을 떠나지 않는 생각은 뭐야?` :
      "안녕, 오늘 밤도 찾아와줬구나. 무슨 일 있어?";

    const { text, mission } = parseMessage(initialRaw);
    setMessages([{ id: 'init', text, mission, sender: 'ai', timestamp: Date.now() }]);
  }, [diag]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userText = inputText.trim();
    setInputText('');

    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user', timestamp: Date.now() }]);
    setIsTyping(true);

    try {
      const { text: rawResponse } = await sendMessageToGemini(chatSessionRef.current, userText);
      const { text, mission } = parseMessage(rawResponse);
      
      setMessages(prev => [...prev, { 
        id: (Date.now()+1).toString(), 
        text, 
        mission,
        sender: 'ai', 
        timestamp: Date.now() 
      }]);
      setRecoveryScore(prev => Math.min(100, prev + 2));
    } catch (error) {
      setMessages(prev => [...prev, { id: 'err', text: "미안, 잠시 연결이 불안정해.", sender: 'ai', timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1A1625] pb-20">
      <header className="px-4 py-4 border-b border-[#2D2640] bg-[#1A1625]/90 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3D3455] flex items-center justify-center text-sm shadow-inner">🌙</div>
            <div>
              <h1 className="text-white font-bold text-sm">WIRO 코치</h1>
              <p className="text-[10px] text-[#9B8DC7] animate-pulse">치유 플랜 분석 중...</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#9B8DC7] font-bold uppercase">Recovery {recoveryScore}%</span>
            <div className="w-24 h-1.5 bg-[#2D2640] rounded-full mt-1 overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#9B8DC7] to-purple-400 transition-all duration-1000" style={{ width: `${recoveryScore}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
            {/* Bubble */}
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.sender === 'user' ? 'bg-[#9B8DC7] text-white rounded-tr-none' : 'bg-[#2D2640] text-white rounded-tl-none border border-white/5'}`}>
              {msg.text}
            </div>

            {/* Mission Card */}
            {msg.mission && (
              <div className="mt-3 w-full max-w-[280px] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="bg-gradient-to-br from-[#2D2640] to-[#1A1625] border border-[#9B8DC7]/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(155,141,199,0.15)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[#9B8DC7]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.455L18 2.25l.259 1.036a3.375 3.375 0 002.455 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#9B8DC7] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-sm">Daily Mission</span>
                      <h4 className="text-[#9B8DC7] font-bold text-xs">오늘의 작은 발걸음</h4>
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {msg.mission}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse"><div className="bg-[#2D2640] px-4 py-3 rounded-2xl rounded-tl-none text-xs text-gray-400 shadow-sm border border-white/5">WIRO가 최적의 위로를 고르는 중...</div></div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-[#151220] border-t border-[#2D2640]">
        <form onSubmit={handleSend} className="flex gap-2 max-w-[480px] mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="WIRO에게 속마음을 말해줘..."
            className="flex-1 bg-[#2D2640] text-white rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B8DC7]/50"
            disabled={isTyping}
          />
          <button type="submit" disabled={!inputText.trim() || isTyping} className="bg-[#9B8DC7] text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;