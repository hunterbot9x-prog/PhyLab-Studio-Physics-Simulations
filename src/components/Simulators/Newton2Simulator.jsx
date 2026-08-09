import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Activity, Sliders } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function Newton2Simulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pos, setPos] = useState(0); // position in meters
  const [vel, setVel] = useState(0); // velocity in m/s
  const [time, setTime] = useState(0); // time in seconds

  const force = params.force || 50; // Force in Newtons
  const mass = params.mass || 10; // Mass in kg
  const mu = params.mu !== undefined ? params.mu : 0.1; // Friction coefficient
  const gravity = 9.81;

  // Calculate Net Force & Acceleration
  const frictionForce = Math.min(Math.abs(force), mu * mass * gravity) * (force >= 0 ? 1 : -1);
  const netForce = force - (vel !== 0 || Math.abs(force) > Math.abs(frictionForce) ? frictionForce : force);
  const accel = netForce / mass;

  // Animation Loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const update = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isRunning) {
        setTime(prev => prev + dt);
        setVel(prevVel => {
          let newVel = prevVel + accel * dt;
          if (force === 0 && Math.abs(newVel) < 0.01) newVel = 0;
          return newVel;
        });
        setPos(prevPos => Math.max(0, Math.min(80, prevPos + vel * dt)));
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, accel, force, vel]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // Floor Track with ticks
    const groundY = h - 60;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, groundY, w, 60);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(w, groundY); ctx.stroke();

    // Scale position (0m to 80m -> 50px to w - 100px)
    const blockX = 60 + (pos / 80) * (w - 160);
    const blockW = 60 + (mass / 50) * 20;
    const blockH = 40;
    const blockY = groundY - blockH;

    // Draw Crate / Wooden Block
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.fillRect(blockX - blockW / 2, blockY, blockW, blockH);
    ctx.strokeRect(blockX - blockW / 2, blockY, blockW, blockH);

    // Mass Label inside Crate
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${mass} kg`, blockX, blockY + blockH / 2 + 4);

    // Applied Force Vector Arrow
    if (force > 0) {
      const arrowLen = Math.min(120, force * 0.8);
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(blockX + blockW / 2, blockY + blockH / 2);
      ctx.lineTo(blockX + blockW / 2 + arrowLen, blockY + blockH / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(blockX + blockW / 2 + arrowLen + 6, blockY + blockH / 2);
      ctx.lineTo(blockX + blockW / 2 + arrowLen - 4, blockY + blockH / 2 - 5);
      ctx.lineTo(blockX + blockW / 2 + arrowLen - 4, blockY + blockH / 2 + 5);
      ctx.fill();

      ctx.font = 'bold 11px monospace';
      ctx.fillText(`F = ${force} N`, blockX + blockW / 2 + arrowLen + 25, blockY + blockH / 2 + 4);
    }
  }, [pos, force, mass, isEn]);

  const handleReset = () => {
    setIsRunning(false);
    setPos(0);
    setVel(0);
    setTime(0);
  };

  const handleRecord = () => {
    onDataRecorded?.({
      time: `${time.toFixed(2)}s`,
      force: `${force} N`,
      mass: `${mass} kg`,
      mu: `${mu}`,
      accel: `${accel.toFixed(2)} m/s²`,
      vel: `${vel.toFixed(2)} m/s`,
      pos: `${pos.toFixed(2)} m`
    });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-4 h-4" /> {isEn ? "Newton's 2nd Law Controls" : "Định luật II Newton - Bảng Điều Khiển"}
        </h3>
      </div>

      <canvas ref={canvasRef} width={680} height={200} className="w-full h-[200px] bg-slate-950 rounded-xl border border-slate-800" />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">{isEn ? 'Acceleration a:' : 'Gia tốc a:'}</span>
          <span className="text-emerald-400 font-extrabold text-sm">{accel.toFixed(2)} m/s²</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">{isEn ? 'Velocity v:' : 'Vận tốc v:'}</span>
          <span className="text-cyan-400 font-extrabold text-sm">{vel.toFixed(2)} m/s</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-400 block">{isEn ? 'Displacement s:' : 'Quãng đường s:'}</span>
          <span className="text-amber-400 font-extrabold text-sm">{pos.toFixed(2)} m</span>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Pull Force F:' : 'Lực kéo F:'}</span>
            <span className="text-cyan-400 font-bold">{force} N</span>
          </div>
          <input
            type="range" min="0" max="200" step="5"
            value={force}
            onChange={(e) => onParamChange('force', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Mass m:' : 'Khối lượng m:'}</span>
            <span className="text-amber-400 font-bold">{mass} kg</span>
          </div>
          <input
            type="range" min="2" max="50" step="1"
            value={mass}
            onChange={(e) => onParamChange('mass', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Friction Coefficient μ:' : 'Hệ số ma sát μ:'}</span>
            <span className="text-rose-400 font-bold">{mu}</span>
          </div>
          <input
            type="range" min="0" max="0.5" step="0.05"
            value={mu}
            onChange={(e) => onParamChange('mu', Number(e.target.value))}
            className="w-full accent-rose-400 h-2 bg-slate-700 rounded-lg"
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
            {isRunning ? (isEn ? 'PAUSE' : 'TẠM DỪNG') : (isEn ? 'START MOTION' : 'CHẠY CHUYỂN ĐỘNG')}
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
          <Plus className="w-4 h-4" /> {isEn ? 'RECORD DATA' : 'GHI BẢNG SỐ LIỆU'}
        </button>
      </div>
    </div>
  );
}
