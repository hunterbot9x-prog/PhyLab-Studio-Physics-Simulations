import React, { useEffect, useRef, useState } from 'react';
import { Activity, Play, RotateCcw, ShieldCheck } from 'lucide-react';

export default function VerticalSpringSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const mode = params.mode || 'hooke_stretch'; // 'hooke_stretch' | 'oscillation' | 'energy'
  const springMount = params.springMount || 'hanging'; // 'hanging' (Lò xo treo ở trên / dãn) | 'supported' (Lò xo đặt ở dưới / nén)
  const massKg = params.massKg || 2.0; // Khối lượng m (kg)
  const springK = params.springK || 80; // Độ cứng lò xo k (N/m)
  const naturalLenCm = params.naturalLenCm || 20; // Chiều dài tự nhiên l0 (cm)
  const amplitudeCm = params.amplitudeCm || 6; // Biên độ dao động A (cm)

  const [animProgress, setAnimProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(0);

  const g = 9.81; // m/s²
  const weightN = massKg * g; // P = m * g (N)

  // Equilibrium Compression / Stretch Δl0 = (m * g) / k (m)
  const deltaL0m = weightN / springK;
  const deltaL0cm = deltaL0m * 100;
  const totalEquilLenCm = springMount === 'supported' ? Math.max(2, naturalLenCm - deltaL0cm) : (naturalLenCm + deltaL0cm);

  // Oscillation Physics
  const periodT = 2 * Math.PI * Math.sqrt(massKg / springK);
  const frequencyHz = 1 / periodT;
  const omega = 2 * Math.PI * frequencyHz; // rad/s

  // Energy
  const maxPotentialEnergyJ = 0.5 * springK * Math.pow(amplitudeCm / 100, 2);

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.025;
        setAnimProgress(timeRef.current);
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, animProgress]);

  const handleReset = () => {
    setIsRunning(false);
    setAnimProgress(0);
    timeRef.current = 0;
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

    const isSupported = springMount === 'supported';
    const springAnchorX = 180;
    const scalePxPerCm = 3.2; // 1 cm = 3.2 px
    const massW = 48;
    const massH = 40;

    const ceilingY = 50;
    const baseY = height - 50;

    // Draw Support Base or Ceiling
    if (isSupported) {
      // Base Floor on Bottom
      ctx.fillStyle = '#334155';
      ctx.fillRect(80, baseY, 300, 15);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, baseY, 300, 15);

      // Floor Hatching
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      for (let hx = 90; hx < 370; hx += 15) {
        ctx.beginPath(); ctx.moveTo(hx, baseY + 15); ctx.lineTo(hx + 8, baseY + 25); ctx.stroke();
      }
    } else {
      // Ceiling on Top
      ctx.fillStyle = '#334155';
      ctx.fillRect(80, ceilingY - 15, 300, 15);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(80, ceilingY - 15, 300, 15);

      // Ceiling Hatching
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      for (let hx = 90; hx < 370; hx += 15) {
        ctx.beginPath(); ctx.moveTo(hx, ceilingY - 15); ctx.lineTo(hx - 8, ceilingY - 25); ctx.stroke();
      }
    }

    // Calculate Instantaneous Displacement x(t) and Spring Length
    let currentDisplaceCm = 0;
    if (mode === 'oscillation' || mode === 'energy') {
      currentDisplaceCm = amplitudeCm * Math.sin(omega * animProgress);
    }

    let currentSpringLengthPx;
    let massCenterY;
    let centerGY;

    if (isSupported) {
      // Compressed spring standing on base
      const currentEquilLenCm = Math.max(2, naturalLenCm - deltaL0cm);
      const currentLengthCm = Math.max(2, currentEquilLenCm + currentDisplaceCm);
      currentSpringLengthPx = currentLengthCm * scalePxPerCm;
      massCenterY = baseY - currentSpringLengthPx - massH;
      centerGY = massCenterY + massH / 2;
    } else {
      // Stretched spring hanging from ceiling
      const currentTotalStretchCm = deltaL0cm + currentDisplaceCm;
      currentSpringLengthPx = (naturalLenCm + currentTotalStretchCm) * scalePxPerCm;
      massCenterY = ceilingY + currentSpringLengthPx;
      centerGY = massCenterY + massH / 2;
    }

    // Draw Metric Ruler / Scale on the Left
    const rulerX = 90;
    const rulerTopY = isSupported ? baseY - 320 : ceilingY;
    const rulerBottomY = isSupported ? baseY : ceilingY + 320;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(rulerX - 25, rulerTopY, 50, rulerBottomY - rulerTopY);
    ctx.strokeRect(rulerX - 25, rulerTopY, 50, rulerBottomY - rulerTopY);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px Inter';
    ctx.textAlign = 'right';

    for (let cm = 0; cm <= 100; cm += 5) {
      const ry = isSupported ? (baseY - cm * scalePxPerCm) : (rulerTopY + cm * scalePxPerCm);
      if (ry < rulerTopY || ry > rulerBottomY) continue;

      ctx.strokeStyle = cm % 10 === 0 ? '#38bdf8' : '#64748b';
      ctx.lineWidth = cm % 10 === 0 ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(rulerX + 15, ry);
      ctx.lineTo(rulerX + (cm % 10 === 0 ? 0 : 7), ry);
      ctx.stroke();

      if (cm % 10 === 0) {
        ctx.fillText(`${cm}`, rulerX - 3, ry + 3);
      }
    }

    // Ruler Title
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('cm', rulerX, (isSupported ? rulerTopY - 5 : rulerBottomY + 15));

    // ----------------------------------------------------
    // DRAW DYNAMIC HELICAL VERTICAL SPRING
    // ----------------------------------------------------
    const coils = 18;
    const springRadius = 14;

    ctx.strokeStyle = mode === 'oscillation' ? '#ec4899' : '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = mode === 'oscillation' ? '#ec4899' : '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.beginPath();

    if (isSupported) {
      ctx.moveTo(springAnchorX, baseY);
      for (let i = 0; i <= coils; i++) {
        const cy = baseY - (i / coils) * currentSpringLengthPx;
        const cx = springAnchorX + (i % 2 === 0 ? 1 : -1) * springRadius;
        ctx.lineTo(cx, cy);
      }
      ctx.lineTo(springAnchorX, baseY - currentSpringLengthPx);
    } else {
      ctx.moveTo(springAnchorX, ceilingY);
      for (let i = 0; i <= coils; i++) {
        const cy = ceilingY + (i / coils) * currentSpringLengthPx;
        const cx = springAnchorX + (i % 2 === 0 ? 1 : -1) * springRadius;
        ctx.lineTo(cx, cy);
      }
      ctx.lineTo(springAnchorX, massCenterY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Mass Box
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fillRect(springAnchorX - massW / 2, massCenterY, massW, massH);
    ctx.strokeRect(springAnchorX - massW / 2, massCenterY, massW, massH);

    // Center of mass G dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(springAnchorX, centerGY, 3.5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${massKg} kg`, springAnchorX, massCenterY + 24);

    // ----------------------------------------------------
    // DRAW CLEAR FORCE VECTORS (P, F_dh) & LEADER LINES
    // ----------------------------------------------------
    const vectorScale = 0.8;
    const currentElasticForceN = isSupported
      ? springK * Math.abs(naturalLenCm - (naturalLenCm - deltaL0cm + currentDisplaceCm)) / 100
      : springK * ((deltaL0cm + currentDisplaceCm) / 100);

    // Helper to draw vector arrow
    const drawVector = (startX, startY, endX, endY, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      const angle = Math.atan2(endY - startY, endX - startX);
      const arrowLen = 7;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - arrowLen * Math.cos(angle - Math.PI / 6), endY - arrowLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(endX - arrowLen * Math.cos(angle + Math.PI / 6), endY - arrowLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Helper for glowing text labels without box boundaries
    const drawGlowingText = (x, y, text, color) => {
      ctx.font = 'bold 13px Inter';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;
    };

    // 1. Weight Vector P (Red - Straight Downwards)
    const pLen = weightN * vectorScale;
    drawVector(springAnchorX, centerGY, springAnchorX, centerGY + pLen, '#ef4444');
    drawGlowingText(springAnchorX + 22, centerGY + pLen + 8, 'P', '#ef4444');

    // 2. Elastic Restoring Force F_đh (Cyan - Straight Upwards)
    const fDhLen = Math.min(120, currentElasticForceN * vectorScale);
    drawVector(springAnchorX, centerGY, springAnchorX, centerGY - fDhLen, '#00f2fe');
    drawGlowingText(springAnchorX + 26, centerGY - fDhLen - 8, 'F_đh', '#00f2fe');

    // ----------------------------------------------------
    // DASHED MEASUREMENT REFERENCE LINES (l0, Δl0, Position)
    // ----------------------------------------------------
    const l0Y = ceilingY + naturalLenCm * scalePxPerCm;
    const equilY = ceilingY + (naturalLenCm + deltaL0cm) * scalePxPerCm;

    // Natural Length Reference Line l0
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(rulerX + 15, l0Y); ctx.lineTo(springAnchorX + 60, l0Y); ctx.stroke();
    drawGlowingText(springAnchorX + 90, l0Y, `l0 = ${naturalLenCm}cm`, '#f59e0b');

    // Equilibrium Line (Vị trí cân bằng VTCB)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(rulerX + 15, equilY); ctx.lineTo(springAnchorX + 60, equilY); ctx.stroke();
    ctx.setLineDash([]);
    drawGlowingText(springAnchorX + 90, equilY, `VTCB (Δl0 = ${deltaL0cm.toFixed(1)}cm)`, '#10b981');

    // Canvas Legend Box in Bottom Right
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillRect(width - 170, height - 85, 160, 75);
    ctx.strokeRect(width - 170, height - 85, 160, 75);

    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#ef4444'; ctx.fillText('🔴 P: Trọng lực (P = m·g)', width - 162, height - 71);
    ctx.fillStyle = '#00f2fe'; ctx.fillText('🔵 F_đh: Lực đàn hồi (k·Δl)', width - 162, height - 55);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('🟠 l0: Chiều dài tự nhiên', width - 162, height - 39);
    ctx.fillStyle = '#10b981'; ctx.fillText('🟢 VTCB: Vị trí cân bằng', width - 162, height - 23);

    // Title HUD
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(
      isEn
        ? `VERTICAL SPRING SIMULATOR: ${mode === 'hooke_stretch' ? 'HOOKE\'S LAW & STRETCH' : mode === 'oscillation' ? 'HARMONIC OSCILLATION' : 'SPRING MECHANICAL ENERGY'}`
        : `MÔ PHỎNG LÒ XO TREO THẲNG ĐỨNG: ${mode === 'hooke_stretch' ? 'ĐỘ GIÃN LÒ XO & ĐỊNH LUẬT HOOKE' : mode === 'oscillation' ? 'DAO ĐỘNG ĐIỀU HÒA LÒ XO' : 'BẢO TOÀN CƠ NĂNG LÒ XO'}`,
      width * 0.5,
      22
    );

  }, [mode, massKg, springK, naturalLenCm, amplitudeCm, animProgress, weightN, deltaL0cm, omega, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      mode: mode === 'hooke_stretch' ? (isEn ? "Hooke's Stretch" : 'Độ giãn Lò xo') : mode === 'oscillation' ? (isEn ? 'Harmonic Oscillation' : 'Dao động Điều hòa') : (isEn ? 'Mechanical Energy' : 'Bảo toàn Cơ năng'),
      massKg: `${massKg} kg`,
      weightN: `${weightN.toFixed(1)} N`,
      springK: `${springK} N/m`,
      naturalLenCm: `${naturalLenCm} cm`,
      deltaL0cm: `${deltaL0cm.toFixed(1)} cm`,
      totalEquilLenCm: `${totalEquilLenCm.toFixed(1)} cm`,
      periodT: `${periodT.toFixed(2)} s`,
      frequencyHz: `${frequencyHz.toFixed(2)} Hz`
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
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" />
            {isRunning ? (isEn ? 'Pause Oscillation' : 'Tạm Dừng Dao Động') : (isEn ? 'Start Oscillation' : 'Bắt Đầu Dao Động')}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {isEn ? 'Reset' : 'Đặt Lại'}
          </button>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> {isEn ? 'Vertical Spring Controls' : 'Khảo sát Lò Xo Treo Thẳng Đứng'}
          </h3>

          {/* Mode Selection */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Simulation Mode:' : 'Chế độ Thí nghiệm:'}</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { onParamChange('mode', 'hooke_stretch'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'hooke_stretch' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Hooke' : 'Độ Giãn'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'oscillation'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'oscillation' ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Oscillate' : 'Dao Động'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'energy'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'energy' ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Energy' : 'Cơ Năng'}
              </button>
            </div>
          </div>

          {/* Spring Mount Orientation (Hanging vs Supported) */}
          <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-cyan-300 block">
              {isEn ? '📍 Spring Mounting Type:' : '📍 Cách bố trí Lò xo:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { onParamChange('springMount', 'hanging'); handleReset(); }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                  springMount === 'hanging'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? '🔻 Hanging (Top/Stretch)' : '🔻 Treo Trên (Lò xo dãn)'}
              </button>
              <button
                onClick={() => { onParamChange('springMount', 'supported'); handleReset(); }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                  springMount === 'supported'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? '🔺 Supported (Bottom/Compress)' : '🔺 Đế Dưới (Lò xo nén)'}
              </button>
            </div>
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Mass m:' : 'Khối lượng quả cân m:'}</span>
              <span className="text-amber-400 font-bold">{massKg} kg</span>
            </div>
            <input
              type="range" min="0.5" max="8.0" step="0.5"
              value={massKg}
              onChange={(e) => onParamChange('massKg', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Spring Stiffness Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Spring Stiffness k:' : 'Độ cứng lò xo k:'}</span>
              <span className="text-cyan-400 font-bold">{springK} N/m</span>
            </div>
            <input
              type="range" min="20" max="250" step="10"
              value={springK}
              onChange={(e) => onParamChange('springK', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Amplitude Slider (Oscillation Mode) */}
          {mode !== 'hooke_stretch' && (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{isEn ? 'Oscillation Amplitude A:' : 'Biên độ dao động A:'}</span>
                <span className="text-pink-400 font-bold">{amplitudeCm} cm</span>
              </div>
              <input
                type="range" min="2" max="12" step="1"
                value={amplitudeCm}
                onChange={(e) => onParamChange('amplitudeCm', Number(e.target.value))}
                className="w-full accent-pink-400 h-2 bg-slate-700 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'STRETCH & PERIOD DATA' : 'Độ Biến Dạng & Chu Kỳ Dao Động'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Weight P (m·g):' : 'Trọng lượng P:'}</span>
              <span className="text-red-400 font-bold text-sm">{weightN.toFixed(1)} N</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">
                {springMount === 'supported'
                  ? (isEn ? 'Compression Δl0:' : 'Độ NÉN VTCB Δl0:')
                  : (isEn ? 'Stretch Δl0:' : 'Độ DÃN VTCB Δl0:')}
              </span>
              <span className="text-emerald-400 font-bold text-sm">{deltaL0cm.toFixed(1)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Period T:' : 'Chu kỳ T:'}</span>
              <span className="text-amber-400 font-bold text-sm">{periodT.toFixed(2)} s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Frequency f:' : 'Tần số f:'}</span>
              <span className="text-purple-400 font-bold text-sm">{frequencyHz.toFixed(2)} Hz</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Length at Equil:' : 'Chiều dài tại VTCB:'}</span>
                <span className="text-slate-400 text-[10px]">
                  {springMount === 'supported' ? 'l = l0 - Δl0 (Nén)' : 'l = l0 + Δl0 (Dãn)'}
                </span>
              </div>
              <span className="font-extrabold text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {totalEquilLenCm.toFixed(1)} cm
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Vertical Spring Data' : 'Ghi Bảng Số liệu Lò Xo Treo'}
          </button>
        </div>
      </div>
    </div>
  );
}
