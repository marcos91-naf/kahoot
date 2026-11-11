import React, { useState, useEffect, useRef } from 'react';
import { Question, Player, GameMode } from '../types/game';
import { ShapeIcon } from './ShapeIcon';
import { soundFx } from '../utils/audio';
import { Flame, Clock, Play, Pause, Eye, CheckCircle, Monitor } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  timeLimit: number;
  players: Player[];
  activePlayerIndex: number;
  gameMode: GameMode;
  onAnswer: (selectedOptionId: string | null, timeTakenSeconds: number) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  timeLimit,
  players,
  activePlayerIndex,
  gameMode,
  onAnswer,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [botAnswersCount, setBotAnswersCount] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  const currentPlayer = players[activePlayerIndex] || players[0];
  const bots = players.filter((p) => p.isBot);

  // Keyboard navigation (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasAnswered) return;
      if (e.key === '1' && question.options[0]) handleSelect(question.options[0].id);
      if (e.key === '2' && question.options[1]) handleSelect(question.options[1].id);
      if (e.key === '3' && question.options[2]) handleSelect(question.options[2].id);
      if (e.key === '4' && question.options[3]) handleSelect(question.options[3].id);
      if (e.key === ' ' && gameMode === 'presenter') {
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, question, gameMode]);

  // Main countdown timer
  useEffect(() => {
    startTimeRef.current = Date.now();
    setTimeLeft(timeLimit);
    setIsPaused(false);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (isPaused) return prev;
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }

        // Ticking audio: faster in the last 5 seconds
        if (prev <= 5) {
          soundFx.playTick(true);
        } else if (prev % 2 === 0) {
          soundFx.playTick(false);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id, timeLimit, isPaused]);

  // Simulate bots answering over time
  useEffect(() => {
    if (bots.length === 0) return;
    setBotAnswersCount(0);

    const timeouts = bots.map((bot, idx) => {
      const delayMs = Math.min(
        (timeLimit - 1.5) * 1000,
        Math.max(1200, 1500 + Math.random() * (timeLimit * 700))
      );

      return window.setTimeout(() => {
        setBotAnswersCount((prev) => prev + 1);
      }, delayMs);
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [question.id, bots.length, timeLimit]);

  const handleSelect = (optionId: string) => {
    if (hasAnswered) return;
    setHasAnswered(true);
    setSelectedOptionId(optionId);
    soundFx.playSelectOption();

    const elapsedSeconds = Math.max(0.1, (Date.now() - startTimeRef.current) / 1000);

    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      onAnswer(optionId, elapsedSeconds);
    }, 550);
  };

  const handleTimeExpired = () => {
    soundFx.playTimeUp();
    const elapsedSeconds = timeLimit;
    onAnswer(selectedOptionId, elapsedSeconds);
  };

  const handlePresenterForceReveal = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsedSeconds = Math.max(0.1, (Date.now() - startTimeRef.current) / 1000);
    onAnswer(selectedOptionId, elapsedSeconds);
  };

  const isTimeCritical = timeLeft <= 5;
  const totalCompetitors = players.length;
  const totalAnsweredSoFar = (hasAnswered ? 1 : 0) + botAnswersCount;

  // Option background styles corresponding to Kahoot standard palette
  const getButtonBg = (color: string, optionId: string) => {
    const isSelected = selectedOptionId === optionId;
    if (isSelected) {
      return 'ring-4 ring-white scale-[1.02] shadow-2xl';
    }

    switch (color) {
      case 'red':
        return 'bg-[#e21b3c] hover:bg-[#c21430] text-white';
      case 'blue':
        return 'bg-[#1368ce] hover:bg-[#0f52a5] text-white';
      case 'yellow':
        return 'bg-[#d88900] hover:bg-[#b87400] text-white';
      case 'green':
        return 'bg-[#26890c] hover:bg-[#1e6e0a] text-white';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col min-h-[82vh] justify-between">
      
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-4 text-white mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold backdrop-blur-sm border border-white/10">
            Pregunta {questionIndex + 1} / {totalQuestions}
          </div>
          <div className="hidden sm:block text-xs font-semibold text-purple-200">
            {question.categoryLabel}
          </div>
        </div>

        {/* Turn indicator in pass-and-play local team mode */}
        {gameMode === 'local_team' && (
          <div className="bg-[#ffa602] text-slate-950 font-black px-3.5 py-1 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md animate-pulse">
            <span>Turno de:</span>
            <span>{currentPlayer.avatar}</span>
            <span>{currentPlayer.name}</span>
          </div>
        )}

        {/* Presenter Mode Controls in Header */}
        {gameMode === 'presenter' && (
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-xl border border-purple-400/30 text-xs">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1 font-bold text-amber-300 hover:text-white"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={handlePresenterForceReveal}
              className="flex items-center gap-1 font-bold text-emerald-400 hover:text-white"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Revelar Ahora</span>
            </button>
          </div>
        )}

        {/* Player score & streak */}
        <div className="flex items-center gap-3">
          {currentPlayer.streak >= 2 && (
            <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-extrabold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>Racha x{currentPlayer.streak}</span>
            </div>
          )}
          <div className="bg-purple-950/80 border border-purple-400/30 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold text-amber-300">
            {currentPlayer.score.toLocaleString()} pts
          </div>
        </div>
      </div>

      {/* Main Question Container */}
      <div className="space-y-4 my-auto">
        
        {/* Source Slide Info Tag */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-200 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-400/20">
            📖 {question.slideSource}
          </span>
        </div>

        {/* Center: Question Prompt + Countdown Circle */}
        <div className="relative bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-white/20 text-center min-h-[140px] sm:min-h-[180px] flex items-center justify-center">
          
          {/* Floating Timer Badge */}
          <div className="absolute -top-5 left-6 sm:-left-5 bg-slate-900 text-white rounded-2xl p-2.5 shadow-xl border-2 border-purple-400 flex items-center gap-2 sm:flex-col sm:gap-0 sm:w-16 sm:h-16 justify-center">
            <span
              className={`font-mono text-xl sm:text-2xl font-black ${
                isTimeCritical ? 'text-rose-500 animate-ping' : 'text-[#ffa602]'
              }`}
            >
              {timeLeft}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              seg
            </span>
          </div>

          {/* Right Floating Responses Counter */}
          <div className="absolute -top-5 right-6 bg-slate-900 text-white rounded-2xl px-3 py-2 shadow-xl border-2 border-purple-400 text-xs font-bold flex items-center gap-1.5">
            <span className="text-emerald-400 font-extrabold">{totalAnsweredSoFar}</span>
            <span className="text-slate-400">/ {totalCompetitors}</span>
            <span className="text-slate-300 hidden sm:inline">listos</span>
          </div>

          {/* The Question Text */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug px-4">
            {question.question}
          </h2>
        </div>

        {/* Selection feedback message */}
        {hasAnswered && (
          <div className="text-center py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span>¡Respuesta enviada localmente! Calculando resultados...</span>
            </div>
          </div>
        )}

      </div>

      {/* Answer Options Grid (The 4 iconic Kahoot buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              disabled={hasAnswered}
              onClick={() => handleSelect(option.id)}
              className={`relative group p-4 sm:p-5 rounded-2xl text-left flex items-center gap-4 transition-all duration-150 transform active:scale-95 shadow-lg select-none min-h-[76px] sm:min-h-[92px] ${getButtonBg(
                option.color,
                option.id
              )} ${hasAnswered && !isSelected ? 'opacity-50 grayscale-20' : ''}`}
            >
              {/* Shape Icon */}
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShapeIcon shape={option.shape} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 font-extrabold text-sm sm:text-base md:text-lg leading-snug">
                {option.text}
              </div>

              {/* Keyboard shortcut hint */}
              <div className="hidden md:flex shrink-0 items-center justify-center w-6 h-6 rounded bg-black/20 text-white text-[11px] font-mono font-bold opacity-75">
                {idx + 1}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
