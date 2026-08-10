import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Radio, Sparkles } from 'lucide-react';

export default function RLCSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const uRms = params.voltageRms || 220; // V
  const f = params.frequency !== undefined ? params.frequency : 50; // Hz
  const r = params.r || 50; // Ohm
  const lMh = params.inductancemH || 318; // mH
  const cUf = params.capacitanceuF || 31.8; // uF

  // Convert units
  const lHenry = lMh * 1e-3;
  const cFarad = cUf * 1e-6;
  const omega = 2 * Math.PI * f;

  // Reactances & Impedance
  const zL = omega * lHenry;
  const zC = cFarad > 0 ? 1 / (omega * cFarad) : 0;
  const totalZ = Math.sqrt(r * r + (zL - zC) * (zL - zC));
  const iRms = totalZ > 0 ? uRms / totalZ : 0;

  // Phase angle phi (rad)
  const phi = Math.atan2(zL - zC, r);

  // Resonance Frequency f0 (Hz)
  const f0 = 1 / (2 * Math.PI * Math.sqrt(lHenry * cFarad));
  const isResonating = Math.abs(f - f0) < 1.0;

  // 60 FPS Animation loop for smooth oscilloscope trace & flowing electrons
  useEffect(() => {
    let animId;
    let time = 0;

    const render = () => {
      time += 0.025;
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

      // Circuit Container Panel
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
      ctx.fillText(isEn ? 'REALISTIC PHYSICAL RLC CIRCUIT WIRING & COMPONENTS' : 'SƠ ĐỒ LẮP RÁP THỰC TẾ & LINH KIỆN MẠCH RLC', cktX + 12, cktY + 18);

      // Loop coordinates
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

          if (dist < (loopR - loopL)) { // Top wire (left to right)
            px = loopL + dist; py = loopT;
          } else if (dist < (loopR - loopL + loopB - loopT)) { // Right wire (top to bottom)
            px = loopR; py = loopT + (dist - (loopR - loopL));
          } else if (dist < (2 * (loopR - loopL) + loopB - loopT)) { // Bottom wire (right to left)
            px = loopR - (dist - (loopR - loopL + loopB - loopT)); py = loopB;
          } else { // Left wire (bottom to top)
            px = loopL; py = loopB - (dist - (2 * (loopR - loopL) + loopB - loopT));
          }

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // --- COMPONENT 1: AC GENERATOR (Left Wire, Center) ---
      const genX = loopL;
      const genY = (loopT + loopB) / 2;

      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(genX, genY, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Sine logo in generator
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let dx = -12; dx <= 12; dx += 2) {
        const dy = Math.sin((dx / 12) * Math.PI) * 8;
        if (dx === -12) ctx.moveTo(genX + dx, genY - dy);
        else ctx.lineTo(genX + dx, genY - dy);
      }
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`~ ${uRms}V AC`, genX, genY + 34);
      ctx.fillText(`${f}Hz`, genX, genY - 26);


      // --- COMPONENT 2: RESISTOR R (Top Wire, Left-Middle) ---
      const rX = loopL + (loopR - loopL) * 0.28;
      const rY = loopT;

      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(rX - 25, rY - 10, 50, 20, 4);
      ctx.fill();
      ctx.stroke();

      // Resistor Color Bands
      const bandColors = ['#78350f', '#000000', '#dc2626', '#fbbf24'];
      bandColors.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(rX - 16 + idx * 9, rY - 10, 4, 20);
      });

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`R = ${r}Ω`, rX, rY - 16);


      // --- COMPONENT 3: INDUCTOR COIL L (Top Wire, Right-Middle) ---
      const lX = loopL + (loopR - loopL) * 0.72;
      const lY = loopT;

      // Magnetic field glow when current flows
      if (iRms > 0.1) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.beginPath();
        ctx.ellipse(lX, lY, 32, 18, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Copper Coil Loops
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      const coilTurns = 5;
      const turnW = 8;
      for (let t = 0; t < coilTurns; t++) {
        const cx = lX - 20 + t * turnW;
        ctx.beginPath();
        ctx.arc(cx, lY, 7, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`L = ${lMh}mH`, lX, lY - 16);


      // --- COMPONENT 4: CAPACITOR C (Right Wire, Center) ---
      const capX = loopR;
      const capY = (loopT + loopB) / 2;

      // Cylindrical Electrolytic Capacitor Body
      ctx.fillStyle = '#2563eb';
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(capX - 12, capY - 22, 24, 44, 6);
      ctx.fill();
      ctx.stroke();

      // Negative stripe
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(capX + 4, capY - 22, 6, 44);

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`C = ${cUf}µF`, capX + 38, capY + 4);


      // --- COMPONENT 5: DIGITAL AMMETER A (Bottom Wire, Center) ---
      const ammeterX = (loopL + loopR) / 2;
      const ammeterY = loopB;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ammeterX, ammeterY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('A', ammeterX, ammeterY - 2);

      ctx.fillStyle = '#34d399';
      ctx.font = 'extrabold 11px Inter';
      ctx.fillText(`${iRms.toFixed(2)}A`, ammeterX, ammeterY + 28);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [f, f0, r, lMh, cUf, uRms, iRms, phi, isResonating, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      frequencyHz: `${f} Hz`,
      r: `${r} Ω`,
      inductance: `${lMh} mH`,
      capacitance: `${cUf} µF`,
      zL: `${zL.toFixed(1)} Ω`,
      zC: `${zC.toFixed(1)} Ω`,
      impedanceZ: `${totalZ.toFixed(1)} Ω`,
      iRms: `${iRms.toFixed(2)} A`,
      resonanceStatus: isResonating ? (isEn ? 'Resonance' : 'Cộng hưởng') : (isEn ? 'Off-Resonance' : 'Chưa cộng hưởng')
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
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4" /> {isEn ? 'AC RLC Controls' : 'Cambridge AC RLC Circuit'}
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
