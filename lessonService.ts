
import { MOCK_LESSONS } from '../constants';
import { Lesson } from '../types';

// Simulate API call
export const fetchLessons = async (): Promise<Lesson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LESSONS);
    }, 500); // Simulate network delay
  });
};

export const fetchLessonById = async (id: string): Promise<Lesson | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lesson = MOCK_LESSONS.find(l => l.id === id);
      resolve(lesson);
    }, 300);
  });
};
