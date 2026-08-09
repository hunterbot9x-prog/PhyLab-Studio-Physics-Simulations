import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function FaradaySimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const numTurns = params.numTurns || 4; // Number of coil turns N
  const magnetSpeed = params.magnetSpeed || 5; // Magnet oscillation speed
  const [magnetPosX, setMagnetPosX] = useState(120);
  const [inducedEmf, setInducedEmf] = useState(0);

  // Animation Loop: Move Magnet back and forth through coil
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const update = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      if (isRunning) {
        // Simple Harmonic Motion of magnet along coil axis
        const tSec = now / 1000;
        const newX = 380 + Math.sin(tSec * magnetSpeed) * 180;
        const velX = Math.cos(tSec * magnetSpeed) * 180 * magnetSpeed;

        setMagnetPosX(newX);

        // Faraday's Law EMF = -N * dPhi/dt
        const insideCoilFactor = Math.exp(-Math.pow((newX - 380) / 60, 2));
        const emfVal = -numTurns * (velX / 100) * insideCoilFactor * 0.5;

        setInducedEmf(emfVal);
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, numTurns, magnetSpeed]);

  // Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    const coilCenterX = 380;
    const coilCenterY = 180;

    // Draw Magnet (Bar Magnet N/S)
    const mLen = 120;
    const mH = 30;
    const mY = coilCenterY - mH / 2;

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(magnetPosX - mLen / 2, mY, mLen / 2, mH);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('N', magnetPosX - mLen / 4, mY + 20);

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(magnetPosX, mY, mLen / 2, mH);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('S', magnetPosX + mLen / 4, mY + 20);

    // Title HUD
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `FARADAY LAW: INDUCED EMF E = ${inducedEmf.toFixed(2)} V`
        : `ĐỊNH LUẬT FARADAY: SUẤT ĐIỆN ĐỘNG CẢM ỨNG E = ${inducedEmf.toFixed(2)} V`,
      w * 0.5,
      35
    );

  }, [magnetPosX, inducedEmf, isEn]);

  const handleReset = () => {
    setIsRunning(false);
    setMagnetPosX(120);
    setInducedEmf(0);
  };

  const handleRecord = () => {
    onDataRecorded?.({
      numTurns,
      magnetSpeed,
      inducedEmf: `${inducedEmf.toFixed(2)} V`
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Coil Turns N:' : 'Số vòng dây N:'}</span>
            <span className="text-amber-400 font-bold">{numTurns} {isEn ? 'turns' : 'vòng'}</span>
          </div>
          <input
            type="range" min="1" max="8" step="1"
            value={numTurns}
            onChange={(e) => onParamChange('numTurns', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Magnet Speed v:' : 'Tốc độ di chuyển Nam châm:'}</span>
            <span className="text-cyan-400 font-bold">{magnetSpeed}</span>
          </div>
          <input
            type="range" min="1" max="10" step="1"
            value={magnetSpeed}
            onChange={(e) => onParamChange('magnetSpeed', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg ${
              isRunning ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' : 'bg-cyan-500 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            {isRunning ? (isEn ? 'PAUSE' : 'TẠM DỪNG') : (isEn ? 'MOVE MAGNET' : 'DI CHUYỂN NAM CHÂM')}
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" /> {isEn ? 'RESET' : 'ĐẶT LẠI'}
          </button>
        </div>

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
