import React, { memo } from 'react';
import { Droplets, Sun, Scale, Zap, Target, Focus, Activity, ChevronRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

const SidebarItem = memo(({ exp, isActive, onSelectExp, lang }) => {
  const displayTitle = lang === 'en' ? (exp.titleEn || exp.title) : exp.title;
  const displaySubtitle = lang === 'en' ? (exp.subtitleEn || exp.subtitle) : exp.subtitle;

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-4 h-4 text-cyan-400" />;
      case 'Sun': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Scale': return <Scale className="w-4 h-4 text-emerald-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'Target': return <Target className="w-4 h-4 text-rose-400" />;
      case 'Focus': return <Focus className="w-4 h-4 text-purple-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-blue-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <button
      onClick={() => onSelectExp(exp.id)}
      className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all relative group ${
        isActive
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
      }`}
    >
      {/* Active Glow Accent */}
      {isActive && (
        <div className="absolute -left-[1px] top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00f2fe]" />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
            {getIconComponent(exp.icon)}
          </div>
          <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
            {exp.gradeLabel}
          </span>
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
      </div>

      <h3 className={`text-xs font-bold leading-tight ${isActive ? 'text-slate-100' : 'text-slate-300 group-hover:text-slate-100'}`}>
        {displayTitle}
      </h3>

      <p className="text-[11px] text-slate-400 line-clamp-1">
        {displaySubtitle}
      </p>
    </button>
  );
});

export default memo(function Sidebar({ experiments, activeExpId, onSelectExp, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  return (
    <aside className="w-full lg:w-80 bg-slate-950/80 border-r border-slate-900 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {t.expList} ({experiments.length})
        </h2>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-160px)] pr-1">
        {experiments.map((exp) => (
          <SidebarItem
            key={exp.id}
            exp={exp}
            isActive={exp.id === activeExpId}
            onSelectExp={onSelectExp}
            lang={lang}
          />
        ))}
      </div>
    </aside>
  );
});
