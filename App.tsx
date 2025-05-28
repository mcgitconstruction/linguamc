
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './contexts/AppContext.tsx';
import Navbar from './components/Navbar.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';

const AuthScreen = lazy(() => import('./screens/AuthScreen.tsx'));
const HomeScreen = lazy(() => import('./screens/HomeScreen.tsx'));
const LessonScreen = lazy(() => import('./screens/LessonScreen.tsx'));
const HomeworkScreen = lazy(() => import('./screens/HomeworkScreen.tsx'));
const ConversationScreen = lazy(() => import('./screens/ConversationScreen.tsx'));
const PaywallScreen = lazy(() => import('./screens/PaywallScreen.tsx'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen.tsx'));

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

const AppContent: React.FC = () => {
  const { currentTheme, isAuthenticated } = useAppContext(); // Access theme to ensure it's applied

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme === 'dark' ? 'dark' : ''} bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center h-[calc(100vh-4rem)]"><LoadingSpinner text="Loading page..." size="lg" /></div>}>
          <Routes>
            <Route path="/auth" element={<AuthScreen />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/lessons/:lessonId" element={<LessonScreen />} />
              <Route path="/lessons/:lessonId/homework" element={<HomeworkScreen />} />
              <Route path="/conversation" element={<ConversationScreen />} />
              <Route path="/paywall" element={<PaywallScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/auth"} replace />} />
            <Route path="*" element={<div className="text-center p-20">
                                        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                                        <p className="mt-4">The page you are looking for does not exist.</p>
                                        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Go Home</Link>
                                      </div>} />
          </Routes>
        </Suspense>
      </main>
      <footer className="bg-white dark:bg-slate-800 text-center p-4 text-sm text-slate-600 dark:text-slate-400 border-t dark:border-slate-700">
        © {new Date().getFullYear()} AngloLingua. All rights reserved.
      </footer>
    </div>
  );
}

// Helper Link component for 404 page or other simple links outside Router context
const Link: React.FC<{to: string, className?:string, children: React.ReactNode}> = ({to, className, children}) => {
  const navigateTo = () => window.location.hash = to;
  return <a href={`#${to}`} onClick={navigateTo} className={className}>{children}</a>
}


const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
