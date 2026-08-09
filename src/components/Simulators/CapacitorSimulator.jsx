import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function CapacitorSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const voltage = params.voltage || 6; // Volts
  const plateAreaMm2 = params.plateAreaMm2 || 200; // mm^2 (Area A)
  const separationMm = params.separationMm || 6; // mm (Distance d)
  const dielectricEps = params.dielectricEps || 1.0; // Dielectric constant (Air = 1.0, Paper = 3.5, Glass = 5.0)

  // Physics constants
  const eps0 = 8.854e-12; // F/m
  const areaM2 = plateAreaMm2 * 1e-6;
  const distM = separationMm * 1e-3;

  // Capacitance C = eps * eps0 * A / d (in Picofarads pF)
  const capacitancePf = ((dielectricEps * eps0 * areaM2) / distM) * 1e12;
  const chargeNc = (capacitancePf * voltage) / 1000; // Charge Q in nC
  const energyUj = (0.5 * capacitancePf * 1e-12 * Math.pow(voltage, 2)) * 1e6; // Energy W in microjoules µJ

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    const centerX = 380;
    const centerY = 170;

    // Plate geometry visualization
    const plateWidth = 100 + (plateAreaMm2 / 400) * 150;
    const plateGap = 30 + (separationMm / 10) * 80;

    const topPlateY = centerY - plateGap / 2;
    const bottomPlateY = centerY + plateGap / 2;

    // 1. Dielectric Material Fill between plates
    if (dielectricEps > 1.0) {
      ctx.fillStyle = dielectricEps > 3.0 ? 'rgba(168, 85, 247, 0.25)' : 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(centerX - plateWidth / 2 + 5, topPlateY + 6, plateWidth - 10, plateGap - 12);

      ctx.fillStyle = '#a855f7';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? `Dielectric Layer ε = ${dielectricEps}` : `Lớp Điện môi ε = ${dielectricEps}`, centerX, centerY + 4);
    }

    // 2. Parallel Metal Plates
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.fillRect(centerX - plateWidth / 2, topPlateY - 6, plateWidth, 12);

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(centerX - plateWidth / 2, bottomPlateY - 6, plateWidth, 12);

    // HUD Info Text
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `CAPACITANCE C = ${capacitancePf.toFixed(2)} pF | CHARGE Q = ${chargeNc.toFixed(2)} nC`
        : `ĐIỆN DUNG C = ${capacitancePf.toFixed(2)} pF | ĐIỆN TÍCH Q = ${chargeNc.toFixed(2)} nC`,
      w * 0.5,
      35
    );

  }, [voltage, plateAreaMm2, separationMm, dielectricEps, capacitancePf, chargeNc, isEn]);

  const handleRecord = () => {
    onDataRecorded?.({
      voltage: `${voltage} V`,
      plateAreaMm2: `${plateAreaMm2} mm²`,
      separationMm: `${separationMm} mm`,
      dielectricEps,
      capacitancePf: `${capacitancePf.toFixed(2)} pF`,
      chargeNc: `${chargeNc.toFixed(2)} nC`,
      energyUj: `${energyUj.toFixed(3)} µJ`
    });
  };

  return (
    <div className="sim-container flex flex-col gap-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={720}
        height={320}
        className="w-full h-[320px] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl"
      />

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Source Voltage U:' : 'Điện áp Nguồn U:'}</span>
            <span className="text-amber-400 font-bold">{voltage} V</span>
          </div>
          <input
            type="range" min="0" max="12" step="1"
            value={voltage}
            onChange={(e) => onParamChange('voltage', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Plate Area A:' : 'Diện tích Bản A:'}</span>
            <span className="text-cyan-400 font-bold">{plateAreaMm2} mm²</span>
          </div>
          <input
            type="range" min="100" max="400" step="20"
            value={plateAreaMm2}
            onChange={(e) => onParamChange('plateAreaMm2', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Separation d:' : 'Khoảng cách d:'}</span>
            <span className="text-purple-400 font-bold">{separationMm} mm</span>
          </div>
          <input
            type="range" min="2" max="10" step="1"
            value={separationMm}
            onChange={(e) => onParamChange('separationMm', Number(e.target.value))}
            className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Dielectric Constant ε:' : 'Chất Điện môi ε:'}</span>
            <span className="text-emerald-400 font-bold">{dielectricEps}</span>
          </div>
          <input
            type="range" min="1.0" max="5.0" step="0.5"
            value={dielectricEps}
            onChange={(e) => onParamChange('dielectricEps', Number(e.target.value))}
            className="w-full accent-emerald-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={handleRecord}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-violet-600/20"
        >
          <Plus className="w-4 h-4" /> {isEn ? 'RECORD DATA POINT' : 'GHI BẢNG SỐ LIỆU'}
        </button>
      </div>
    </div>
  );
}
