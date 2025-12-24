
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, RotateCcw, Send, X, Smile, HelpCircle } from 'lucide-react';

// ==========================================
// 1. 宠物配置中心
// ==========================================
const PET_SETTINGS = {
  name: "Mochi",
  friendName: "朋友",
  defaultColor: "#FFB7C5",
  personality: "活泼、贴心、偶尔调皮", 
  systemPrompt: (name: string, friend: string) => `
    你是一个可爱的桌面宠物，名字叫 ${name}。
    你的主人是 ${friend}。你的性格是：活泼、贴心、偶尔调皮。
    要求：1.回复必须简短（20字以内）。2.多用颜文字。3.像真正的宠物一样陪伴。
    请以 JSON 格式返回：{"text": "回复内容", "mood": "HAPPY|IDLE|THINKING|SLEEPY|SURPRISED"}
  `
};

type PetMood = 'IDLE' | 'HAPPY' | 'THINKING' | 'SLEEPY' | 'SURPRISED';
interface Message { role: 'user' | 'model'; text: string; }

// --- 宠物头像组件 ---
const PetAvatar: React.FC<{ mood: PetMood; color: string; size: number }> = ({ mood, color, size }) => {
  const renderFace = () => {
    switch (mood) {
      case 'HAPPY': return <g><path d="M40 55 Q50 65 60 55" stroke="black" strokeWidth="3" fill="none" /><circle cx="35" cy="45" r="3" fill="black" /><circle cx="65" cy="45" r="3" fill="black" /></g>;
      case 'THINKING': return <g><circle cx="35" cy="45" r="3" fill="black" /><circle cx="65" cy="45" r="3" fill="black" /><path d="M45 60 H55" stroke="black" strokeWidth="3" /></g>;
      case 'SLEEPY': return <g><path d="M30 45 H40" stroke="black" strokeWidth="3" /><path d="M60 45 H70" stroke="black" strokeWidth="3" /><text x="75" y="35" fontSize="12" className="animate-pulse">Zzz</text></g>;
      case 'SURPRISED': return <g><circle cx="35" cy="45" r="4" fill="black" /><circle cx="65" cy="45" r="4" fill="black" /><circle cx="50" cy="60" r="5" stroke="black" fill="none" /></g>;
      default: return <g><circle cx="35" cy="45" r="3" fill="black" /><circle cx="65" cy="45" r="3" fill="black" /><path d="M45 58 Q50 63 55 58" stroke="black" strokeWidth="2" fill="none" /></g>;
    }
  };

  return (
    <div className="relative animate-float cursor-pointer select-none">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <ellipse cx="50" cy="90" rx="30" ry="5" fill="black" opacity="0.1" />
        <path d="M20 80 Q10 80 10 60 Q10 20 50 20 Q90 20 90 60 Q90 80 80 80 L20 80" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
        <circle cx="25" cy="55" r="5" fill="#ffacc5" opacity="0.4" />
        <circle cx="75" cy="55" r="5" fill="#ffacc5" opacity="0.4" />
        {renderFace()}
      </svg>
    </div>
  );
};

export default function App() {
  const [mood, setMood] = useState<PetMood>('IDLE');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const askPet = async (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role: 'user', text } as Message];
    setMessages(newMsgs);
    setInputValue('');
    setMood('THINKING');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: newMsgs.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        config: {
          systemInstruction: PET_SETTINGS.systemPrompt(PET_SETTINGS.name, PET_SETTINGS.friendName),
          responseMimeType: "application/json",
        },
      });
      const data = JSON.parse(response.text || '{"text":"喵？","mood":"IDLE"}');
      setMessages([...newMsgs, { role: 'model', text: data.text }]);
      setMood(data.mood || 'IDLE');
    } catch (e) {
      setMood('SURPRISED');
      setMessages([...newMsgs, { role: 'model', text: "哎呀，信号不好..." }]);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent select-none">
      
      {/* 宠物本体 - 点击即开启聊天 */}
      <div 
        className="relative z-10 hover:scale-105 transition-transform duration-300 active:scale-95"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <PetAvatar mood={mood} color={PET_SETTINGS.defaultColor} size={180} />
        
        {/* 悬浮小气泡提示 */}
        {!isChatOpen && messages.length > 0 && (
          <div className="absolute -top-4 -right-8 bg-white px-3 py-1 rounded-full shadow-lg text-[10px] border border-pink-100 animate-bounce">
            {messages[messages.length-1].text.slice(0, 10)}...
          </div>
        )}
      </div>

      {/* 对话窗口 - 紧贴宠物上方显示 */}
      {isChatOpen && (
        <div className="mt-4 w-full max-w-[280px] bg-white rounded-3xl shadow-2xl border border-pink-50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-top">
          <div className="p-2 bg-pink-400 text-white flex justify-between items-center px-4">
            <span className="text-xs font-bold flex items-center gap-2"><Smile size={14}/> {PET_SETTINGS.name}</span>
            <div className="flex gap-2">
               <button onClick={() => setMessages([])} title="清空"><RotateCcw size={14}/></button>
               <button onClick={() => setIsChatOpen(false)}><X size={14}/></button>
            </div>
          </div>
          <div className="h-40 overflow-y-auto p-3 space-y-2 bg-pink-50/20 text-[11px]">
            {messages.length === 0 && <p className="text-center text-gray-400 py-4 italic">点击我开始聊天吧！</p>}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-2 py-1.5 rounded-xl max-w-[90%] ${m.role === 'user' ? 'bg-pink-400 text-white' : 'bg-white border shadow-sm text-gray-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form className="p-2 bg-white flex gap-1 border-t" onSubmit={(e) => {e.preventDefault(); askPet(inputValue);}}>
            <input className="flex-1 bg-gray-50 rounded-full px-3 py-1 text-[11px] outline-none focus:ring-1 focus:ring-pink-200"
                   value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="陪我聊聊..." />
            <button type="submit" className="bg-pink-400 text-white p-1.5 rounded-full"><Send size={12}/></button>
          </form>
        </div>
      )}

      {/* 帮助按钮 */}
      <div className="mt-4 opacity-30 hover:opacity-100 transition-opacity flex gap-4">
        <button onClick={() => setShowHelp(true)} className="text-gray-400 hover:text-pink-400"><HelpCircle size={16} /></button>
      </div>

      {/* 帮助弹窗 */}
      {showHelp && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-3xl p-6 shadow-xl border text-center space-y-3" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold text-gray-700">这是你的桌面 Mochi</p>
            <p className="text-xs text-gray-500">点击 Mochi 即可聊天<br/>窗口可以随意拖动</p>
            <button className="bg-pink-400 text-white px-6 py-1 rounded-full text-xs" onClick={() => setShowHelp(false)}>好哒</button>
          </div>
        </div>
      )}
    </div>
  );
}
