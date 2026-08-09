import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function Stopwatch({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeMs(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prev => [formatTime(timeMs), ...prev]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-3 shadow-xl">
      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
        <Timer className="w-4 h-4" /> {t.stopwatchLabel}
      </div>

      <div className="font-mono text-base font-extrabold text-amber-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 min-w-[100px] text-center tracking-wider">
        {formatTime(timeMs)}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-1.5 rounded-lg text-slate-950 font-bold transition-all ${
            isRunning ? 'bg-amber-400 hover:bg-amber-300' : 'bg-emerald-400 hover:bg-emerald-300'
          }`}
          title={isRunning ? t.pause : t.start}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-all"
          title={t.lap}
        >
          <Flag className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          title={t.reset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {laps.length > 0 && (
        <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-mono">
          <span className="text-slate-500">Lap 1:</span> {laps[0]}
        </div>
      )}
    </div>
  );
}
