import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Lobby } from './components/Lobby';
import { QuestionIntro } from './components/QuestionIntro';
import { QuestionScreen } from './components/QuestionScreen';
import { AnswerReveal } from './components/AnswerReveal';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { PodiumScreen } from './components/PodiumScreen';
import { StudyMode } from './components/StudyMode';
import { ALL_QUESTIONS, GAME_PRESETS, VIRTUAL_BOTS } from './data/questions';
import { GameStage, GameMode, Player, Question } from './types/game';

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('home');
  const [currentMode, setCurrentMode] = useState<GameMode>('solo');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(ALL_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(15);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  // All active players in this session (local humans + bots)
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([
    {
      id: 'user-0',
      name: 'Asesor Comercial',
      avatar: '🚀',
      score: 0,
      streak: 0,
      isBot: false,
      answers: [],
    }
  ]);

  const [lastAnswerData, setLastAnswerData] = useState<{
    optionId: string | null;
    isCorrect: boolean;
    scoreAwarded: number;
    timeTaken: number;
  }>({
    optionId: null,
    isCorrect: false,
    scoreAwarded: 0,
    timeTaken: 0,
  });

  // Start new local session
  const handleStartGame = (config: {
    presetId: string;
    players: { name: string; avatar: string }[];
    includeBots: boolean;
    timeLimitSeconds: number;
    gameMode: GameMode;
  }) => {
    const preset = GAME_PRESETS.find((p) => p.id === config.presetId) || GAME_PRESETS[0];
    const filtered = ALL_QUESTIONS.filter(preset.filter);
    // Shuffle questions slightly for variety
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());

    setActiveQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setActivePlayerIndex(0);
    setTimeLimitSeconds(config.timeLimitSeconds);
    setCurrentMode(config.gameMode);

    // Build player list
    const createdPlayers: Player[] = config.players.map((p, idx) => ({
      id: `local-user-${idx}`,
      name: p.name,
      avatar: p.avatar,
      score: 0,
      streak: 0,
      isBot: false,
      answers: [],
    }));

    // If solo mode with bots enabled
    if (config.gameMode === 'solo' && config.includeBots) {
      const bots: Player[] = VIRTUAL_BOTS.map((b, idx) => ({
        id: `bot-${idx}`,
        name: b.name,
        avatar: b.avatar,
        score: 0,
        streak: 0,
        isBot: true,
        answers: [],
      }));
      setSessionPlayers([...createdPlayers, ...bots]);
    } else {
      setSessionPlayers(createdPlayers);
    }

    setCurrentStage('question_intro');
  };

  // An answer was submitted
  const handleUserAnswer = (selectedOptionId: string | null, timeTakenSeconds: number) => {
    const currentQ = activeQuestions[currentQuestionIndex];
    const isCorrect = selectedOptionId !== null &&
      currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect === true;

    // Identify who answered
    const currentPlayer = sessionPlayers[activePlayerIndex] || sessionPlayers[0];
    let scoreAwarded = 0;
    let nextStreak = currentPlayer.streak;

    if (isCorrect) {
      const speedMultiplier = 1 - (timeTakenSeconds / (timeLimitSeconds * 2));
      const basePoints = Math.round(1000 * Math.max(0.5, speedMultiplier));
      nextStreak += 1;
      const streakBonus = nextStreak >= 4 ? 300 : nextStreak >= 2 ? 100 : 0;
      scoreAwarded = basePoints + streakBonus;
    } else {
      nextStreak = 0;
    }

    // Update current answering player & simulate any bots in the session
    setSessionPlayers((prevPlayers) =>
      prevPlayers.map((p, pIdx) => {
        // If this is the active human player
        if (pIdx === activePlayerIndex) {
          return {
            ...p,
            score: p.score + scoreAwarded,
            streak: nextStreak,
            lastScoreGain: scoreAwarded,
            answers: [
              ...p.answers,
              {
                questionId: currentQ.id,
                optionId: selectedOptionId || '',
                isCorrect,
                timeTakenSeconds,
                scoreAwarded,
              },
            ],
          };
        }

        // If this is a bot
        if (p.isBot) {
          const botIdx = pIdx - (currentMode === 'solo' ? 1 : 0);
          const botMeta = VIRTUAL_BOTS[botIdx] || { speedBias: 0.7, accuracyBias: 0.75 };
          const botCorrect = Math.random() < botMeta.accuracyBias;
          const botTime = Math.max(
            1.2,
            timeLimitSeconds * (1 - botMeta.speedBias * 0.5) + (Math.random() * 2 - 1)
          );

          let botPoints = 0;
          let botStreak = p.streak;
          let chosenOpt = currentQ.options.find((o) => o.isCorrect);

          if (!botCorrect) {
            chosenOpt = currentQ.options.find((o) => !o.isCorrect) || currentQ.options[0];
            botStreak = 0;
          } else {
            botStreak += 1;
            const speedMultiplier = 1 - (botTime / (timeLimitSeconds * 2));
            botPoints = Math.round(950 * Math.max(0.5, speedMultiplier));
          }

          return {
            ...p,
            score: p.score + botPoints,
            streak: botStreak,
            lastScoreGain: botPoints,
            answers: [
              ...p.answers,
              {
                questionId: currentQ.id,
                optionId: chosenOpt?.id || '',
                isCorrect: botCorrect,
                timeTakenSeconds: botTime,
                scoreAwarded: botPoints,
              },
            ],
          };
        }

        // In multiplayer, other human players keep current state until their turn
        return p;
      })
    );

    setLastAnswerData({
      optionId: selectedOptionId,
      isCorrect,
      scoreAwarded,
      timeTaken: timeTakenSeconds,
    });

    setCurrentStage('question_reveal');
  };

  // Move from Reveal to Round Leaderboard
  const handleNextFromReveal = () => {
    setCurrentStage('round_leaderboard');
  };

  // Move from Leaderboard to next question or final podium
  const handleNextFromLeaderboard = () => {
    // If local team mode, rotate turn to next human player
    const humanCount = sessionPlayers.filter((p) => !p.isBot).length;
    if (humanCount > 1) {
      setActivePlayerIndex((prev) => (prev + 1) % humanCount);
    }

    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentStage('question_intro');
    } else {
      setCurrentStage('final_podium');
    }
  };

  const handleRestart = () => {
    setCurrentStage('home');
  };

  const handleOpenStudy = () => {
    setCurrentStage('home');
    setCurrentMode('study');
  };

  const currentPlayer = sessionPlayers[activePlayerIndex] || sessionPlayers[0];
  const botsOnly = sessionPlayers.filter((p) => p.isBot);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#300e62] via-[#46178f] to-[#1e0741] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky App Header */}
      <Navbar
        currentStage={currentStage}
        currentMode={currentMode}
        onNavigateHome={handleRestart}
        onOpenStudy={handleOpenStudy}
        onRestartGame={handleRestart}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {/* Study Mode View (Diapositivas 3 a 10) */}
        {currentMode === 'study' ? (
          <StudyMode
            onStartQuiz={() => {
              setCurrentMode('solo');
              setCurrentStage('home');
            }}
            onClose={() => setCurrentMode('solo')}
          />
        ) : (
          <>
            {/* Stage 1: Local Lobby */}
            {currentStage === 'home' && (
              <Lobby
                onStartGame={handleStartGame}
                onOpenStudy={handleOpenStudy}
              />
            )}

            {/* Stage 2: Question Intro (3s countdown) */}
            {currentStage === 'question_intro' && activeQuestions[currentQuestionIndex] && (
              <QuestionIntro
                question={activeQuestions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={activeQuestions.length}
                onFinishIntro={() => setCurrentStage('question_active')}
              />
            )}

            {/* Stage 3: Active Question Screen */}
            {currentStage === 'question_active' && activeQuestions[currentQuestionIndex] && (
              <QuestionScreen
                question={activeQuestions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={activeQuestions.length}
                timeLimit={timeLimitSeconds}
                players={sessionPlayers}
                activePlayerIndex={activePlayerIndex}
                gameMode={currentMode}
                onAnswer={handleUserAnswer}
              />
            )}

            {/* Stage 4: Answer Reveal & Didactic slide explanation */}
            {currentStage === 'question_reveal' && activeQuestions[currentQuestionIndex] && (
              <AnswerReveal
                question={activeQuestions[currentQuestionIndex]}
                userOptionId={lastAnswerData.optionId}
                isCorrect={lastAnswerData.isCorrect}
                scoreAwarded={lastAnswerData.scoreAwarded}
                timeTaken={lastAnswerData.timeTaken}
                streak={currentPlayer.streak}
                bots={botsOnly}
                onNext={handleNextFromReveal}
              />
            )}

            {/* Stage 5: Round Leaderboard */}
            {currentStage === 'round_leaderboard' && (
              <LeaderboardScreen
                players={sessionPlayers}
                userId={currentPlayer.id}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={activeQuestions.length}
                onNext={handleNextFromLeaderboard}
              />
            )}

            {/* Stage 6: Final 3-tier Olympic Kahoot Podium */}
            {currentStage === 'final_podium' && (
              <PodiumScreen
                players={sessionPlayers}
                userId={currentPlayer.id}
                questions={activeQuestions}
                onPlayAgain={handleRestart}
                onOpenStudy={handleOpenStudy}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-purple-300/60 py-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Capacitación Comercial Local · Diapositivas 3 a 10</span>
          <span>Evolución, Políticas Meta, SLA &lt; 5 min, Leadsales, Funnel y BANT</span>
        </div>
      </footer>

    </div>
  );
}
