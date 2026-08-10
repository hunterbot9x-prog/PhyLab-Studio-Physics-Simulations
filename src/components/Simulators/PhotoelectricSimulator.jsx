import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Activity } from 'lucide-react';

export default function PhotoelectricSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const metals = {
    sodium: { name: isEn ? 'Sodium (Na)' : 'Natri (Na)', workFuncEv: 2.36 },
    potassium: { name: isEn ? 'Potassium (K)' : 'Kali (K)', workFuncEv: 2.29 },
    zinc: { name: isEn ? 'Zinc (Zn)' : 'Kẽm (Zn)', workFuncEv: 4.31 }
  };

  const selectedMetalKey = params.metal || 'sodium';
  const selectedMetal = metals[selectedMetalKey];

  const wavelengthNm = params.wavelengthNm || 350; // nm
  const hJss = 6.626e-34; // Planck constant
  const eCoulomb = 1.602e-19; // electron charge
  const cSpeed = 3e8; // speed of light

  const freqHz = cSpeed / (wavelengthNm * 1e-9); // Hz
  const photonEnergyJ = hJss * freqHz;
  const photonEnergyEv = photonEnergyJ / eCoulomb;

  // Stopping potential Vs = (h*f - Phi) / e (Volts)
  const stoppingVolts = Math.max(0, photonEnergyEv - selectedMetal.workFuncEv);
  const isEmissionOccurring = photonEnergyEv >= selectedMetal.workFuncEv;

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

    const vacuumX = 70;
    const vacuumY = 60;
    const vacuumW = 320;
    const vacuumH = 260;

    // 1. Draw Vacuum Phototube Chamber
    ctx.fillStyle = 'rgba(0, 242, 254, 0.05)';
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(vacuumX, vacuumY, vacuumW, vacuumH, 20);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(isEn ? 'VACUUM PHOTOTUBE' : 'BÌNH PHÙ CẦU CHÂN KHÔNG', vacuumX + 15, vacuumY + 22);

    // Cathode (-) Plate
    const cathodeX = vacuumX + 40;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cathodeX, vacuumY + 40, 16, vacuumH - 80);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter';
    ctx.fillText('Cathode K', cathodeX - 10, vacuumY + vacuumH - 20);

    // Anode (+) Plate
    const anodeX = vacuumX + vacuumW - 56;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(anodeX, vacuumY + 40, 16, vacuumH - 80);
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 11px Inter';
    ctx.fillText('Anode A', anodeX - 5, vacuumY + vacuumH - 20);

    // Emission Status Text
    ctx.fillStyle = isEmissionOccurring ? '#10b981' : '#f43f5e';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEmissionOccurring
        ? (isEn ? `⚡ PHOTOELECTRIC EMISSION OCCURRING (h·f > Φ = ${selectedMetal.workFuncEv}eV)` : `⚡ CÓ BỨT ELECTRON QUANG ĐIỆN (h·f > Φ = ${selectedMetal.workFuncEv}eV)`)
        : (isEn ? `⚠️ NO EMISSION (Photon Energy ${photonEnergyEv.toFixed(2)}eV < Work Function Φ)` : `⚠️ KHÔNG CÓ BỨT ELECTRON (Năng lượng ${photonEnergyEv.toFixed(2)}eV < Công thoát Φ)`),
      width * 0.5,
      35
    );

  }, [wavelengthNm, selectedMetalKey, photonEnergyEv, selectedMetal, isEmissionOccurring, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      metal: selectedMetal.name,
      workFunction: `${selectedMetal.workFuncEv} eV`,
      wavelengthNm: `${wavelengthNm} nm`,
      photonEnergy: `${photonEnergyEv.toFixed(2)} eV`,
      stoppingVolts: `${stoppingVolts.toFixed(2)} V`,
      emissionStatus: isEmissionOccurring ? (isEn ? 'Emission' : 'Bứt Electron') : (isEn ? 'No Emission' : 'Không bứt')
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
            <Zap className="w-4 h-4" /> {isEn ? 'Photoelectric Effect Controls' : 'Cambridge A Level Physics (Photoelectric)'}
          </h3>

          {/* Metal Cathode Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Cathode Metal:' : 'Kim loại Cathode:'}</label>
            <select
              value={selectedMetalKey}
              onChange={(e) => onParamChange('metal', e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-medium focus:border-cyan-400 focus:outline-none"
            >
              <option value="sodium">{isEn ? 'Sodium Na (Φ = 2.36 eV)' : 'Natri Na (Φ = 2.36 eV)'}</option>
              <option value="potassium">{isEn ? 'Potassium K (Φ = 2.29 eV)' : 'Kali K (Φ = 2.29 eV)'}</option>
              <option value="zinc">{isEn ? 'Zinc Zn (Φ = 4.31 eV)' : 'Kẽm Zn (Φ = 4.31 eV)'}</option>
            </select>
          </div>

          {/* Light Wavelength Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Light Wavelength λ:' : 'Bước sóng chùm sáng λ:'}</span>
              <span className="text-purple-400 font-bold">{wavelengthNm} nm</span>
            </div>
            <input
              type="range" min="200" max="600" step="10"
              value={wavelengthNm}
              onChange={(e) => onParamChange('wavelengthNm', Number(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'STOPPING POTENTIAL & ENERGY' : 'Điện thế Hãm Vs & Năng lượng'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Frequency f:' : 'Tần số f:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{(freqHz / 1e14).toFixed(2)}×10¹⁴ Hz</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Energy E = h·f:' : 'Năng lượng E = hf:'}</span>
              <span className="text-purple-400 font-bold text-sm">{photonEnergyEv.toFixed(2)} eV</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Stopping Potential V_s:' : 'Điện thế hãm V_s:'}</span>
                <span className="text-slate-400 text-[10px]">e V_s = h f - Φ</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{stoppingVolts.toFixed(2)} V</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Photoelectric Data' : 'Ghi Bảng Số liệu Quang điện'}
          </button>
        </div>
      </div>
    </div>
  );
}
