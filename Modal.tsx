
import React, { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[100] p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 m-4 w-full ${sizeClasses[size]} transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear`}
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold text-slate-800 dark:text-white">{title}</h2>}
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes modal-appear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
