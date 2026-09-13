import { checkpointQuizzes as rawQuizzes } from "./quizzes-data.mjs";

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3 (1-indexed in Kahoot template: 1, 2, 3, 4)
  timeLimitSeconds: number; // typically 20 or 30
  explanation: string;
  type: "multiple_choice" | "error_analysis" | "true_false";
}

export interface CheckpointQuiz {
  id: string;
  year: 1 | 2;
  week: number;
  title: string;
  topic: string;
  description: string;
  questions: QuizQuestion[];
}

export const checkpointQuizzes: CheckpointQuiz[] = rawQuizzes as CheckpointQuiz[];
