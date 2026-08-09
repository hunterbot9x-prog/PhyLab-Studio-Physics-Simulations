import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Radio, Sparkles } from 'lucide-react';

export default function RLCSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [animTime, setAnimTime] = useState(0);

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
  const f0 = (1 / (2 * Math.PI * Math.sqrt(lHenry * cFarad)));
  const isResonating = Math.abs(f - f0) < 1.0;

  // Real-time animation loop for Oscilloscope sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimTime(prev => prev + 0.001);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Oscilloscope CRT Screen Dark Greenish Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#021812');
    bgGrad.addColorStop(1, '#010c09');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // CRT Oscilloscope Grid lines
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.12)';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Status Title
    ctx.fillStyle = isResonating ? '#10b981' : '#00f5d4';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isResonating
        ? (isEn ? `⚡ ELECTRICAL RESONANCE OCCURRING (f = f₀ = ${f0.toFixed(1)}Hz)` : `⚡ XẢY RA CỘNG HƯỞNG ĐIỆN (f = f₀ = ${f0.toFixed(1)}Hz)`)
        : (isEn ? `RLC Circuit: Resonance Freq f₀ = ${f0.toFixed(1)} Hz` : `Mạch RLC: Tần số cộng hưởng f₀ = ${f0.toFixed(1)} Hz`),
      width * 0.5,
      35
    );

  }, [f, f0, isResonating, isEn]);

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
