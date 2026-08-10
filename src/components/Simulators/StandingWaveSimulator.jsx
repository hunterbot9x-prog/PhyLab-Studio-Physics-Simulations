import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Activity } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function StandingWaveSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);

  const harmonicsK = params.harmonicsK || 3; // Harmonic mode k (Number of antinodes / loops)
  const frequencyHz = params.frequencyHz || 60; // Hz
  const stringLenM = params.stringLenM || 1.2; // meters (Length L)
  const tensionN = params.tensionN || 50; // Tension T in Newtons

  // Linear density mu = 0.002 kg/m
  const muDensity = 0.002;
  const waveVel = Math.sqrt(tensionN / muDensity); // v = sqrt(T/mu)
  const wavelengthM = (2 * stringLenM) / harmonicsK; // lambda = 2L / k
  const resonanceFreq = (harmonicsK * waveVel) / (2 * stringLenM); // f_k = k * v / (2L)

  // Animation Loop for Standing Wave
  useEffect(() => {
    let animId;

    const update = (now) => {
      if (isRunning) {
        // Redraw canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const w = canvas.width;
          const h = canvas.height;

          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = '#090d16';
          ctx.fillRect(0, 0, w, h);

          const startX = 60;
          const endX = w - 60;
          const centerY = h / 2;
          const waveLenPx = endX - startX;

          // Fixed Ends Support Posts
          ctx.fillStyle = '#334155';
          ctx.fillRect(startX - 10, centerY - 80, 10, 160);
          ctx.fillRect(endX, centerY - 80, 10, 160);

          // Draw Standing Wave Curve
          const tSec = now / 1000;
          const amp = 45;

          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 3.5;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 12;

          ctx.beginPath();
          for (let px = 0; px <= waveLenPx; px += 2) {
            const xFrac = px / waveLenPx;
            // Standing Wave Equation y(x, t) = 2A * sin(k*pi*x/L) * cos(omega*t)
            const spatialSin = Math.sin(harmonicsK * Math.PI * xFrac);
            const temporalCos = Math.cos(2 * Math.PI * (frequencyHz / 20) * tSec);
            const yOffset = amp * spatialSin * temporalCos;

            if (px === 0) ctx.moveTo(startX + px, centerY - yOffset);
            else ctx.lineTo(startX + px, centerY - yOffset);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Title & Parameters HUD
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 12px Inter';
          ctx.fillText(isEn ? `Harmonic Mode k = ${harmonicsK} (Antinodes)` : `Họa Âm Bậc k = ${harmonicsK} (Bụng Sóng)`, startX, 30);
          ctx.fillStyle = '#a855f7';
          ctx.fillText(isEn ? `Wave Speed v = ${waveVel.toFixed(1)} m/s` : `Vận Tốc Truyền Sóng v = ${waveVel.toFixed(1)} m/s`, endX - 180, 30);
        }
      }
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, harmonicsK, frequencyHz, stringLenM, tensionN, waveVel, isEn]);

  const handleRecord = () => {
    onDataRecorded?.({
      harmonicsK,
      stringLenM: `${stringLenM} m`,
      tensionN: `${tensionN} N`,
      frequencyHz: `${frequencyHz} Hz`,
      wavelengthM: `${wavelengthM.toFixed(2)} m`,
      waveVel: `${waveVel.toFixed(1)} m/s`
    });
  };

  return (
    <div className="sim-container flex flex-col gap-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={720}
        height={320}
        className="w-full h-[320px] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl"
      />

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Harmonic Mode k:' : 'Bậc Họa âm k (Bụng sóng):'}</span>
            <span className="text-cyan-400 font-bold">k = {harmonicsK}</span>
          </div>
          <input
            type="range" min="1" max="6" step="1"
            value={harmonicsK}
            onChange={(e) => onParamChange('harmonicsK', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'String Length L:' : 'Chiều dài dây L:'}</span>
            <span className="text-amber-400 font-bold">{stringLenM} m</span>
          </div>
          <input
            type="range" min="0.6" max="2.4" step="0.2"
            value={stringLenM}
            onChange={(e) => onParamChange('stringLenM', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Tension T:' : 'Lực căng dây T:'}</span>
            <span className="text-purple-400 font-bold">{tensionN} N</span>
          </div>
          <input
            type="range" min="10" max="100" step="10"
            value={tensionN}
            onChange={(e) => onParamChange('tensionN', Number(e.target.value))}
            className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Frequency f:' : 'Tần số Dao động f:'}</span>
            <span className="text-emerald-400 font-bold">{frequencyHz} Hz</span>
          </div>
          <input
            type="range" min="20" max="120" step="5"
            value={frequencyHz}
            onChange={(e) => onParamChange('frequencyHz', Number(e.target.value))}
            className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg ${
            isRunning ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' : 'bg-cyan-500 text-slate-950 shadow-cyan-500/20'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
          {isRunning ? (isEn ? 'PAUSE' : 'TẠM DỪNG') : (isEn ? 'RUN STANDING WAVE' : 'CHẠY SÓNG DỪNG')}
        </button>

        <button
          onClick={handleRecord}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20"
        >
          <Plus className="w-4 h-4" /> {isEn ? 'RECORD DATA POINT' : 'GHI BẢNG SỐ LIỆU'}
        </button>
      </div>
    </div>
  );
}
