
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { UserIcon, EnvelopeIcon, IdentificationIcon, StarIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const ProfileScreen: React.FC = () => {
  const { user, logout, upgradeToPremium } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  // In a real app, these would be editable and saveable
  // For now, they are just displayed or pre-filled if user exists

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner text="Loading profile..." /></div>;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const completedLessonsCount = user.completedLessonIds.length;
  // Mock progress data - in a real app, this would come from user progress records
  const averageScore = 75; 
  const timeSpentLearning = "12 hours";

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">Your Profile</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center">
          <img 
            src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=128`} 
            alt={user.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 dark:border-blue-400 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">{user.name}</h2>
          <p className="text-slate-600 dark:text-slate-300">{user.email}</p>
          <span className={`mt-3 inline-block px-4 py-1 text-sm font-semibold rounded-full ${
            user.subscriptionTier === 'PREMIUM' 
            ? 'bg-yellow-400 text-yellow-800 dark:bg-yellow-500 dark:text-white' 
            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
          }`}>
            {user.subscriptionTier === 'PREMIUM' ? 'Premium Member' : 'Free Member'}
          </span>
          {user.subscriptionTier !== 'PREMIUM' && (
            <button 
              onClick={() => navigate('/paywall')}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-150 ease-in-out"
            >
              Upgrade to Premium
            </button>
          )}
        </div>

        {/* Account Details & Stats */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-3">Account Details</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{user.email}</p>
              </div>
            </div>
             <div className="flex items-center">
              <IdentificationIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Current Level</p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">{user.currentLevel}</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-3">Learning Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedLessonsCount}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Lessons Completed</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageScore}%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Avg. Homework Score</p>
            </div>
             <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timeSpentLearning}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Time Spent Learning</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t dark:border-slate-700 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
             <button className="flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Cog6ToothIcon className="h-5 w-5 mr-2" /> Settings (Coming Soon)
            </button>
            <button 
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
            >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
