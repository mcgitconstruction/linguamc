
import { Lesson, ExerciseType, SubscriptionTier, User } from './types';

export const FREE_LESSON_COUNT = 2;
export const GEMINI_CHAT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const AI_SYSTEM_PROMPT = "You are a friendly and patient English tutor for Polish speakers. Help them practice English conversation. Keep your responses concise and encouraging. You can gently correct their mistakes. If the user asks for something unrelated to language learning, politely steer them back to practicing English. Respond in English unless specifically asked for a Polish translation of a word or short phrase.";

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Greetings and Introductions (Pozdrowienia i przedstawianie się)',
    level: 'A1',
    order: 1,
    estimatedTimeMinutes: 20,
    tags: ['basics', 'conversation'],
    content: {
      introduction: 'Welcome to your first English lesson! Today, we will learn basic greetings and how to introduce yourself and others. Witamy na pierwszej lekcji angielskiego! Dziś nauczymy się podstawowych zwrotów grzecznościowych oraz jak przedstawiać siebie i innych.',
      vocabulary: [
        { polish: 'Cześć', english: 'Hello / Hi', exampleSentence: 'Hello, how are you?' },
        { polish: 'Dzień dobry (rano)', english: 'Good morning', exampleSentence: 'Good morning, teacher!' },
        { polish: 'Dzień dobry (po południu)', english: 'Good afternoon' },
        { polish: 'Dobry wieczór', english: 'Good evening' },
        { polish: 'Do widzenia', english: 'Goodbye / Bye', exampleSentence: 'Bye! See you tomorrow.' },
        { polish: 'Nazywam się...', english: 'My name is...', exampleSentence: 'My name is Anna.' },
        { polish: 'Jak się masz?', english: 'How are you?', exampleSentence: 'Hi John, how are you?' },
        { polish: 'Dziękuję', english: 'Thank you', exampleSentence: 'Thank you for your help.' },
        { polish: 'Proszę (prosząc o coś)', english: 'Please', exampleSentence: 'Can I have some water, please?' },
        { polish: 'Przepraszam', english: 'Excuse me / Sorry' },
      ],
      grammar: [
        {
          title: 'The verb "to be" (am, is, are) - Czasownik "być"',
          explanation: 'We use "to be" to talk about names, feelings, and states. Używamy "to be" do mówienia o imionach, uczuciach i stanach.',
          examples: ['I am happy.', 'You are a student.', 'She is Polish.', 'My name is Piotr.'],
        },
      ],
      dialogue: {
        title: 'At a Cafe (W kawiarni)',
        participants: ['Anna', 'Barista'],
        lines: [
          { speaker: 'Anna', line: 'Hello!' },
          { speaker: 'Barista', line: 'Good morning! How can I help you?' },
          { speaker: 'Anna', line: 'Can I have a coffee, please?' },
          { speaker: 'Barista', line: 'Sure. Anything else?' },
          { speaker: 'Anna', line: 'No, thank you.' },
        ]
      },
      summary: 'Great job! You\'ve learned essential greetings and introductions. Practice them with friends! Świetna robota! Nauczyłeś/aś się podstawowych zwrotów grzecznościowych. Ćwicz je ze znajomymi!',
    },
    homework: [
      {
        id: 'hw1-1',
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'How do you say "Dzień dobry (rano)" in English?',
        options: [
          { id: 'opt1', text: 'Good evening' },
          { id: 'opt2', text: 'Good morning' },
          { id: 'opt3', text: 'Good afternoon' },
        ],
        correctAnswer: 'opt2',
        explanation: '"Good morning" is used to greet someone in the morning.'
      },
      {
        id: 'hw1-2',
        type: ExerciseType.FILL_IN_THE_BLANKS,
        question: 'My name ___ Maria.',
        correctAnswer: 'is',
        explanation: 'With "My name", we use "is".'
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Numbers and Colors (Liczby i kolory)',
    level: 'A1',
    order: 2,
    estimatedTimeMinutes: 25,
    tags: ['basics', 'vocabulary'],
    content: {
      introduction: 'This lesson covers numbers 1-20 and basic colors. Ta lekcja obejmuje liczby 1-20 oraz podstawowe kolory.',
      vocabulary: [
        { polish: 'Jeden', english: 'One' }, { polish: 'Dwa', english: 'Two' }, { polish: 'Trzy', english: 'Three' },
        { polish: 'Czerwony', english: 'Red' }, { polish: 'Niebieski', english: 'Blue' }, { polish: 'Zielony', english: 'Green' },
        { polish: 'Żółty', english: 'Yellow' }, { polish: 'Czarny', english: 'Black' }, { polish: 'Biały', english: 'White' },
      ],
      grammar: [
        {
          title: 'Plural Nouns (Liczba mnoga rzeczowników)',
          explanation: 'To make most nouns plural, add -s. Aby utworzyć liczbę mnogą większości rzeczowników, dodaj -s.',
          examples: ['One cat, two cats.', 'One book, three books.'],
        },
      ],
      summary: 'Now you can count and name colors! Teraz potrafisz liczyć i nazywać kolory!',
    },
    homework: [
      {
        id: 'hw2-1',
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'What color is "niebieski"?',
        options: [{ id: 'opt1', text: 'Red' }, { id: 'opt2', text: 'Blue' }, { id: 'opt3', text: 'Green' }],
        correctAnswer: 'opt2',
      },
      {
        id: 'hw2-2',
        type: ExerciseType.FILL_IN_THE_BLANKS,
        question: 'I have two ____ (książka).',
        correctAnswer: 'books',
        explanation: 'The plural of "book" is "books".'
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'Talking About Family (Rozmowa o rodzinie) - PREMIUM',
    level: 'A2',
    order: 3,
    estimatedTimeMinutes: 30,
    tags: ['family', 'conversation', 'premium'],
    content: {
      introduction: 'Learn vocabulary related to family members and how to describe your family. Naucz się słownictwa związanego z członkami rodziny i jak opisywać swoją rodzinę.',
      vocabulary: [
        { polish: 'Matka', english: 'Mother' }, { polish: 'Ojciec', english: 'Father' },
        { polish: 'Brat', english: 'Brother' }, { polish: 'Siostra', english: 'Sister' },
        { polish: 'Syn', english: 'Son' }, { polish: 'Córka', english: 'Daughter' },
      ],
      grammar: [
        {
          title: 'Possessive Adjectives (Przymiotniki dzierżawcze)',
          explanation: 'Use my, your, his, her, its, our, their to show possession. Użyj my, your, his, her, its, our, their, aby pokazać przynależność.',
          examples: ['My mother is a doctor.', 'His brother is tall.'],
        },
      ],
      summary: 'You can now talk about your family! Możesz teraz rozmawiać o swojej rodzinie!',
    },
    homework: [
      {
        id: 'hw3-1',
        type: ExerciseType.FILL_IN_THE_BLANKS,
        question: 'This is ___ (mój) sister.',
        correctAnswer: 'my',
      },
    ],
  },
  {
    id: 'lesson-4',
    title: 'Ordering Food (Zamawianie jedzenia) - PREMIUM',
    level: 'A2',
    order: 4,
    estimatedTimeMinutes: 35,
    tags: ['food', 'travel', 'premium'],
    content: {
      introduction: 'Learn how to order food in a restaurant. Naucz się, jak zamawiać jedzenie w restauracji.',
      vocabulary: [
        { polish: 'Chciałbym/Chciałabym...', english: 'I would like...' }, { polish: 'Poproszę...', english: 'Can I have... / I\'ll take...' },
        { polish: 'Rachunek', english: 'Bill / Check' }, { polish: 'Smacznego', english: 'Enjoy your meal / Bon appétit' },
      ],
      grammar: [
        {
          title: 'Using "Can I...?" and "Could I...?" for requests (Używanie "Can I...?" i "Could I...?" do próśb)',
          explanation: '"Could I...?" is generally more polite than "Can I...?". "Could I...?" jest ogólnie bardziej uprzejme niż "Can I...?".',
          examples: ['Can I have the menu, please?', 'Could I have some water?'],
        },
      ],
      summary: 'You are ready to order your favorite meal in English! Jesteś gotowy/a zamówić swoje ulubione danie po angielsku!',
    },
    homework: [
      {
        id: 'hw4-1',
        type: ExerciseType.MULTIPLE_CHOICE,
        question: 'What is a polite way to ask for the bill?',
        options: [
          { id: 'opt1', text: 'Give me the bill!' },
          { id: 'opt2', text: 'Could I have the bill, please?' },
          { id: 'opt3', text: 'Where is the bill?' }
        ],
        correctAnswer: 'opt2',
      },
    ],
  },
   {
    id: 'lesson-5',
    title: 'Daily Routines (Codzienne czynności) - PREMIUM',
    level: 'A2',
    order: 5,
    estimatedTimeMinutes: 30,
    tags: ['daily life', 'verbs', 'premium'],
    content: {
      introduction: 'Talk about your daily activities using Present Simple tense. Opowiadaj o swoich codziennych czynnościach używając czasu Present Simple.',
      vocabulary: [
        { polish: 'Wstawać', english: 'Wake up / Get up' },
        { polish: 'Jeść śniadanie', english: 'Eat breakfast' },
        { polish: 'Iść do pracy/szkoły', english: 'Go to work/school' },
        { polish: 'Oglądać telewizję', english: 'Watch TV' },
        { polish: 'Iść spać', english: 'Go to bed' },
      ],
      grammar: [
        {
          title: 'Present Simple Tense (Czas teraźniejszy prosty)',
          explanation: 'Used for habits, routines, and general truths. Używany do opisywania nawyków, rutynowych czynności i ogólnych prawd.',
          examples: ['I wake up at 7 AM.', 'She works in an office.', 'They play football on Saturdays.'],
        },
      ],
      summary: 'You can now describe your typical day in English. Możesz teraz opisać swój typowy dzień po angielsku.',
    },
    homework: [
      {
        id: 'hw5-1',
        type: ExerciseType.FILL_IN_THE_BLANKS,
        question: 'He ____ (oglądać) TV in the evening.',
        correctAnswer: 'watches',
        explanation: 'For he/she/it in Present Simple, add -s or -es to the verb.'
      },
    ],
  }
];

export const PREMIUM_FEATURES: string[] = [
  "Access to all lessons and levels",
  "Unlimited AI conversations",
  "Detailed quizzes and progress analytics",
  "Personalized feedback on exercises",
  "Downloadable completion certificates",
  "Offline access to lesson materials (coming soon!)",
];

export const DEFAULT_USER: User = {
  id: 'guest123',
  email: '',
  name: '',
  currentLevel: 'A1',
  completedLessonIds: [],
  subscriptionTier: SubscriptionTier.FREE,
  profilePictureUrl: 'https://picsum.photos/seed/student/100/100'
};
