import React, { useState } from 'react';
import { FLASHCARDS } from '../data/flashcards';
import { ChevronLeft, ChevronRight, Play, CheckCircle2, Bookmark, Award, HardDrive } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface StudyModeProps {
  onStartQuiz: (categoryId?: string) => void;
  onClose: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ onStartQuiz, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const card = FLASHCARDS[currentIndex];

  const handleNext = () => {
    soundFx.playSelectOption();
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    soundFx.playSelectOption();
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Guía de Estudio Local · Diapositivas 3 a 10</span>
            <span className="text-emerald-400 font-bold">· 100% Offline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resumen Oficial de la Capacitación
          </h2>
          <p className="text-sm text-purple-200 mt-0.5">
            Diapositivas 3 a 10 (omitiendo 1, 2, 11 y las 3 últimas). Repasa los fundamentos clave antes del juego.
          </p>
        </div>

        <button
          onClick={() => onStartQuiz()}
          className="self-start sm:self-center bg-[#ffa602] hover:bg-[#e69500] text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm transition-transform active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Iniciar Kahoot Local</span>
        </button>
      </div>

      {/* Main Flashcard Carousel */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300">
        
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#46178f] to-[#1368ce] text-white p-6 sm:p-8 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
              <span>Diapositiva {card.slideNumber}</span>
              <span>·</span>
              <span>Tema {currentIndex + 1} de {FLASHCARDS.length}</span>
              <span>·</span>
              <span>{card.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
              {card.title}
            </h3>
            <p className="text-sm sm:text-base text-purple-100 font-medium">
              {card.subtitle}
            </p>
          </div>

          <div className="text-4xl select-none hidden sm:block">
            {card.slideNumber === 3 && '📱'}
            {card.slideNumber === 4 && '📈'}
            {card.slideNumber === 5 && '🛡️'}
            {card.slideNumber === 6 && '⏱️'}
            {card.slideNumber === 7 && '🤖'}
            {card.slideNumber === 8 && '🔄'}
            {card.slideNumber === 9 && '🌡️'}
            {card.slideNumber === 10 && '🎯'}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Conceptos y Estándares de la Diapositiva:
            </h4>
            <div className="space-y-3">
              {card.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-800 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Takeaway */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Regla de Oro para el Asesor de Ventas</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base font-semibold">
              "{card.keyTakeaway}"
            </p>
          </div>
        </div>

        {/* Card Footer Navigation */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-200 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {FLASHCARDS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playSelectOption();
                  setCurrentIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#46178f]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Ir a Diapositiva ${item.slideNumber}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 font-semibold hover:bg-slate-200 transition-colors text-sm"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Grid of quick jump links to the 8 slides */}
      <div className="mt-8">
        <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-3">
          Índice rápido de diapositivas evaluadas:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FLASHCARDS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playSelectOption();
                setCurrentIndex(idx);
              }}
              className={`p-3 text-left rounded-2xl border text-xs font-medium transition-all ${
                idx === currentIndex
                  ? 'border-amber-400 bg-purple-900/90 text-white shadow-md ring-2 ring-amber-400/50'
                  : 'border-white/10 bg-slate-900/60 text-purple-100 hover:bg-slate-900/90 hover:border-white/20'
              }`}
            >
              <div className="text-[10px] text-amber-400 font-bold uppercase">
                Diapo {item.slideNumber}
              </div>
              <div className="font-bold truncate mt-0.5">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
