import React, { useState, useEffect, useRef } from 'react';
import { Zap, ToggleLeft, ToggleRight, RotateCcw, Activity } from 'lucide-react';

export default function CircuitSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [animOffset, setAnimOffset] = useState(0);

  const voltage = params.voltage !== undefined ? params.voltage : 12; // Volts
  const r1 = params.r1 || 10; // Ohms
  const r2 = params.r2 || 20; // Ohms
  const circuitType = params.circuitType || 'series'; // 'series' | 'parallel'
  const isSwitchClosed = params.isSwitchClosed !== undefined ? params.isSwitchClosed : true;

  // Calculate Circuit Parameters
  let totalResistance = 0;
  let totalCurrent = 0; // Amperes
  let v1 = 0; // Voltage across R1
  let v2 = 0; // Voltage across R2
  let i1 = 0; // Current through R1
  let i2 = 0; // Current through R2

  if (isSwitchClosed && voltage > 0) {
    if (circuitType === 'series') {
      totalResistance = r1 + r2;
      totalCurrent = voltage / totalResistance;
      i1 = totalCurrent;
      i2 = totalCurrent;
      v1 = i1 * r1;
      v2 = i2 * r2;
    } else {
      // Parallel
      totalResistance = (r1 * r2) / (r1 + r2);
      totalCurrent = voltage / totalResistance;
      v1 = voltage;
      v2 = voltage;
      i1 = v1 / r1;
      i2 = v2 / r2;
    }
  }

  // Animation Loop for Current Electrons
  useEffect(() => {
    if (!isSwitchClosed || totalCurrent === 0) return;
    const interval = setInterval(() => {
      setAnimOffset(prev => (prev + Math.min(6, totalCurrent * 2)) % 30);
    }, 40);
    return () => clearInterval(interval);
  }, [isSwitchClosed, totalCurrent]);

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

    const cX = width * 0.5;
    const cY = height * 0.5;

    // Draw Wires
    ctx.strokeStyle = isSwitchClosed && totalCurrent > 0 ? '#38bdf8' : '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cX - 180, cY - 110, 360, 220, 16);
    ctx.stroke();

    // DC Battery Symbol
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cX - 35, cY + 110 - 15, 70, 30, 6);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${voltage}V DC`, cX, cY + 110 + 4);

    // Resistors
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cX - 100, cY - 110 - 15, 70, 30, 6);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`R₁: ${r1}Ω`, cX - 65, cY - 110 + 4);

    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(cX + 30, cY - 110 - 15, 70, 30, 6);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`R₂: ${r2}Ω`, cX + 65, cY - 110 + 4);

    // Current Value Badge
    ctx.fillStyle = isSwitchClosed ? '#10b981' : '#f43f5e';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isSwitchClosed
        ? (isEn ? `🟢 CLOSED CIRCUIT: Total Current I = ${totalCurrent.toFixed(2)}A` : `🟢 MẠCH KÍN: Cường độ dòng I = ${totalCurrent.toFixed(2)}A`)
        : (isEn ? '🔴 OPEN CIRCUIT (SWITCH K OPEN): Current I = 0.00A' : '🔴 MẠCH HỞ (CÔNG TẮC K NGẮT): Cường độ I = 0.00A'),
      cX,
      35
    );

  }, [voltage, r1, r2, circuitType, isSwitchClosed, totalCurrent, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      circuitType: circuitType === 'series' ? (isEn ? 'Series' : 'Nối tiếp') : (isEn ? 'Parallel' : 'Song song'),
      voltage: `${voltage} V`,
      r1: `${r1} Ω`,
      r2: `${r2} Ω`,
      rTotal: `${totalResistance.toFixed(1)} Ω`,
      iTotal: `${totalCurrent.toFixed(2)} A`,
      status: isSwitchClosed ? (isEn ? 'Closed Circuit' : 'Mạch kín') : (isEn ? 'Open Circuit' : 'Mạch hở')
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

        {/* Switch Toggle Bar */}
        <div className="w-full max-w-[540px] mt-4 flex items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <button
            onClick={() => onParamChange('isSwitchClosed', !isSwitchClosed)}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg ${
              isSwitchClosed ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-rose-500/20'
            }`}
          >
            {isSwitchClosed ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {isSwitchClosed ? (isEn ? 'SWITCH K: CLOSED' : 'CÔNG TẮC K: ĐÓNG') : (isEn ? 'SWITCH K: OPEN' : 'CÔNG TẮC K: NGẮT')}
          </button>

          {/* Voltage Source Slider */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>{isEn ? 'Voltage U:' : 'Điện áp U:'}</span>
            <input
              type="range" min="3" max="24" step="3"
              value={voltage}
              onChange={(e) => onParamChange('voltage', Number(e.target.value))}
              className="w-28 accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-cyan-400 font-bold min-w-[35px]">{voltage} V</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> {isEn ? 'CIRCUIT CONFIGURATION' : 'Cấu hình Mạch điện'}
          </h3>

          {/* Circuit Type */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Connection Mode:' : 'Sơ đồ ghép mạch:'}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onParamChange('circuitType', 'series')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  circuitType === 'series' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isEn ? 'Series Circuit' : 'Mạch Nối Tiếp'}
              </button>
              <button
                onClick={() => onParamChange('circuitType', 'parallel')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  circuitType === 'parallel' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isEn ? 'Parallel Circuit' : 'Mạch Song Song'}
              </button>
            </div>
          </div>

          {/* Resistor R1 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Resistor R₁:' : 'Điện trở R₁:'}</span>
              <span className="text-amber-400 font-bold">{r1} Ω</span>
            </div>
            <input
              type="range" min="2" max="50" step="1"
              value={r1}
              onChange={(e) => onParamChange('r1', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Resistor R2 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Resistor R₂:' : 'Điện trở R₂:'}</span>
              <span className="text-amber-400 font-bold">{r2} Ω</span>
            </div>
            <input
              type="range" min="2" max="50" step="1"
              value={r2}
              onChange={(e) => onParamChange('r2', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Values */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> {isEn ? "OHM'S LAW READINGS" : 'Số liệu Đo (Định luật Ôm)'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Equivalent Resistance:' : 'Điện trở tương đương:'}</span>
              <span className="text-amber-400 font-bold text-sm">{totalResistance.toFixed(1)} Ω</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Total Current I:' : 'Cường độ dòng I:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{totalCurrent.toFixed(2)} A</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? "Ohm's Formula:" : 'Công thức Ohm:'}</span>
                <span className="text-slate-400 text-[10px]">I = U / R_eq</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">
                {voltage}V / {totalResistance.toFixed(1)}Ω = {totalCurrent.toFixed(2)}A
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Circuit Data' : 'Ghi Bảng Số liệu Mạch điện'}
          </button>
        </div>
      </div>
    </div>
  );
}
