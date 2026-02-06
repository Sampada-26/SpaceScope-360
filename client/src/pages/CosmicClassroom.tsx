import React, { useEffect, useMemo, useState } from 'react';
import { Trophy, Zap, CheckCircle2, XCircle, GraduationCap, Map as MapIcon, RotateCcw, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS, TRAINING_SECTORS } from '../data/cosmicClassroomData';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useUi } from "../context/UiContext";

interface ProgressItem {
  moduleId: number;
  score: number;
  completed: boolean;
}

type ProgressData = {
  userId: string;
  name: string;
  email: string;
  currentLevel: number;
  completedLevels: number[];
  badge: string;
  status: string;
};

type UserData = {
  _id: string;
  name: string;
  email: string;
};

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

  const loadProgress = async (userPayload: UserData) => {
    setProgressLoading(true);
    setProgressError(null);
    try {
      const res = await axios.get('/api/quiz/progress', { timeout: 3000 });
      setProgress(res.data);
    } catch {
      // If unauthorized or error, just ignore (guest mode)
    }
  };

  const completeLevel = async (level: number) => {
    if (!user) return;
    try {
      const res = await fetch("/api/complete-level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: user._id, completedLevel: level }),
      });
      if (!res.ok) throw new Error("Failed to update progress");
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      setProgressError("Progress update failed.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setProgressLoading(true);
      try {
        const res = await fetch("/api/current_user", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        if (data && data._id) {
          setUser({ _id: data._id, name: data.name, email: data.email });
          await loadProgress({ _id: data._id, name: data.name, email: data.email });
        } else {
          setUser(null);
          setProgress(null);
        }
      } catch (error) {
        setUser(null);
        setProgressError("Login required to load dashboard.");
      } finally {
        setProgressLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  const currentLevel = progress?.currentLevel ?? 1;
  const completedLevels = progress?.completedLevels ?? [];
  const progressPercent = Math.min(100, (completedLevels.length / 3) * 100);

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

        {/* HUD HEADER */}
        <header className="mb-8 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-left w-full">
              <div className="w-20 h-20 rounded-2xl border-2 border-cyan-500/50 flex items-center justify-center bg-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <GraduationCap className="text-cyan-400" size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                  Cosmic <span className="text-cyan-500">Classroom</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-400/20 uppercase">
                    {user ? "Mission Ready" : "Anonymous Guest Mode"}
                  </span>
                  <span className="text-slate-500 text-[10px] font-mono tracking-widest">
                    {user ? "PROFILE_SYNCED" : "CADET_04_SIGNAL_STABLE"}
                  </span>
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
            </div>
          </div>
        </header>

        {/* COSMIC CLASSROOM DASHBOARD */}
        <section className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-6">
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(2,6,23,0.4)]">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                <GraduationCap className="text-cyan-300" size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Profile</p>
                <h3 className="text-lg font-bold text-white">
                  {user?.name || "Guest Explorer"}
                </h3>
                <p className="text-xs text-slate-400">{user?.email || "Sign in to sync progress"}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                Status: {progress?.status || "Locked"}
              </span>
              <span
                className={`rounded-full border border-white/10 bg-gradient-to-r ${
                  badgeStyles[progress?.badge || "None"]
                } px-3 py-1 text-[10px] uppercase tracking-[0.2em]`}
              >
                Badge: {progress?.badge || "None"}
              </span>
            </div>

            {progressError && (
              <div className="mt-4 text-xs text-rose-300">{progressError}</div>
            )}
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(2,6,23,0.4)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Progress</p>
              <span className="text-xs text-slate-400">{completedLevels.length}/3 Levels</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {["Bronze", "Silver", "Gold"].map((badge) => (
                <div
                  key={badge}
                  className={`rounded-2xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.2em] ${
                    progress?.badge === badge ? "text-cyan-200" : "text-slate-500"
                  }`}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(2,6,23,0.4)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Levels</p>
              <span className="text-xs text-slate-400">Unlock sequentially</span>
            </div>
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((level) => {
                const unlocked = level <= currentLevel;
                const completed = completedLevels.includes(level);
                return (
                  <button
                    key={level}
                    onClick={() => unlocked && setShowQuiz(true)}
                    disabled={!unlocked || progressLoading}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                      completed
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-100"
                        : unlocked
                          ? "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-500/5 text-white"
                          : "border-white/5 bg-white/5 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Level {level}</span>
                      {completed ? <CheckCircle2 className="text-cyan-300" size={18} /> : <Lock size={18} />}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {completed ? "Completed" : unlocked ? "Unlocked" : "Locked"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* TRAINING SECTORS */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 h-full">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-10 text-white">
                <MapIcon className="text-cyan-400" /> Sector Training Path
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRAINING_SECTORS.map((item, i) => (
                  <div key={i} className={`p-6 rounded-3xl border transition-all ${item.s === 'Active' ? 'bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-400 cursor-pointer' : 'bg-white/5 border-white/5 opacity-40'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.s === 'Active' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>0{i + 1}</div>
                      {item.s === 'Active' ? <CheckCircle2 className="text-cyan-400" size={18} /> : <Lock size={18} />}
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
                <h3 className="text-2xl font-black text-white italic mb-2">DAILY CHALLENGE</h3>
                <p className="text-slate-400 text-sm mb-10">Test your cosmic IQ and earn your first Pilot badge today.</p>
                {user ? (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20"
                  >
                    Launch Quiz
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-slate-900/30"
                  >
                    Sign In to Start
                  </Link>
                )}
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
                <h2 className="text-4xl font-black text-white mb-4 italic">WOOHOO! YOU DID IT!</h2>
                <p className="text-slate-400 mb-10">Session result: <span className="text-cyan-300 font-bold text-xl">{score}/{QUIZ_QUESTIONS.length}</span> accuracy.</p>

                {user ? (
                  <button
                    onClick={async () => {
                      await completeLevel(currentLevel);
                      resetQuiz();
                    }}
                    className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all uppercase flex items-center justify-center gap-3"
                  >
                    Record Level {currentLevel} Completion <RotateCcw size={20} />
                  </button>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="w-full py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase flex items-center justify-center gap-3"
                  >
                    Sign in to Save Progress <RotateCcw size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CosmicClassroom;
