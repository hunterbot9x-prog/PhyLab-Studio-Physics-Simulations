import React, { useState } from 'react';
import { X, BookOpen, CheckCircle, HelpCircle, Award, Target, Lightbulb, ListChecks, Sliders } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

const formatMathFormula = (formulaStr) => {
  if (!formulaStr) return '';
  return formulaStr
    .replace(/\\vec\{([^}]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\mu/g, 'μ')
    .replace(/\\cdot/g, '·')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\sin/g, 'sin')
    .replace(/\\cos/g, 'cos')
    .replace(/\\mathcal\{E\}/g, 'E')
    .replace(/\\Phi/g, 'Φ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\varepsilon_0/g, 'ε₀')
    .replace(/_\{([^}]+)\}/g, '_$1')
    .replace(/\^\{([^}]+)\}/g, '^$1');
};

export default function TheoryModal({ isOpen, experiment, onClose, lang }) {
  if (!isOpen || !experiment) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEn = lang === 'en';
  const { theory, challenges } = experiment;

  const displayTitle = isEn ? (experiment.titleEn || experiment.title) : experiment.title;
  const displaySgkRef = isEn ? (theory.sgkRefEn || theory.sgkRef) : theory.sgkRef;
  const displayObjective = isEn ? (theory.objectiveEn || theory.objective) : theory.objective;
  const displayPurpose = isEn ? (theory.purposeEn || theory.purpose) : theory.purpose;
  const displaySummary = isEn ? (theory.summaryEn || theory.summary) : theory.summary;
  const displayGuideSteps = isEn ? (theory.guideStepsEn || theory.guideSteps) : theory.guideSteps;

  const handleOptionSelect = (cId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [cId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    challenges?.forEach(c => {
      if (selectedAnswers[c.id] === c.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <BookOpen className="w-5 h-5" /> {t.theoryTitle} - {displayTitle}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-slate-300 text-xs leading-relaxed">
          {/* SGK & Standard Reference */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-amber-400 font-medium">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {displaySgkRef}
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              {experiment.gradeLabel} - {experiment.category}
            </span>
          </div>

          {/* 1. Objective / Mục đích Thí nghiệm */}
          {displayObjective && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> 🎯 {isEn ? "EXPERIMENT OBJECTIVES" : "MỤC ĐÍCH THÍ NGHIỆM"}
              </h4>
              <div className="bg-cyan-950/40 p-3.5 rounded-xl border border-cyan-500/30 text-cyan-200 font-medium">
                {displayObjective}
              </div>
            </div>
          )}

          {/* 2. Educational & Practical Purpose / Nhằm mục đích gì? */}
          {displayPurpose && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> 💡 {isEn ? "PRACTICAL APPLICATIONS & SCIENTIFIC PURPOSE" : "ỨNG DỤNG THỰC TIỄN & NHẰM MỤC ĐÍCH GÌ?"}
              </h4>
              <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30 text-amber-200">
                {displayPurpose}
              </div>
            </div>
          )}

          {/* 3. Core Theory Summary */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> 📌 {isEn ? "KEY SCIENTIFIC CONCEPTS & CORE LAWS" : "LÝ THUYẾT & ĐỊNH LUẬT CỐT LÕI"}
            </h4>
            <p className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-slate-300">
              {displaySummary}
            </p>
          </div>

          {/* 4. Formulas */}
          {theory.formulas && theory.formulas.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> 📐 {isEn ? "CORE FORMULAS & SI UNIT SYMBOL ANNOTATIONS" : "CÔNG THỨC & CHÚ THÍCH ĐẠI LƯỢNG, ĐƠN VỊ SI"}
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {theory.formulas.map((f, i) => {
                  const displayLabel = isEn ? (f.labelEn || f.label) : f.label;
                  return (
                    <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                      <span className="text-slate-400 font-semibold">{displayLabel}:</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80">
                        {formatMathFormula(f.formula)}
                      </span>
                      
                      {/* Unit & Symbol Annotations */}
                      {f.symbols && f.symbols.length > 0 && (
                        <div className="mt-1 pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-[11px]">
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            💡 {isEn ? "Symbol definitions & SI measurement units:" : "Chú thích đại lượng & đơn vị đo SI:"}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-0.5">
                            {f.symbols.map((sym, idx) => {
                              const symName = isEn ? (sym.nameEn || sym.name) : sym.name;
                              const symUnit = isEn ? (sym.unitEn || sym.unit) : sym.unit;
                              return (
                                <div key={idx} className="bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800/80 text-slate-300 flex items-center justify-between">
                                  <span><strong className="text-cyan-400 font-mono">{sym.symbol}</strong>: {symName}</span>
                                  <span className="text-emerald-400 font-bold font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                                    {symUnit}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. Detailed Step-by-Step Procedure */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-extrabold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <ListChecks className="w-4 h-4" /> 🔬 {isEn ? "DETAILED STEP-BY-STEP LAB PROCEDURE" : "HƯỚNG DẪN CHI TIẾT CÁC BƯỚC TIẾN HÀNH"}
            </h4>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-2.5">
              {displayGuideSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-200">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px] flex items-center justify-center border border-purple-500/40">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Quiz Challenges */}
          {challenges && challenges.length > 0 && (
            <div className="flex flex-col gap-3 pt-2">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> 🧠 {isEn ? "LAB QUIZ CHALLENGES" : "CÂU HỎI KIỂM TRA THỬ THÁCH"}</span>
                {submitted && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Award className="w-4 h-4" /> {t.score}: {calculateScore()}/{challenges.length}
                  </span>
                )}
              </h4>

              {challenges.map((c, cIdx) => {
                const qQuestion = isEn ? (c.questionEn || c.question) : c.question;
                const qOptions = isEn ? (c.optionsEn || c.options) : c.options;
                const qExplanation = isEn ? (c.explanationEn || c.explanation) : c.explanation;

                return (
                  <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <p className="font-semibold text-slate-200">{cIdx + 1}. {qQuestion}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {qOptions.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[c.id] === oIdx;
                        const isCorrect = c.correctIndex === oIdx;

                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (submitted) {
                          if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                          else if (isSelected) btnStyle = "bg-rose-950/80 border-rose-500 text-rose-300";
                        } else if (isSelected) {
                          btnStyle = "bg-cyan-950 border-cyan-400 text-cyan-300 font-bold";
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(c.id, oIdx)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                        💡 <strong>{t.explanation}</strong> {qExplanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {!submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  {t.submitQuiz}
                </button>
              ) : (
                <button
                  onClick={() => { setSubmitted(false); setSelectedAnswers({}); }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 rounded-xl transition-all"
                >
                  {t.retryQuiz}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
