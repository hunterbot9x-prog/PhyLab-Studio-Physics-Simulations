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

  const categories = [t.allCategories, t.mechanics, t.thermodynamics, t.electricity, t.optics, t.modernPhysics];

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
            <h1 className="text-lg font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              {isEn ? '3D Physics Laboratory & International Interactive Simulators' : 'Phòng Thí Nghiệm 3D & Mô Phỏng Tương Tác Chuẩn Quốc Tế'}
            </p>
          </div>
        </div>

        {/* Search, Controls & Toggles */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">

          {/* Real-World Noise / Error Toggle */}
          <button
            onClick={onToggleNoise}
            className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              isNoiseEnabled
                ? 'bg-rose-500/20 border border-rose-500 text-rose-400 shadow-rose-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
            title={isEn ? 'Toggle Instrumental Measurement Uncertainty' : 'Bật/Tắt Sai Số Thực Nghiệm Dụng Cụ'}
          >
            <ShieldAlert className="w-4 h-4" />
            {isNoiseEnabled
              ? (isEn ? 'ERRORS: ON (±1%)' : 'SAI SỐ: BẬT (±1%)')
              : (isEn ? 'ERRORS: OFF' : 'SAI SỐ: TẮT')}
          </button>

          {/* 3D Workbench Toggle Button */}
          <button
            onClick={onToggle3DMode}
            className={`px-3 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              is3DMode
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-cyan-500/20 ring-2 ring-cyan-400'
                : 'bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-400'
            }`}
          >
            <Box className="w-4 h-4" />
            {is3DMode ? '3D LAB WORKBENCH' : (isEn ? 'SWITCH TO 3D LAB' : 'CHUYỂN SANG BÀN 3D')}
          </button>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-44 hidden lg:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            title="Đổi ngôn ngữ / Change Language"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-extrabold">{lang.toUpperCase()}</span>
          </button>

          {/* Guided Mode Switcher */}
          <button
            onClick={onToggleMode}
            className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              activeMode === 'guided'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50'
            }`}
          >
            {activeMode === 'guided' ? (
              <>
                <BookOpen className="w-4 h-4" /> {t.guidedMode}
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" /> {t.freeMode}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-900">
        {/* Grade & Cambridge Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGrade(g.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedGrade === g.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
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
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
