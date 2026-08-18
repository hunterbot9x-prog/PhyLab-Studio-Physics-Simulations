import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Radio, Sparkles, Compass, TrendingUp, Layers } from 'lucide-react';

export default function RLCSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const uRms = params.voltageRms || 220; // V
  const f = params.frequency !== undefined ? params.frequency : 50; // Hz
  const r = params.r || 50; // Ohm
  const lMh = params.inductancemH || 318; // mH
  const cUf = params.capacitanceuF || 31.8; // uF
  const viewMode = params.viewMode || 'oscilloscope_circuit'; // 'oscilloscope_circuit' | 'fresnel_resonance'

  // Convert units
  const lHenry = lMh * 1e-3;
  const cFarad = cUf * 1e-6;
  const omega = 2 * Math.PI * f;

  // Reactances & Impedance
  const zL = omega * lHenry;
  const zC = cFarad > 0 ? 1 / (omega * cFarad) : 0;
  const totalZ = Math.sqrt(r * r + (zL - zC) * (zL - zC));
  const iRms = totalZ > 0 ? uRms / totalZ : 0;

  // Component Voltages
  const uR = iRms * r;
  const uL = iRms * zL;
  const uC = iRms * zC;

  // Phase angle phi (rad)
  const phi = Math.atan2(zL - zC, r);

  // Resonance Frequency f0 (Hz)
  const f0 = 1 / (2 * Math.PI * Math.sqrt(lHenry * cFarad));
  const isResonating = Math.abs(f - f0) < 1.0;

  // 60 FPS Animation loop for smooth oscilloscope trace, flowing electrons & rotating phasor
  useEffect(() => {
    let animId;
    let time = 0;

    const drawVector = (ctx, fromX, fromY, toX, toY, color, label, width = 2.5) => {
      const angle = Math.atan2(toY - fromY, toX - fromX);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      const headLen = 8;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      if (label) {
        ctx.font = 'bold 9px Inter';
        ctx.fillText(label, toX + 6 * Math.cos(angle), toY + 6 * Math.sin(angle));
      }
    };

    const render = () => {
      time += 0.028;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#040914');
      bgGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Status Title
      ctx.fillStyle = isResonating ? '#10b981' : '#00f5d4';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isResonating
          ? (isEn ? `⚡ ELECTRICAL RESONANCE (f = f₀ = ${f0.toFixed(1)}Hz | I_max = ${iRms.toFixed(2)}A)` : `⚡ XẢY RA CỘNG HƯỞNG ĐIỆN (f = f₀ = ${f0.toFixed(1)}Hz | I_max = ${iRms.toFixed(2)}A)`)
          : (isEn ? `AC RLC CIRCUIT: Resonance Freq f₀ = ${f0.toFixed(1)} Hz` : `MẠCH ĐIỆN RLC: Tần số cộng hưởng f₀ = ${f0.toFixed(1)} Hz`),
        width * 0.5,
        22
      );

      if (viewMode === 'oscilloscope_circuit') {
        // =============================================================
        // VIEW 1: DUAL-TRACE OSCILLOSCOPE & PHYSICAL CIRCUIT WIRING
        // =============================================================

        // SECTION 1: OSCILLOSCOPE DUAL TRACE SCREEN (Top Half, y: 32 to 195)
        const oscX = 20;
        const oscY = 32;
        const oscW = width - 40;
        const oscH = 155;

        // Oscilloscope Bezel & CRT Screen
        ctx.fillStyle = '#021610';
        ctx.strokeStyle = isResonating ? 'rgba(16, 185, 129, 0.6)' : 'rgba(0, 245, 212, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(oscX, oscY, oscW, oscH, 12);
        ctx.fill();
        ctx.stroke();

        // CRT Grid Lines
        ctx.strokeStyle = 'rgba(0, 245, 212, 0.12)';
        ctx.lineWidth = 1;
        const gridStep = 25;
        for (let x = oscX + gridStep; x < oscX + oscW; x += gridStep) {
          ctx.beginPath(); ctx.moveTo(x, oscY); ctx.lineTo(x, oscY + oscH); ctx.stroke();
        }
        for (let y = oscY + gridStep; y < oscY + oscH; y += gridStep) {
          ctx.beginPath(); ctx.moveTo(oscX, y); ctx.lineTo(oscX + oscW, y); ctx.stroke();
        }

        // Center Axes
        const oscMidY = oscY + oscH / 2;
        ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(oscX, oscMidY); ctx.lineTo(oscX + oscW, oscMidY); ctx.stroke();

        // Oscilloscope Label
        ctx.fillStyle = '#00f5d4';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(isEn ? 'DUAL TRACE OSCILLOSCOPE (CH1: u(t) Gold | CH2: i(t) Cyan)' : 'DAO ĐỘNG KÝ ĐIỆN TỬ (Kênh 1: u(t) Vàng | Kênh 2: i(t) Xanh)', oscX + 12, oscY + 16);

        // Draw Waveform 1: u(t) (Yellow/Gold Sine Wave)
        const uAmp = 45; // amplitude in pixels
        const waveFreqScale = (f / 50) * 0.04;

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        for (let px = 0; px <= oscW; px += 2) {
          const uVal = Math.sin((px * waveFreqScale) - (time * 3));
          const py = oscMidY - uVal * uAmp;
          if (px === 0) ctx.moveTo(oscX + px, py);
          else ctx.lineTo(oscX + px, py);
        }
        ctx.stroke();

        // Draw Waveform 2: i(t) (Cyan Sine Wave, shifted by phase angle phi)
        const iAmpScale = Math.min(60, iRms * 12);
        ctx.strokeStyle = '#00f5d4';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        for (let px = 0; px <= oscW; px += 2) {
          const iVal = Math.sin((px * waveFreqScale) - (time * 3) - phi);
          const py = oscMidY - iVal * iAmpScale;
          if (px === 0) ctx.moveTo(oscX + px, py);
          else ctx.lineTo(oscX + px, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Phase Shift Indicator
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'right';
        const phiDeg = (phi * 180 / Math.PI).toFixed(1);
        ctx.fillText(`Δφ = ${phiDeg}° (${phi >= 0 ? (isEn ? 'i lags u' : 'i trễ pha u') : (isEn ? 'i leads u' : 'i sớm pha u')})`, oscX + oscW - 12, oscY + 16);

        // SECTION 2: REALISTIC PHYSICAL RLC CIRCUIT GRAPHICS (Bottom Half, y: 200 to 410)
        const cktX = 30;
        const cktY = 200;
        const cktW = width - 60;
        const cktH = 195;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cktX, cktY, cktW, cktH, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(isEn ? 'PHYSICAL RLC CIRCUIT WIRING' : 'SƠ ĐỒ LẮP RÁP MẠCH RLC NỐI TIẾP', cktX + 12, cktY + 18);

        const loopL = cktX + 50;
        const loopR = cktX + cktW - 50;
        const loopT = cktY + 45;
        const loopB = cktY + cktH - 30;

        // Circuit Copper Wires
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(loopL, loopT);
        ctx.lineTo(loopR, loopT);
        ctx.lineTo(loopR, loopB);
        ctx.lineTo(loopL, loopB);
        ctx.closePath();
        ctx.stroke();

        // Flowing Electron Particles along wire
        const currentSpeed = Math.min(4, iRms * 0.8);
        if (currentSpeed > 0.05) {
          ctx.fillStyle = '#00f5d4';
          ctx.shadowColor = '#00f5d4';
          ctx.shadowBlur = 6;
          const totalLen = 2 * (loopR - loopL) + 2 * (loopB - loopT);
          const particleCount = 24;

          for (let p = 0; p < particleCount; p++) {
            let dist = (p * (totalLen / particleCount) + time * currentSpeed * 40) % totalLen;
            let px, py;

            if (dist < (loopR - loopL)) {
              px = loopL + dist; py = loopT;
            } else if (dist < (loopR - loopL + loopB - loopT)) {
              px = loopR; py = loopT + (dist - (loopR - loopL));
            } else if (dist < (2 * (loopR - loopL) + loopB - loopT)) {
              px = loopR - (dist - (loopR - loopL + loopB - loopT)); py = loopB;
            } else {
              px = loopL; py = loopB - (dist - (2 * (loopR - loopL) + loopB - loopT));
            }

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
        }

        // Generator AC
        const genX = loopL;
        const genY = (loopT + loopB) / 2;
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#00f5d4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(genX, genY, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#00f5d4';
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`~ ${uRms}V`, genX, genY - 2);
        ctx.fillText(`${f}Hz`, genX, genY + 10);

        // Resistor R
        const resX = loopL + (loopR - loopL) * 0.25;
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(resX - 22, loopT - 10, 44, 20);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.strokeRect(resX - 22, loopT - 10, 44, 20);
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`R = ${r}Ω`, resX, loopT + 3);

        // Inductor L
        const indX = loopL + (loopR - loopL) * 0.75;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        for (let k = -2; k <= 2; k++) {
          ctx.beginPath();
          ctx.arc(indX + k * 8, loopT, 8, Math.PI, 0);
          ctx.stroke();
        }
        ctx.fillStyle = '#60a5fa';
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`L = ${lMh}mH`, indX, loopT + 20);

        // Capacitor C
        const capX = (loopL + loopR) / 2;
        const capY = loopB;
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(capX - 4, capY - 14, 3, 28);
        ctx.fillRect(capX + 1, capY - 14, 3, 28);
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`C = ${cUf}µF`, capX, capY - 20);

      } else {
        // =============================================================
        // VIEW 2: FRESNEL PHASOR VECTOR DIAGRAM & RESONANCE CURVE I(f)
        // =============================================================

        // --- LEFT PANEL: ROTATING FRESNEL PHASOR DIAGRAM (20 to 265 px) ---
        const fX = 20;
        const fY = 35;
        const fW = 245;
        const fH = height - 65;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(fX, fY, fW, fH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(fX, fY, fW, fH);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(isEn ? 'FRESNEL PHASOR DIAGRAM' : 'GIẢN ĐỒ VECTƠ PHASOR FRESNEL', fX + 10, fY + 18);

        const fMidX = fX + 50;
        const fMidY = fY + fH / 2 + 10;

        // Current Reference Axis i (Horizontal Cyan)
        drawVector(ctx, fMidX, fMidY, fMidX + 120, fMidY, '#00f5d4', 'I_ref (0°)', 2);

        // Vector Scale: pixels per volt
        const vScale = 0.35;
        const urLen = Math.min(95, uR * vScale);
        const ulLen = Math.min(100, uL * vScale);
        const ucLen = Math.min(100, uC * vScale);
        const ulcLen = ulLen - ucLen;

        // Vector UR (along I)
        drawVector(ctx, fMidX, fMidY, fMidX + urLen, fMidY, '#fbbf24', `UR=${uR.toFixed(0)}V`, 2.5);

        // Vector UL (Perpendicular Up +90°)
        drawVector(ctx, fMidX, fMidY, fMidX, fMidY - ulLen, '#3b82f6', `UL=${uL.toFixed(0)}V`, 2.5);

        // Vector UC (Perpendicular Down -90°)
        drawVector(ctx, fMidX, fMidY, fMidX, fMidY + ucLen, '#a855f7', `UC=${uC.toFixed(0)}V`, 2.5);

        // Parallelogram Resultant U = UR + (UL - UC)
        const uEndX = fMidX + urLen;
        const uEndY = fMidY - ulcLen;

        // Dashed construction lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(fMidX, fMidY - ulcLen);
        ctx.lineTo(uEndX, uEndY);
        ctx.lineTo(fMidX + urLen, fMidY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Total Voltage Vector U (Pink)
        drawVector(ctx, fMidX, fMidY, uEndX, uEndY, '#ec4899', `U=${uRms}V (φ=${(phi * 180 / Math.PI).toFixed(1)}°)`, 3.5);

        // Phase angle arc φ
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(fMidX, fMidY, 32, -Math.max(0, phi), -Math.min(0, phi));
        ctx.stroke();

        // --- RIGHT PANEL: RESONANCE CURVE I(f) (275 to 520 px) ---
        const rX = 275;
        const rY = 35;
        const rW = width - rX - 15;
        const rH = height - 65;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(rX, rY, rW, rH);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(rX, rY, rW, rH);

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(isEn ? 'RESONANCE CURVE I(f)' : 'ĐƯỜNG CONG CỘNG HƯỞNG I(f)', rX + 10, rY + 18);

        // Resonance Graph Axes
        const gOx = rX + 35;
        const gOy = rY + rH - 35;
        const gW = rW - 50;
        const gH = rH - 75;

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gOx, gOy); ctx.lineTo(gOx + gW, gOy); // f axis
        ctx.moveTo(gOx, gOy); ctx.lineTo(gOx, gOy - gH); // I axis
        ctx.stroke();

        ctx.font = 'bold 9px Inter';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('f (Hz)', gOx + gW - 25, gOy + 16);
        ctx.fillText('I (A)', gOx - 28, gOy - gH + 8);

        // Peak Current at Resonance I0 = U/R
        const iMaxPeak = uRms / r;
        const maxPlotFreq = 150; // 0 to 150 Hz

        // Plot Resonance Curve
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 6;
        ctx.beginPath();

        for (let px = 0; px <= gW; px += 2) {
          const plotF = (px / gW) * maxPlotFreq;
          if (plotF <= 1) continue;
          const plotOmega = 2 * Math.PI * plotF;
          const plotZ = Math.sqrt(r * r + Math.pow(plotOmega * lHenry - 1 / (plotOmega * cFarad), 2));
          const plotI = uRms / plotZ;
          const py = gOy - (plotI / iMaxPeak) * (gH - 10);

          if (px === 0) ctx.moveTo(gOx + px, py);
          else ctx.lineTo(gOx + px, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Mark Resonance Peak f0
        const f0Px = (f0 / maxPlotFreq) * gW;
        if (f0Px >= 0 && f0Px <= gW) {
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(gOx + f0Px, gOy);
          ctx.lineTo(gOx + f0Px, gOy - gH + 10);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#fde047';
          ctx.font = 'bold 9px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(`f₀=${f0.toFixed(1)}Hz`, gOx + f0Px, gOy + 14);
        }

        // Mark Current Operating Point (f, I)
        const currentFPx = (f / maxPlotFreq) * gW;
        const currentIPy = gOy - (iRms / iMaxPeak) * (gH - 10);

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(gOx + currentFPx, currentIPy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(` (${f}Hz, ${iRms.toFixed(2)}A)`, gOx + currentFPx + 6, currentIPy - 4);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [uRms, f, r, lMh, cUf, zL, zC, totalZ, iRms, phi, f0, isResonating, viewMode, isEn, uR, uL, uC]);

  const recordPoint = () => {
    onDataRecorded?.({
      time: new Date().toLocaleTimeString(),
      uRms: `${uRms} V`,
      freqHz: `${f} Hz`,
      rOhm: `${r} Ω`,
      inductancemH: `${lMh} mH`,
      capacitanceuF: `${cUf} µF`,
      zLOhm: `${zL.toFixed(1)} Ω`,
      zCOhm: `${zC.toFixed(1)} Ω`,
      totalZOhm: `${totalZ.toFixed(1)} Ω`,
      iRmsA: `${iRms.toFixed(2)} A`,
      phiDeg: `${(phi * 180 / Math.PI).toFixed(1)}°`,
      resFreqHz: `${f0.toFixed(1)} Hz`
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={415}
          className="w-full max-w-[540px] h-[415px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* View Mode Switcher Toolbar */}
        <div className="w-full max-w-[540px] mt-3 flex items-center justify-between gap-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">{isEn ? 'Visualization View:' : 'Chế Độ Hiển Thị:'}</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => onParamChange('viewMode', 'oscilloscope_circuit')}
              className={`py-1 px-3 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'oscilloscope_circuit' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              📺 {isEn ? 'Oscilloscope & Circuit' : 'Dao Động Ký & Sơ Đồ'}
            </button>
            <button
              onClick={() => onParamChange('viewMode', 'fresnel_resonance')}
              className={`py-1 px-3 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'fresnel_resonance' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
              }`}
            >
              🧭 {isEn ? 'Fresnel Phasor & Resonance I(f)' : 'Vectơ Fresnel & Cộng Hưởng'}
            </button>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Controls Card */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> {isEn ? 'CIRCUIT PARAMETERS' : 'THÔNG SỐ MẠCH RLC'}
          </h3>

          {/* AC Frequency Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'AC Frequency f:' : 'Tần số nguồn f:'}</span>
              <span className="text-cyan-400 font-bold">{f} Hz</span>
            </div>
            <input
              type="range" min="10" max="150" step="1"
              value={f}
              onChange={(e) => onParamChange('frequency', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Resistance R */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Resistance R:' : 'Điện trở R (Ω):'}</span>
              <span className="text-amber-400 font-bold">{r} Ω</span>
            </div>
            <input
              type="range" min="10" max="200" step="5"
              value={r}
              onChange={(e) => onParamChange('r', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Inductance L */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Inductance L (mH):' : 'Độ tự cảm L (mH):'}</span>
              <span className="text-blue-400 font-bold">{lMh} mH</span>
            </div>
            <input
              type="range" min="50" max="800" step="10"
              value={lMh}
              onChange={(e) => onParamChange('inductancemH', Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Capacitance C */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Capacitance C (µF):' : 'Điện dung C (µF):'}</span>
              <span className="text-purple-400 font-bold">{cUf} µF</span>
            </div>
            <input
              type="range" min="5" max="100" step="1"
              value={cUf}
              onChange={(e) => onParamChange('capacitanceuF', Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'IMPEDANCE & CURRENT' : 'Trở kháng & Dòng điện'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Inductive Z_L:' : 'Cảm kháng Z_L:'}</span>
              <span className="text-blue-400 font-bold text-sm">{zL.toFixed(1)} Ω</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Capacitive Z_C:' : 'Dung kháng Z_C:'}</span>
              <span className="text-purple-400 font-bold text-sm">{zC.toFixed(1)} Ω</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'RMS Current I_rms:' : 'Dòng hiệu dụng I_rms:'}</span>
                <span className="text-slate-400 text-[10px]">{isEn ? `Impedance Z = ${totalZ.toFixed(1)}Ω` : `Tổng trở Z = ${totalZ.toFixed(1)}Ω`}</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{iRms.toFixed(2)} A</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record RLC Data' : 'Ghi Bảng Số liệu Mạch RLC'}
          </button>
        </div>
      </div>
    </div>
  );
}
