
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/solid'; // Using solid for more distinct icons

interface ChatMessageProps {
  message: ChatMessageType;
  userName?: string;
  userProfilePic?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, userName, userProfilePic }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  if (isSystem) {
    return (
      <div className="my-2 text-center">
        <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-end my-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-white mr-2">
          <SparklesIcon className="h-5 w-5" />
        </div>
      )}
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
        }`}
      >
        {message.isLoading ? (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
      {isUser && userName && userProfilePic && (
         <img src={userProfilePic} alt={userName} className="flex-shrink-0 h-8 w-8 rounded-full object-cover ml-2" />
      )}
    </div>
  );
};

export default ChatMessage;
