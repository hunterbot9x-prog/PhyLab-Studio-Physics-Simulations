import React, { useState, useEffect, useRef } from 'react';
import { Compass, Play, RotateCcw, ShieldCheck, Sliders, Target, Zap, Activity } from 'lucide-react';

export default function LorentzForceSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Parameters
  const ionType = params.ionType || 'proton'; // 'proton' | 'alpha' | 'electron' | 'c12' | 'c14' | 'u235' | 'u238'
  const magneticFieldB = params.magneticFieldB !== undefined ? params.magneticFieldB : 0.8; // Tesla (0.1 to 2.5 T)
  const accelVoltageKV = params.accelVoltageKV !== undefined ? params.accelVoltageKV : 5.0; // kV (1 to 20 kV)
  const fieldDirection = params.fieldDirection || 'into'; // 'into' (⊗) | 'out' (⊙)

  const [isRunning, setIsRunning] = useState(true);
  const [animProgress, setAnimProgress] = useState(0);
  const timeRef = useRef(0);

  // Ion Physical Properties: mass (kg), charge (Coulomb), label
  const ionDatabase = {
    proton: { name: isEn ? 'Proton (¹H⁺)' : 'Proton (¹H⁺)', mass: 1.673e-27, q: 1.602e-19, color: '#ef4444', symbol: 'p⁺' },
    alpha: { name: isEn ? 'Alpha Particle (⁴He²⁺)' : 'Hạt Alpha (⁴He²⁺)', mass: 6.644e-27, q: 3.204e-19, color: '#f59e0b', symbol: 'α²⁺' },
    electron: { name: isEn ? 'Electron (e⁻)' : 'Electron (e⁻)', mass: 9.109e-31, q: -1.602e-19, color: '#38bdf8', symbol: 'e⁻' },
    c12: { name: isEn ? 'Carbon-12 (¹²C⁺)' : 'Đồng vị Cacbon-12 (¹²C⁺)', mass: 1.993e-26, q: 1.602e-19, color: '#10b981', symbol: '¹²C⁺' },
    c14: { name: isEn ? 'Carbon-14 (¹⁴C⁺)' : 'Đồng vị Cacbon-14 (¹⁴C⁺)', mass: 2.325e-26, q: 1.602e-19, color: '#a855f7', symbol: '¹⁴C⁺' },
    u235: { name: isEn ? 'Uranium-235 (²³⁵U⁺)' : 'Uranium-235 (²³⁵U⁺)', mass: 3.903e-25, q: 1.602e-19, color: '#ec4899', symbol: '²³⁵U⁺' },
    u238: { name: isEn ? 'Uranium-238 (²³⁸U⁺)' : 'Uranium-238 (²³⁸U⁺)', mass: 3.953e-25, q: 1.602e-19, color: '#6366f1', symbol: '²³⁸U⁺' }
  };

  const selectedIon = ionDatabase[ionType] || ionDatabase.proton;

  // Kinetic Energy from Accelerating Voltage: 0.5 * m * v^2 = |q| * U
  const accelVoltageV = accelVoltageKV * 1000;
  const ionVelocityMs = Math.sqrt((2 * Math.abs(selectedIon.q) * accelVoltageV) / selectedIon.mass);
  const ionVelocityKmS = ionVelocityMs / 1000;

  // Orbit Radius in Magnetic Field: R = (m * v) / (|q| * B)
  const orbitRadiusM = (selectedIon.mass * ionVelocityMs) / (Math.abs(selectedIon.q) * magneticFieldB);
  const orbitRadiusCm = orbitRadiusM * 100;
  const detectorDiameterCm = orbitRadiusCm * 2;

  // Cyclotron Period & Frequency: T = (2π * m) / (|q| * B)
  const cyclotronPeriodS = (2 * Math.PI * selectedIon.mass) / (Math.abs(selectedIon.q) * magneticFieldB);
  const cyclotronFreqMHz = (1 / cyclotronPeriodS) / 1e6;

  // Lorentz Force magnitude: F_L = |q| * v * B
  const lorentzForceN = Math.abs(selectedIon.q) * ionVelocityMs * magneticFieldB;

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.035;
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

    // Magnetic Chamber Boundary
    const chamberX = 140;
    const chamberY = 30;
    const chamberW = width - 160;
    const chamberH = height - 60;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(chamberX, chamberY, chamberW, chamberH);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(chamberX, chamberY, chamberW, chamberH);

    // Draw Magnetic Field Grid Symbols ⊗ (Into screen) or ⊙ (Out of screen)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    for (let gx = chamberX + 25; gx < chamberX + chamberW; gx += 35) {
      for (let gy = chamberY + 25; gy < chamberY + chamberH; gy += 35) {
        ctx.fillText(fieldDirection === 'into' ? '⊗' : '⊙', gx, gy);
      }
    }

    // Chamber Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`Uniform B-Field: B = ${magneticFieldB} T (${fieldDirection === 'into' ? 'Into screen' : 'Out of screen'})`, chamberX + 12, chamberY + 20);

    // -------------------------------------------------------------
    // ION INJECTOR GUN & ACCELERATING PLATES (Left)
    // -------------------------------------------------------------
    const gunX = 40;
    const gunY = 170;
    const gunW = 80;
    const gunH = 50;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(gunX, gunY, gunW, gunH);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(gunX, gunY, gunW, gunH);

    // Accelerating High Voltage Anode/Cathode Slits
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(gunX + gunW - 12, gunY + 5, 4, 18);
    ctx.fillRect(gunX + gunW - 12, gunY + 27, 4, 18);

    ctx.font = 'bold 9px Inter';
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'center';
    ctx.fillText(`U = ${accelVoltageKV} kV`, gunX + gunW / 2 - 5, gunY + 28);

    // -------------------------------------------------------------
    // CIRCULAR ORBIT TRAJECTORY IN MAGNETIC FIELD
    // -------------------------------------------------------------
    const entryX = chamberX;
    const entryY = gunY + gunH / 2;

    // Visual scale: map orbitRadiusCm to canvas pixels
    const maxRadiusPx = (chamberH / 2) - 30;
    // Scale factor so typical R (5 to 40 cm) fits comfortably
    const scalePxPerCm = Math.min(6.5, maxRadiusPx / Math.max(1, orbitRadiusCm));
    const visualRadiusPx = Math.max(25, Math.min(maxRadiusPx, orbitRadiusCm * scalePxPerCm));

    // Direction of curvature based on sign(q) and fieldDirection
    const isChargePositive = selectedIon.q > 0;
    const isFieldInto = fieldDirection === 'into';
    // By Right-Hand Rule: If q > 0 and B into screen, F curves UP (+y in math, -y in canvas)
    const curveUp = (isChargePositive && isFieldInto) || (!isChargePositive && !isFieldInto);

    const centerY = curveUp ? entryY - visualRadiusPx : entryY + visualRadiusPx;
    const centerX = entryX;

    // Draw Semicircular Detection Arc
    ctx.strokeStyle = selectedIon.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = selectedIon.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();

    const startAngle = curveUp ? Math.PI / 2 : -Math.PI / 2;
    const endAngle = curveUp ? -Math.PI / 2 : Math.PI / 2;
    ctx.arc(centerX, centerY, visualRadiusPx, startAngle, endAngle, curveUp);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Detector Impact Screen
    const detectorY = curveUp ? centerY - visualRadiusPx : centerY + visualRadiusPx;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - 4, detectorY - 6, 8, 12);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX - 4, detectorY - 6, 8, 12);

    // -------------------------------------------------------------
    // ANIMATED TRAVELING ION PARTICLE
    // -------------------------------------------------------------
    const currentAngleProgress = (animProgress * 2.2) % Math.PI;
    const currentParticleAngle = curveUp
      ? (Math.PI / 2 - currentAngleProgress)
      : (-Math.PI / 2 + currentAngleProgress);

    const ionX = centerX + visualRadiusPx * Math.cos(currentParticleAngle);
    const ionY = centerY + visualRadiusPx * Math.sin(currentParticleAngle);

    ctx.fillStyle = selectedIon.color;
    ctx.shadowColor = selectedIon.color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(ionX, ionY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(selectedIon.symbol, ionX, ionY + 3);

    // Draw Centripetal Lorentz Force Vector F_L (Radial towards center)
    const forceAngle = Math.atan2(centerY - ionY, centerX - ionX);
    const forceLen = 28;
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ionX, ionY);
    ctx.lineTo(ionX + forceLen * Math.cos(forceAngle), ionY + forceLen * Math.sin(forceAngle));
    ctx.stroke();
    ctx.fillStyle = '#ec4899';
    ctx.fillText('F_L', ionX + (forceLen + 8) * Math.cos(forceAngle), ionY + (forceLen + 8) * Math.sin(forceAngle));

    // Distance Label: 2R Diameter on Detector
    ctx.font = 'bold 10px Inter';
    ctx.fillStyle = '#fde047';
    ctx.textAlign = 'left';
    ctx.fillText(`2R = ${detectorDiameterCm.toFixed(2)} cm (Impact point)`, centerX + 12, detectorY + 4);

  }, [animProgress, ionType, magneticFieldB, accelVoltageKV, fieldDirection]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        Ion: selectedIon.name,
        B_Tesla: `${magneticFieldB} T`,
        U_kV: `${accelVoltageKV} kV`,
        Velocity_km_s: `${ionVelocityKmS.toFixed(1)} km/s`,
        Radius_cm: `${orbitRadiusCm.toFixed(2)} cm`,
        Diameter_2R_cm: `${detectorDiameterCm.toFixed(2)} cm`,
        Freq_MHz: `${cyclotronFreqMHz.toFixed(2)} MHz`,
        Force_pN: `${(lorentzForceN * 1e12).toFixed(2)} pN`
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
            {isRunning ? (isEn ? 'Pause Trajectory' : 'Tạm Dừng Chuyển Động') : (isEn ? 'Start Trajectory' : 'Bắn Hạt Điện Tích')}
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

          {/* Ion Particle Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? '🔬 Select Isotope / Charged Ion:' : '🔬 Chọn Loại Hạt / Đồng Vị:'}
            </label>
            <select
              value={ionType}
              onChange={(e) => onParamChange('ionType', e.target.value)}
              className="w-full bg-slate-950 text-cyan-300 font-bold text-xs p-2 rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
            >
              <option value="proton">Proton (¹H⁺)</option>
              <option value="alpha">Alpha (⁴He²⁺)</option>
              <option value="electron">Electron (e⁻)</option>
              <option value="c12">Carbon-12 (¹²C⁺)</option>
              <option value="c14">Carbon-14 (¹⁴C⁺ - Dating)</option>
              <option value="u235">Uranium-235 (²³⁵U⁺ - Fissile)</option>
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
            <span className="text-slate-400 font-semibold">{isEn ? 'B-Field Vector Direction:' : 'Chiều Vectơ Từ Trường B:'}</span>
            <div className="flex gap-1">
              <button
                onClick={() => onParamChange('fieldDirection', 'into')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  fieldDirection === 'into' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ⊗ {isEn ? 'Into' : 'Vào'}
              </button>
              <button
                onClick={() => onParamChange('fieldDirection', 'out')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  fieldDirection === 'out' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ⊙ {isEn ? 'Out' : 'Ra'}
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
              <span className="text-amber-400 font-bold text-sm">{ionVelocityKmS.toFixed(1)} km/s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Orbit Radius R:' : 'Bán kính R = mv/qB:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{orbitRadiusCm.toFixed(2)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Separation (2R):' : 'Khoảng cách đập (2R):'}</span>
              <span className="text-pink-400 font-bold text-sm">{detectorDiameterCm.toFixed(2)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Cyclotron Freq f:' : 'Tần số Cyclotron f:'}</span>
              <span className="text-purple-400 font-bold text-sm">{cyclotronFreqMHz.toFixed(2)} MHz</span>
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
