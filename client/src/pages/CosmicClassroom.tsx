import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Zap, CheckCircle2, XCircle, GraduationCap, Map as MapIcon, RotateCcw, Lock, ChevronRight, Star } from 'lucide-react';
import { QUIZ_QUESTIONS, TRAINING_SECTORS } from '../data/cosmicClassroomData';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useUi } from "../context/UiContext";

interface ProgressItem {
  moduleId: number;
  score: number;
  completed: boolean;
}

const CosmicClassroom: React.FC = () => {
  const { t } = useUi();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Progress on Mount
  useEffect(() => {
    setLoading(false);
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await axios.get('/api/quiz/progress', { timeout: 3000 });
      setProgress(res.data);
    } catch {
      // If unauthorized or error, just ignore (guest mode)
    }
  };

  const currentModuleId = 1; // Currently we only have one quiz active in this demo
  const isModuleUnlocked = (id: number) => {
    if (id === 1) return true; // First module always unlocked
    // Check if previous module is completed
    const prev = progress.find(p => p.moduleId === id - 1);
    return prev?.completed;
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  };

  const nextStep = async () => {
    const isCorrect = selectedOption === QUIZ_QUESTIONS[currentQuestion].correct;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
      // Save Progress
      const finalScore = score + (isCorrect ? 1 : 0);
      const passed = finalScore >= (QUIZ_QUESTIONS.length * 0.6); // 60% to pass

      try {
        await axios.post('/api/quiz/progress', {
          moduleId: currentModuleId,
          score: finalScore,
          passed
        });
        fetchProgress(); // Refresh to update locks
      } catch (e) {
        console.error("Failed to save progress", e);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizComplete(false);
    setShowQuiz(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-24 pb-20 px-4 font-sans selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2c4e] via-[#05070a] to-black opacity-60" />
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[4000ms]" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest group">
          <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} />
          {t("Return to Dashboard")}
        </Link>

        {/* MAIN HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN - HEADER & PATH */}
          <div className="lg:col-span-8 space-y-8">

            {/* HERO HEADER */}
            <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-32 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                    <GraduationCap className="text-white" size={40} />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    {t("Cosmic")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t("Classroom")}</span>
                  </h1>
                  <p className="text-white/60 text-lg max-w-lg">{t("Master orbital mechanics and space history through interactive simulations.")}</p>

                  <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-300 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {t("Live Simulation Active")}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60">
                      {t("Cadet Level 1")}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* SECTOR MAP */}
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                  <MapIcon className="text-cyan-400" size={20} /> {t("Training Modules")}
                </h3>
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("Sector A-1")}</span>
              </div>

              <div className="space-y-4">
                {TRAINING_SECTORS.map((item, i) => {
                  const moduleId = i + 1;
                  const isUnlocked = isModuleUnlocked(moduleId);
                  const moduleProgress = progress.find(p => p.moduleId === moduleId);
                  const isCompleted = moduleProgress?.completed;

                  return (
                    <div key={i} className={`group relative overflow-hidden rounded-3xl border p-1 transition-all duration-300
                                    ${isUnlocked
                        ? 'bg-gradient-to-r from-white/10 to-white/5 border-white/10 hover:border-cyan-500/50'
                        : 'bg-black/40 border-white/5 grayscale opacity-60'
                      }
                                `}>
                      <div className={`relative rounded-[20px] p-6 h-full flex flex-col md:flex-row items-start md:items-center gap-6 
                                        ${isUnlocked ? 'bg-[#0B0E14]' : 'bg-transparent'}
                                    `}>
                        {/* Status Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border
                                            ${isCompleted
                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                            : isUnlocked
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                              : 'bg-white/5 border-white/5 text-white/30'
                          }
                                        `}>
                          {isCompleted ? <CheckCircle2 size={24} /> : isUnlocked ? <span>0{moduleId}</span> : <Lock size={20} />}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{t(item.t)}</h4>
                          <p className="text-sm text-white/50 mt-1 max-w-xl">{t(item.d)}</p>
                        </div>

                        <div className="md:text-right">
                          {isUnlocked ? (
                            <button
                              onClick={() => moduleId === 1 && setShowQuiz(true)} // Only mod 1 active for demo
                              className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all
                                                        ${isCompleted
                                  ? 'bg-white/5 text-white/50 hover:bg-white/10'
                                  : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-105 shadow-lg shadow-cyan-500/25'
                                }
                                                    `}
                            >
                              {isCompleted ? t("Review") : t("Start Mission")}
                            </button>
                          ) : (
                            <div className="px-6 py-3 rounded-xl bg-white/5 text-white/30 text-xs font-bold uppercase tracking-wider border border-white/5">
                              {t("Locked")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - STATS & DAILY */}
          <div className="lg:col-span-4 space-y-6">

            {/* PROFILE CARD */}
            <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">{t("Pilot Profile")}</h3>
                <Zap className="text-yellow-400 fill-yellow-400" size={16} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{progress.filter(p => p.completed).length}</div>
                  <div className="text-[10px] uppercase text-white/40 font-bold">{t("Modules Done")}</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">
                    {progress.reduce((acc, curr) => acc + curr.score, 0) * 100}
                  </div>
                  <div className="text-[10px] uppercase text-white/40 font-bold">{t("XP Earned")}</div>
                </div>
              </div>
            </div>

            {/* DAILY CHALLENGE */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-center shadow-2xl">
              <Star className="absolute top-4 right-4 text-white/20 rotate-12" size={40} />
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t("Daily Challenge")}</h3>
              <p className="text-white/70 text-sm mb-6 max-w-xs mx-auto">{t("Complete 'Orbital Basics' with 100% accuracy to earn the Sharpshooter badge.")}</p>
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                {t("Accept Challenge")}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* QUIZ MODAL OVERLAY */}
      {showQuiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity" onClick={() => setShowQuiz(false)} />

          <div className="relative w-full max-w-3xl bg-[#0B0E14] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-cyan-500/10 animate-in zoom-in-95 duration-300">
            {/* QUIZ CONTENT */}
            <div className="p-8 md:p-12 relative z-10">

              {!quizComplete ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-mono text-cyan-400">
                      {t("QUESTION")} {currentQuestion + 1} <span className="text-white/40">/ {QUIZ_QUESTIONS.length}</span>
                    </div>
                    <button onClick={() => setShowQuiz(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition">✕</button>
                  </div>

                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {t(QUIZ_QUESTIONS[currentQuestion].question)}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[currentQuestion].options.map((opt, i) => {
                      const isAnswered = selectedOption !== null;
                      const isCorrect = i === QUIZ_QUESTIONS[currentQuestion].correct;
                      const isSelected = i === selectedOption;

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={isAnswered}
                          className={`w-full p-5 rounded-xl border text-left flex justify-between items-center transition-all duration-200
                                                ${!isAnswered
                              ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:translate-x-1'
                              : ''
                            }
                                                ${isAnswered && isCorrect ? 'bg-green-500/10 border-green-500/50 text-green-300' : ''}
                                                ${isAnswered && isSelected && !isCorrect ? 'bg-red-500/10 border-red-500/50 text-red-300' : ''}
                                                ${isAnswered && !isCorrect && !isSelected ? 'opacity-40' : ''}
                                            `}
                        >
                          <span className="font-medium">{t(opt)}</span>
                          {isAnswered && isCorrect && <CheckCircle2 size={20} className="text-green-400" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="mt-8 pt-8 border-t border-white/10 animate-in slide-in-from-bottom-4 fade-in">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                          <Zap size={20} className="text-blue-400" />
                        </div>
                        <p className="text-sm text-white/70 italic leading-relaxed">
                          {t(QUIZ_QUESTIONS[currentQuestion].fact)}
                        </p>
                      </div>
                      <button
                        onClick={nextStep}
                        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
                      >
                        {currentQuestion === QUIZ_QUESTIONS.length - 1 ? t("Complete Mission") : t("Next Question")} <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-32 h-32 mx-auto relative mb-8">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
                    <Trophy className="w-full h-full text-cyan-400 relative z-10 drop-shadow-2xl" strokeWidth={1} />
                  </div>

                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">{t("MISSION ACCOMPLISHED")}</h2>
                  <p className="text-white/50 text-lg mb-8">{t("You've mastered the basics of orbital flight.")}</p>

                  <div className="inline-flex gap-8 mb-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{t("Accuracy")}</div>
                      <div className="text-3xl font-bold text-white">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{t("XP Earned")}</div>
                      <div className="text-3xl font-bold text-cyan-400">+{score * 100}</div>
                    </div>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> {t("Replay Simulation")}
                  </button>
                </div>
              )}
            </div>

            {/* DECORATIVE BG FOR MODAL */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px]" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CosmicClassroom;
