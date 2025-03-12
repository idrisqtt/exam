export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export type Category = 'all' | 'idea' | 'market' | 'finance' | 'marketing' | 'investment' | 'presentation'; 