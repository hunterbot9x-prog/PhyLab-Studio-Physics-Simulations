import React, { useState } from 'react';
import { X, Target, Brain, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle, Award, Sparkles, Sliders, Layers } from 'lucide-react';
import { getExamMethodologyForExp } from '../data/examMethodologyData';

export default function ExamMethodologyModal({ isOpen, experiment, onClose, lang }) {
  if (!isOpen || !experiment) return null;

  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState('mindset'); // 'mindset' | 'problemTypes' | 'workedExample' | 'practice'
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCategoryEn = (cat) => {
    switch (cat) {
      case 'Cơ học': return 'Mechanics';
      case 'Nhiệt học': return 'Thermodynamics';
      case 'Điện - Từ': return 'Electricity & Magnetism';
      case 'Quang học': return 'Optics';
      case 'Vật lý Hiện đại': return 'Modern Physics';
      default: return cat;
    }
  };

  const methodology = getExamMethodologyForExp(experiment.id, experiment.category, experiment.grade, lang);
  const displayTitle = isEn ? (experiment.titleEn || experiment.title) : experiment.title;
  const displayCategory = isEn ? getCategoryEn(experiment.category) : experiment.category;
  const displayGrade = isEn ? (experiment.grade === 'IGCSE' || experiment.grade === 'A Level' ? experiment.grade : `Grade ${experiment.grade}`) : experiment.gradeLabel;

  const handleResetQuiz = () => {
    setSelectedQuizOption(null);
    setShowHint1(false);
    setShowHint2(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Target className="w-5 h-5 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold border border-amber-500/40 uppercase tracking-wider">
                  {isEn ? 'EXAM STRATEGY & METHODOLOGY' : 'CHUYÊN ĐỀ PHƯƠNG PHÁP GIẢI ĐỀ THI'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                  {displayGrade} - {displayCategory}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mt-0.5 flex items-center gap-2">
                {displayTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-slate-800 bg-slate-950/60 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('mindset')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'mindset'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Brain className="w-4 h-4" /> {isEn ? '1. Physics Mindset Algorithm' : '1. Sơ Đồ Tư Duy 4 Bước'}
          </button>

          <button
            onClick={() => setActiveTab('problemTypes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'problemTypes'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" /> {isEn ? '2. Classified Problem Types' : '2. Phân Loại Dạng Bài & Bẫy Thi'}
          </button>

          <button
            onClick={() => setActiveTab('workedExample')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'workedExample'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" /> {isEn ? '3. Worked Exam Example' : '3. Bài Tập Mẫu & Lời Giải Chi Tiết'}
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'practice'
                ? 'bg-violet-500 text-slate-950 shadow-md shadow-violet-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" /> {isEn ? '4. Step-by-Step Practice' : '4. Luyện Tập Có Gợi Ý Từng Bước'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-slate-300 text-xs leading-relaxed">
          
          {/* TAB 1: MINDSET & 4-STEP ALGORITHM */}
          {activeTab === 'mindset' && (
            <div className="flex flex-col gap-5">
              {/* Topic Headline */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-amber-400 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" /> {methodology.topic}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    {isEn
                      ? 'Systematic 4-step thinking roadmap from physical phenomenon to algebraic solution and verification.'
                      : 'Lộ trình tư duy 4 bước chuẩn mực từ nhận diện hiện tượng vật lý đến thiết lập phương trình và kiểm tra kết quả.'}
                  </p>
                </div>
              </div>

              {/* 4-Step Thinking Roadmap */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-cyan-400" /> {isEn ? 'SYSTEMATIC 4-STEP THINKING ALGORITHM' : 'QUY TRÌNH TƯ DUY VẬT LÝ 4 BƯỚC CHUẨN'}
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {methodology.mindset.steps.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-cyan-500/40 transition-all">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-xs flex items-center justify-center border border-cyan-500/40 shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-slate-200 pt-0.5 leading-relaxed font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Law & Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {isEn ? 'FUNDAMENTAL LAW / EQUATION' : 'ĐỊNH LUẬT & NGUYÊN LÝ CỐT LÕI'}
                  </span>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-emerald-300 font-mono font-bold text-sm">
                    {methodology.mindset.coreLaw}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> {isEn ? 'EXAM SHORTCUTS & GOLDEN RATIOS' : 'CÔNG THỨC GIẢI NHANH & TỈ LỆ VÀNG'}
                  </span>
                  <ul className="flex flex-col gap-1.5 text-[11px] text-slate-300">
                    {methodology.mindset.shortcuts.map((sc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">⚡</span>
                        <span>{sc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLASSIFIED PROBLEM TYPES & TRAPS */}
          {activeTab === 'problemTypes' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> {isEn ? 'FREQUENT EXAM PROBLEM TYPES & TRAP ALERTS' : 'CÁC DẠNG BÀI TẬP TRỌNG TÂM & BẪY PHÒNG THI'}
                </h4>
                <span className="text-slate-400 text-[11px]">
                  {isEn ? `${methodology.problemTypes.length} Core Types` : `${methodology.problemTypes.length} Dạng Bài Trọng Tâm`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {methodology.problemTypes.map((pt, i) => (
                  <div key={pt.id || i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2.5 hover:border-slate-700 transition-all shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-cyan-300 text-xs flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-mono">
                          {i + 1}
                        </span>
                        {pt.name}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs pl-7">{pt.description}</p>

                    <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                      <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-slate-200 font-mono text-[11px]">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">{isEn ? 'Formulas:' : 'Công thức trọng tâm:'}</span>
                        <span className="text-emerald-400 font-bold">{pt.formulaSummary}</span>
                      </div>

                      <div className="bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/30 text-rose-200 text-[11px]">
                        <span className="text-rose-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-400" /> {isEn ? 'Common Exam Traps:' : 'Bẫy hay gặp:'}
                        </span>
                        <span>{pt.traps}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WORKED EXAM EXAMPLE */}
          {activeTab === 'workedExample' && (
            <div className="flex flex-col gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] w-fit border border-emerald-500/40 uppercase">
                  {isEn ? 'SAMPLE EXAM QUESTION' : 'ĐỀ BÀI THI THỰC TẾ'}
                </span>
                <p className="text-slate-100 font-bold text-xs leading-relaxed">
                  {methodology.workedExample.question}
                </p>
              </div>

              {/* Step-by-Step Thinking Analysis */}
              <div className="bg-cyan-950/40 p-4 rounded-xl border border-cyan-500/30 flex flex-col gap-2">
                <span className="text-xs font-extrabold text-cyan-400 flex items-center gap-1.5 uppercase">
                  <Brain className="w-4 h-4 text-cyan-400" /> {isEn ? 'STEP-BY-STEP THINKING & REASONING' : 'PHÂN TÍCH HƯỚNG TƯ DUY VẬT LÝ'}
                </span>
                <p className="text-slate-200 text-xs whitespace-pre-line leading-relaxed font-medium">
                  {methodology.workedExample.thinkingAnalysis}
                </p>
              </div>

              {/* Detailed Mathematical Solution */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {isEn ? 'DETAILED STEP-BY-STEP SOLUTION' : 'LỜI GIẢI CHI TIẾT TỪNG BƯỚC'}
                </span>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-line leading-relaxed">
                  {methodology.workedExample.solution}
                </div>
              </div>

              {/* Exam Trap Alert Warning */}
              <div className="bg-rose-950/40 p-3.5 rounded-xl border border-rose-500/40 flex items-start gap-2.5 text-rose-200">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-xs leading-relaxed font-medium">
                  {methodology.workedExample.examTrapWarning}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: STEP-BY-STEP PRACTICE */}
          {activeTab === 'practice' && (
            <div className="flex flex-col gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-extrabold text-[10px] w-fit border border-violet-500/40 uppercase">
                  {isEn ? 'INTERACTIVE PRACTICE CHALLENGE' : 'BÀI TẬP TỰ LUYỆN CÓ GỢI Ý TỪNG BƯỚC'}
                </span>
                <p className="text-slate-100 font-bold text-xs leading-relaxed">
                  {methodology.practiceQuiz.question}
                </p>

                {/* Multi-choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {methodology.practiceQuiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizOption === oIdx;
                    const isCorrect = methodology.practiceQuiz.correctIndex === oIdx;

                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                    if (isSubmitted) {
                      if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                      else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-300";
                    } else if (isSelected) {
                      btnStyle = "bg-violet-950 border-violet-400 text-violet-300 font-bold";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progressive Hint Reveal Buttons */}
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => setShowHint1(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                    showHint1 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint1 ? (isEn ? 'Hide Hint 1' : 'Ẩn Gợi Ý Bước 1') : (isEn ? '💡 Reveal Hint 1 (Thinking Path)' : '💡 Xem Gợi Ý Bước 1 (Hướng tư duy)')}</span>
                </button>

                <button
                  onClick={() => setShowHint2(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
                    showHint2 ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-cyan-400 border-cyan-500/30 hover:bg-slate-800'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>{showHint2 ? (isEn ? 'Hide Hint 2' : 'Ẩn Gợi Ý Bước 2') : (isEn ? '🧠 Reveal Hint 2 (Formula Calculation)' : '🧠 Xem Gợi Ý Bước 2 (Công thức biến đổi)')}</span>
                </button>
              </div>

              {/* Revealed Hints */}
              {showHint1 && (
                <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/30 text-amber-200 text-xs animate-fadeIn">
                  💡 <strong>{isEn ? 'Hint 1 (Thinking Direction):' : 'Gợi ý 1 (Hướng tư duy):'}</strong> {methodology.practiceQuiz.hint1}
                </div>
              )}

              {showHint2 && (
                <div className="bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/30 text-cyan-200 text-xs animate-fadeIn">
                  🧠 <strong>{isEn ? 'Hint 2 (Formula Guidance):' : 'Gợi ý 2 (Biến đổi công thức):'}</strong> {methodology.practiceQuiz.hint2}
                </div>
              )}

              {/* Action Buttons: Submit / Reset */}
              <div className="flex gap-2 pt-1">
                {!isSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => setIsSubmitted(true)}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-violet-500/20"
                  >
                    🎯 {isEn ? 'Submit & Check Full Solution' : 'Nộp Bài & Xem Lời Giải Chi Tiết'}
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-xl transition-all"
                  >
                    🔄 {isEn ? 'Retry Practice Problem' : 'Làm Lại Bài Tập Này'}
                  </button>
                )}
              </div>

              {/* Full Solution on Submit */}
              {isSubmitted && (
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 flex flex-col gap-2 animate-fadeIn">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    {selectedQuizOption === methodology.practiceQuiz.correctIndex
                      ? (isEn ? '🎉 EXCELLENT! CORRECT ANSWER' : '🎉 XUẤT SẮC! BẠN ĐÃ CHỌN ĐÚNG ĐÁP ÁN')
                      : (isEn ? '⚠️ INCORRECT CHOICE - REVIEW DETAILED SOLUTION BELOW' : '⚠️ CHƯA CHÍNH XÁC - XEM LỜI GIẢI CHI TIẾT DƯỚI ĐÂY')}
                  </span>
                  <p className="text-slate-200 text-xs font-mono leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                    {methodology.practiceQuiz.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
