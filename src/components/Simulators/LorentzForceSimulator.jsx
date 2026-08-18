import React, { useState, useEffect, useRef } from 'react';
import { Compass, Play, RotateCcw, ShieldCheck, Sliders, Target, Zap, Activity, Layers, Info } from 'lucide-react';

export default function LorentzForceSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Parameters
  const ionType = params.ionType || 'proton'; // 'proton' | 'alpha' | 'electron' | 'c12' | 'c14' | 'u235' | 'u238'
  const comparisonMode = params.comparisonMode || 'single'; // 'single' | 'dual_isotopes'
  const magneticFieldB = params.magneticFieldB !== undefined ? params.magneticFieldB : 1.0; // Tesla (0.2 to 2.5 T)
  const accelVoltageKV = params.accelVoltageKV !== undefined ? params.accelVoltageKV : 5.0; // kV (1 to 20 kV)
  const fieldDirection = params.fieldDirection || 'into'; // 'into' (⊗) | 'out' (⊙)
  const showPhysicsExplanation = params.showPhysicsExplanation !== undefined ? params.showPhysicsExplanation : true;

  const [isRunning, setIsRunning] = useState(true);
  const [animProgress, setAnimProgress] = useState(0);
  const timeRef = useRef(0);

  // Ion Physical Properties: mass (kg), charge (Coulomb), label
  const ionDatabase = {
    proton: { name: isEn ? 'Proton (¹H⁺)' : 'Proton (¹H⁺)', mass: 1.673e-27, q: 1.602e-19, color: '#ef4444', symbol: 'p⁺', pair: 'alpha' },
    alpha: { name: isEn ? 'Alpha Particle (⁴He²⁺)' : 'Hạt Alpha (⁴He²⁺)', mass: 6.644e-27, q: 3.204e-19, color: '#f59e0b', symbol: 'α²⁺', pair: 'proton' },
    electron: { name: isEn ? 'Electron (e⁻)' : 'Electron (e⁻)', mass: 9.109e-31, q: -1.602e-19, color: '#38bdf8', symbol: 'e⁻', pair: 'proton' },
    c12: { name: isEn ? 'Carbon-12 (¹²C⁺)' : 'Cacbon-12 (¹²C⁺)', mass: 1.993e-26, q: 1.602e-19, color: '#10b981', symbol: '¹²C⁺', pair: 'c14' },
    c14: { name: isEn ? 'Carbon-14 (¹⁴C⁺ - Dating)' : 'Cacbon-14 (¹⁴C⁺ - Định tuổi)', mass: 2.325e-26, q: 1.602e-19, color: '#a855f7', symbol: '¹⁴C⁺', pair: 'c12' },
    u235: { name: isEn ? 'Uranium-235 (²³⁵U⁺ - Fissile)' : 'Uranium-235 (²³⁵U⁺ - Phân hạch)', mass: 3.903e-25, q: 1.602e-19, color: '#ec4899', symbol: '²³⁵U⁺', pair: 'u238' },
    u238: { name: isEn ? 'Uranium-238 (²³⁸U⁺)' : 'Uranium-238 (²³⁸U⁺)', mass: 3.953e-25, q: 1.602e-19, color: '#6366f1', symbol: '²³⁸U⁺', pair: 'u235' }
  };

  const selectedIon = ionDatabase[ionType] || ionDatabase.proton;
  const companionIon = ionDatabase[selectedIon.pair] || ionDatabase.c14;

  // Kinetic Energy & Velocity calculation: 0.5 * m * v^2 = |q| * U
  const accelVoltageV = accelVoltageKV * 1000;

  const calculateKinematics = (ion) => {
    const vMs = Math.sqrt((2 * Math.abs(ion.q) * accelVoltageV) / ion.mass);
    const vKmS = vMs / 1000;
    const rM = (ion.mass * vMs) / (Math.abs(ion.q) * magneticFieldB);
    const rCm = rM * 100;
    const diamCm = rCm * 2;
    const periodS = (2 * Math.PI * ion.mass) / (Math.abs(ion.q) * magneticFieldB);
    const freqMHz = (1 / periodS) / 1e6;
    const forceN = Math.abs(ion.q) * vMs * magneticFieldB;
    return { vMs, vKmS, rM, rCm, diamCm, periodS, freqMHz, forceN };
  };

  const ion1Stats = calculateKinematics(selectedIon);
  const ion2Stats = calculateKinematics(companionIon);

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.032;
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

  // Helper to draw clean vector arrowheads
  const drawVector = (ctx, x1, y1, x2, y2, color, label, width = 2.5) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const headLen = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    if (label) {
      ctx.font = 'bold 9px Inter';
      ctx.fillText(label, x2 + 6 * Math.cos(angle), y2 + 6 * Math.sin(angle));
    }
  };

  // 60 FPS Canvas Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Radial Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // -------------------------------------------------------------
    // 1. MAGNETIC DEFLECTION CHAMBER (Right Area: 140 to 515 px)
    // -------------------------------------------------------------
    const chamberX = 145;
    const chamberY = 35;
    const chamberW = width - chamberX - 25;
    const chamberH = height - 70;

    // Chamber Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(chamberX, chamberY, chamberW, chamberH);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(chamberX, chamberY, chamberW, chamberH);

    // Draw Magnetic Field Grid Symbols ⊗ (Into screen) or ⊙ (Out of screen)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    for (let gx = chamberX + 25; gx < chamberX + chamberW; gx += 36) {
      for (let gy = chamberY + 25; gy < chamberY + chamberH; gy += 36) {
        ctx.fillText(fieldDirection === 'into' ? '⊗' : '⊙', gx, gy);
      }
    }

    // Chamber Header Banner
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(
      isEn
        ? `Uniform Magnetic Field: B = ${magneticFieldB} T (${fieldDirection === 'into' ? 'Vector ⊗ into screen' : 'Vector ⊙ out of screen'})`
        : `Từ Trường Đều: B = ${magneticFieldB} T (${fieldDirection === 'into' ? 'Vectơ ⊗ hướng vào trong' : 'Vectơ ⊙ hướng ra ngoài'})`,
      chamberX + 12,
      chamberY + 20
    );

    // -------------------------------------------------------------
    // 2. ION SOURCE & ELECTRIC ACCELERATION TUBE (Left: 20 to 145 px)
    // -------------------------------------------------------------
    const gunX = 22;
    const gunY = 175;
    const gunW = 120;
    const gunH = 55;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(gunX, gunY, gunW, gunH);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(gunX, gunY, gunW, gunH);

    // High-Voltage Anode (+) & Cathode (-) Slits
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(gunX + 18, gunY + 8, 4, 39); // Anode +
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(gunX + gunW - 12, gunY + 8, 4, 16); // Cathode Top Slit -
    ctx.fillRect(gunX + gunW - 12, gunY + 31, 4, 16); // Cathode Bottom Slit -

    // Electric Field Arrows inside Gun E
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)';
    ctx.lineWidth = 1.5;
    for (let ey = gunY + 16; ey < gunY + gunH - 10; ey += 12) {
      drawVector(ctx, gunX + 24, ey, gunX + gunW - 16, ey, 'rgba(253, 224, 71, 0.5)', null, 1.5);
    }

    ctx.font = 'bold 9px Inter';
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.fillText(`U = ${accelVoltageKV} kV (E-Field)`, gunX + gunW / 2, gunY - 6);

    // -------------------------------------------------------------
    // 3. ION TRAJECTORY IN MAGNETIC FIELD (Semicircular Deflection)
    // -------------------------------------------------------------
    const entryX = chamberX;
    const entryY = gunY + gunH / 2;

    // Calibrated Visual Pixel Scale for Orbit:
    // Fits nicely inside the chamber height
    const maxVisualRadiusPx = (chamberH / 2) - 25;
    // Normalized visual scaling based on sqrt(m/q)
    const baseVisualRadiusPx = 105;

    const renderIonBeam = (ion, stats, isPrimary) => {
      // Scale relative to primary
      const radiusRatio = stats.rCm / ion1Stats.rCm;
      const visualRadiusPx = Math.max(35, Math.min(maxVisualRadiusPx, baseVisualRadiusPx * radiusRatio));

      // Right-Hand / Left-Hand Rule Direction
      const isPositive = ion.q > 0;
      const isInto = fieldDirection === 'into';
      // q > 0 and B into => F points UP
      const curvesUp = (isPositive && isInto) || (!isPositive && !isInto);

      const centerY = curvesUp ? entryY - visualRadiusPx : entryY + visualRadiusPx;
      const centerX = entryX;

      // Semicircular Arc Path
      ctx.strokeStyle = ion.color;
      ctx.lineWidth = isPrimary ? 3 : 2;
      ctx.shadowColor = ion.color;
      ctx.shadowBlur = isPrimary ? 8 : 4;
      ctx.beginPath();
      const startAngle = curvesUp ? Math.PI / 2 : -Math.PI / 2;
      const endAngle = curvesUp ? -Math.PI / 2 : Math.PI / 2;
      ctx.arc(centerX, centerY, visualRadiusPx, startAngle, endAngle, curvesUp);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Photographic Detector Screen at Impact Point (2R)
      const detectorY = curvesUp ? centerY - visualRadiusPx : centerY + visualRadiusPx;
      ctx.fillStyle = ion.color;
      ctx.shadowColor = ion.color;
      ctx.shadowBlur = 12;
      ctx.fillRect(centerX - 4, detectorY - 6, 8, 12);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - 4, detectorY - 6, 8, 12);

      // Label at Impact Spot
      ctx.font = 'bold 9px Inter';
      ctx.fillStyle = ion.color;
      ctx.textAlign = 'left';
      ctx.fillText(
        `${ion.name.split(' ')[0]}: 2R = ${stats.diamCm.toFixed(2)} cm`,
        centerX + 12,
        detectorY + 3
      );

      // Moving Particle
      const angleProgress = (animProgress * (2.2 * (ion1Stats.vKmS / stats.vKmS))) % Math.PI;
      const currentAngle = curvesUp ? (Math.PI / 2 - angleProgress) : (-Math.PI / 2 + angleProgress);

      const px = centerX + visualRadiusPx * Math.cos(currentAngle);
      const py = centerY + visualRadiusPx * Math.sin(currentAngle);

      // Particle Core
      ctx.fillStyle = ion.color;
      ctx.shadowColor = ion.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(ion.symbol, px, py + 3);

      // Draw Vector Triad at the primary particle (Velocity v & Lorentz Force F_L)
      if (isPrimary) {
        // Tangential Velocity v
        const vAngle = curvesUp ? (currentAngle - Math.PI / 2) : (currentAngle + Math.PI / 2);
        const vLen = 32;
        drawVector(ctx, px, py, px + vLen * Math.cos(vAngle), py + vLen * Math.sin(vAngle), '#10b981', 'v');

        // Centripetal Lorentz Force F_L (Points to center of circle)
        const fAngle = Math.atan2(centerY - py, centerX - px);
        const fLen = 35;
        drawVector(ctx, px, py, px + fLen * Math.cos(fAngle), py + fLen * Math.sin(fAngle), '#ec4899', 'F_L');
      }
    };

    // Render Primary Ion
    renderIonBeam(selectedIon, ion1Stats, true);

    // Render Companion Isotope in Dual Comparison Mode
    if (comparisonMode === 'dual_isotopes') {
      renderIonBeam(companionIon, ion2Stats, false);
    }

    // -------------------------------------------------------------
    // 4. DETECTOR RULER ON SCREEN EDGE (Left border of chamber)
    // -------------------------------------------------------------
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chamberX, chamberY);
    ctx.lineTo(chamberX, chamberY + chamberH);
    ctx.stroke();

    // Metric Tick Marks along detector
    for (let ty = chamberY + 10; ty < chamberY + chamberH; ty += 15) {
      ctx.beginPath();
      ctx.moveTo(chamberX - 4, ty);
      ctx.lineTo(chamberX + 4, ty);
      ctx.stroke();
    }

    // -------------------------------------------------------------
    // 5. 3-STAGE PHYSICS BREAKDOWN CARD (Top-Right inside Canvas)
    // -------------------------------------------------------------
    if (showPhysicsExplanation) {
      const cardX = chamberX + chamberW - 195;
      const cardY = chamberY + 32;
      const cardW = 185;
      const cardH = 135;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cardX, cardY, cardW, cardH);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(isEn ? '🔬 3 PHYSICAL PHENOMENA:' : '🔬 3 GIAI ĐOẠN VẬT LÝ:', cardX + 8, cardY + 16);

      ctx.fillStyle = '#fde047';
      ctx.font = '8px Inter';
      ctx.fillText(isEn ? '1. E-Field Acceleration:' : '1. Gia tốc điện trường:', cardX + 8, cardY + 34);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('   ½mv² = qU => v = √(2qU/m)', cardX + 8, cardY + 47);

      ctx.fillStyle = '#ec4899';
      ctx.fillText(isEn ? '2. Lorentz Centripetal Deflection:' : '2. Lực từ Lorentz hướng tâm:', cardX + 8, cardY + 65);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('   qvB = mv²/R => R = mv/(qB)', cardX + 8, cardY + 78);

      ctx.fillStyle = '#10b981';
      ctx.fillText(isEn ? '3. Isotope Mass Separation:' : '3. Phân tách đồng vị:', cardX + 8, cardY + 96);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('   R = (1/B)·√(2mU/q) => R ∝ √m', cardX + 8, cardY + 109);
      ctx.fillText(
        isEn ? `   Δ(2R) = ${Math.abs(ion1Stats.diamCm - ion2Stats.diamCm).toFixed(2)} cm` : `   Độ tách Δ(2R) = ${Math.abs(ion1Stats.diamCm - ion2Stats.diamCm).toFixed(2)} cm`,
        cardX + 8,
        cardY + 124
      );
    }

  }, [animProgress, ionType, comparisonMode, magneticFieldB, accelVoltageKV, fieldDirection, showPhysicsExplanation, isEn]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        Ion: selectedIon.name,
        B_Tesla: `${magneticFieldB} T`,
        U_kV: `${accelVoltageKV} kV`,
        Velocity_km_s: `${ion1Stats.vKmS.toFixed(1)} km/s`,
        Radius_cm: `${ion1Stats.rCm.toFixed(2)} cm`,
        Diameter_2R_cm: `${ion1Stats.diamCm.toFixed(2)} cm`,
        Freq_MHz: `${ion1Stats.freqMHz.toFixed(2)} MHz`,
        Force_pN: `${(ion1Stats.forceN * 1e12).toFixed(2)} pN`
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
            {isRunning ? (isEn ? 'Pause Trajectory' : 'Tạm Dừng Chùm Tia') : (isEn ? 'Launch Ion Beam' : 'Bắn Chùm Ion')}
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
            <Compass className="w-4 h-4" /> {isEn ? 'Mass Spectrometry Controls' : 'Khối Phổ Kế & Lực Lorentz'}
          </h3>

          {/* Mode Selector: Single vs Dual Isotope Comparison */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? '🎯 Experiment Mode:' : '🎯 Chế Độ Thí Nghiệm:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onParamChange('comparisonMode', 'single')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  comparisonMode === 'single' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🔬 {isEn ? 'Single Ion Beam' : '1 Hạt Đơn Lẻ'}
              </button>
              <button
                onClick={() => onParamChange('comparisonMode', 'dual_isotopes')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  comparisonMode === 'dual_isotopes' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🧬 {isEn ? 'Compare Isotopes' : 'Tách 2 Đồng Vị'}
              </button>
            </div>
          </div>

          {/* Ion Particle Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? 'Select Ion / Isotope:' : 'Chọn Loại Hạt / Đồng Vị:'}
            </label>
            <select
              value={ionType}
              onChange={(e) => onParamChange('ionType', e.target.value)}
              className="w-full bg-slate-950 text-cyan-300 font-bold text-xs p-2 rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
            >
              <option value="proton">Proton (¹H⁺)</option>
              <option value="alpha">Alpha (⁴He²⁺)</option>
              <option value="electron">Electron (e⁻)</option>
              <option value="c12">Carbon-12 (¹²C⁺) [Tách với ¹⁴C⁺]</option>
              <option value="c14">Carbon-14 (¹⁴C⁺ - Định tuổi C14)</option>
              <option value="u235">Uranium-235 (²³⁵U⁺) [Làm giàu U-235]</option>
              <option value="u238">Uranium-238 (²³⁸U⁺)</option>
            </select>
          </div>

          {/* Magnetic Field B Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Magnetic Field B:' : 'Cảm ứng từ B:'}</span>
              <span className="text-cyan-400 font-bold">{magneticFieldB} Tesla</span>
            </div>
            <input
              type="range" min="0.2" max="2.0" step="0.1"
              value={magneticFieldB}
              onChange={(e) => onParamChange('magneticFieldB', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Accelerating Voltage U Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Accelerating Voltage U:' : 'Điện áp gia tốc U:'}</span>
              <span className="text-amber-400 font-bold">{accelVoltageKV} kV</span>
            </div>
            <input
              type="range" min="1.0" max="15.0" step="0.5"
              value={accelVoltageKV}
              onChange={(e) => onParamChange('accelVoltageKV', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Magnetic Field Vector Direction */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">{isEn ? 'B-Field Vector Direction:' : 'Chiều Vectơ B:'}</span>
            <div className="flex gap-1">
              <button
                onClick={() => onParamChange('fieldDirection', 'into')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  fieldDirection === 'into' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ⊗ {isEn ? 'Into' : 'Vào trong'}
              </button>
              <button
                onClick={() => onParamChange('fieldDirection', 'out')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  fieldDirection === 'out' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ⊙ {isEn ? 'Out' : 'Ra ngoài'}
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Measured Physics Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'MASS SPECTROMETRY DATA' : 'Bán Kính Quỹ Đạo & Tách Đồng Vị'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Speed v:' : 'Tốc độ hạt v:'}</span>
              <span className="text-amber-400 font-bold text-sm">{ion1Stats.vKmS.toFixed(1)} km/s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Orbit Radius R:' : 'Bán kính R = mv/qB:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{ion1Stats.rCm.toFixed(2)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Separation (2R):' : 'Khoảng cách đập (2R):'}</span>
              <span className="text-pink-400 font-bold text-sm">{ion1Stats.diamCm.toFixed(2)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Cyclotron Freq f:' : 'Tần số Cyclotron f:'}</span>
              <span className="text-purple-400 font-bold text-sm">{ion1Stats.freqMHz.toFixed(2)} MHz</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Spectrometry Data' : 'Ghi Bảng Số Liệu Khối Phổ Kế'}
          </button>
        </div>
      </div>
    </div>
  );
}
