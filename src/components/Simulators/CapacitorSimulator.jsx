import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Zap, Layers } from 'lucide-react';

export default function CapacitorSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const voltage = params.voltage !== undefined ? params.voltage : 12; // Volts U (0V - 24V)
  const plateAreaMm2 = params.plateAreaMm2 || 220; // mm^2 (Area A)
  const separationMm = params.separationMm || 6; // mm (Distance d)
  const dielectricEps = params.dielectricEps || 1.0; // Dielectric constant (Air=1, Paper=3.5, Glass=5.0, Water=80)

  // Physics constants
  const eps0 = 8.854e-12; // F/m
  const areaM2 = plateAreaMm2 * 1e-6;
  const distM = separationMm * 1e-3;

  // Capacitance C = eps * eps0 * A / d (in Picofarads pF)
  const capacitancePf = ((dielectricEps * eps0 * areaM2) / distM) * 1e12;
  const chargeNc = (capacitancePf * voltage) / 1000; // Charge Q in nC
  const energyUj = (0.5 * capacitancePf * 1e-12 * Math.pow(voltage, 2)) * 1e6; // Energy W in microjoules µJ
  const electricFieldEv = distM > 0 ? (voltage / distM) / 1000 : 0; // kV/m

  const dielectricPresets = [
    { name: isEn ? 'Air (ε = 1.0)' : 'Không khí (ε = 1.0)', eps: 1.0, color: 'rgba(56, 189, 248, 0.1)' },
    { name: isEn ? 'Teflon (ε = 2.1)' : 'Teflon (ε = 2.1)', eps: 2.1, color: 'rgba(52, 211, 153, 0.25)' },
    { name: isEn ? 'Paper (ε = 3.5)' : 'Giấy tẩm dầu (ε = 3.5)', eps: 3.5, color: 'rgba(251, 191, 36, 0.3)' },
    { name: isEn ? 'Glass (ε = 5.0)' : 'Thủy tinh (ε = 5.0)', eps: 5.0, color: 'rgba(168, 85, 247, 0.35)' },
    { name: isEn ? 'Mica (ε = 6.0)' : 'Mica (ε = 6.0)', eps: 6.0, color: 'rgba(244, 63, 94, 0.35)' },
    { name: isEn ? 'Water (ε = 80)' : 'Nước cất (ε = 80)', eps: 80.0, color: 'rgba(14, 165, 233, 0.5)' }
  ];

  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    let animId;
    let time = 0;

    const render = () => {
      time += 0.03;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Dark Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#040914');
      bgGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Faint Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const centerX = 390;
      const centerY = 160;

      // Plate dimensions
      const plateWidth = Math.max(120, Math.min(260, 100 + (plateAreaMm2 / 400) * 160));
      const plateGap = Math.max(40, Math.min(130, 30 + (separationMm / 10) * 90));

      const topPlateY = centerY - plateGap / 2;
      const bottomPlateY = centerY + plateGap / 2;

      // --- 1. DIELECTRIC LAYER & MOLECULAR DIPOLE POLARIZATION ---
      const activePreset = dielectricPresets.find(p => p.eps === dielectricEps) || dielectricPresets[0];

      if (dielectricEps > 1.0) {
        // Dielectric slab
        ctx.fillStyle = activePreset.color;
        ctx.fillRect(centerX - plateWidth / 2 + 6, topPlateY + 6, plateWidth - 12, plateGap - 12);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(centerX - plateWidth / 2 + 6, topPlateY + 6, plateWidth - 12, plateGap - 12);

        // Polarized Atomic Dipoles (+ - ellipses inside dielectric)
        if (voltage > 0) {
          const cols = Math.floor((plateWidth - 30) / 36);
          const rows = Math.floor((plateGap - 20) / 28);

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const dx = centerX - plateWidth / 2 + 25 + c * 36;
              const dy = topPlateY + 20 + r * 28;

              // Dipole Ellipse Body
              ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
              ctx.strokeStyle = '#a855f7';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.ellipse(dx, dy, 12, 7, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();

              // Dipole minus (top) & plus (bottom) charges
              ctx.fillStyle = '#60a5fa';
              ctx.font = 'bold 9px Inter';
              ctx.textAlign = 'center';
              ctx.fillText('-', dx - 5, dy + 3);

              ctx.fillStyle = '#f87171';
              ctx.fillText('+', dx + 5, dy + 3);
            }
          }
        }

        ctx.fillStyle = '#c084fc';
        ctx.font = 'extrabold 11px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${activePreset.name}`, centerX, centerY + 4);
      }


      // --- 2. UNIFORM ELECTRIC FIELD LINES E (Top Plate (+) to Bottom Plate (-)) ---
      if (voltage > 0) {
        const fieldLinesCount = Math.floor(plateWidth / 20);
        const eOpacity = Math.min(0.85, 0.15 + (electricFieldEv / 5) * 0.7);

        ctx.strokeStyle = `rgba(0, 242, 254, ${eOpacity})`;
        ctx.lineWidth = 1.8;
        ctx.fillStyle = `rgba(0, 242, 254, ${eOpacity})`;

        for (let i = 0; i < fieldLinesCount; i++) {
          const fx = centerX - plateWidth / 2 + 12 + i * 20;

          ctx.beginPath();
          ctx.moveTo(fx, topPlateY + 6);
          ctx.lineTo(fx, bottomPlateY - 6);
          ctx.stroke();

          // Arrow direction downwards (+ to -)
          ctx.beginPath();
          ctx.moveTo(fx, centerY + 8);
          ctx.lineTo(fx - 4, centerY);
          ctx.lineTo(fx + 4, centerY);
          ctx.fill();
        }
      }


      // --- 3. PARALLEL METAL PLATES & ELECTROSTATIC ACCUMULATED CHARGES ---
      // Top Metal Plate (Positive +)
      const topGrad = ctx.createLinearGradient(centerX - plateWidth / 2, topPlateY - 8, centerX + plateWidth / 2, topPlateY + 8);
      topGrad.addColorStop(0, '#f87171');
      topGrad.addColorStop(0.5, '#ef4444');
      topGrad.addColorStop(1, '#b91c1c');
      ctx.fillStyle = topGrad;
      ctx.fillRect(centerX - plateWidth / 2, topPlateY - 8, plateWidth, 16);
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX - plateWidth / 2, topPlateY - 8, plateWidth, 16);

      // Bottom Metal Plate (Negative -)
      const botGrad = ctx.createLinearGradient(centerX - plateWidth / 2, bottomPlateY - 8, centerX + plateWidth / 2, bottomPlateY + 8);
      botGrad.addColorStop(0, '#60a5fa');
      botGrad.addColorStop(0.5, '#3b82f6');
      botGrad.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = botGrad;
      ctx.fillRect(centerX - plateWidth / 2, bottomPlateY - 8, plateWidth, 16);
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(centerX - plateWidth / 2, bottomPlateY - 8, plateWidth, 16);

      // Free Charges on Metal Plates (+ on Top, - on Bottom)
      if (voltage > 0) {
        const chargeDensityCount = Math.floor((plateWidth - 20) / 16);
        ctx.font = 'extrabold 12px Inter';
        ctx.textAlign = 'center';

        for (let c = 0; c < chargeDensityCount; c++) {
          const cx = centerX - plateWidth / 2 + 15 + c * 16;
          // Positive charges (+) on top plate
          ctx.fillStyle = '#ffffff';
          ctx.fillText('+', cx, topPlateY + 4);

          // Negative charges (-) on bottom plate
          ctx.fillStyle = '#ffffff';
          ctx.fillText('-', cx, bottomPlateY + 4);
        }
      }

      // Plate Labels
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(isEn ? 'Top Plate (+)' : 'Bản cực Dương (+)', centerX - plateWidth / 2 - 12, topPlateY + 4);

      ctx.fillStyle = '#3b82f6';
      ctx.fillText(isEn ? 'Bottom Plate (-)' : 'Bản cực Âm (-)', centerX - plateWidth / 2 - 12, bottomPlateY + 4);


      // --- 4. DIMENSION INDICATOR LINES (Area A & Distance d) ---
      // Distance d dimension line (Right side)
      const dimX = centerX + plateWidth / 2 + 25;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dimX, topPlateY);
      ctx.lineTo(dimX, bottomPlateY);
      ctx.stroke();

      // Top & Bottom end caps
      ctx.beginPath(); ctx.moveTo(dimX - 6, topPlateY); ctx.lineTo(dimX + 6, topPlateY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(dimX - 6, bottomPlateY); ctx.lineTo(dimX + 6, bottomPlateY); ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`d = ${separationMm}mm`, dimX + 10, centerY + 4);


      // --- 5. DC POWER SUPPLY & WIRING ---
      const psuX = 100;
      const psuY = centerY;

      // Battery / Power Supply Unit Casing
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(psuX - 45, psuY - 40, 90, 80, 10);
      ctx.fill();
      ctx.stroke();

      // Digital LED Display in Power Supply
      ctx.fillStyle = '#022c22';
      ctx.fillRect(psuX - 35, psuY - 28, 70, 24);
      ctx.fillStyle = '#10b981';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${voltage.toFixed(1)} V`, psuX, psuY - 11);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px Inter';
      ctx.fillText('DC SOURCE', psuX, psuY + 14);
      ctx.fillText('U (0-24V)', psuX, psuY + 28);

      // Connecting Wires (Top + wire in Red, Bottom - wire in Blue)
      ctx.lineWidth = 3;

      // Top Red Wire (+)
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(psuX, psuY - 40);
      ctx.lineTo(psuX, topPlateY);
      ctx.lineTo(centerX - plateWidth / 2, topPlateY);
      ctx.stroke();

      // Bottom Blue Wire (-)
      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(psuX, psuY + 40);
      ctx.lineTo(psuX, bottomPlateY);
      ctx.lineTo(centerX - plateWidth / 2, bottomPlateY);
      ctx.stroke();


      // --- 6. REALTIME PHYSICS TITLE & HUD BANNER ---
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isEn
          ? `CAPACITANCE C = ${capacitancePf.toFixed(2)} pF | CHARGE Q = ${chargeNc.toFixed(2)} nC | ENERGY W = ${energyUj.toFixed(3)} µJ`
          : `ĐIỆN DUNG C = ${capacitancePf.toFixed(2)} pF | ĐIỆN TÍCH Q = ${chargeNc.toFixed(2)} nC | NĂNG LƯỢNG W = ${energyUj.toFixed(3)} µJ`,
        w * 0.5,
        28
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [voltage, plateAreaMm2, separationMm, dielectricEps, capacitancePf, chargeNc, energyUj, electricFieldEv, isEn]);

  const handleRecord = () => {
    onDataRecorded?.({
      voltage: `${voltage} V`,
      plateAreaMm2: `${plateAreaMm2} mm²`,
      separationMm: `${separationMm} mm`,
      dielectricEps,
      capacitancePf: `${capacitancePf.toFixed(2)} pF`,
      chargeNc: `${chargeNc.toFixed(2)} nC`,
      energyUj: `${energyUj.toFixed(3)} µJ`,
      electricFieldEv: `${electricFieldEv.toFixed(2)} kV/m`
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={720}
          height={320}
          className="w-full h-[320px] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl"
        />
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Capacitor Controls' : 'Tham số Tụ Điện'}
          </h3>

          {/* Voltage U */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Source Voltage U:' : 'Điện áp Nguồn U:'}</span>
              <span className="text-amber-400 font-bold">{voltage} V</span>
            </div>
            <input
              type="range" min="0" max="24" step="1"
              value={voltage}
              onChange={(e) => onParamChange('voltage', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Plate Area A */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Plate Area A:' : 'Diện tích Bản A:'}</span>
              <span className="text-cyan-400 font-bold">{plateAreaMm2} mm²</span>
            </div>
            <input
              type="range" min="100" max="500" step="10"
              value={plateAreaMm2}
              onChange={(e) => onParamChange('plateAreaMm2', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Separation Distance d */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Separation d:' : 'Khoảng cách d:'}</span>
              <span className="text-purple-400 font-bold">{separationMm} mm</span>
            </div>
            <input
              type="range" min="2" max="15" step="1"
              value={separationMm}
              onChange={(e) => onParamChange('separationMm', Number(e.target.value))}
              className="w-full accent-purple-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Dielectric Material Select */}
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isEn ? 'Dielectric Material (ε):' : 'Chất Điện môi (ε):'}</span>
            <div className="grid grid-cols-2 gap-1.5">
              {dielectricPresets.map((p) => (
                <button
                  key={p.eps}
                  onClick={() => onParamChange('dielectricEps', p.eps)}
                  className={`px-2 py-1.5 rounded-md text-[11px] font-bold transition-all text-left truncate ${
                    dielectricEps === p.eps
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'ELECTROSTATIC MEASUREMENTS' : 'Số liệu Điện trường & Tích điện'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Electric Field E:' : 'Cường độ Điện trường E:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{electricFieldEv.toFixed(2)} kV/m</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Stored Energy W:' : 'Năng lượng Điện trường W:'}</span>
              <span className="text-amber-400 font-bold text-sm">{energyUj.toFixed(3)} µJ</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Total Charge Q:' : 'Điện tích Q = C·U:'}</span>
                <span className="text-slate-400 text-[10px]">C = ε·ε₀·A/d</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{chargeNc.toFixed(2)} nC</span>
            </div>
          </div>

          <button
            onClick={handleRecord}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Capacitor Data' : 'Ghi Bảng Số liệu Tụ Điện'}
          </button>
        </div>
      </div>
    </div>
  );
}
