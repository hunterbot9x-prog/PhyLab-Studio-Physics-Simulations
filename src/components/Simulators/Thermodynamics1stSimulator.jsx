import React, { useState, useEffect, useRef } from 'react';
import { Flame, Play, RotateCcw, ShieldCheck, Sliders, Activity, Thermometer, Wind } from 'lucide-react';

export default function Thermodynamics1stSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Parameters
  const processType = params.processType || 'isothermal'; // 'isothermal' | 'isobaric' | 'isochoric' | 'adiabatic'
  const gasMoles = params.gasMoles !== undefined ? params.gasMoles : 1.0; // mol
  const heatAddedJoules = params.heatAddedJoules !== undefined ? params.heatAddedJoules : 150.0; // J (-300 to +300 J)
  const initialTempK = params.initialTempK !== undefined ? params.initialTempK : 300.0; // K (200 to 500 K)
  const compressionRatio = params.compressionRatio !== undefined ? params.compressionRatio : 1.5; // V1/V2 (0.5 to 2.5)

  const [animProgress, setAnimProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timeRef = useRef(0);

  // Physical Constants for Ideal Monatomic Gas (He, Ar)
  const R_GasConstant = 8.314; // J/(mol*K)
  const Cv = 1.5 * R_GasConstant; // J/(mol*K) for monatomic
  const Cp = 2.5 * R_GasConstant; // J/(mol*K)
  const gamma = Cp / Cv; // 1.667

  // Thermodynamic Calculations based on Process Type
  let workDoneA = 0; // Work received by gas A (A > 0 if compressed, A < 0 if expanded)
  let heatQ = heatAddedJoules; // Heat received Q (Q > 0 if heated, Q < 0 if cooled)
  let deltaU = 0; // ΔU = A + Q
  let finalTempK = initialTempK;
  let pressureKPa = 101.3; // Initial 1 atm

  if (processType === 'isothermal') {
    // Isothermal (T = const => ΔU = 0 => Q = -A)
    finalTempK = initialTempK;
    deltaU = 0;
    // A = -nRT * ln(V2/V1) = nRT * ln(V1/V2)
    workDoneA = gasMoles * R_GasConstant * initialTempK * Math.log(compressionRatio);
    heatQ = -workDoneA; // Heat absorbed or released to maintain const T
  } else if (processType === 'isochoric') {
    // Isochoric (V = const => A = 0 => ΔU = Q)
    workDoneA = 0;
    heatQ = heatAddedJoules;
    deltaU = heatQ;
    const deltaT = deltaU / (gasMoles * Cv);
    finalTempK = Math.max(50, initialTempK + deltaT);
  } else if (processType === 'isobaric') {
    // Isobaric (P = const => A = -P*ΔV = -nR*ΔT)
    heatQ = heatAddedJoules;
    const deltaT = heatQ / (gasMoles * Cp);
    finalTempK = Math.max(50, initialTempK + deltaT);
    deltaU = gasMoles * Cv * deltaT;
    workDoneA = -gasMoles * R_GasConstant * deltaT;
  } else if (processType === 'adiabatic') {
    // Adiabatic (Q = 0 => ΔU = A)
    heatQ = 0;
    // T2 = T1 * (V1/V2)^(gamma - 1)
    finalTempK = initialTempK * Math.pow(compressionRatio, gamma - 1);
    const deltaT = finalTempK - initialTempK;
    deltaU = gasMoles * Cv * deltaT;
    workDoneA = deltaU;
  }

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.03;
        setAnimProgress(timeRef.current);
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, animProgress]);

  const handleReset = () => {
    setIsRunning(true);
    setAnimProgress(0);
    timeRef.current = 0;
  };

  // 60 FPS Canvas Physics Renderer
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
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // -------------------------------------------------------------
    // 1. GAS CYLINDER & MOVABLE PISTON (Left: 40 to 240 px)
    // -------------------------------------------------------------
    const cylX = 50;
    const cylY = 60;
    const cylW = 160;
    const cylH = 260;

    // Piston Position based on compression ratio and animation
    const basePistonY = cylY + 110;
    const pistonDisplacement = (compressionRatio - 1.0) * 45;
    const pistonY = Math.max(cylY + 30, Math.min(cylY + cylH - 40, basePistonY - pistonDisplacement));

    // Gas Chamber Fill (Glows hotter orange/red with higher Temp, blue with cooler)
    const tempRatio = Math.min(1, Math.max(0, (finalTempK - 200) / 300));
    const gasFillGrad = ctx.createLinearGradient(cylX, pistonY, cylX, cylY + cylH);
    gasFillGrad.addColorStop(0, `rgba(${Math.floor(56 + tempRatio * 200)}, ${Math.floor(189 - tempRatio * 100)}, ${Math.floor(248 - tempRatio * 180)}, 0.4)`);
    gasFillGrad.addColorStop(1, `rgba(${Math.floor(56 + tempRatio * 200)}, ${Math.floor(189 - tempRatio * 100)}, ${Math.floor(248 - tempRatio * 180)}, 0.15)`);

    ctx.fillStyle = gasFillGrad;
    ctx.fillRect(cylX + 6, pistonY + 12, cylW - 12, (cylY + cylH) - (pistonY + 12));

    // Cylinder Outer Wall
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 6;
    ctx.strokeRect(cylX, cylY, cylW, cylH);

    // Movable Piston Head
    ctx.fillStyle = '#334155';
    ctx.fillRect(cylX + 4, pistonY, cylW - 8, 14);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(cylX + 4, pistonY, cylW - 8, 14);

    // Piston Rod
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cylX + cylW / 2 - 6, cylY - 20, 12, pistonY - (cylY - 20));

    // Gas Molecules Kinetic Particles
    const numMolecules = 22;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 4;
    const gasHeight = (cylY + cylH) - (pistonY + 14);

    for (let m = 0; m < numMolecules; m++) {
      const speedFactor = Math.sqrt(finalTempK / 300);
      const mx = cylX + 15 + ((m * 19 + animProgress * 80 * speedFactor) % (cylW - 30));
      const my = pistonY + 18 + ((m * 31 + animProgress * 65 * speedFactor) % (gasHeight - 12));
      ctx.beginPath();
      ctx.arc(mx, my, 2.5, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Heat Burner / Flame at Bottom of Cylinder
    if (heatQ > 10) {
      ctx.fillStyle = '#f97316';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 15;
      for (let f = 0; f < 5; f++) {
        const fx = cylX + 25 + f * 26;
        const fy = cylY + cylH + 12;
        ctx.beginPath();
        ctx.arc(fx, fy + Math.sin(animProgress * 10 + f) * 3, 7, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.font = 'bold 10px Inter';
      ctx.fillStyle = '#fb923c';
      ctx.textAlign = 'center';
      ctx.fillText(`+Q = ${heatQ.toFixed(0)} J (Heating)`, cylX + cylW / 2, cylY + cylH + 34);
    } else if (heatQ < -10) {
      ctx.font = 'bold 10px Inter';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(`-Q = ${Math.abs(heatQ).toFixed(0)} J (Cooling)`, cylX + cylW / 2, cylY + cylH + 34);
    }

    // -------------------------------------------------------------
    // 2. PRESSURE - VOLUME (P - V) INDICATOR DIAGRAM (Right: 280 to 500 px)
    // -------------------------------------------------------------
    const pvX = 280;
    const pvY = 60;
    const pvW = width - pvX - 35;
    const pvH = 170;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(pvX, pvY, pvW, pvH);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pvX, pvY, pvW, pvH);

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pvX + 25, pvY + pvH - 20); ctx.lineTo(pvX + pvW - 10, pvY + pvH - 20); // V Axis
    ctx.moveTo(pvX + 25, pvY + pvH - 20); ctx.lineTo(pvX + 25, pvY + 15);           // P Axis
    ctx.stroke();

    ctx.font = 'bold 10px Inter';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText('P (kPa)', pvX + 10, pvY + 12);
    ctx.textAlign = 'right';
    ctx.fillText('V (L)', pvX + pvW - 10, pvY + pvH - 6);

    // Draw P-V Process Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    ctx.beginPath();

    const curvePoints = 60;
    for (let c = 0; c <= curvePoints; c++) {
      const tNorm = c / curvePoints;
      const px = pvX + 35 + tNorm * (pvW - 60);
      let py = pvY + pvH - 45;

      if (processType === 'isothermal' || processType === 'adiabatic') {
        // Hyperbolic curve P = const / V
        const expCurve = processType === 'adiabatic' ? 1.4 : 1.0;
        py = pvY + 30 + Math.pow(tNorm, expCurve) * (pvH - 75);
      } else if (processType === 'isobaric') {
        // Horizontal line P = const
        py = pvY + 70;
      } else if (processType === 'isochoric') {
        // Vertical line V = const
        py = pvY + 30 + tNorm * (pvH - 65);
      }

      if (c === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Process State Name Banner
    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    const processLabels = {
      isothermal: isEn ? 'Isothermal Process (T = const, ΔU = 0)' : 'Quá Trình Đẳng Nhiệt (T = const, ΔU = 0)',
      isobaric: isEn ? 'Isobaric Process (P = const, A = -P·ΔV)' : 'Quá Trình Đẳng Áp (P = const, A = -P·ΔV)',
      isochoric: isEn ? 'Isochoric Process (V = const, A = 0)' : 'Quá Trình Đẳng Tích (V = const, A = 0)',
      adiabatic: isEn ? 'Adiabatic Process (Q = 0, ΔU = A)' : 'Quá Trình Đoạn Nhiệt (Q = 0, ΔU = A)'
    };
    ctx.fillText(processLabels[processType], pvX + pvW / 2, pvY + pvH + 20);

  }, [animProgress, processType, gasMoles, heatAddedJoules, initialTempK, compressionRatio, finalTempK, heatQ]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        Process: processType,
        Initial_Temp_K: `${initialTempK.toFixed(1)} K`,
        Final_Temp_K: `${finalTempK.toFixed(1)} K`,
        Heat_Q_J: `${heatQ.toFixed(1)} J`,
        Work_A_J: `${workDoneA.toFixed(1)} J`,
        Delta_U_J: `${deltaU.toFixed(1)} J`
      });
    }
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={405}
          className="w-full max-w-[540px] h-[405px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Playback Controls */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" />
            {isRunning ? (isEn ? 'Pause Cycle' : 'Tạm Dừng Mô Phỏng') : (isEn ? 'Run Cycle' : 'Chạy Quá Trình')}
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
          <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4" /> {isEn ? '1st Law Thermodynamic Controls' : 'Điều Khiển Nhiệt Động Lực Học'}
          </h3>

          {/* Process Type Selection */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? '⚙️ Select Thermodynamic Process:' : '⚙️ Chọn Quá Trình Biến Đổi Khí:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => onParamChange('processType', 'isothermal')}
                className={`p-1.5 rounded-lg font-bold transition-all ${
                  processType === 'isothermal' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🌡️ {isEn ? 'Isothermal (T)' : 'Đẳng Nhiệt (T)'}
              </button>
              <button
                onClick={() => onParamChange('processType', 'isobaric')}
                className={`p-1.5 rounded-lg font-bold transition-all ${
                  processType === 'isobaric' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ⚖️ {isEn ? 'Isobaric (P)' : 'Đẳng Áp (P)'}
              </button>
              <button
                onClick={() => onParamChange('processType', 'isochoric')}
                className={`p-1.5 rounded-lg font-bold transition-all ${
                  processType === 'isochoric' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🔒 {isEn ? 'Isochoric (V)' : 'Đẳng Tích (V)'}
              </button>
              <button
                onClick={() => onParamChange('processType', 'adiabatic')}
                className={`p-1.5 rounded-lg font-bold transition-all ${
                  processType === 'adiabatic' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🛡️ {isEn ? 'Adiabatic (Q=0)' : 'Đoạn Nhiệt (Q=0)'}
              </button>
            </div>
          </div>

          {/* Heat Q Slider */}
          {processType !== 'adiabatic' && (
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{isEn ? 'Heat Added Q:' : 'Nhiệt lượng truyền Q:'}</span>
                <span className="text-orange-400 font-bold">{heatAddedJoules} J</span>
              </div>
              <input
                type="range" min="-200" max="300" step="10"
                value={heatAddedJoules}
                onChange={(e) => onParamChange('heatAddedJoules', Number(e.target.value))}
                className="w-full accent-orange-400 h-2 bg-slate-700 rounded-lg"
              />
            </div>
          )}

          {/* Compression Ratio Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Compression Ratio (V1/V2):' : 'Tỉ số nén thể tích (V1/V2):'}</span>
              <span className="text-cyan-400 font-bold">{compressionRatio.toFixed(1)}x</span>
            </div>
            <input
              type="range" min="0.6" max="2.2" step="0.1"
              value={compressionRatio}
              onChange={(e) => onParamChange('compressionRatio', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Initial Temp T1 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Initial Temperature T1:' : 'Nhiệt độ ban đầu T1:'}</span>
              <span className="text-amber-400 font-bold">{initialTempK} K</span>
            </div>
            <input
              type="range" min="200" max="450" step="10"
              value={initialTempK}
              onChange={(e) => onParamChange('initialTempK', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Physics Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? '1ST LAW ENERGY BALANCE (ΔU = A + Q)' : 'Cân Bằng Năng Lượng (ΔU = A + Q)'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Heat Energy Q:' : 'Nhiệt lượng Q:'}</span>
              <span className="text-orange-400 font-bold text-sm">{heatQ.toFixed(1)} J</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Work Done A:' : 'Công nhận được A:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{workDoneA.toFixed(1)} J</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Internal Energy Change ΔU:' : 'Độ biến thiên nội năng ΔU:'}</span>
                <span className="text-slate-400 text-[10px]">ΔU = A + Q (Final Temp: {finalTempK.toFixed(1)} K)</span>
              </div>
              <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {deltaU >= 0 ? `+${deltaU.toFixed(1)} J` : `${deltaU.toFixed(1)} J`}
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Thermodynamic Data' : 'Ghi Bảng Số Liệu Nhiệt Động Lực Học'}
          </button>
        </div>
      </div>
    </div>
  );
}
