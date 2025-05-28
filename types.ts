
export interface User {
  id: string;
  email: string;
  name: string;
  currentLevel: string; // e.g., 'A2'
  completedLessonIds: string[];
  subscriptionTier: SubscriptionTier;
  profilePictureUrl?: string;
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export interface VocabularyItem {
  polish: string;
  english: string;
  exampleSentence?: string;
  pronunciation?: string; // URL to audio file or phonetic spelling
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
}

export interface LessonContent {
  introduction: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarRule[];
  dialogue?: {
    title: string;
    participants: string[];
    lines: { speaker: string; line: string }[];
  };
  summary: string;
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS',
  // Future: SENTENCE_ORDERING, TRANSLATION, LISTENING_COMPREHENSION
}

export interface ExerciseOption {
  id: string;
  text: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string; // For MCQ, this is the question. For fill-in-the-blanks, this is the sentence with blanks (e.g., "I ___ to the park.")
  options?: ExerciseOption[]; // For MCQ
  correctAnswer: string | string[]; // For MCQ, option id. For fill-in-the-blanks, the word(s). Can be an array for multiple blanks.
  explanation?: string; // Explanation for the correct answer
}

export interface Lesson {
  id: string;
  title: string;
  level: string; // e.g., 'A2'
  order: number; // For sequencing
  content: LessonContent;
  homework: Exercise[];
  estimatedTimeMinutes: number; // Estimated time to complete the lesson
  tags?: string[]; // e.g., "travel", "business"
}

export interface UserProgress {
  lessonId: string;
  homeworkCompleted: boolean;
  quizScore?: number; // Percentage
  lastAccessed: Date;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isLoading?: boolean; // For AI responses that are being generated
}

export interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  lessons: Lesson[];
  isLoadingLessons: boolean;
  currentTheme: 'light' | 'dark';
  login: (email: string, name: string) => void;
  logout: () => void;
  upgradeToPremium: () => void;
  toggleTheme: () => void;
  completeLesson: (lessonId: string) => void;
}

export interface IconProps {
  className?: string;
}
