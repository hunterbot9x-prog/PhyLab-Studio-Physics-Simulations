import React, { useState, useEffect, useRef } from 'react';
import { Radio, Play, RotateCcw, Zap, Activity, ShieldCheck, Sparkles, Sliders, BatteryCharging, Gauge } from 'lucide-react';

export default function LCOscillatorSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Parameters
  const switchState = params.switchState || 'oscillate'; // 'charge' | 'oscillate'
  const inductancemH = params.inductancemH !== undefined ? params.inductancemH : 5.0; // L in mH (0.5 to 50 mH)
  const capacitanceuF = params.capacitanceuF !== undefined ? params.capacitanceuF : 2.0; // C in µF (0.1 to 20 µF)
  const initialVoltage = params.initialVoltage !== undefined ? params.initialVoltage : 12.0; // U0 in Volts (3 to 24 V)
  const resistanceOhm = params.resistanceOhm !== undefined ? params.resistanceOhm : 0.0; // R damping (0 to 20 Ohm)

  const [isRunning, setIsRunning] = useState(true);
  const [animProgress, setAnimProgress] = useState(0);
  const timeRef = useRef(0);

  // SI Units Physics Calculations
  const L_Henry = inductancemH * 1e-3; // H
  const C_Farad = capacitanceuF * 1e-6; // F
  const U0_Volt = initialVoltage; // V
  const R_Ohm = resistanceOhm; // Ω

  // Resonant Angular Frequency ω0 = 1 / √(L*C)
  const omega0 = 1 / Math.sqrt(L_Henry * C_Farad); // rad/s
  const freqHz = omega0 / (2 * Math.PI); // Hz
  const periodSec = 1 / freqHz; // s
  const periodMicroSec = periodSec * 1e6; // µs
  const freqKhz = freqHz / 1e3; // kHz

  // Peak Charge Q0 = C * U0 (Coulombs & µC)
  const Q0_Coulomb = C_Farad * U0_Volt;
  const Q0_uC = Q0_Coulomb * 1e6;

  // Peak Current I0 = ω0 * Q0 = U0 * √(C/L) (Amperes & mA)
  const I0_Ampere = omega0 * Q0_Coulomb;
  const I0_mA = I0_Ampere * 1e3;

  // Total Electromagnetic Energy W = 0.5 * C * U0^2 = 0.5 * L * I0^2 (Joules & mJ)
  const totalEnergyJ = 0.5 * C_Farad * Math.pow(U0_Volt, 2);
  const totalEnergy_mJ = totalEnergyJ * 1e3;

  // Electromagnetic Wavelength in vacuum λ = c * T = 3e8 * T (meters)
  const speedOfLight = 3e8;
  const emWavelengthM = speedOfLight * periodSec;
  const emWavelengthKm = emWavelengthM / 1e3;

  // Damping factor γ = R / (2L)
  const gamma = R_Ohm / (2 * L_Henry);

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

  // 60 FPS Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Background with subtle cyber grid
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#030712');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Circuit Layout Coordinates
    const isCharging = switchState === 'charge';
    const isOscillating = switchState === 'oscillate';

    // Instantaneous Physics values at current time t
    let q_normalized = 1.0;
    let i_normalized = 0.0;
    let currentDampingExp = 1.0;

    if (isOscillating) {
      const visualOmega = 2.5; // Visual oscillation speed
      currentDampingExp = R_Ohm > 0 ? Math.exp(-0.06 * R_Ohm * animProgress) : 1.0;
      q_normalized = currentDampingExp * Math.cos(visualOmega * animProgress);
      i_normalized = -currentDampingExp * Math.sin(visualOmega * animProgress);
    } else {
      q_normalized = 1.0; // Fully charged at battery voltage
      i_normalized = 0.0;
    }

    const currentCapVoltage = q_normalized * U0_Volt;
    const currentCharge_uC = q_normalized * Q0_uC;
    const currentCurrent_mA = i_normalized * I0_mA;
    const currentEnergyWC_mJ = totalEnergy_mJ * Math.pow(q_normalized, 2);
    const currentEnergyWL_mJ = totalEnergy_mJ * Math.pow(i_normalized, 2);

    // ---------------------------------------------------------
    // 1. DRAW CIRCUIT WIRES
    // ---------------------------------------------------------
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 4;

    const capX = 220;
    const capTopY = 90;
    const capBottomY = 170;

    const indX = 380;
    const indTopY = 90;
    const indBottomY = 170;

    const batX = 70;
    const batTopY = 90;
    const batBottomY = 170;

    // Bottom common rail
    ctx.beginPath();
    ctx.moveTo(batX, batBottomY);
    ctx.lineTo(indX, batBottomY);
    ctx.stroke();

    // Top rail from Capacitor to switch junction
    ctx.beginPath();
    ctx.moveTo(capX, capTopY);
    ctx.lineTo(capX, capTopY - 30);
    ctx.stroke();

    // Inductor right branch
    ctx.beginPath();
    ctx.moveTo(capX, capTopY - 30);
    ctx.lineTo(indX, capTopY - 30);
    ctx.lineTo(indX, capTopY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(indX, capBottomY);
    ctx.lineTo(indX, capBottomY);
    ctx.stroke();

    // Battery branch with switch
    const switchJuncX = 145;
    const switchJuncY = capTopY - 30;

    ctx.beginPath();
    ctx.moveTo(batX, batTopY);
    ctx.lineTo(switchJuncX - 25, batTopY);
    ctx.stroke();

    // ---------------------------------------------------------
    // 2. DUAL-POSITION SWITCH K
    // ---------------------------------------------------------
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(switchJuncX - 25, switchJuncY, 4, 0, 2 * Math.PI); // Contact 1 (Battery)
    ctx.arc(switchJuncX + 25, switchJuncY, 4, 0, 2 * Math.PI); // Contact 2 (LC loop)
    ctx.arc(switchJuncX, switchJuncY, 5, 0, 2 * Math.PI);      // Pivot
    ctx.fill();

    // Switch Blade Lever
    ctx.strokeStyle = isCharging ? '#f59e0b' : '#10b981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(switchJuncX, switchJuncY);
    if (isCharging) {
      ctx.lineTo(switchJuncX - 23, switchJuncY);
    } else {
      ctx.lineTo(switchJuncX + 23, switchJuncY);
    }
    ctx.stroke();

    // Switch Labels
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillStyle = isCharging ? '#fbbf24' : '#64748b';
    ctx.fillText('1 (DC Charge)', switchJuncX - 25, switchJuncY - 10);
    ctx.fillStyle = isOscillating ? '#34d399' : '#64748b';
    ctx.fillText('2 (LC Loop)', switchJuncX + 25, switchJuncY - 10);

    // ---------------------------------------------------------
    // 3. DC POWER SOURCE BATTERY (Left)
    // ---------------------------------------------------------
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    // Long positive line
    ctx.beginPath();
    ctx.moveTo(batX - 15, 120);
    ctx.lineTo(batX + 15, 120);
    ctx.stroke();
    // Short negative line
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(batX - 8, 140);
    ctx.lineTo(batX + 8, 140);
    ctx.stroke();

    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`E = ${initialVoltage}V`, batX, 160);
    ctx.fillText('+', batX + 22, 122);
    ctx.fillText('-', batX + 15, 143);

    // ---------------------------------------------------------
    // 4. PARALLEL PLATE CAPACITOR C (Center)
    // ---------------------------------------------------------
    const plateW = 40;
    const plateH = 7;
    const plateGap = 36;
    const plateTopY = 110;
    const plateBotY = plateTopY + plateGap;

    // Top Plate
    const topPlateChargeColor = q_normalized > 0 ? '#ef4444' : '#3b82f6';
    ctx.fillStyle = topPlateChargeColor;
    ctx.fillRect(capX - plateW / 2, plateTopY, plateW, plateH);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(capX - plateW / 2, plateTopY, plateW, plateH);

    // Bottom Plate
    const botPlateChargeColor = q_normalized > 0 ? '#3b82f6' : '#ef4444';
    ctx.fillStyle = botPlateChargeColor;
    ctx.fillRect(capX - plateW / 2, plateBotY, plateW, plateH);
    ctx.strokeRect(capX - plateW / 2, plateBotY, plateW, plateH);

    // Electric Field Lines E between plates
    if (Math.abs(q_normalized) > 0.08) {
      const eFieldOpacity = Math.min(1, Math.abs(q_normalized));
      ctx.strokeStyle = `rgba(236, 72, 153, ${eFieldOpacity})`;
      ctx.lineWidth = 1.8;
      const numLines = 5;
      for (let i = 0; i < numLines; i++) {
        const lx = capX - plateW / 2 + 6 + (i / (numLines - 1)) * (plateW - 12);
        ctx.beginPath();
        if (q_normalized > 0) {
          ctx.moveTo(lx, plateTopY + plateH);
          ctx.lineTo(lx, plateBotY);
        } else {
          ctx.moveTo(lx, plateBotY);
          ctx.lineTo(lx, plateTopY + plateH);
        }
        ctx.stroke();
      }
    }

    // Capacitor Labels
    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(`C = ${capacitanceuF} µF`, capX, plateBotY + 22);
    ctx.font = '9px Inter';
    ctx.fillStyle = '#ec4899';
    ctx.fillText(`q(t) = ${currentCharge_uC.toFixed(2)} µC`, capX, plateTopY - 6);

    // ---------------------------------------------------------
    // 5. INDUCTOR COIL L (Right)
    // ---------------------------------------------------------
    const numCoilTurns = 7;
    const coilW = 20;
    const coilStepY = (capBottomY - capTopY - 20) / numCoilTurns;

    ctx.strokeStyle = Math.abs(i_normalized) > 0.1 ? '#fbbf24' : '#64748b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = Math.abs(i_normalized) * 8;

    for (let k = 0; k < numCoilTurns; k++) {
      const cy = capTopY + 10 + k * coilStepY;
      ctx.beginPath();
      ctx.ellipse(indX, cy, coilW / 2, coilStepY / 1.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Magnetic Field B indicator
    if (Math.abs(i_normalized) > 0.15) {
      const bOpacity = Math.min(1, Math.abs(i_normalized));
      ctx.fillStyle = `rgba(251, 191, 36, ${bOpacity * 0.25})`;
      ctx.beginPath();
      ctx.roundRect(indX - 16, capTopY + 5, 32, capBottomY - capTopY - 10, 8);
      ctx.fill();

      // Magnetic vector arrow inside solenoid
      ctx.strokeStyle = `rgba(251, 191, 36, ${bOpacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const arrowDir = i_normalized > 0 ? 1 : -1;
      const startY = arrowDir > 0 ? capTopY + 15 : capBottomY - 15;
      const endY = arrowDir > 0 ? capBottomY - 15 : capTopY + 15;
      ctx.moveTo(indX, startY);
      ctx.lineTo(indX, endY);
      ctx.stroke();
    }

    // Inductor Labels
    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText(`L = ${inductancemH} mH`, indX, capBottomY + 22);
    ctx.font = '9px Inter';
    ctx.fillStyle = '#34d399';
    ctx.fillText(`i(t) = ${currentCurrent_mA.toFixed(1)} mA`, indX, capTopY - 6);

    // ---------------------------------------------------------
    // 6. DUAL-TRACE OSCILLOSCOPE SCREEN (Bottom View)
    // ---------------------------------------------------------
    const oscX = 35;
    const oscY = 210;
    const oscW = width - 70;
    const oscH = 175;

    // CRT Screen Bezel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(oscX, oscY, oscW, oscH);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(oscX, oscY, oscW, oscH);

    // Oscilloscope Reticle Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (let gx = oscX; gx <= oscX + oscW; gx += (oscW / 10)) {
      ctx.beginPath(); ctx.moveTo(gx, oscY); ctx.lineTo(gx, oscY + oscH); ctx.stroke();
    }
    for (let gy = oscY; gy <= oscY + oscH; gy += (oscH / 6)) {
      ctx.beginPath(); ctx.moveTo(oscX, gy); ctx.lineTo(oscX + oscW, gy); ctx.stroke();
    }

    // Center Reference Axes
    const centerY = oscY + oscH / 2;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.beginPath();
    ctx.moveTo(oscX, centerY); ctx.lineTo(oscX + oscW, centerY);
    ctx.moveTo(oscX + oscW / 2, oscY); ctx.lineTo(oscX + oscW / 2, oscY + oscH);
    ctx.stroke();

    // Waveform 1: Voltage / Charge Wave u(t) = U0 cos(ωt) [CYAN]
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    ctx.beginPath();

    const wavePoints = 120;
    for (let p = 0; p < wavePoints; p++) {
      const wx = oscX + (p / wavePoints) * oscW;
      const phase = (p / wavePoints) * (Math.PI * 4) - (isOscillating ? animProgress * 2.5 : 0);
      const damp = R_Ohm > 0 ? Math.exp(-0.04 * R_Ohm * (p / 20)) : 1.0;
      const wy = centerY - (isCharging ? 45 : damp * Math.cos(phase) * 45);
      if (p === 0) ctx.moveTo(wx, wy); else ctx.lineTo(wx, wy);
    }
    ctx.stroke();

    // Waveform 2: Current Wave i(t) = -I0 sin(ωt) [AMBER / ORANGE]
    if (isOscillating) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      for (let p = 0; p < wavePoints; p++) {
        const wx = oscX + (p / wavePoints) * oscW;
        const phase = (p / wavePoints) * (Math.PI * 4) - (animProgress * 2.5);
        const damp = R_Ohm > 0 ? Math.exp(-0.04 * R_Ohm * (p / 20)) : 1.0;
        const wy = centerY - (damp * (-Math.sin(phase)) * 45);
        if (p === 0) ctx.moveTo(wx, wy); else ctx.lineTo(wx, wy);
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Oscilloscope Screen Header Overlay
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`CH1: u(t) = ${currentCapVoltage.toFixed(2)}V (Cyan)`, oscX + 12, oscY + 18);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`CH2: i(t) = ${currentCurrent_mA.toFixed(1)}mA (Amber)`, oscX + 160, oscY + 18);
    ctx.fillStyle = '#34d399';
    ctx.textAlign = 'right';
    ctx.fillText(`f = ${freqKhz.toFixed(2)} kHz | T = ${periodMicroSec.toFixed(1)} µs`, oscX + oscW - 12, oscY + 18);

  }, [animProgress, switchState, inductancemH, capacitanceuF, initialVoltage, resistanceOhm, isRunning]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        L_mH: `${inductancemH} mH`,
        C_uF: `${capacitanceuF} µF`,
        U0_V: `${initialVoltage} V`,
        Freq_kHz: `${freqKhz.toFixed(2)} kHz`,
        Period_us: `${periodMicroSec.toFixed(1)} µs`,
        Wavelength_km: `${emWavelengthKm.toFixed(1)} km`,
        I0_mA: `${I0_mA.toFixed(1)} mA`,
        Energy_mJ: `${totalEnergy_mJ.toFixed(2)} mJ`
      });
    }
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={405}
          className="w-full max-w-[540px] h-[405px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Playback & Reset Controls */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" />
            {isRunning ? (isEn ? 'Pause Waveform' : 'Tạm Dừng Dao Động') : (isEn ? 'Start Waveform' : 'Chạy Dao Động')}
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
        {/* Switch Position Selector */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4" /> {isEn ? 'LC Tank Circuit Controls' : 'Điều Khiển Mạch Dao Động LC'}
          </h3>

          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? '📍 Dual-Position Switch K State:' : '📍 Vị trí Khóa Chuyển K:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onParamChange('switchState', 'charge'); handleReset(); }}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  switchState === 'charge'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BatteryCharging className="w-4 h-4" />
                {isEn ? '1. DC Charge' : '1. Nạp Điện (E)'}
              </button>
              <button
                onClick={() => { onParamChange('switchState', 'oscillate'); handleReset(); }}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  switchState === 'oscillate'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                {isEn ? '2. LC Oscillate' : '2. Phóng LC'}
              </button>
            </div>
          </div>

          {/* Inductance L Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Inductance L:' : 'Độ tự cảm cuộn L:'}</span>
              <span className="text-amber-400 font-bold">{inductancemH} mH</span>
            </div>
            <input
              type="range" min="0.5" max="25.0" step="0.5"
              value={inductancemH}
              onChange={(e) => onParamChange('inductancemH', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Capacitance C Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Capacitance C:' : 'Điện dung tụ C:'}</span>
              <span className="text-cyan-400 font-bold">{capacitanceuF} µF</span>
            </div>
            <input
              type="range" min="0.5" max="10.0" step="0.5"
              value={capacitanceuF}
              onChange={(e) => onParamChange('capacitanceuF', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Initial Voltage U0 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'DC Voltage E (U0):' : 'Nguồn nạp E (U0):'}</span>
              <span className="text-emerald-400 font-bold">{initialVoltage} V</span>
            </div>
            <input
              type="range" min="3" max="24" step="1"
              value={initialVoltage}
              onChange={(e) => onParamChange('initialVoltage', Number(e.target.value))}
              className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Resistance R Damping Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Damping Resistance R:' : 'Điện trở tiêu hao R:'}</span>
              <span className="text-rose-400 font-bold">{resistanceOhm} Ω</span>
            </div>
            <input
              type="range" min="0" max="15" step="1"
              value={resistanceOhm}
              onChange={(e) => onParamChange('resistanceOhm', Number(e.target.value))}
              className="w-full accent-rose-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Physics Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'THOMSON & EM WAVE DATA' : 'Chu Kỳ Thomson & Sóng Điện Từ'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Frequency f:' : 'Tần số riêng f:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{freqKhz.toFixed(2)} kHz</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Period T:' : 'Chu kỳ Thomson T:'}</span>
              <span className="text-pink-400 font-bold text-sm">{periodMicroSec.toFixed(1)} µs</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Current I0:' : 'Dòng cực đại I0:'}</span>
              <span className="text-amber-400 font-bold text-sm">{I0_mA.toFixed(1)} mA</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Charge Q0:' : 'Điện tích cực đại Q0:'}</span>
              <span className="text-purple-400 font-bold text-sm">{Q0_uC.toFixed(1)} µC</span>
            </div>

            <div className="col-span-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[11px] block">{isEn ? 'EM Wavelength λ (c·T):' : 'Bước sóng điện từ λ:'}</span>
                <span className="text-[10px] text-slate-500">λ = 2π·c·√(LC)</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-sm">{emWavelengthKm.toFixed(1)} km</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Total Energy W:' : 'Tổng năng lượng điện từ W:'}</span>
                <span className="text-slate-400 text-[10px]">W = Wc + Wl = 0.5·C·U0²</span>
              </div>
              <span className="font-extrabold text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {totalEnergy_mJ.toFixed(2)} mJ
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record LC Oscillator Data' : 'Ghi Bảng Số Liệu Mạch LC'}
          </button>
        </div>
      </div>
    </div>
  );
}
