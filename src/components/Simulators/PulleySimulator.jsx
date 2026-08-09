import React, { useEffect, useRef, useState } from 'react';
import { Scale, Play, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

export default function PulleySimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const pulleyType = params.pulleyType || 'fixed'; // 'fixed' | 'movable' | 'system'
  const massKg = params.massKg || 10; // Khối lượng vật m (kg)
  const liftHeightM = params.liftHeightM || 2.0; // Chiều cao nâng h (m)

  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isPulling, setIsPulling] = useState(false);

  const g = 9.81; // m/s²
  const weightN = massKg * g; // P = m * g (N)

  // Pulley physics mechanics:
  // Fixed Pulley: F = P, string distance s = h
  // Movable Pulley: F = P / 2, string distance s = 2 * h
  // Block & Tackle System: F = P / 2, string distance s = 2 * h
  const forceN = (pulleyType === 'fixed') ? weightN : weightN / 2;
  const stringDistM = (pulleyType === 'fixed') ? liftHeightM : liftHeightM * 2;
  const mechanicalAdvantage = weightN / forceN; // MA = 1 or 2
  const workJ = forceN * stringDistM; // W = F * s (J)

  // Animation Loop
  useEffect(() => {
    if (isPulling) {
      animRef.current = requestAnimationFrame(() => {
        setPullProgress(prev => {
          if (prev >= 1) {
            setIsPulling(false);
            return 1;
          }
          return prev + 0.008;
        });
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPulling, pullProgress]);

  const handleReset = () => {
    setIsPulling(false);
    setPullProgress(0);
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

    // Top Support Ceiling Beam
    ctx.fillStyle = '#334155';
    ctx.fillRect(40, 30, width - 80, 16);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 30, width - 80, 16);

    // Hatching lines on ceiling
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    for (let hx = 50; hx < width - 80; hx += 15) {
      ctx.beginPath(); ctx.moveTo(hx, 30); ctx.lineTo(hx - 8, 20); ctx.stroke();
    }

    const currentLiftPx = pullProgress * liftHeightM * 40; // 1m = 40px
    const baseObjY = height - 90;
    const objY = baseObjY - currentLiftPx;
    const centerX = width / 2;

    // Wheel Drawing Function
    const drawPulleyWheel = (cx, cy, radius = 24, rotation = 0) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Outer Wheel Rim
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Groove & Axle
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Spokes
      ctx.rotate(rotation);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      for (let a = 0; a < 4; a++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * Math.cos((a * Math.PI) / 2), radius * Math.sin((a * Math.PI) / 2));
        ctx.stroke();
      }
      ctx.restore();
    };

    // Dynamometer (Lực kế) Drawing Function
    const drawDynamometer = (x, y, forceValue) => {
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.fillRect(x - 18, y - 25, 36, 50);
      ctx.strokeRect(x - 18, y - 25, 36, 50);
      ctx.shadowBlur = 0;

      // Force Text
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${forceValue.toFixed(1)} N`, x, y + 4);
    };

    // ----------------------------------------------------
    // RENDER PULLEY SYSTEMS ACCORDING TO TYPE
    // ----------------------------------------------------

    if (pulleyType === 'fixed') {
      // 1. FIXED PULLEY (Ròng rọc cố định)
      const fixedX = centerX;
      const fixedY = 80;
      const wheelR = 26;

      // Support bracket from ceiling to fixed pulley axle
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(fixedX, 46); ctx.lineTo(fixedX, fixedY); ctx.stroke();

      // Draw Wheel
      drawPulleyWheel(fixedX, fixedY, wheelR, pullProgress * Math.PI * 4);

      // Rope path:
      // Left side: hangs down to load (fixedX - wheelR)
      // Right side: hangs down to dynamometer / hand (fixedX + wheelR)
      const ropeLeftX = fixedX - wheelR;
      const ropeRightX = fixedX + wheelR;
      const handY = 120 + pullProgress * liftHeightM * 40;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Left rope segment to load
      ctx.moveTo(ropeLeftX, fixedY);
      ctx.lineTo(ropeLeftX, objY - 20);
      // Arc over wheel
      ctx.arc(fixedX, fixedY, wheelR, Math.PI, 0, false);
      // Right rope segment to hand/dynamometer
      ctx.lineTo(ropeRightX, handY);
      ctx.stroke();

      // Hanging Object Box
      const boxW = 50; const boxH = 40;
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.fillRect(ropeLeftX - boxW / 2, objY, boxW, boxH);
      ctx.strokeRect(ropeLeftX - boxW / 2, objY, boxW, boxH);

      // Mass Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${massKg} kg`, ropeLeftX, objY + 24);

      // Weight Force Vector Arrow P (Red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ropeLeftX, objY + boxH);
      ctx.lineTo(ropeLeftX, objY + boxH + 35);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(ropeLeftX, objY + boxH + 35);
      ctx.lineTo(ropeLeftX - 4, objY + boxH + 27);
      ctx.lineTo(ropeLeftX + 4, objY + boxH + 27);
      ctx.closePath(); ctx.fill();
      ctx.fillText(`P = ${weightN.toFixed(1)} N`, ropeLeftX, objY + boxH + 48);

      // Pulling Dynamometer on Right String
      drawDynamometer(ropeRightX, handY + 25, forceN);

      // Pulling Force Vector Arrow F (Cyan)
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ropeRightX, handY + 50);
      ctx.lineTo(ropeRightX, handY + 80);
      ctx.stroke();
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(ropeRightX, handY + 80);
      ctx.lineTo(ropeRightX - 4, handY + 72);
      ctx.lineTo(ropeRightX + 4, handY + 72);
      ctx.closePath(); ctx.fill();
      ctx.fillText(`F = ${forceN.toFixed(1)} N`, ropeRightX + 40, handY + 70);

    } else if (pulleyType === 'movable') {
      // 2. MOVABLE PULLEY (Ròng rọc động)
      const wheelR = 26;
      const leftAnchorX = centerX - 60;
      const ropeRightX = centerX + 60;

      // Left string anchor attached to ceiling
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(leftAnchorX, 46); ctx.lineTo(leftAnchorX, 55); ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.arc(leftAnchorX, 55, 5, 0, 2 * Math.PI); ctx.fill();

      // Movable wheel moves up with the object!
      const movableY = objY - 30;

      // Draw Movable Wheel
      drawPulleyWheel(centerX, movableY, wheelR, pullProgress * Math.PI * 4);

      // Rope path:
      // Starts at ceiling leftAnchorX, goes down to movable wheel left side, around bottom, up to hand/dynamometer
      const handY = 120 + pullProgress * liftHeightM * 20;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(leftAnchorX, 55);
      ctx.lineTo(centerX - wheelR, movableY);
      ctx.arc(centerX, movableY, wheelR, Math.PI, 0, true);
      ctx.lineTo(ropeRightX, handY);
      ctx.stroke();

      // Hook from movable pulley axle to object
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(centerX, movableY); ctx.lineTo(centerX, objY); ctx.stroke();

      // Hanging Object Box
      const boxW = 50; const boxH = 40;
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.fillRect(centerX - boxW / 2, objY, boxW, boxH);
      ctx.strokeRect(centerX - boxW / 2, objY, boxW, boxH);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${massKg} kg`, centerX, objY + 24);

      // Weight Force Vector Arrow P (Red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX, objY + boxH);
      ctx.lineTo(centerX, objY + boxH + 35);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(centerX, objY + boxH + 35);
      ctx.lineTo(centerX - 4, objY + boxH + 27);
      ctx.lineTo(centerX + 4, objY + boxH + 27);
      ctx.closePath(); ctx.fill();
      ctx.fillText(`P = ${weightN.toFixed(1)} N`, centerX, objY + boxH + 48);

      // Pulling Dynamometer on Right String
      drawDynamometer(ropeRightX, handY - 25, forceN);

      // Pulling Force Vector Arrow F (Cyan - pointing UPWARDS!)
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ropeRightX, handY - 50);
      ctx.lineTo(ropeRightX, handY - 80);
      ctx.stroke();
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(ropeRightX, handY - 80);
      ctx.lineTo(ropeRightX - 4, handY - 72);
      ctx.lineTo(ropeRightX + 4, handY - 72);
      ctx.closePath(); ctx.fill();
      ctx.fillText(`F = P/2 = ${forceN.toFixed(1)} N`, ropeRightX + 50, handY - 65);

    } else {
      // 3. BLOCK & TACKLE SYSTEM (Palăng 1 cố định + 1 động)
      const wheelR = 24;
      const fixedX = centerX - 30;
      const fixedY = 80;
      const movableY = objY - 30;
      const rightRopeX = centerX + 40;

      // Fixed bracket
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(fixedX, 46); ctx.lineTo(fixedX, fixedY); ctx.stroke();

      // Draw Fixed & Movable Wheels
      drawPulleyWheel(fixedX, fixedY, wheelR, pullProgress * Math.PI * 4);
      drawPulleyWheel(fixedX, movableY, wheelR, -pullProgress * Math.PI * 4);

      const handY = 140 + pullProgress * liftHeightM * 20;

      // Rope path:
      // Anchored at movable axle -> up to fixed wheel -> down around movable wheel -> up to fixed wheel right -> down to hand
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fixedX - wheelR, fixedY);
      ctx.lineTo(fixedX - wheelR, movableY);
      ctx.arc(fixedX, movableY, wheelR, Math.PI, 0, true);
      ctx.lineTo(fixedX + wheelR, fixedY);
      ctx.arc(fixedX, fixedY, wheelR, 0, Math.PI, true); // loop over fixed wheel
      ctx.lineTo(rightRopeX, handY);
      ctx.stroke();

      // Hook from movable axle to object
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(fixedX, movableY); ctx.lineTo(fixedX, objY); ctx.stroke();

      // Object Box
      const boxW = 50; const boxH = 40;
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.fillRect(fixedX - boxW / 2, objY, boxW, boxH);
      ctx.strokeRect(fixedX - boxW / 2, objY, boxW, boxH);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${massKg} kg`, fixedX, objY + 24);

      // Weight Force P (Red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(fixedX, objY + boxH); ctx.lineTo(fixedX, objY + boxH + 35); ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.moveTo(fixedX, objY + boxH + 35); ctx.lineTo(fixedX - 4, objY + boxH + 27); ctx.lineTo(fixedX + 4, objY + boxH + 27); ctx.closePath(); ctx.fill();
      ctx.fillText(`P = ${weightN.toFixed(1)} N`, fixedX, objY + boxH + 48);

      // Pulling Dynamometer
      drawDynamometer(rightRopeX, handY + 25, forceN);

      // Pulling Force Vector Arrow F (Cyan)
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(rightRopeX, handY + 50); ctx.lineTo(rightRopeX, handY + 80); ctx.stroke();
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath(); ctx.moveTo(rightRopeX, handY + 80); ctx.lineTo(rightRopeX - 4, handY + 72); ctx.lineTo(rightRopeX + 4, handY + 72); ctx.closePath(); ctx.fill();
      ctx.fillText(`F = P/2 = ${forceN.toFixed(1)} N`, rightRopeX + 50, handY + 70);
    }

    // Title HUD
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `PULLEY SIMULATOR: ${pulleyType === 'fixed' ? 'FIXED PULLEY (MA = 1)' : pulleyType === 'movable' ? 'MOVABLE PULLEY (MA = 2)' : 'BLOCK & TACKLE (MA = 2)'}`
        : `MÔ PHỎNG RÒNG RỌC: ${pulleyType === 'fixed' ? 'RÒNG RỌC CỐ ĐỊNH (Lợi 1 lần lực)' : pulleyType === 'movable' ? 'RÒNG RỌC ĐỘNG (Lợi 2 lần lực)' : 'PALĂNG HỆ RÒNG RỌC (Lợi 2 lần lực)'}`,
      width * 0.5,
      22
    );

  }, [pulleyType, massKg, liftHeightM, pullProgress, weightN, forceN, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      pulleyType: pulleyType === 'fixed' ? (isEn ? 'Fixed Pulley' : 'Ròng rọc cố định') : pulleyType === 'movable' ? (isEn ? 'Movable Pulley' : 'Ròng rọc động') : (isEn ? 'Block & Tackle' : 'Palăng Ròng rọc'),
      massKg: `${massKg} kg`,
      weightN: `${weightN.toFixed(1)} N`,
      pullForceN: `${forceN.toFixed(1)} N`,
      mechanicalAdvantage: `${mechanicalAdvantage.toFixed(1)}x`,
      objectHeightM: `${liftHeightM} m`,
      stringDistanceM: `${stringDistM.toFixed(1)} m`,
      workJ: `${workJ.toFixed(1)} J`
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
            onClick={() => setIsPulling(!isPulling)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" />
            {isPulling ? (isEn ? 'Pause Lifting' : 'Tạm Dừng Nâng') : (isEn ? 'Start Lifting Motion' : 'Bắt Đầu Kéo Nâng')}
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
            <Scale className="w-4 h-4" /> {isEn ? 'Pulley System Controls' : 'Khảo sát Ròng Rọc Cố Định & Động'}
          </h3>

          {/* Pulley Type Selection */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Pulley Type:' : 'Loại Ròng rọc:'}</label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => { onParamChange('pulleyType', 'fixed'); handleReset(); }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                  pulleyType === 'fixed'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Fixed' : 'Cố Định'}
              </button>
              <button
                onClick={() => { onParamChange('pulleyType', 'movable'); handleReset(); }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                  pulleyType === 'movable'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Movable' : 'Động'}
              </button>
              <button
                onClick={() => { onParamChange('pulleyType', 'system'); handleReset(); }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                  pulleyType === 'system'
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Palăng' : 'Palăng'}
              </button>
            </div>
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Object Mass m:' : 'Khối lượng vật m:'}</span>
              <span className="text-amber-400 font-bold">{massKg} kg</span>
            </div>
            <input
              type="range" min="1" max="20" step="1"
              value={massKg}
              onChange={(e) => onParamChange('massKg', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Lift Height Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Lift Height h:' : 'Chiều cao nâng h:'}</span>
              <span className="text-cyan-400 font-bold">{liftHeightM.toFixed(1)} m</span>
            </div>
            <input
              type="range" min="0.5" max="4.0" step="0.5"
              value={liftHeightM}
              onChange={(e) => onParamChange('liftHeightM', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'MECHANICAL ADVANTAGE & WORK' : 'Lực Kéo & Công Cơ Học'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Weight P (m·g):' : 'Trọng lượng P:'}</span>
              <span className="text-red-400 font-bold text-sm">{weightN.toFixed(1)} N</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Pull Force F:' : 'Lực kéo F:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{forceN.toFixed(1)} N</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Rope Distance s:' : 'Quãng đường dây s:'}</span>
              <span className="text-amber-400 font-bold text-sm">{stringDistM.toFixed(1)} m</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Work W (F·s):' : 'Công thực hiện W:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{workJ.toFixed(1)} J</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Force Advantage:' : 'Lợi về lực:'}</span>
                <span className="text-slate-400 text-[10px]">MA = P / F</span>
              </div>
              <span className="font-extrabold text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {mechanicalAdvantage === 1
                  ? (isEn ? 'MA = 1 (Direction Only)' : 'Lợi 1 lần (Đổi hướng)')
                  : (isEn ? 'MA = 2 (Half Force)' : 'Lợi 2 lần lực (Giảm 1/2 lực)')}
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Pulley Data' : 'Ghi Bảng Số liệu Ròng Rọc'}
          </button>
        </div>
      </div>
    </div>
  );
}
