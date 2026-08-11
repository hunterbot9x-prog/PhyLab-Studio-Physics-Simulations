import React, { useState } from 'react';
import { Atom, Search, BookOpen, Compass, Globe, Box, ShieldAlert, Sparkles, Palette, Sun, Moon, Zap, Star } from 'lucide-react';
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
  onOpenAITutor,
  theme = 'cyber',
  onSelectTheme
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const isEn = lang === 'en';
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

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

  const themes = [
    { id: 'cyber', name: isEn ? '🌌 Cyber Neon' : '🌌 Cyber Neon', icon: Moon, desc: isEn ? 'Midnight Dark Neon' : 'Đêm Cyberpunk Dạ Quang' },
    { id: 'space', name: isEn ? '🚀 Deep Space' : '🚀 Vũ Trụ Obsidian', icon: Sparkles, desc: isEn ? 'Deep Space Obsidian' : 'Vũ Trụ Huyền Sâu' },
    { id: 'light', name: isEn ? '🔬 Clean Light' : '🔬 Lab Phòng Sáng', icon: Sun, desc: isEn ? 'Science Clean Light' : 'Phòng Thí Nghiệm Sáng' },
    { id: 'gold', name: isEn ? '✨ Quantum Gold' : '✨ Hoàng Gia Quantum', icon: Star, desc: isEn ? 'Luxury Gold Dark' : 'Hoàng Gia Ánh Kim' }
  ];

  const activeThemeObj = themes.find(th => th.id === theme) || themes[0];

  return (
    <header className={`border-b sticky top-0 z-40 backdrop-blur-md px-4 lg:px-8 py-3 flex flex-col gap-3 transition-colors duration-300 ${
      theme === 'light' ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' :
      theme === 'space' ? 'bg-[#02040a]/95 border-slate-800 text-slate-100' :
      theme === 'gold' ? 'bg-[#0c0a09]/95 border-amber-900/40 text-stone-100' :
      'bg-slate-950/90 border-slate-800/80 text-slate-100'
    }`}>
      {/* Top Bar: Brand & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl p-0.5 shadow-lg transition-all ${
            theme === 'gold' ? 'bg-gradient-to-tr from-amber-500 to-rose-600 shadow-amber-500/20' :
            theme === 'light' ? 'bg-gradient-to-tr from-indigo-500 to-sky-500 shadow-indigo-500/20' :
            theme === 'space' ? 'bg-gradient-to-tr from-sky-400 to-purple-600 shadow-sky-500/20' :
            'bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-cyan-500/20'
          }`}>
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              theme === 'light' ? 'bg-white' : 'bg-slate-950'
            }`}>
              <Atom className={`w-6 h-6 animate-spin-slow ${
                theme === 'gold' ? 'text-amber-400' :
                theme === 'light' ? 'text-indigo-600' :
                theme === 'space' ? 'text-sky-400' :
                'text-cyan-400'
              }`} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-base font-black tracking-tight bg-clip-text text-transparent ${
                theme === 'gold' ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400' :
                theme === 'light' ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600' :
                theme === 'space' ? 'bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400' :
                'bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400'
              }`}>
                PhyLab Studio 6-12
              </h1>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border uppercase ${
                theme === 'gold' ? 'bg-amber-950/80 text-amber-400 border-amber-800' :
                theme === 'light' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                'bg-cyan-950 text-cyan-400 border-cyan-800/60'
              }`}>
                VIRTUAL LAB
              </span>
            </div>
            <p className={`text-[11px] font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* THEME SELECTOR DROPDOWN BUTTON */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  : theme === 'gold'
                  ? 'bg-amber-950/70 border-amber-800/80 text-amber-400 shadow-amber-500/10'
                  : theme === 'space'
                  ? 'bg-sky-950/70 border-sky-800/80 text-sky-400 shadow-sky-500/10'
                  : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-850'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{activeThemeObj.name}</span>
            </button>

            {/* Theme Dropdown Menu */}
            {isThemeMenuOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border p-1.5 z-50 flex flex-col gap-1 transition-all ${
                theme === 'light'
                  ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300'
                  : 'bg-slate-900 border-slate-800 text-slate-200 shadow-black'
              }`}>
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/40 mb-1">
                  {isEn ? 'Select Visual Style:' : 'Chọn Giao Diện Ưa Thích:'}
                </div>
                {themes.map(th => {
                  const IconComp = th.icon;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        onSelectTheme?.(th.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        theme === th.id
                          ? 'bg-cyan-500 text-slate-950 shadow-md'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{th.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Physics Tutor Button */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-violet-600/20 transition-all active:scale-95 border border-violet-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{isEn ? 'Physics Assistant' : 'Trợ lý hỗ trợ vật lý'}</span>
          </button>

          {/* Noise / Experimental Error Toggle */}
          <button
            onClick={onToggleNoise}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              isNoiseEnabled
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-400 shadow-md shadow-amber-500/10'
                : theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
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
                : theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200' : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-850'
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
              className={`text-xs pl-8 pr-3 py-1.5 rounded-lg border focus:outline-none w-32 sm:w-44 placeholder:text-slate-500 ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800 focus:border-indigo-500'
                  : 'bg-slate-900/90 border-slate-800 text-slate-200 focus:border-cyan-500'
              }`}
            />
          </div>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Mode Switcher */}
          <button
            onClick={onToggleMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              theme === 'light' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-cyan-950/60 border-cyan-800/60 text-cyan-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{activeMode === 'guided' ? t.modeGuided : t.modeFree}</span>
          </button>
        </div>
      </div>

      {/* Navigation Toolbar: Grade Filters & Category Pills */}
      <div className={`flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 pt-2 border-t ${
        theme === 'light' ? 'border-slate-200' : 'border-slate-900'
      }`}>
        {/* Grade Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelectGrade(g.id)}
              className={`px-3 py-1.2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                String(selectedGrade) === String(g.id)
                  ? theme === 'gold' ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-md' :
                    theme === 'light' ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' :
                    'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : theme === 'light' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200' : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-semibold hidden md:inline ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>Field:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                selectedCategory === cat.id
                  ? theme === 'gold' ? 'bg-amber-600 text-slate-950' : 'bg-violet-600 text-white'
                  : theme === 'light' ? 'bg-slate-100 text-slate-600 hover:text-slate-900' : 'bg-slate-900/60 text-slate-400 hover:text-slate-300'
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
