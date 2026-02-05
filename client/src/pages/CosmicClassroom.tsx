import React, { useState } from 'react';
import { Trophy, Zap, CheckCircle2, XCircle, GraduationCap, Map as MapIcon, RotateCcw, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS, TRAINING_SECTORS } from '../data/cosmicClassroomData';
import { Link } from 'react-router-dom';

const CosmicClassroom: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6 transition-colors font-mono uppercase tracking-widest text-xs">
          ← Return to Dashboard
        </Link>

        {/* HUD HEADER */}
        <header className="mb-8 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-left w-full">
              <div className="w-20 h-20 rounded-2xl border-2 border-emerald-500/50 flex items-center justify-center bg-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <GraduationCap className="text-emerald-400" size={40} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                  Cosmic <span className="text-emerald-500">Classroom</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 uppercase">
                    Anonymous Guest Mode
                  </span>
                  <span className="text-slate-500 text-[10px] font-mono tracking-widest">CADET_04_SIGNAL_STABLE</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase">Rank</p>
                <p className="font-bold text-emerald-400">NOVICE</p>
              </div>
              <div className="flex-1 text-center p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase">Exp</p>
                <p className="font-bold text-blue-400">000</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* TRAINING SECTORS */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 h-full">
              <h3 className="text-xl font-bold flex items-center gap-3 mb-10 text-white">
                <MapIcon className="text-emerald-500" /> Sector Training Path
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRAINING_SECTORS.map((item, i) => (
                  <div key={i} className={`p-6 rounded-3xl border transition-all ${item.s === 'Active' ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500 cursor-pointer' : 'bg-white/5 border-white/5 opacity-40'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.s === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>0{i + 1}</div>
                      {item.s === 'Active' ? <CheckCircle2 className="text-emerald-500" size={18} /> : <Lock size={18} />}
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
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 p-[2px] rounded-[3rem]">
              <div className="bg-slate-950 rounded-[2.9rem] p-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Zap className="text-emerald-400 animate-pulse" size={32} />
                </div>
                <h3 className="text-2xl font-black text-white italic mb-2">DAILY CHALLENGE</h3>
                <p className="text-slate-400 text-sm mb-10">Test your cosmic IQ and earn your first Pilot badge today.</p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20"
                >
                  Launch Quiz
                </button>
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
          <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-emerald-500/10">

            {!quizComplete ? (
              <div className="animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}</span>
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
                          ${!isAnswered ? 'border-white/10 bg-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5' : ''}
                          ${isAnswered && isCorrect ? 'border-emerald-500 bg-emerald-500/20 text-emerald-100' : ''}
                          ${isAnswered && isSelected && !isCorrect ? 'border-red-500 bg-red-500/20 text-red-100' : ''}
                          ${isAnswered && !isCorrect && !isSelected ? 'opacity-30' : ''}
                        `}
                      >
                        <span className="font-bold">{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="text-emerald-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="mt-10 animate-in zoom-in-95">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 mb-6">
                      <p className="text-sm text-slate-300 italic"><span className="text-emerald-400 font-bold mr-2">FEEDBACK:</span> {QUIZ_QUESTIONS[currentQuestion].fact}</p>
                    </div>
                    <button
                      onClick={nextStep}
                      className="w-full py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-colors uppercase"
                    >
                      {currentQuestion === QUIZ_QUESTIONS.length - 1 ? "Get Results" : "Next Question"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/40">
                  <Trophy className="text-emerald-400 animate-bounce" size={48} />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 italic">WOOHOO! YOU DID IT!</h2>
                <p className="text-slate-400 mb-10">Session result: <span className="text-emerald-400 font-bold text-xl">{score}/{QUIZ_QUESTIONS.length}</span> accuracy.</p>

                <button
                  onClick={resetQuiz}
                  className="w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:scale-105 transition-all uppercase flex items-center justify-center gap-3"
                >
                  Return to Flight Deck <RotateCcw size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CosmicClassroom;
