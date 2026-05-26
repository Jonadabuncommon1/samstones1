import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot, User, Loader2, Minimize2 } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../lib/aiChat';
import { useAppContext } from '../store/AppContext';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hi there! 👋 I'm **Sam**, your personal Samstones shopping assistant! I can help you find the perfect item, answer questions about our products, or guide you through our luxury collection. What are you looking for today? 🛍️",
};

function renderMarkdown(text: string): React.ReactNode {
  // Simple markdown: bold **text**, line breaks
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part === '\n') return <br key={i} />;
    return part;
  });
}

export const AIChatWidget = () => {
  const { products } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isMinimized]);

  // Pulse badge after 3s to invite user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setUnreadCount(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(trimmed, newHistory, products);
      const assistantMsg: ChatMessage = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMsg]);
      if (!isOpen || isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, something went wrong. Please try again! 😊"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "What's trending?",
    "Show me shoes",
    "How do I order?",
    "Best under ₦50,000",
  ];

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: isMinimized ? 0 : 1, y: isMinimized ? 20 : 0, scale: isMinimized ? 0.95 : 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
            style={{ display: isMinimized ? 'none' : undefined }}
          >
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
              style={{ height: '520px' }}>
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#109121] to-[#0a6b18] px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-300 rounded-full border-2 border-[#109121]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">Sam — AI Assistant</p>
                    <p className="text-green-200 text-xs mt-0.5">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-white/70 hover:text-white transition-colors p-1"
                  >
                    <Minimize2 size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/70 hover:text-white transition-colors p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-gray-50 dark:bg-[#0d0d0d]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#109121] flex items-center justify-center flex-shrink-0 mb-1">
                        <Bot size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#109121] text-white rounded-br-sm'
                          : 'bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {renderMarkdown(msg.content)}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mb-1">
                        <User size={14} className="text-gray-500 dark:text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full bg-[#109121] flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex space-x-1.5 items-center h-4">
                        <span className="w-2 h-2 bg-[#109121] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#109121] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#109121] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              {messages.length === 1 && (
                <div className="px-3 py-2 flex gap-2 flex-wrap bg-gray-50 dark:bg-[#0d0d0d] border-t border-gray-100 dark:border-gray-800">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setInput(prompt);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="text-xs bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1.5 rounded-full hover:border-[#109121] hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-3 py-3 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#109121] dark:text-white placeholder-gray-400 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 bg-[#109121] hover:bg-[#0a6b18] disabled:opacity-40 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 mt-2">Powered by Gemini AI · Samstones Assistant</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isMinimized) setIsMinimized(false);
          setIsOpen(prev => !prev);
          setUnreadCount(0);
        }}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#109121] to-[#0a6b18] rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ boxShadow: '0 4px 24px rgba(16,145,33,0.4)' }}
        aria-label="Open AI Chat Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen && !isMinimized ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {unreadCount > 0 && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>
    </>
  );
};
