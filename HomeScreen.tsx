
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import LessonCard from '../components/LessonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { SubscriptionTier } from '../types';
import { SparklesIcon } from '@heroicons/react/24/solid';

const HomeScreen: React.FC = () => {
  const { isAuthenticated, user, lessons, isLoadingLessons } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return <LoadingSpinner text="Loading user data..." />;
  if (isLoadingLessons) return <LoadingSpinner text="Loading lessons..." />;

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8"> {/* Added padding-bottom for mobile nav */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
          Welcome back, <span className="text-blue-600 dark:text-blue-400">{user.name}!</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
          {user.subscriptionTier === SubscriptionTier.PREMIUM 
            ? "Explore all your lessons and continue your learning journey."
            : "Start with your free lessons or upgrade to unlock all content!"}
        </p>
      </header>

      {user.subscriptionTier !== SubscriptionTier.PREMIUM && (
        <div className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-xl shadow-lg text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Unlock Your Full Potential!</h2>
            <p className="mt-1 text-sm sm:text-base">Upgrade to Premium for unlimited access to all lessons and AI conversations.</p>
          </div>
          <button 
            onClick={() => navigate('/paywall')}
            className="bg-white text-blue-600 dark:bg-yellow-400 dark:text-slate-800 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow hover:bg-opacity-90 dark:hover:bg-yellow-300 transition-colors flex items-center"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Upgrade Now
          </button>
        </div>
      )}

      {sortedLessons.length === 0 && !isLoadingLessons && (
        <div className="text-center text-slate-500 dark:text-slate-400 py-10">
          <p className="text-xl">No lessons available at the moment.</p>
          <p>Please check back later or contact support if you believe this is an error.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
