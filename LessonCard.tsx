
import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson, SubscriptionTier } from '../types';
import { LockClosedIcon, CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../contexts/AppContext';
import { FREE_LESSON_COUNT } from '../constants';

interface LessonCardProps {
  lesson: Lesson;
  isLockedOverride?: boolean; // For individual lesson locking beyond free tier
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isLockedOverride }) => {
  const { user } = useAppContext();
  
  const isPremiumLesson = lesson.order > FREE_LESSON_COUNT;
  const isLocked = isLockedOverride ?? (isPremiumLesson && user?.subscriptionTier !== SubscriptionTier.PREMIUM);
  const isCompleted = user?.completedLessonIds.includes(lesson.id) ?? false;

  const cardBaseClasses = "rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1";
  const lockedClasses = "bg-slate-200 dark:bg-slate-700 cursor-not-allowed opacity-70";
  const unlockedClasses = "bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700";

  const cardContent = (
    <>
      <div className={`p-6 ${isLocked ? 'filter grayscale' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            lesson.level === 'A1' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' :
            lesson.level === 'A2' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' :
            'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100'
          }`}>
            {lesson.level}
          </span>
          {isCompleted && !isLocked && <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" titleAccess="Completed" />}
          {isLocked && <LockClosedIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" titleAccess="Locked" />}
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 truncate" title={lesson.title}>
          {lesson.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
          Estimated time: {lesson.estimatedTimeMinutes} min
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 h-10 overflow-hidden text-ellipsis">
          {lesson.content.introduction.substring(0, 100)}...
        </p>
      </div>
      {!isLocked && (
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
            <PlayCircleIcon className="h-5 w-5 mr-2" />
            Start Lesson
          </div>
        </div>
      )}
      {isLocked && (
         <div className="px-6 py-4 bg-slate-100 dark:bg-slate-600/50 border-t border-slate-300 dark:border-slate-600">
          <div className="flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold">
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Premium Lesson
          </div>
        </div>
      )}
    </>
  );

  if (isLocked) {
    return (
      <Link to="/paywall" state={{ lessonTitle: lesson.title }} className={`${cardBaseClasses} ${lockedClasses}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <Link to={`/lessons/${lesson.id}`} className={`${cardBaseClasses} ${unlockedClasses}`}>
      {cardContent}
    </Link>
  );
};

export default LessonCard;
