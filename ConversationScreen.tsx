
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ChatMessage as ChatMessageType, SubscriptionTier } from '../types';
import ChatMessage from '../components/ChatMessage';
import { sendMessageToGemini, resetChat } from '../services/geminiService';
import { PaperAirplaneIcon, StopCircleIcon, ArrowPathIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const ConversationScreen: React.FC = () => {
  const { user, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Add an initial greeting from the AI
    setMessages([
      {
        id: 'system-intro',
        role: 'assistant',
        content: "Hello! I'm your AI English tutor. How can I help you practice today? (Witaj! Jestem Twoim korepetytorem AI. Jak mogę Ci dzisiaj pomóc w ćwiczeniach?)",
        timestamp: new Date(),
      },
    ]);
    resetChat(); // Reset chat history in service on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoadingAI) return;

    const newUserMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoadingAI(true);
    
    const aiThinkingMessage: ChatMessageType = {
        id: `ai-loading-${Date.now()}`,
        role: 'assistant',
        content: '...',
        timestamp: new Date(),
        isLoading: true,
    };
    setMessages(prevMessages => [...prevMessages, aiThinkingMessage]);

    try {
      // Pass current messages history for context, though Gemini chat instance maintains its own
      const aiResponseText = await sendMessageToGemini(messages, newUserMessage.content);
      const newAiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date(),
      };
      setMessages(prevMessages => prevMessages.filter(m => m.id !== aiThinkingMessage.id).concat(newAiMessage));
    } catch (error) {
      console.error("Error in AI conversation:", error);
      const errorAiMessage: ChatMessageType = {
        id: `ai-error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again. (Przepraszam, wystąpił błąd. Spróbuj ponownie.)",
        timestamp: new Date(),
      };
      setMessages(prevMessages => prevMessages.filter(m => m.id !== aiThinkingMessage.id).concat(errorAiMessage));
    } finally {
      setIsLoadingAI(false);
    }
  }, [input, isLoadingAI, messages]);


  const handleResetConversation = () => {
    resetChat();
    setMessages([
      {
        id: 'system-reset',
        role: 'assistant',
        content: "Okay, let's start over! How can I help you practice English? (OK, zacznijmy od nowa! Jak mogę pomóc Ci ćwiczyć angielski?)",
        timestamp: new Date(),
      },
    ]);
  };

  if (!user) {
    return <LoadingSpinner text="Loading user data..." />;
  }

  if (user.subscriptionTier === SubscriptionTier.FREE) {
    return (
      <div className="container mx-auto p-6 text-center flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
        <LockClosedIcon className="h-24 w-24 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">AI Conversations are a Premium Feature</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
          Practice your English speaking and listening skills with our advanced AI tutor. This feature is available for Premium subscribers.
        </p>
        <button
          onClick={() => navigate('/paywall')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-lg overflow-hidden">
      <header className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white">AI English Tutor</h1>
        <button 
            onClick={handleResetConversation}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors"
            title="Reset conversation"
        >
            <ArrowPathIcon className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} userName={user.name} userProfilePic={user.profilePictureUrl}/>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoadingAI && handleSendMessage()}
            placeholder="Type your message in English..."
            disabled={isLoadingAI}
            className="flex-grow p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow dark:bg-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoadingAI || input.trim() === ''}
            className={`p-3 rounded-lg text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isLoadingAI || input.trim() === ''
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-blue-500'
              }`}
          >
            {isLoadingAI ? <StopCircleIcon className="h-6 w-6 animate-pulse" /> : <PaperAirplaneIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationScreen;
