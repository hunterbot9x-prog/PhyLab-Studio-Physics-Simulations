import React, { useEffect, useRef } from 'react';
import { Zap, Activity, ShieldCheck } from 'lucide-react';

export default function InternalResistanceSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const emfVolts = params.emfVolts || 9.0; // Battery EMF E (V)
  const internalR = params.internalR || 1.5; // Internal resistance r (Ohms)
  const loadR = params.loadR || 4.5; // Load resistance R (Ohms)

  // Circuit calculations
  const totalR = loadR + internalR;
  const currentAmp = emfVolts / totalR;
  const terminalVolts = currentAmp * loadR;
  const internalVoltageDrop = currentAmp * internalR;
  const powerWatts = currentAmp * currentAmp * loadR;

  const isMaxPowerTransfer = Math.abs(loadR - internalR) < 0.1;

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

    const startX = 80;
    const endX = width - 80;
    const topY = 70;
    const bottomY = height - 70;

    // 1. Draw Wires
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(startX, topY, endX - startX, bottomY - topY, 12);
    ctx.stroke();

    // 2. Draw Battery Cell + Internal Resistance r
    const battX = (startX + endX) / 2;
    const battY = topY;

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(battX - 90, battY - 22, 180, 44, 8);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`E = ${emfVolts}V | r = ${internalR}Ω`, battX, battY + 4);

    // Title HUD
    ctx.fillStyle = isMaxPowerTransfer ? '#10b981' : '#00f2fe';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isMaxPowerTransfer
        ? (isEn ? '⚡ MAXIMUM POWER TRANSFER MATCHED (R = r)' : '⚡ ĐẠT CÔNG SUẤT CỰC ĐẠI TRÊN TẢI (R = r)')
        : (isEn ? `Terminal Voltage V = E - I·r = ${terminalVolts.toFixed(2)} V` : `Điện Áp Đầu Cực V = E - I·r = ${terminalVolts.toFixed(2)} V`),
      width * 0.5,
      35
    );

  }, [emfVolts, internalR, loadR, currentAmp, terminalVolts, isMaxPowerTransfer, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      emfVolts: `${emfVolts} V`,
      internalR: `${internalR} Ω`,
      loadR: `${loadR} Ω`,
      currentAmp: `${currentAmp.toFixed(2)} A`,
      terminalVolts: `${terminalVolts.toFixed(2)} V`,
      powerWatts: `${powerWatts.toFixed(2)} W`
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
            <Zap className="w-4 h-4" /> {isEn ? 'EMF & Internal Resistance Controls' : 'Cambridge EMF & Internal Resistance'}
          </h3>

          {/* Load Resistance R Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Load Resistance R:' : 'Điện trở mạch ngoài R:'}</span>
              <span className="text-cyan-400 font-bold">{loadR} Ω</span>
            </div>
            <input
              type="range" min="0.5" max="15.0" step="0.5"
              value={loadR}
              onChange={(e) => onParamChange('loadR', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Internal Resistance r Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Internal Resistance r:' : 'Điện trở trong r:'}</span>
              <span className="text-amber-400 font-bold">{internalR} Ω</span>
            </div>
            <input
              type="range" min="0.5" max="5.0" step="0.5"
              value={internalR}
              onChange={(e) => onParamChange('internalR', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'TERMINAL VOLTAGE V & CURRENT I' : 'Điện áp Đầu cực V & Dòng I'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Terminal Voltage V:' : 'Điện áp đầu cực V:'}</span>
              <span className="text-rose-400 font-bold text-sm">{terminalVolts.toFixed(2)} V</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Circuit Current I:' : 'Cường độ dòng I:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{currentAmp.toFixed(2)} A</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Load Power P:' : 'Công suất tỏa trên R:'}</span>
                <span className="text-slate-400 text-[10px]">P = I² · R</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{powerWatts.toFixed(2)} W</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record EMF Data' : 'Ghi Bảng Số liệu Suất Điện Động'}
          </button>
        </div>
      </div>
    </div>
  );
}
