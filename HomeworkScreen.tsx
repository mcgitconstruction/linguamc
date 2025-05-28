
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Lesson, Exercise } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ExerciseItem from '../components/ExerciseItem';
import { fetchLessonById } from '../services/lessonService'; // Assuming you have this
import { CheckCircleIcon, LightBulbIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const HomeworkScreen: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user, completeLesson } = useAppContext(); // Added completeLesson from context
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, { answer: string | string[]; isCorrect: boolean }>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

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
      } else {
        navigate('/404'); // Or a "lesson not found" page
      }
      setIsLoading(false);
    };

    loadLesson();
  }, [lessonId, navigate]);

  const handleAnswered = (exerciseId: string, isCorrect: boolean, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: { answer, isCorrect } }));
  };

  const handleSubmitHomework = () => {
    if (!lesson || lesson.homework.length === 0) return;
    
    let correctCount = 0;
    lesson.homework.forEach(ex => {
      if (answers[ex.id]?.isCorrect) {
        correctCount++;
      }
    });
    const newScore = (correctCount / lesson.homework.length) * 100;
    setScore(newScore);
    setShowResults(true);

    // Mark lesson as completed (or update progress) if score is good
    if (newScore >= 60 && lessonId && user && !user.completedLessonIds.includes(lessonId)) {
      completeLesson(lessonId);
    }
  };

  if (isLoading || !user) {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner text="Loading homework..." /></div>;
  }

  if (!lesson) {
    return <div className="text-center p-8">Homework not found for this lesson.</div>;
  }
  
  const allAnswered = lesson.homework.length > 0 && Object.keys(answers).length === lesson.homework.length;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <header className="mb-8 text-center border-b border-slate-200 dark:border-slate-700 pb-6">
        <Link to={`/lessons/${lessonId}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center mb-2">
          <ArrowUturnLeftIcon className="h-4 w-4 mr-1" /> Back to Lesson: {lesson.title}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">Homework: <span className="text-blue-600 dark:text-blue-400">{lesson.title}</span></h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">Test your knowledge from the lesson.</p>
      </header>

      {lesson.homework.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <LightBulbIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <p className="text-xl text-slate-700 dark:text-slate-200">No homework exercises for this lesson yet!</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Check back later or proceed to the next lesson.</p>
        </div>
      ) : (
        <>
          {!showResults ? (
            <div className="space-y-6">
              {lesson.homework.map((exercise: Exercise, index: number) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  exerciseNumber={index + 1}
                  onAnswered={(isCorrect, answerVal) => handleAnswered(exercise.id, isCorrect, answerVal)}
                  showAnswers={false}
                />
              ))}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmitHomework}
                  disabled={!allAnswered}
                  className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-colors
                    ${allAnswered 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'}`}
                >
                  Submit Homework
                </button>
                {!allAnswered && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Please answer all questions to submit.</p>}
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl text-center">
              <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Homework Submitted!</h2>
              <p className="text-5xl font-bold mb-4" style={{color: score >= 80 ? '#10B981' : score >=50 ? '#F59E0B' : '#EF4444'}}>
                Your Score: {score.toFixed(0)}%
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {score >= 80 ? "Excellent work! You've mastered this material." : 
                 score >= 50 ? "Good job! Review the explanations for areas to improve." :
                 "Keep practicing! Review the lesson and try again."}
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Review Your Answers:</h3>
                {lesson.homework.map((exercise: Exercise, index: number) => (
                    <ExerciseItem
                    key={exercise.id}
                    exercise={exercise}
                    exerciseNumber={index + 1}
                    onAnswered={() => {}} // Not used in review mode
                    showAnswers={true} // This prop will show correct/incorrect styling and explanations
                    // You might need to pass the user's selected answer to ExerciseItem to show it
                    />
                ))}
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => { setShowResults(false); setAnswers({}); setScore(0);}}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  Try Again
                </button>
                <Link
                  to="/home"
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg shadow-md transition-colors"
                >
                  Back to Lessons
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeworkScreen;
