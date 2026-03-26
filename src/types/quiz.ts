export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserAnswer {
  questionId: number;
  question: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
}
