
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AppContextType, User, Lesson, SubscriptionTier } from '../types.ts';
import { MOCK_LESSONS, DEFAULT_USER, FREE_LESSON_COUNT } from '../constants.ts';
// Import lessonService if you create it, for now using MOCK_LESSONS directly
// import { fetchLessons } from '../services/lessonService'; 

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Simulate loading lessons
    const loadLessons = async () => {
      setIsLoadingLessons(true);
      // const fetchedLessons = await fetchLessons(); // If using a service
      // For now, just use mock data with a delay
      setTimeout(() => {
        setLessons(MOCK_LESSONS);
        setIsLoadingLessons(false);
      }, 500);
    };
    loadLessons();

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    // Check for saved user (simple persistence)
    const savedUser = localStorage.getItem('anglolingua_user');
    if (savedUser) {
        const parsedUser: User = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
    }

  }, []);

  const login = useCallback((email: string, name: string) => {
    const newUser: User = {
      ...DEFAULT_USER,
      id: `user-${Date.now()}`,
      email,
      name,
      profilePictureUrl: `https://picsum.photos/seed/${name.replace(/\s+/g, '')}/100/100`
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('anglolingua_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('anglolingua_user');
  }, []);

  const upgradeToPremium = useCallback(() => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, subscriptionTier: SubscriptionTier.PREMIUM };
      localStorage.setItem('anglolingua_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);
  
  const completeLesson = useCallback((lessonId: string) => {
    setUser(prevUser => {
      if (!prevUser || prevUser.completedLessonIds.includes(lessonId)) return prevUser;
      const updatedUser = { ...prevUser, completedLessonIds: [...prevUser.completedLessonIds, lessonId] };
      localStorage.setItem('anglolingua_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);


  return (
    <AppContext.Provider value={{ 
      isAuthenticated, 
      user, 
      lessons, 
      isLoadingLessons, 
      currentTheme, 
      login, 
      logout, 
      upgradeToPremium, 
      toggleTheme,
      completeLesson
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
