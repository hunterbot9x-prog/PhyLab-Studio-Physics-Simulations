import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, RotateCcw, ShieldCheck, Wind } from 'lucide-react';

export default function FreeFallSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const mode = params.mode || 'vacuum_vs_air'; // 'vacuum_vs_air' | 'photogate' | 'strobe'
  const heightM = params.heightM || 45; // Chiều cao thả rơi h (m)
  const gravityMs2 = params.gravityMs2 || 9.81; // Gia tốc trọng trường g (m/s²)
  const isVacuum = params.isVacuum !== undefined ? params.isVacuum : true; // Chế độ chân không vs Không khí

  const [animTime, setAnimTime] = useState(0); // real physical time t (s)
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(0);

  // Physics Calculations
  // Ideal Free Fall (Vacuum): t_fall = sqrt(2h / g), v_impact = sqrt(2gh)
  const tFallVacuum = Math.sqrt((2 * heightM) / Math.max(0.1, gravityMs2));
  const vImpactVacuum = Math.sqrt(2 * gravityMs2 * heightM);

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.016; // 60 FPS timestep ~ 0.016s
        if (timeRef.current >= tFallVacuum + 0.5) {
          setIsRunning(false);
          setAnimTime(tFallVacuum);
        } else {
          setAnimTime(timeRef.current);
        }
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, animTime, tFallVacuum]);

  const handleReset = () => {
    setIsRunning(false);
    setAnimTime(0);
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

    // Heights Setup
    const groundY = height - 50;
    const dropTopY = 60;
    const maxPixelSpan = groundY - dropTopY; // Available vertical span for drop
    const pxPerMeter = maxPixelSpan / heightM;

    // Draw Ground Platform
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(30, groundY, width - 60, 15);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, groundY, width - 60, 15);

    // Ground Grass / Texture Line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(30, groundY); ctx.lineTo(width - 30, groundY); ctx.stroke();

    // Draw Tower / Release Platform on Left
    ctx.fillStyle = '#334155';
    ctx.fillRect(40, dropTopY - 10, 40, maxPixelSpan + 10);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, dropTopY - 10, 40, maxPixelSpan + 10);

    // Release Arm at Top
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(70, dropTopY - 8, 240, 8);

    // Draw Height Scale Meter on Left Tower
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px Inter';
    ctx.textAlign = 'right';

    const stepM = heightM > 50 ? 10 : 5;
    for (let m = 0; m <= heightM; m += stepM) {
      const sy = groundY - m * pxPerMeter;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(70, sy); ctx.lineTo(60, sy); ctx.stroke();
      ctx.fillText(`${m}m`, 55, sy + 3);
    }

    // Helper for glowing text labels without box boundaries
    const drawVectorText = (x, y, text, color) => {
      ctx.font = 'bold 12px Inter';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 6;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;
    };

    const drawArrow = (startX, startY, endX, endY, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(endX, endY); ctx.stroke();

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

    // Calculate Position for Object 1 (Heavy Iron Ball - Always Ideal Free Fall in Vacuum or Dense Ball)
    const tBall = Math.min(tFallVacuum, animTime);
    const fallenDistBallM = 0.5 * gravityMs2 * Math.pow(tBall, 2);
    const ballY = Math.min(groundY - 14, dropTopY + fallenDistBallM * pxPerMeter);
    const ballX = mode === 'vacuum_vs_air' ? 140 : 220;

    // Calculate Position for Object 2 (Feather / Light Object in Air Mode)
    let fallenDistFeatherM = fallenDistBallM;
    if (mode === 'vacuum_vs_air' && !isVacuum) {
      // In Air Atmosphere: Feather reaches terminal velocity quickly!
      const vTerminal = 4.5; // m/s
      const kDrag = 0.8;
      fallenDistFeatherM = (vTerminal * tBall) * (1 - Math.exp(-kDrag * tBall));
    }
    const featherY = Math.min(groundY - 14, dropTopY + fallenDistFeatherM * pxPerMeter);
    const featherX = 260;

    // Render Stroboscopic Position Dots in 'strobe' Mode
    if (mode === 'strobe') {
      const strobeDt = tFallVacuum / 8;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;

      for (let i = 0; i <= 8; i++) {
        const stTime = i * strobeDt;
        const stDistM = 0.5 * gravityMs2 * Math.pow(stTime, 2);
        const stY = dropTopY + stDistM * pxPerMeter;

        ctx.beginPath();
        ctx.arc(ballX, stY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        drawVectorText(ballX + 45, stY, `t = ${stTime.toFixed(2)}s (${stDistM.toFixed(1)}m)`, '#f59e0b');
      }
    }

    // Render Object 1: Heavy Iron Ball
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(ballX, ballY, 14, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Ball Force Vectors
    drawArrow(ballX, ballY, ballX, ballY + 45, '#ef4444');
    drawVectorText(ballX + 22, ballY + 52, 'P', '#ef4444');

    if (!isVacuum && mode === 'vacuum_vs_air') {
      drawArrow(ballX, ballY, ballX, ballY - 25, '#d97706');
      drawVectorText(ballX + 25, ballY - 30, 'Fc (Nhỏ)', '#d97706');
    }

    // Render Object 2: Feather (In Vacuum vs Air Comparison Mode)
    if (mode === 'vacuum_vs_air') {
      ctx.fillStyle = isVacuum ? '#e2e8f0' : '#ec4899';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = isVacuum ? '#e2e8f0' : '#ec4899';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.ellipse(featherX, featherY, 7, 16, Math.PI / 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Feather Force Vectors
      drawArrow(featherX, featherY, featherX, featherY + 30, '#ef4444');
      drawVectorText(featherX + 22, featherY + 36, 'P', '#ef4444');

      if (!isVacuum) {
        // High air drag Fc balancing weight P
        drawArrow(featherX, featherY, featherX, featherY - 30, '#d97706');
        drawVectorText(featherX + 28, featherY - 36, 'Fc (Lớn)', '#d97706');
      }

      // Labels below objects
      drawVectorText(ballX, dropTopY - 20, isEn ? 'Iron Ball' : 'Quả Cầu Sắt', '#38bdf8');
      drawVectorText(featherX, dropTopY - 20, isEn ? 'Feather' : 'Lông Chim', '#ec4899');
    }

    // Render Photogates in 'photogate' Mode
    if (mode === 'photogate') {
      const gateHeightsM = [heightM * 0.75, heightM * 0.5, heightM * 0.25];
      gateHeightsM.forEach((ghM, idx) => {
        const gy = groundY - ghM * pxPerMeter;
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.fillRect(ballX - 35, gy - 6, 70, 12);
        ctx.strokeRect(ballX - 35, gy - 6, 70, 12);

        const tGate = Math.sqrt((2 * (heightM - ghM)) / gravityMs2);
        drawVectorText(ballX + 75, gy, `Cổng ${idx + 1}: t = ${tGate.toFixed(2)}s`, '#10b981');
      });
    }

    // Canvas Legend Box in Bottom Right
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillRect(width - 175, height - 85, 165, 75);
    ctx.strokeRect(width - 175, height - 85, 165, 75);

    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#ef4444'; ctx.fillText('🔴 P: Trọng lực (P = m·g)', width - 167, height - 71);
    ctx.fillStyle = '#d97706'; ctx.fillText('🟠 Fc: Lực cản không khí', width - 167, height - 55);
    ctx.fillStyle = '#38bdf8'; ctx.fillText('🔵 Chân không: Rơi cùng lúc', width - 167, height - 39);
    ctx.fillStyle = '#10b981'; ctx.fillText('🟢 v(t) = g·t | s = 1/2·g·t²', width - 167, height - 23);

    // Title HUD
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(
      isEn
        ? `FREE FALL SIMULATOR: ${mode === 'vacuum_vs_air' ? 'GALILEO VACUUM VS AIR DROP' : mode === 'photogate' ? 'PHOTOGATE TIMERS' : 'STROBOSCOPIC TRAJECTORY'}`
        : `MÔ PHỎNG VẬT RƠI TỰ DO: ${mode === 'vacuum_vs_air' ? 'THÍ NGHIỆM GALILEO: CHÂN KHÔNG VS KHÔNG KHÍ' : mode === 'photogate' ? 'CỔNG QUANG ĐIỆN ĐO THỜI GIAN' : 'CHỤP ẢNH NHẤP NHÁY STROBE'}`,
      width * 0.5,
      22
    );

  }, [mode, heightM, gravityMs2, isVacuum, animTime, tFallVacuum, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      mode: mode === 'vacuum_vs_air' ? (isEn ? 'Galileo Drop' : 'Thả rơi Galileo') : mode === 'photogate' ? (isEn ? 'Photogate Timers' : 'Cổng Quang Điện') : (isEn ? 'Stroboscopic' : 'Ảnh Nhấp Nháy'),
      heightM: `${heightM} m`,
      gravityMs2: `${gravityMs2} m/s²`,
      environment: isVacuum ? (isEn ? 'Vacuum (No Air)' : 'Chân không (Không cản)') : (isEn ? 'Atmosphere (Air Drag)' : 'Khí quyển (Có cản)'),
      tFallVacuum: `${tFallVacuum.toFixed(2)} s`,
      vImpactVacuum: `${vImpactVacuum.toFixed(1)} m/s`
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
            {isRunning ? (isEn ? 'Pause Drop' : 'Tạm Dừng Rơi') : (isEn ? 'Release Drop' : 'Thả Rơi Vật')}
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
            <ArrowDown className="w-4 h-4" /> {isEn ? 'Free Fall Controls' : 'Khảo sát Vật Rơi Tự Do'}
          </h3>

          {/* Mode Selection */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Simulation Mode:' : 'Chế độ Thí nghiệm:'}</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => { onParamChange('mode', 'vacuum_vs_air'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'vacuum_vs_air' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Galileo' : 'Galileo'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'photogate'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'photogate' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Photogate' : 'Cổng Quang'}
              </button>
              <button
                onClick={() => { onParamChange('mode', 'strobe'); handleReset(); }}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'strobe' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Strobe' : 'Nhấp Nháy'}
              </button>
            </div>
          </div>

          {/* Vacuum / Atmosphere Toggle */}
          {mode === 'vacuum_vs_air' && (
            <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-amber-400" />
                {isEn ? 'Vacuum Chamber:' : 'Ống Chân Không:'}
              </span>
              <button
                onClick={() => { onParamChange('isVacuum', !isVacuum); handleReset(); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isVacuum ? 'bg-cyan-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                }`}
              >
                {isVacuum ? (isEn ? 'ON (Vacuum)' : 'BẬT (Chân Không)') : (isEn ? 'OFF (Air Drag)' : 'TẮT (Có Không Khí)')}
              </button>
            </div>
          )}

          {/* Height Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Drop Height h:' : 'Chiều cao thả h:'}</span>
              <span className="text-amber-400 font-bold">{heightM} m</span>
            </div>
            <input
              type="range" min="5" max="100" step="5"
              value={heightM}
              onChange={(e) => onParamChange('heightM', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Gravity Preset Buttons */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Gravity g:' : 'Gia tốc trọng trường g:'}</span>
              <span className="text-cyan-400 font-bold">{gravityMs2} m/s²</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => { onParamChange('gravityMs2', 1.62); handleReset(); }}
                className={`py-1 rounded text-[10px] font-bold ${gravityMs2 === 1.62 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                🌕 1.62
              </button>
              <button
                onClick={() => { onParamChange('gravityMs2', 3.71); handleReset(); }}
                className={`py-1 rounded text-[10px] font-bold ${gravityMs2 === 3.71 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                🔴 3.71
              </button>
              <button
                onClick={() => { onParamChange('gravityMs2', 9.81); handleReset(); }}
                className={`py-1 rounded text-[10px] font-bold ${gravityMs2 === 9.81 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                🌍 9.81
              </button>
              <button
                onClick={() => { onParamChange('gravityMs2', 24.79); handleReset(); }}
                className={`py-1 rounded text-[10px] font-bold ${gravityMs2 === 24.79 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                🪐 24.79
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'FREE FALL MEASUREMENTS' : 'Thông Số Rơi Tự Do'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Fall Time t:' : 'Thời gian rơi t:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{tFallVacuum.toFixed(2)} s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Impact Velocity v:' : 'Vận tốc chạm đất v:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{vImpactVacuum.toFixed(1)} m/s</span>
            </div>

            <div className="col-span-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">{isEn ? 'Instantaneous Speed v(t):' : 'Vận tốc tức thời v(t):'}</span>
              <span className="text-amber-400 font-bold text-sm">{(gravityMs2 * animTime).toFixed(1)} m/s</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Free Fall Data' : 'Ghi Bảng Số liệu Rơi Tự Do'}
          </button>
        </div>
      </div>
    </div>
  );
}
