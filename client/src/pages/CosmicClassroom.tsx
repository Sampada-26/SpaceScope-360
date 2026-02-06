import React, { useEffect, useMemo, useState } from 'react';
import { Trophy, Zap, CheckCircle2, XCircle, GraduationCap, Map as MapIcon, RotateCcw, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS, TRAINING_SECTORS } from '../data/cosmicClassroomData';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

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
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);

  const badgeStyles = useMemo(
    () => ({
      None: "from-slate-700/60 to-slate-500/60 text-slate-200",
      Bronze: "from-amber-300/40 to-orange-500/40 text-amber-100",
      Silver: "from-slate-200/40 to-slate-400/40 text-slate-100",
      Gold: "from-yellow-300/40 to-amber-500/40 text-yellow-100",
    }),
    []
  );

  const loadProgress = async (userPayload: UserData) => {
    setProgressLoading(true);
    setProgressError(null);
    try {
      const query = new URLSearchParams({
        name: userPayload.name,
        email: userPayload.email,
      }).toString();
      const res = await fetch(`/api/progress/${userPayload._id}?${query}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load progress");
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      setProgressError("Unable to load progress right now.");
    } finally {
      setProgressLoading(false);
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
    if (index === QUIZ_QUESTIONS[currentQuestion].correct) setScore(s => s + 1);
  };

  const nextStep = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
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
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors font-mono uppercase tracking-widest text-xs">
          ← Return to Dashboard
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
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase">Rank</p>
                <p className="font-bold text-cyan-400">NOVICE</p>
              </div>
              <div className="flex-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase">Exp</p>
                <p className="font-bold text-blue-400">000</p>
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
                    <h4 className="text-lg font-bold text-white mb-1">{item.t}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-800 p-[2px] rounded-[3rem]">
              <div className="bg-slate-950 rounded-[2.9rem] p-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="text-cyan-300 animate-pulse" size={32} />
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

            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
              <p className="text-[10px] text-blue-400 font-mono uppercase mb-2">Space Fact</p>
              <p className="text-xs text-blue-100 italic">"The sunset on Mars appears blue to the human eye due to the dust in the atmosphere."</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ SYSTEM MODAL */}
      {showQuiz && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/95 backdrop-blur-3xl p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-cyan-500/10">

            {!quizComplete ? (
              <div className="animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-cyan-300 font-mono text-xs uppercase tracking-widest">Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}</span>
                  <button onClick={() => setShowQuiz(false)} className="text-slate-600 hover:text-white">✕</button>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((opt, i) => {
                    const isAnswered = selectedOption !== null;
                    const isCorrect = i === QUIZ_QUESTIONS[currentQuestion].correct;
                    const isSelected = i === selectedOption;

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={isAnswered}
                        className={`w-full p-6 rounded-2xl border text-left transition-all duration-300 flex justify-between items-center
                          ${!isAnswered ? 'border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/5' : ''}
                          ${isAnswered && isCorrect ? 'border-cyan-500 bg-cyan-500/20 text-cyan-100' : ''}
                          ${isAnswered && isSelected && !isCorrect ? 'border-red-500 bg-red-500/20 text-red-100' : ''}
                          ${isAnswered && !isCorrect && !isSelected ? 'opacity-30' : ''}
                        `}
                      >
                        <span className="font-bold">{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="text-cyan-400" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="mt-10 animate-in zoom-in-95">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 mb-6">
                      <p className="text-sm text-slate-300 italic"><span className="text-cyan-300 font-bold mr-2">FEEDBACK:</span> {QUIZ_QUESTIONS[currentQuestion].fact}</p>
                    </div>
                    <button
                      onClick={nextStep}
                      className="w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-cyan-300 transition-colors uppercase"
                    >
                      {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Get Results" : "Next Question"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95">
                <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/40">
                  <Trophy className="text-cyan-300 animate-bounce" size={48} />
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
