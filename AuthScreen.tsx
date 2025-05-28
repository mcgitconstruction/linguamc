
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { AcademicCapIcon, EnvelopeIcon, UserIcon as UserOutlineIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const AuthScreen: React.FC = () => {
  const { login, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); // Mock password field
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && (!email || !name || !password)) {
        alert("Please fill in all fields for registration.");
        return;
    }
    if (!isRegistering && (!email || !password)) {
        alert("Please fill in email and password to login.");
        return;
    }
    // In a real app, you'd call an auth service here.
    // For this mock, we just use the email as part of the user's identity.
    // If registering, we use the provided name. If logging in, a default name.
    const loginName = isRegistering ? name : (email.split('@')[0] || 'Learner');
    login(email, loginName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-slate-800 dark:to-slate-900 p-4">
      <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <div className="text-center mb-8">
          <AcademicCapIcon className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome to AngloLingua!</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {isRegistering ? 'Create your account to start learning.' : 'Sign in to continue your journey.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-md placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                placeholder="you@example.com"
                />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserOutlineIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-md placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                    placeholder="Jan Kowalski"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
             <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 pl-10 border border-slate-300 dark:border-slate-600 rounded-md placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                placeholder="••••••••"
                />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
            >
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
