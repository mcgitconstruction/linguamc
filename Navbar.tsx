
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { SunIcon, MoonIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, AcademicCapIcon, ChatBubbleLeftRightIcon, CreditCardIcon, UserIcon as ProfileIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, currentTheme, toggleTheme } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ to, children, icon }) => (
    <Link to={to} className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-colors">
      {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
      {children}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-2xl font-bold text-blue-700 dark:text-blue-300">AngloLingua</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user && (
              <>
                <NavLink to="/home" icon={<HomeIcon className="hero-icon" />}>Lessons</NavLink>
                <NavLink to="/conversation" icon={<ChatBubbleLeftRightIcon className="hero-icon" />}>AI Chat</NavLink>
                {user.subscriptionTier !== 'PREMIUM' && (
                  <NavLink to="/paywall" icon={<CreditCardIcon className="hero-icon" />}>Premium</NavLink>
                )}
              </>
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label={currentTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {currentTheme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            {isAuthenticated && user ? (
              <div className="ml-3 relative group">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <img className="h-8 w-8 rounded-full object-cover" src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                </button>
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out transform scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    Signed in as <br/><strong className="truncate">{user.name}</strong>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600"></div>
                  <NavLink to="/profile" icon={<ProfileIcon className="hero-icon" />}>Profile</NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                  >
                    <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/auth" icon={<UserCircleIcon className="hero-icon" />}>Login</NavLink>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (Bottom Nav Bar Style) */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-top p-2 flex justify-around">
          <NavLink to="/home" icon={<HomeIcon className="hero-icon mx-auto" />}>
             <span className="text-xs">Lessons</span>
          </NavLink>
          <NavLink to="/conversation" icon={<ChatBubbleLeftRightIcon className="hero-icon mx-auto" />}>
             <span className="text-xs">AI Chat</span>
          </NavLink>
           {user && user.subscriptionTier !== 'PREMIUM' && (
            <NavLink to="/paywall" icon={<CreditCardIcon className="hero-icon mx-auto" />}>
                <span className="text-xs">Premium</span>
            </NavLink>
           )}
          <NavLink to="/profile" icon={<ProfileIcon className="hero-icon mx-auto" />}>
             <span className="text-xs">Profile</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

// Placeholder icons (Heroicons are used directly)
const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);


export default Navbar;
