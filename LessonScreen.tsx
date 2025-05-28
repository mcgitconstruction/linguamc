
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Lesson, VocabularyItem, GrammarRule, SubscriptionTier } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchLessonById } from '../services/lessonService';
import { LockClosedIcon, BookOpenIcon, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { FREE_LESSON_COUNT } from '../constants';

const LessonScreen: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user, completeLesson } = useAppContext();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!lessonId) {
      navigate('/home');
      return;
    }

    const loadLesson = async () => {
      setIsLoading(true);
      const fetchedLesson = await fetchLessonById(lessonId);
      if (fetchedLesson) {
        setLesson(fetchedLesson);
        if (user?.completedLessonIds.includes(lessonId)) {
            setIsCompleted(true);
        }
      } else {
        navigate('/404'); // Or a "lesson not found" page
      }
      setIsLoading(false);
    };

    loadLesson();
  }, [lessonId, navigate, user]);

  if (isLoading || !user) {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner text="Loading lesson..." /></div>;
  }

  if (!lesson) {
    return <div className="text-center p-8">Lesson not found.</div>;
  }

  const isPremiumLesson = lesson.order > FREE_LESSON_COUNT;
  const isLocked = isPremiumLesson && user.subscriptionTier !== SubscriptionTier.PREMIUM;

  if (isLocked) {
    return (
      <div className="container mx-auto p-6 text-center">
        <LockClosedIcon className="h-24 w-24 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Premium Lesson Locked</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This lesson "{lesson.title}" is part of our premium content.
        </p>
        <button
          onClick={() => navigate('/paywall', { state: { fromLesson: lesson.title } })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Upgrade to Premium
        </button>
        <Link to="/home" className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline">
          Back to Lessons
        </Link>
      </div>
    );
  }

  const handleMarkAsComplete = () => {
    if (lessonId && !isCompleted) {
      completeLesson(lessonId);
      setIsCompleted(true);
    }
  }

  const Section: React.FC<{title: string, children: React.ReactNode, icon?: React.ReactNode}> = ({title, children, icon}) => (
    <section className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <header className="mb-8 text-center border-b border-slate-200 dark:border-slate-700 pb-6">
        <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full mb-2 ${
            lesson.level === 'A1' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' :
            lesson.level === 'A2' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' :
            'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100'
          }`}>
            Level: {lesson.level}
        </span>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">{lesson.title}</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">{lesson.content.introduction}</p>
      </header>

      <Section title="Vocabulary (Słownictwo)" icon={<BookOpenIcon className="h-7 w-7 text-green-500" />}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.content.vocabulary.map((item: VocabularyItem, index: number) => (
            <li key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow">
              <p className="font-semibold text-lg text-slate-800 dark:text-white">{item.english} - <span className="font-normal text-slate-600 dark:text-slate-300">{item.polish}</span></p>
              {item.exampleSentence && <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">e.g., "{item.exampleSentence}"</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Grammar (Gramatyka)" icon={<PencilSquareIcon className="h-7 w-7 text-yellow-500" />}>
        {lesson.content.grammar.map((rule: GrammarRule, index: number) => (
          <div key={index} className="mb-6 last:mb-0 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow">
            <h3 className="text-xl font-medium text-slate-700 dark:text-slate-100 mb-2">{rule.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-2 whitespace-pre-line">{rule.explanation}</p>
            <div className="mt-2">
              <p className="font-medium text-sm text-slate-500 dark:text-slate-400">Examples:</p>
              <ul className="list-disc list-inside ml-4 text-slate-600 dark:text-slate-300">
                {rule.examples.map((ex: string, i: number) => <li key={i} className="italic">{ex}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </Section>

      {lesson.content.dialogue && (
        <Section title={lesson.content.dialogue.title} icon={<ChatBubbleIcon className="h-7 w-7 text-purple-500" />}>
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow">
                {lesson.content.dialogue.lines.map((line, index) => (
                    <div key={index} className={line.speaker === lesson.content.dialogue?.participants[0] ? 'text-left' : 'text-right'}>
                        <span className={`font-semibold ${line.speaker === lesson.content.dialogue?.participants[0] ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>
                            {line.speaker}:
                        </span>
                        <p className={`inline ml-2 p-2 rounded-lg ${line.speaker === lesson.content.dialogue?.participants[0] ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`}>
                            {line.line}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
      )}

      <Section title="Summary (Podsumowanie)" icon={<CheckCircleIcon className="h-7 w-7 text-red-500" />}>
        <p className="text-slate-600 dark:text-slate-300 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow">{lesson.content.summary}</p>
      </Section>

      <div className="mt-10 text-center space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
        <Link
          to={`/lessons/${lesson.id}/homework`}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-md"
        >
          Go to Homework
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Link>
        {!isCompleted && (
            <button
            onClick={handleMarkAsComplete}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-green-500 text-base font-medium rounded-lg text-green-600 dark:text-green-400 bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-slate-700 transition-colors shadow-md"
            >
            Mark as Complete
            <CheckCircleIcon className="ml-2 h-5 w-5" />
            </button>
        )}
        {isCompleted && (
             <p className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800/50 shadow-md">
                Lesson Completed!
                <CheckCircleIcon className="ml-2 h-5 w-5 text-green-500" />
            </p>
        )}
      </div>
    </div>
  );
};

// Placeholder icons
const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.686-3.686c-.741-.741-1.448-1.288-2.235-1.671a10.402 10.402 0 01-3.23-.969C5.031 16.45 3 14.834 3 12.807V8.511c0-1.136.847-2.1 1.98-2.193.34-.027.68-.052 1.02-.072l3.686-3.686c.741-.741 1.448-1.288 2.235-1.671a10.402 10.402 0 013.23-.969A10.043 10.043 0 0115 3c2.998 0 5.68.932 7.69 2.511z" />
</svg>
);


export default LessonScreen;
