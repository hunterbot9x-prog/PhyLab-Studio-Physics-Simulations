import React from 'react';
import { Atom, Search, BookOpen, Compass, Globe, Box, ShieldAlert, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function Header({
  lang,
  onToggleLang,
  selectedGrade,
  onSelectGrade,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeMode,
  onToggleMode,
  is3DMode,
  onToggle3DMode,
  isNoiseEnabled,
  onToggleNoise,
  onOpenAITutor
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const isEn = lang === 'en';

  const grades = [
    { id: 'all', label: t.allGrades },
    { id: 6, label: `${t.gradeLabelPrefix} 6` },
    { id: 7, label: `${t.gradeLabelPrefix} 7` },
    { id: 8, label: `${t.gradeLabelPrefix} 8` },
    { id: 9, label: `${t.gradeLabelPrefix} 9` },
    { id: 10, label: `${t.gradeLabelPrefix} 10` },
    { id: 11, label: `${t.gradeLabelPrefix} 11` },
    { id: 12, label: `${t.gradeLabelPrefix} 12` },
    { id: 'IGCSE', label: '🎓 IGCSE' },
    { id: 'A Level', label: '🏆 Cambridge A Level' }
  ];

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'Cơ học', label: t.catMechanics },
    { id: 'Nhiệt học', label: t.catThermodynamics },
    { id: 'Điện - Từ', label: t.catElectricity },
    { id: 'Quang học', label: t.catOptics },
    { id: 'Vật lý Hiện đại', label: t.catModernPhysics }
  ];

  return (
    <header className="bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md px-4 lg:px-8 py-3 flex flex-col gap-3">
      {/* Top Bar: Brand & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Atom className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                PhyLab Studio 6-12
              </h1>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                VIRTUAL LAB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          {/* AI Physics Tutor Button */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-600/20 transition-all active:scale-95 border border-violet-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{isEn ? 'AI Physics Tutor' : 'Trợ lý AI Vật lý'}</span>
          </button>

          {/* Noise / Experimental Error Toggle */}
          <button
            onClick={onToggleNoise}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              isNoiseEnabled
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-400 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isEn ? 'Toggle Real-World Measurement Errors & Noise' : 'Bật/tắt sai số thực nghiệm ngẫu nhiên'}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isNoiseEnabled ? (isEn ? 'ERRORS: ON' : 'SAI SỐ: BẬT') : (isEn ? 'ERRORS: OFF' : 'SAI SỐ: TẮT')}</span>
          </button>

          {/* 3D Workbench Toggle */}
          <button
            onClick={onToggle3DMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-extrabold transition-all shadow-md active:scale-95 ${
              is3DMode
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300 text-slate-950 shadow-cyan-500/20'
                : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-850 hover:border-cyan-500/40'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>{is3DMode ? (isEn ? 'EXIT 3D LAB' : 'THOÁT 3D') : (isEn ? 'SWITCH TO 3D LAB' : 'CHUYỂN SANG BÀN 3D')}</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="bg-slate-900/90 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 focus:border-cyan-500 focus:outline-none w-36 sm:w-48 placeholder:text-slate-500"
            />
          </div>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Mode Switcher */}
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{activeMode === 'guided' ? t.modeGuided : t.modeFree}</span>
          </button>
        </div>
      </div>

      {/* Navigation Toolbar: Grade Filters & Category Pills */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 pt-2 border-t border-slate-900">
        {/* Grade Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGrade(g.id)}
              className={`px-3 py-1.2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                String(selectedGrade) === String(g.id)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-semibold hidden md:inline">Field:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
