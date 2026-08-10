import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, RotateCcw, Pause, Sparkles } from 'lucide-react';

export default function RadioactiveSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [decayHistory, setDecayHistory] = useState([]);

  const halfLifeSec = params.halfLifeSec || 10; // seconds for simulation
  const initialNucleiCount = 400; // Total starting nuclei

  const decayConstant = Math.LN2 / halfLifeSec; // lambda = ln(2) / T_1/2
  const remainingFraction = Math.exp(-decayConstant * elapsedTime);
  const currentNucleiCount = Math.round(initialNucleiCount * remainingFraction);
  const decayedNucleiCount = initialNucleiCount - currentNucleiCount;

  // Animation Loop
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const dt = 0.1;
      animId = requestAnimationFrame(function step() {
        setElapsedTime(prev => {
          const next = prev + dt;
          if (next >= halfLifeSec * 3.5) {
            setIsPlaying(false);
            return halfLifeSec * 3.5;
          }
          const frac = Math.exp(-decayConstant * next);
          const count = Math.round(initialNucleiCount * frac);
          setDecayHistory(hist => [...hist, { t: next, count }]);
          return next;
        });

        if (isPlaying) {
          animId = requestAnimationFrame(step);
        }
      });
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, halfLifeSec, decayConstant]);

  const handleStart = () => {
    setElapsedTime(0);
    setDecayHistory([{ t: 0, count: initialNucleiCount }]);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    setDecayHistory([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020408');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const gridX = 40;
    const gridY = 50;
    const cols = 20;
    const rows = 20;
    const cellSize = 12;

    // Draw Nuclei Matrix (400 nuclei)
    for (let i = 0; i < initialNucleiCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const nx = gridX + col * (cellSize + 4);
      const ny = gridY + row * (cellSize + 4);

      const isUndecayed = i < currentNucleiCount;

      ctx.fillStyle = isUndecayed ? '#f43f5e' : '#334155';
      ctx.strokeStyle = isUndecayed ? '#ffffff' : '#475569';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(nx + cellSize / 2, ny + cellSize / 2, cellSize / 2, 0, 2 * Math.PI);
      ctx.fill(); ctx.stroke();
    }

    // Title text HUD
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.fillText(isEn ? 'RADIOACTIVE DECAY SIMULATION (N(t) = N₀ · e⁻λt)' : 'MÔ PHỎNG PHÂN RÃ PHÓNG XẠ (N(t) = N₀ · e⁻λt)', 40, 30);

  }, [currentNucleiCount, initialNucleiCount, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      halfLifeSec: `${halfLifeSec} s`,
      elapsedTime: `${elapsedTime.toFixed(1)} s`,
      currentNucleiCount,
      decayedNucleiCount,
      decayConstant: `${decayConstant.toFixed(3)} s⁻¹`
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={420}
          className="w-full max-w-[540px] h-[420px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Playback Controls */}
        <div className="w-full max-w-[540px] mt-4 flex items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="flex gap-2">
            {!isPlaying ? (
              <button
                onClick={handleStart}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" /> {isEn ? 'START DECAY' : 'BẮT ĐẦU PHÂN RÃ'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Pause className="w-4 h-4 fill-slate-950" /> {isEn ? 'PAUSE' : 'TẠM DỪNG'}
              </button>
            )}

            <button
              onClick={handleReset}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> {isEn ? 'Reset' : 'Đặt lại'}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {isEn ? 'Elapsed Time t:' : 'Thời gian t:'} <span className="text-cyan-400 font-bold">{elapsedTime.toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> {isEn ? 'Radioactive Decay Controls' : 'Cambridge A Level Nuclear Physics'}
          </h3>

          {/* Half Life T1/2 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Half-life T₁/₂:' : 'Chu kỳ bán rã T₁/₂:'}</span>
              <span className="text-amber-400 font-bold">{halfLifeSec} {isEn ? 'sec' : 'giây'}</span>
            </div>
            <input
              type="range" min="3" max="30" step="1"
              value={halfLifeSec}
              onChange={(e) => onParamChange('halfLifeSec', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'PARENT & DAUGHTER NUCLEI' : 'Số Hạt Nhân Mẹ & Hạt Nhân Con'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Parent Undecayed:' : 'Hạt mẹ chưa phân rã:'}</span>
              <span className="text-rose-400 font-bold text-sm">{currentNucleiCount} / 400</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Daughter Formed:' : 'Hạt con đã tạo thành:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{decayedNucleiCount}</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Decay Constant λ:' : 'Hằng số phân rã λ:'}</span>
                <span className="text-slate-400 text-[10px]">λ = ln(2) / T₁/₂</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{decayConstant.toFixed(3)} s⁻¹</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Decay Data' : 'Ghi Bảng Số liệu Phân rã'}
          </button>
        </div>
      </div>
    </div>
  );
}
