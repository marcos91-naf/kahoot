export type ShapeType = 'triangle' | 'diamond' | 'circle' | 'square';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  shape: ShapeType;
  color: 'red' | 'blue' | 'yellow' | 'green';
}

export type QuestionCategory = 
  | 'evolucion'
  | 'politicas_meta'
  | 'sla_etiquetado'
  | 'funnel_conversacional'
  | 'triage_temperatura'
  | 'metodo_bant'
  | 'crm_leadsales';

export interface Question {
  id: string;
  slideSource: string; // e.g. "Diapositiva 5: Políticas de Meta"
  category: QuestionCategory;
  categoryLabel: string;
  question: string;
  contextSnippet?: string;
  options: QuestionOption[];
  explanation: string;
  timeLimitSeconds: number;
  difficulty: 'fácil' | 'medio' | 'experto';
  points: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  isBot?: boolean;
  lastScoreGain?: number;
  answers: {
    questionId: string;
    optionId: string;
    isCorrect: boolean;
    timeTakenSeconds: number;
    scoreAwarded: number;
  }[];
}

export type GameMode = 
  | 'solo'       // Local single player with simulated sales bots
  | 'presenter'  // Local room presenter mode for meeting room projector / TV
  | 'local_team' // Pass & play multiplayer for 2-4 colleagues on the same screen
  | 'study';     // Offline flashcards review (Slides 3-10)

export type GameStage = 
  | 'home'
  | 'lobby'
  | 'question_intro'
  | 'question_active'
  | 'question_reveal'
  | 'round_leaderboard'
  | 'final_podium';

export interface FlashcardItem {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  bullets: string[];
  keyTakeaway: string;
  color: string;
  badge: string;
}

export interface LocalScoreRecord {
  id: string;
  date: string;
  playerName: string;
  score: number;
  accuracy: number;
  presetTitle: string;
  maxStreak: number;
}
