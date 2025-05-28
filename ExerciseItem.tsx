
import React, { useState }
from 'react';
import { Exercise, ExerciseType, ExerciseOption } from '../types';

interface ExerciseItemProps {
  exercise: Exercise;
  exerciseNumber: number;
  onAnswered: (isCorrect: boolean, answer: string | string[]) => void;
  showAnswers: boolean;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, exerciseNumber, onAnswered, showAnswers }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [blankInputs, setBlankInputs] = useState<string[]>(() => {
    if (exercise.type === ExerciseType.FILL_IN_THE_BLANKS) {
      const numBlanks = (exercise.question.match(/___/g) || []).length;
      return Array(numBlanks).fill('');
    }
    return [];
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (optionId: string) => {
    if (isSubmitted && !showAnswers) return; // Don't allow change after submission if not in review mode
    setSelectedOption(optionId);
    if (!showAnswers) { // If not in review mode, submit immediately
        const correct = optionId === exercise.correctAnswer;
        onAnswered(correct, optionId);
        setIsSubmitted(true);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (isSubmitted && !showAnswers) return;
    const newInputs = [...blankInputs];
    newInputs[index] = value;
    setBlankInputs(newInputs);
  };
  
  const handleSubmitFillInTheBlanks = () => {
    if (isSubmitted && !showAnswers) return;
    const correct = Array.isArray(exercise.correctAnswer) ?
        blankInputs.every((input, i) => input.trim().toLowerCase() === (exercise.correctAnswer as string[])[i]?.toLowerCase()) :
        blankInputs.join(' ').trim().toLowerCase() === (exercise.correctAnswer as string).toLowerCase();
    onAnswered(correct, blankInputs);
    setIsSubmitted(true);
  };

  const renderFillInTheBlanks = () => {
    const parts = exercise.question.split('___');
    return (
      <div>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <input
                type="text"
                value={blankInputs[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={isSubmitted || showAnswers}
                className={`mx-1 px-2 py-1 border rounded-md w-24 sm:w-32 dark:bg-slate-700 dark:border-slate-600 dark:text-white
                  ${isSubmitted || showAnswers ? (
                    (Array.isArray(exercise.correctAnswer) ? blankInputs[index]?.toLowerCase() === (exercise.correctAnswer as string[])[index]?.toLowerCase() : blankInputs[index]?.toLowerCase() === (exercise.correctAnswer as string)?.toLowerCase())
                     ? 'border-green-500 bg-green-50 dark:bg-green-900' 
                     : 'border-red-500 bg-red-50 dark:bg-red-900'
                  ) : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
              />
            )}
          </React.Fragment>
        ))}
        {!showAnswers && !isSubmitted && (
            <button 
                onClick={handleSubmitFillInTheBlanks}
                className="ml-2 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Check
            </button>
        )}
      </div>
    );
  };

  const getOptionStyling = (option: ExerciseOption) => {
    if (!isSubmitted && !showAnswers) return 'hover:bg-blue-50 dark:hover:bg-slate-700';
    if (option.id === exercise.correctAnswer) return 'bg-green-100 dark:bg-green-800 border-green-500 dark:border-green-600 text-green-700 dark:text-green-200 font-semibold';
    if (option.id === selectedOption && option.id !== exercise.correctAnswer) return 'bg-red-100 dark:bg-red-800 border-red-500 dark:border-red-600 text-red-700 dark:text-red-200';
    return 'border-slate-300 dark:border-slate-600';
  };

  return (
    <div className="mb-8 p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <p className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-3">
        <span className="text-blue-600 dark:text-blue-400">Exercise {exerciseNumber}:</span> {exercise.question.split('___')[0]}
      </p>
      
      {exercise.type === ExerciseType.MULTIPLE_CHOICE && exercise.options && (
        <div className="space-y-2">
          {exercise.options.map((option) => (
            <label
              key={option.id}
              className={`block p-3 border rounded-md cursor-pointer transition-all ${getOptionStyling(option)}`}
            >
              <input
                type="radio"
                name={`exercise-${exercise.id}`}
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
                disabled={isSubmitted || showAnswers}
                className="mr-2 accent-blue-600 dark:accent-blue-400"
              />
              {option.text}
            </label>
          ))}
        </div>
      )}

      {exercise.type === ExerciseType.FILL_IN_THE_BLANKS && renderFillInTheBlanks()}

      {(isSubmitted || showAnswers) && exercise.explanation && (
        <div className={`mt-4 p-3 rounded-md text-sm ${selectedOption === exercise.correctAnswer || (exercise.type === ExerciseType.FILL_IN_THE_BLANKS && (Array.isArray(exercise.correctAnswer) ? blankInputs.every((input, i) => input.trim().toLowerCase() === (exercise.correctAnswer as string[])[i]?.toLowerCase()) : blankInputs.join(' ').trim().toLowerCase() === (exercise.correctAnswer as string).toLowerCase())) ? 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300'}`}>
          <strong>Explanation:</strong> {exercise.explanation}
          {exercise.type === ExerciseType.FILL_IN_THE_BLANKS && (
             <p className="mt-1"><strong>Correct Answer:</strong> {Array.isArray(exercise.correctAnswer) ? (exercise.correctAnswer as string[]).join(', ') : exercise.correctAnswer}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;
