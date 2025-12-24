
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, X, Smile } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  petName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onClose, petName }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col w-80 h-96 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Smile size={20} />
          <span className="font-semibold">{petName} 的悄悄话</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth bg-gray-50/50"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-10">
            和 {petName} 打个招呼吧！
          </div>
        )}
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="给 Mochi 发消息..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="bg-pink-400 text-white p-2 rounded-full hover:bg-pink-500 disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
