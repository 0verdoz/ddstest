export type Section5Topic =
  | 'Laws Governing Right-of-Way'
  | "Georgia's Move-Over Law"
  | 'Passing on Two-Lane Roads'
  | 'Passing Prohibitions & Railroad/Bridge/Tunnel'
  | 'Passing on the Right & When Being Passed'
  | 'Passing Bicyclists & Motorcyclists'
  | 'Weaving & Illegal Signals'
  | 'Turn Signals & Making Turns Safely'
  | 'Watching for Pedestrians & Blind Pedestrians'
  | 'U-Turns & Multi-Lane Highway Turns'
  | 'Stopping, Standing, and Parking'
  | 'Parallel Parking & Straight Line Backing'
  | 'Traveling Speed & Speed Limits'
  | 'Super Speeder Law'
  | 'Slow Poke Law & Impeding Traffic'
  | 'Railroad Crossings & 7 Safety Steps'
  | 'Highway Work Zones, Flaggers & Amber Lights'
  | 'Controlled-Access Roadways & Peach Pass'
  | 'Coasting & Mechanical Prohibitions'
  | 'Driving Under the Influence of Drugs or Alcohol (DUI)'
  | 'Reckless & Aggressive Driving'
  | 'Racing & Reckless Stunt Driving'
  | 'Trucks, Trailers & Caravanning'
  | 'Impaired Hearing, View Obstruction & Doors'
  | 'One-Way Streets & Stopping'
  | 'Headlights Properly & Night Driving'
  | "Georgia's Litter Control Law"
  | 'Safety Belts & Child Restraints'
  | 'Distracted Driving & Hands Free Law (HB 673)'
  | 'Following Emergency Vehicles & Passing Mail/Sanitation';

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number; // 0, 1, 2, or 3
  explanation: string;
  topic: Section5Topic;
  pageRef?: number; // 17-25
  scenario?: string;
  isCustom?: boolean;
  source?: 'official' | 'scenario' | 'imported';
}

export interface PreviousAnswerFeedback {
  question: Question;
  userSelectedIndex: number;
  isCorrect: boolean;
  correctAnswerText: string;
  userAnswerText: string;
}

export interface QuizSession {
  id: string;
  timestamp: number;
  dateStr: string;
  mode: 'standard-20' | 'daily' | 'topic' | 'mistakes' | 'custom' | 'marathon-50';
  topicFilter?: Section5Topic | 'ALL';
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  passed: boolean; // >= 75% (15/20 on DDS exam)
  durationSeconds: number;
  records: Array<{
    questionId: string;
    questionText: string;
    options: [string, string, string, string];
    userSelectedIndex: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
    explanation: string;
    topic: Section5Topic;
  }>;
}

export interface CumulativeStats {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  overallAccuracy: number;
  quizzesPassed: number;
  quizzesFailed: number;
  currentStreakDays: number;
  lastDailyDate: string | null;
  bestScorePercentage: number;
  topicStats: Record<string, { answered: number; correct: number }>;
  recentSessions: QuizSession[];
}

export interface MistakeItem {
  questionId: string;
  question: Question;
  timesMissed: number;
  lastMissedTimestamp: number;
  lastUserAnswerIndex: number;
}
