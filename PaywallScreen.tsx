
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { CheckBadgeIcon, SparklesIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { PREMIUM_FEATURES } from '../constants';

const PaywallScreen: React.FC = () => {
  const { user, upgradeToPremium } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLessonTitle = location.state?.lessonTitle || location.state?.fromLesson;


  const handleUpgrade = () => {
    // In a real app, this would trigger a payment flow (e.g., Stripe)
    upgradeToPremium();
    // You might want to show a success message before navigating or navigate to a specific page.
    alert("Congratulations! You've upgraded to Premium. All features are now unlocked.");
    navigate('/home'); 
  };

  if (user && user.subscriptionTier === 'PREMIUM') {
     // Should not happen if navigation is correct, but good to handle
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-green-900 p-6 text-center">
        <CheckBadgeIcon className="h-24 w-24 text-green-500 dark:text-green-400 mb-6" />
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-4">You are already a Premium Member!</h1>
        <p className="text-green-600 dark:text-green-300 mb-8">
          Enjoy full access to all AngloLingua features.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
        >
          Explore Lessons
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center text-white hover:text-blue-200 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <SparklesIcon className="h-20 w-20 text-yellow-400 dark:text-yellow-300 mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
              Go Premium!
            </h1>
            <p className="mt-4 text-xl text-slate-600 dark:text-slate-300">
              Unlock the full AngloLingua experience and accelerate your English learning.
            </p>
            {fromLessonTitle && (
                <p className="mt-2 text-md text-blue-600 dark:text-blue-400">
                    Upgrade to access "{fromLessonTitle}" and much more!
                </p>
            )}
          </div>

          <div className="px-6 py-8 sm:px-10 bg-slate-50 dark:bg-slate-800/50">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 text-center">What you get with Premium:</h2>
            <ul className="space-y-4 mb-10">
              {PREMIUM_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckBadgeIcon className="flex-shrink-0 h-6 w-6 text-green-500 dark:text-green-400 mr-3 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">$9.99 <span className="text-xl font-normal text-slate-500 dark:text-slate-400">/ month</span></p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cancel anytime. Billed monthly.</p>
            </div>

            <div className="mt-10">
              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-700 text-lg"
              >
                Upgrade to Premium Now
              </button>
            </div>
            
            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">
              By upgrading, you agree to our Terms of Service and Privacy Policy. Your subscription will auto-renew monthly unless canceled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallScreen;
