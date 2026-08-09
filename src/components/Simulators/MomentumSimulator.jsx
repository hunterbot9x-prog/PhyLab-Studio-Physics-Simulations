import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function MomentumSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const m1 = params.m1 || 2; // kg
  const v1Initial = params.v1 || 5; // m/s
  const m2 = params.m2 || 3; // kg
  const v2Initial = params.v2 || -2; // m/s
  const elasticity = params.elasticity !== undefined ? params.elasticity : 1.0; // 1 = elastic, 0 = inelastic

  const [x1, setX1] = useState(150);
  const [v1, setV1] = useState(v1Initial);
  const [x2, setX2] = useState(500);
  const [v2, setV2] = useState(v2Initial);
  const [hasCollided, setHasCollided] = useState(false);

  // Elastic / Inelastic Collision Solver
  const solveCollision = (m1, v1, m2, v2, e) => {
    const v1Prime = ((m1 - e * m2) * v1 + (1 + e) * m2 * v2) / (m1 + m2);
    const v2Prime = ((1 + e) * m1 * v1 + (m2 - e * m1) * v2) / (m1 + m2);
    return { v1Prime, v2Prime };
  };

  // Animation Loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const update = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      if (isRunning) {
        setX1(prevX1 => prevX1 + v1 * dt * 40);
        setX2(prevX2 => prevX2 + v2 * dt * 40);

        // Check collision between 2 carts
        const r1 = 25 + m1 * 3;
        const r2 = 25 + m2 * 3;

        if (!hasCollided && x1 + r1 >= x2 - r2) {
          const { v1Prime, v2Prime } = solveCollision(m1, v1, m2, v2, elasticity);
          setV1(v1Prime);
          setV2(v2Prime);
          setHasCollided(true);
        }
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, x1, x2, v1, v2, m1, m2, elasticity, hasCollided]);

  // Sync initial parameters
  useEffect(() => {
    setX1(150);
    setV1(v1Initial);
    setX2(500);
    setV2(v2Initial);
    setHasCollided(false);
  }, [v1Initial, v2Initial, m1, m2, elasticity]);

  const handleReset = () => {
    setIsRunning(false);
    setX1(150);
    setV1(v1Initial);
    setX2(500);
    setV2(v2Initial);
    setHasCollided(false);
  };

  // Draw Canvas View
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    const trackY = height * 0.65;
    const trackH = 12;

    // Track
    ctx.fillStyle = '#334155';
    ctx.fillRect(40, trackY, width - 80, trackH);

    // Cart 1 (Red)
    const r1 = 25 + m1 * 3;
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x1 - r1, trackY - 35, r1 * 2, 35, 6);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`m₁=${m1}kg`, x1, trackY - 18);
    ctx.fillText(`v₁=${v1.toFixed(1)}m/s`, x1, trackY - 6);

    // Cart 2 (Blue)
    const r2 = 25 + m2 * 3;
    ctx.fillStyle = '#3b82f6';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x2 - r2, trackY - 35, r2 * 2, 35, 6);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.fillText(`m₂=${m2}kg`, x2, trackY - 18);
    ctx.fillText(`v₂=${v2.toFixed(1)}m/s`, x2, trackY - 6);

    // Title HUD
    const p1Initial = m1 * v1Initial;
    const p2Initial = m2 * v2Initial;
    const pTotalInitial = p1Initial + p2Initial;
    const pTotalCurrent = m1 * v1 + m2 * v2;

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `MOMENTUM CONSERVATION: P_initial = ${pTotalInitial.toFixed(1)} kg·m/s | P_current = ${pTotalCurrent.toFixed(1)} kg·m/s`
        : `BẢO TOÀN ĐỘNG LƯỢNG: P_trước = ${pTotalInitial.toFixed(1)} kg·m/s | P_sau = ${pTotalCurrent.toFixed(1)} kg·m/s`,
      width * 0.5,
      35
    );

  }, [x1, x2, v1, v2, m1, m2, v1Initial, v2Initial, isEn]);

  const handleRecord = () => {
    onDataRecorded?.({
      m1: `${m1} kg`,
      v1Initial: `${v1Initial} m/s`,
      v1Final: `${v1.toFixed(2)} m/s`,
      m2: `${m2} kg`,
      v2Initial: `${v2Initial} m/s`,
      v2Final: `${v2.toFixed(2)} m/s`,
      totalMomentum: `${(m1 * v1 + m2 * v2).toFixed(2)} kg·m/s`
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Mass m₁:' : 'Khối lượng m₁:'}</span>
            <span className="text-rose-400 font-bold">{m1} kg</span>
          </div>
          <input
            type="range" min="1" max="5" step="1"
            value={m1}
            onChange={(e) => { onParamChange('m1', Number(e.target.value)); handleReset(); }}
            className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Initial Velocity v₁:' : 'Vận tốc v₁:'}</span>
            <span className="text-rose-400 font-bold">{v1Initial} m/s</span>
          </div>
          <input
            type="range" min="1" max="10" step="1"
            value={v1Initial}
            onChange={(e) => { onParamChange('v1', Number(e.target.value)); handleReset(); }}
            className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Mass m₂:' : 'Khối lượng m₂:'}</span>
            <span className="text-blue-400 font-bold">{m2} kg</span>
          </div>
          <input
            type="range" min="1" max="5" step="1"
            value={m2}
            onChange={(e) => { onParamChange('m2', Number(e.target.value)); handleReset(); }}
            className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Initial Velocity v₂:' : 'Vận tốc v₂:'}</span>
            <span className="text-blue-400 font-bold">{v2Initial} m/s</span>
          </div>
          <input
            type="range" min="-8" max="0" step="1"
            value={v2Initial}
            onChange={(e) => { onParamChange('v2', Number(e.target.value)); handleReset(); }}
            className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Restitution e:' : 'Độ đàn hồi e:'}</span>
            <span className="text-emerald-400 font-bold">{elasticity === 1 ? (isEn ? '1.0 (Elastic)' : '1.0 (Đàn hồi)') : (isEn ? '0.0 (Inelastic)' : '0.0 (Mềm)')}</span>
          </div>
          <input
            type="range" min="0" max="1" step="1"
            value={elasticity}
            onChange={(e) => { onParamChange('elasticity', Number(e.target.value)); handleReset(); }}
            className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg"
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
            {isRunning ? (isEn ? 'PAUSE' : 'TẠM DỪNG') : (isEn ? 'START COLLISION' : 'BẮT ĐẦU VA CHẠM')}
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
