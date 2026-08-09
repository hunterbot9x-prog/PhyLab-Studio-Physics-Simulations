import React, { useEffect, useRef, useState } from 'react';
import { Mountain, Play, RotateCcw, ShieldCheck } from 'lucide-react';

export default function InclinedPlaneSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const mode = params.mode || 'slide_down'; // 'slide_down' | 'pull_up' | 'spring_oscillator'
  const angleDeg = params.angleDeg || 30; // Góc nghiêng θ (độ)
  const massKg = params.massKg || 5; // Khối lượng vật m (kg)
  const frictionCoeff = params.frictionCoeff || 0.15; // Hệ số ma sát μ
  const springK = params.springK || 100; // Độ cứng lò xo k (N/m)

  const [animProgress, setAnimProgress] = useState(0); // 0 to 1
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(0);

  const g = 9.81; // m/s²
  const angleRad = (angleDeg * Math.PI) / 180;

  // Physics Calculations
  const weightN = massKg * g; // P = m * g (N)
  const pParallelN = weightN * Math.sin(angleRad); // P_parallel = m * g * sin(θ)
  const pNormalN = weightN * Math.cos(angleRad); // P_normal = m * g * cos(θ)
  const frictionN = frictionCoeff * pNormalN; // F_frict = μ * N

  // Mode 1: Sliding Down Acceleration a = g * (sin(θ) - μ * cos(θ))
  const slideAccel = Math.max(0, g * (Math.sin(angleRad) - frictionCoeff * Math.cos(angleRad)));
  const netForceSlideN = massKg * slideAccel; // F_th = m * a (down-slope)

  // Mode 2: Pulling Up Force F_pull = P_parallel + F_frict
  const pullForceN = pParallelN + frictionN;
  const mechanicalAdvantage = weightN / Math.max(0.1, pullForceN);

  // Mode 3: Spring Oscillator on Inclined Plane
  const deltaL0m = pParallelN / springK;
  const periodT = 2 * Math.PI * Math.sqrt(massKg / springK);
  const frequencyHz = 1 / periodT;

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        if (mode === 'spring_oscillator') {
          timeRef.current += 0.03;
          setAnimProgress(timeRef.current);
        } else {
          setAnimProgress(prev => {
            if (prev >= 1) {
              setIsRunning(false);
              return 1;
            }
            return prev + (mode === 'slide_down' ? 0.005 + slideAccel * 0.002 : 0.008);
          });
        }
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, animProgress, mode, slideAccel]);

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

    // Inclined Plane Ramp Coordinates
    const rampLengthPx = 400;
    const rampOriginX = 60;
    const rampOriginY = height - 60;
    const rampEndX = rampOriginX + rampLengthPx * Math.cos(angleRad);
    const rampEndY = rampOriginY - rampLengthPx * Math.sin(angleRad);

    // Draw Ramp Structure (Ground & Triangle)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rampOriginX, rampOriginY);
    ctx.lineTo(rampEndX, rampOriginY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Angle Arc & Label θ
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(rampOriginX, rampOriginY, 45, 0, -angleRad, true);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 13px Inter';
    ctx.fillText(`θ = ${angleDeg}°`, rampOriginX + 55, rampOriginY - 12);

    // Calculate Box position along the incline
    let posDistanceRatio = 0.5;
    if (mode === 'slide_down') {
      posDistanceRatio = 0.85 - animProgress * 0.7; // slides from top to bottom
    } else if (mode === 'pull_up') {
      posDistanceRatio = 0.15 + animProgress * 0.7; // pulled from bottom to top
    } else if (mode === 'spring_oscillator') {
      const amplitude = 0.2;
      posDistanceRatio = 0.5 + amplitude * Math.sin(animProgress * 4);
    }

    const boxDistPx = posDistanceRatio * rampLengthPx;
    const boxCenterX = rampOriginX + boxDistPx * Math.cos(angleRad);
    const boxCenterY = rampOriginY - boxDistPx * Math.sin(angleRad);

    const boxW = 56;
    const boxH = 42;

    // Center of box front face & Top anchor for cable/spring
    const boxAttachX = boxCenterX + (boxW / 2) * Math.cos(angleRad) - (boxH / 2) * Math.sin(angleRad);
    const boxAttachY = boxCenterY - (boxW / 2) * Math.sin(angleRad) - (boxH / 2) * Math.cos(angleRad);

    const topAnchorX = rampEndX - (boxH / 2) * Math.sin(angleRad);
    const topAnchorY = rampEndY - (boxH / 2) * Math.cos(angleRad);

    // Render Cable for Pull Up Mode
    if (mode === 'pull_up') {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(boxAttachX, boxAttachY);
      ctx.lineTo(topAnchorX, topAnchorY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Top Pulley Wheel
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(topAnchorX, topAnchorY, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // Render Spring for Oscillator Mode
    if (mode === 'spring_oscillator') {
      ctx.save();
      ctx.translate(topAnchorX, topAnchorY);
      ctx.rotate(Math.PI - angleRad);

      const springLength = Math.hypot(boxAttachX - topAnchorX, boxAttachY - topAnchorY);
      const coils = 14;
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);

      for (let i = 0; i <= coils; i++) {
        const x = (i / coils) * springLength;
        const y = (i % 2 === 0 ? 1 : -1) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(springLength, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Helper to transform box local coordinates to screen coordinates
    const toScreen = (lx, ly) => {
      const sx = boxCenterX + lx * Math.cos(angleRad) + ly * Math.sin(angleRad);
      const sy = boxCenterY - lx * Math.sin(angleRad) + ly * Math.cos(angleRad);
      return { x: sx, y: sy };
    };

    // Draw Object Box (Rotated)
    ctx.save();
    ctx.translate(boxCenterX, boxCenterY);
    ctx.rotate(-angleRad);

    ctx.fillStyle = mode === 'spring_oscillator' ? '#ec4899' : '#38bdf8';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = mode === 'spring_oscillator' ? '#ec4899' : '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.fillRect(-boxW / 2, -boxH, boxW, boxH);
    ctx.strokeRect(-boxW / 2, -boxH, boxW, boxH);
    ctx.shadowBlur = 0;

    // Center of mass G dot inside box
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -boxH / 2, 3.5, 0, 2 * Math.PI);
    ctx.fill();

    // Mass label text in upper box
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${massKg} kg`, 0, -boxH + 12);

    // ----------------------------------------------------
    // ACCURATE FORCE VECTORS WITH AMPLE SPANS
    // ----------------------------------------------------
    const vectorScale = 1.35;
    const originY = -boxH / 2;

    const drawVectorArrow = (startX, startY, endX, endY, color, isDashed = false) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      if (isDashed) ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      if (isDashed) ctx.setLineDash([]);

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

    // 1. Parallel Weight Component P∥ (Orange - Down-slope along -x)
    const pParX = -pParallelN * vectorScale;
    drawVectorArrow(0, originY, pParX, originY, '#f59e0b');

    // 2. Perpendicular Weight Component P⊥ (Purple - Into Ramp along +y)
    const pNormY = pNormalN * vectorScale;
    drawVectorArrow(0, originY, 0, originY + pNormY, '#a855f7');

    // 3. Weight Vector P (Red - VERTICAL DOWNWARDS IN WORLD FRAME!)
    const pVecX = -pParallelN * vectorScale;
    const pVecY = originY + pNormalN * vectorScale;
    drawVectorArrow(0, originY, pVecX, pVecY, '#ef4444');

    // Dashed Parallelogram Projection Lines for P = P∥ + P⊥
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(pParX, originY); ctx.lineTo(pVecX, pVecY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, originY + pNormY); ctx.lineTo(pVecX, pVecY); ctx.stroke();
    ctx.setLineDash([]);

    // 4. Normal Force N (Green - Out of Ramp along -y)
    const nY = -pNormalN * vectorScale;
    drawVectorArrow(0, originY, 0, originY + nY, '#10b981');

    // 5. Friction Force Fms (Amber - Opposing Motion)
    let fFrictX = 0;
    if (frictionN > 0.1 && mode !== 'spring_oscillator') {
      const fDir = mode === 'slide_down' ? 1 : -1;
      fFrictX = fDir * frictionN * 2.0;
      drawVectorArrow(0, originY, fFrictX, originY, '#d97706');
    }

    // 6. Pulling Force F_kéo (Cyan - Up-slope along +x)
    let pullX = 0;
    if (mode === 'pull_up') {
      pullX = pullForceN * 1.6;
      drawVectorArrow(0, originY, pullX, originY, '#00f2fe');
    }

    // 7. NET RESULTANT FORCE F_th (Lime Green #39ff14 - Parallel Offset Vector)
    let fThX = 0;
    if (mode === 'slide_down' && netForceSlideN > 0.1) {
      fThX = -netForceSlideN * 2.0;
      drawVectorArrow(0, originY - 24, fThX, originY - 24, '#39ff14');
    } else if (mode === 'spring_oscillator') {
      const xDisplace = (posDistanceRatio - 0.5) * rampLengthPx;
      fThX = -xDisplace * 0.5;
      if (Math.abs(fThX) > 2) {
        drawVectorArrow(0, originY - 24, fThX, originY - 24, '#39ff14');
      }
    }

    ctx.restore();

    // ----------------------------------------------------
    // ZERO-COLLISION GLOWING VECTOR TEXT LABELS (NO BOXES)
    // ----------------------------------------------------
    const drawVectorLabel = (screenX, screenY, labelText, color) => {
      ctx.font = 'bold 13px Inter';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, screenX, screenY);
      ctx.shadowBlur = 0;
    };

    // 1. Weight P (Red): placed to the RIGHT of vertical P tip
    const pScreen = toScreen(pVecX, pVecY);
    drawVectorLabel(pScreen.x + 16, pScreen.y + 6, 'P', '#ef4444');

    // 2. Parallel Weight P∥ (Orange): placed to the LEFT of orange tip
    const pParScreen = toScreen(pParX, originY);
    drawVectorLabel(pParScreen.x - 18, pParScreen.y - 8, 'P∥', '#f59e0b');

    // 3. Perpendicular Weight P⊥ (Purple): placed to the LEFT of purple tip
    const pNormScreen = toScreen(0, originY + pNormY);
    drawVectorLabel(pNormScreen.x - 16, pNormScreen.y - 6, 'P⊥', '#a855f7');

    // 4. Normal Force N (Green): placed ABOVE green tip
    const nScreen = toScreen(0, originY + nY);
    drawVectorLabel(nScreen.x, nScreen.y - 14, 'N', '#10b981');

    // 5. Friction Force Fms (Amber): placed to RIGHT (up-slope) or LEFT (down-slope)
    if (frictionN > 0.1 && mode !== 'spring_oscillator') {
      const fFrictScreen = toScreen(fFrictX, originY);
      if (mode === 'slide_down') {
        drawVectorLabel(fFrictScreen.x + 18, fFrictScreen.y, 'Fms', '#d97706');
      } else {
        drawVectorLabel(fFrictScreen.x - 18, fFrictScreen.y + 16, 'Fms', '#d97706');
      }
    }

    // 6. Pulling Force F_kéo (Cyan): placed ABOVE cyan tip
    if (mode === 'pull_up') {
      const pullScreen = toScreen(pullX, originY);
      drawVectorLabel(pullScreen.x + 22, pullScreen.y - 14, 'F_kéo', '#00f2fe');
    }

    // 7. Net Force F_th (Lime Green): placed ABOVE green net vector
    if (fThX !== 0) {
      const fThScreen = toScreen(fThX, originY - 24);
      drawVectorLabel(fThScreen.x - 20, fThScreen.y - 14, 'F_th', '#39ff14');
    }

    // Canvas Legend Box in Bottom Right
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillRect(width - 170, height - 90, 160, 80);
    ctx.strokeRect(width - 170, height - 90, 160, 80);

    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#ef4444'; ctx.fillText('🔴 P: Trọng lực tổng', width - 162, height - 76);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('🟠 P∥: Thành phần P song song', width - 162, height - 60);
    ctx.fillStyle = '#a855f7'; ctx.fillText('🟣 P⊥: Thành phần P vuông góc', width - 162, height - 44);
    ctx.fillStyle = '#39ff14'; ctx.fillText('🟢 F_th: Lực tổng hợp', width - 162, height - 28);

    // Title HUD
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(
      isEn
        ? `INCLINED PLANE SIMULATOR: ${mode === 'slide_down' ? 'SLIDING DOWN (Free Motion)' : mode === 'pull_up' ? 'PULLING UP (Force & Efficiency)' : 'SPRING OSCILLATOR (Harmonic Motion)'}`
        : `MÔ PHỎNG MẶT PHẲNG NGHIÊNG: ${mode === 'slide_down' ? 'VẬT TRƯỢT XUỐNG (Chuyển động tự do)' : mode === 'pull_up' ? 'KÉO VẬT LÊN (Công & Hiệu suất)' : 'DAO ĐỘNG LÒ XO TÊN MẶT PHẲNG NGHIÊNG'}`,
      width * 0.5,
      22
    );

  }, [mode, angleDeg, massKg, frictionCoeff, springK, animProgress, angleRad, weightN, pParallelN, pNormalN, frictionN, slideAccel, pullForceN, netForceSlideN, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      mode: mode === 'slide_down' ? (isEn ? 'Sliding Down' : 'Vật trượt xuống') : mode === 'pull_up' ? (isEn ? 'Pulling Up' : 'Kéo vật lên') : (isEn ? 'Spring Oscillator' : 'Dao động Lò xo'),
      angleDeg: `${angleDeg}°`,
      massKg: `${massKg} kg`,
      weightN: `${weightN.toFixed(1)} N`,
      pParallelN: `${pParallelN.toFixed(1)} N`,
      frictionCoeff: `${frictionCoeff}`,
      frictionN: `${frictionN.toFixed(1)} N`,
      pullForceN: mode === 'pull_up' ? `${pullForceN.toFixed(1)} N` : 'N/A',
      mechanicalAdvantage: mode === 'pull_up' ? `${mechanicalAdvantage.toFixed(2)}x` : 'N/A',
      springK: mode === 'spring_oscillator' ? `${springK} N/m` : 'N/A',
      frequencyHz: mode === 'spring_oscillator' ? `${frequencyHz.toFixed(2)} Hz` : 'N/A'
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
            {isRunning ? (isEn ? 'Pause Motion' : 'Tạm Dừng Chuyển Động') : (isEn ? 'Start Motion' : 'Bắt Đầu Chuyển Động')}
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
            <Mountain className="w-4 h-4" /> {isEn ? 'Inclined Plane Controls' : 'Khảo sát Mặt Phẳng Nghiêng'}
          </h3>

          {/* Mode Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Simulation Mode:' : 'Chế độ Thí nghiệm:'}</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { onParamChange('mode', 'slide_down'); handleReset(); }}
                className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'slide_down' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Sliding' : 'Vật Trượt'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'pull_up'); handleReset(); }}
                className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'pull_up' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Pull Up' : 'Kéo Lên'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'spring_oscillator'); handleReset(); }}
                className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'spring_oscillator' ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Spring' : 'Lò Xo'}
              </button>
            </div>
          </div>

          {/* Angle Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Incline Angle θ:' : 'Góc nghiêng θ:'}</span>
              <span className="text-amber-400 font-bold">{angleDeg}°</span>
            </div>
            <input
              type="range" min="10" max="60" step="5"
              value={angleDeg}
              onChange={(e) => onParamChange('angleDeg', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Object Mass m:' : 'Khối lượng m:'}</span>
              <span className="text-cyan-400 font-bold">{massKg} kg</span>
            </div>
            <input
              type="range" min="1" max="20" step="1"
              value={massKg}
              onChange={(e) => onParamChange('massKg', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Friction / Spring Slider */}
          {mode === 'spring_oscillator' ? (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{isEn ? 'Spring Stiffness k:' : 'Độ cứng lò xo k:'}</span>
                <span className="text-pink-400 font-bold">{springK} N/m</span>
              </div>
              <input
                type="range" min="20" max="250" step="10"
                value={springK}
                onChange={(e) => onParamChange('springK', Number(e.target.value))}
                className="w-full accent-pink-400 h-2 bg-slate-700 rounded-lg"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{isEn ? 'Friction Coefficient μ:' : 'Hệ số ma sát μ:'}</span>
                <span className="text-emerald-400 font-bold">{frictionCoeff.toFixed(2)}</span>
              </div>
              <input
                type="range" min="0.00" max="0.50" step="0.05"
                value={frictionCoeff}
                onChange={(e) => onParamChange('frictionCoeff', Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Realtime Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'PHYSICS MEASUREMENTS' : 'Phân Tích Lực & Động Học'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Parallel Force P∥:' : 'Thành phần P∥:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{pParallelN.toFixed(1)} N</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Friction Force Ff:' : 'Lực ma sát Fms:'}</span>
              <span className="text-amber-400 font-bold text-sm">{frictionN.toFixed(1)} N</span>
            </div>

            {mode === 'slide_down' && (
              <div className="col-span-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 text-[11px]">{isEn ? 'Sliding Acceleration a:' : 'Gia tốc trượt a:'}</span>
                <span className="text-emerald-400 font-bold text-sm">{slideAccel.toFixed(2)} m/s²</span>
              </div>
            )}

            {mode === 'pull_up' && (
              <>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Pull Force F_pull:' : 'Lực kéo F_kéo:'}</span>
                  <span className="text-cyan-400 font-bold text-sm">{pullForceN.toFixed(1)} N</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Advantage MA:' : 'Lợi về lực MA:'}</span>
                  <span className="text-emerald-400 font-bold text-sm">{mechanicalAdvantage.toFixed(2)}x</span>
                </div>
              </>
            )}

            {mode === 'spring_oscillator' && (
              <>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Eq. Stretch Δl0:' : 'Độ giãn CB Δl0:'}</span>
                  <span className="text-pink-400 font-bold text-sm">{(deltaL0m * 100).toFixed(1)} cm</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{isEn ? 'Frequency f:' : 'Tần số f:'}</span>
                  <span className="text-purple-400 font-bold text-sm">{frequencyHz.toFixed(2)} Hz</span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Inclined Plane Data' : 'Ghi Bảng Số liệu Mặt Phẳng Nghiêng'}
          </button>
        </div>
      </div>
    </div>
  );
}
