import React, { useEffect, useState } from 'react';
import { Question } from '../types/game';
import { Sparkles, Timer } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface QuestionIntroProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onFinishIntro: () => void;
}

export const QuestionIntro: React.FC<QuestionIntroProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onFinishIntro,
}) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    soundFx.playTick();
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinishIntro();
          return 0;
        }
        soundFx.playTick(true);
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [onFinishIntro]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center text-white border border-purple-500/30 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Progress Pill */}
        <div className="inline-flex items-center gap-2 bg-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-purple-400/30">
          <span>Pregunta {questionIndex + 1} de {totalQuestions}</span>
          <span>·</span>
          <span>{question.categoryLabel}</span>
        </div>

        {/* Source Slide Badge */}
        <div className="text-xs text-amber-400 font-semibold mb-6">
          📖 {question.slideSource}
        </div>

        {/* Giant Question Preview */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-8">
          {question.question}
        </h2>

        {/* Big Animated Countdown Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#ffa602] text-slate-950 font-black text-4xl flex items-center justify-center shadow-lg transform scale-110 animate-bounce">
            {countdown}
          </div>
          <span className="text-xs uppercase tracking-widest text-purple-300 font-bold mt-4">
            ¡Prepárate para responder!
          </span>
        </div>

      </div>
    </div>
  );
};
