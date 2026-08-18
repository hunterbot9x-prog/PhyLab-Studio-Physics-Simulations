import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, RotateCcw, ShieldCheck, Sliders, Layers, Award, Zap, Activity } from 'lucide-react';

export default function BohrAtomSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Initial and Final Quantum States n (1 to 6)
  const initialOrbitN = params.initialOrbitN !== undefined ? params.initialOrbitN : 3; // n_high (e.g. 3)
  const finalOrbitN = params.finalOrbitN !== undefined ? params.finalOrbitN : 2; // n_low (e.g. 2 -> Balmer H-alpha Red)
  const autoRotate = params.autoRotate !== undefined ? params.autoRotate : true;

  const [currentOrbit, setCurrentOrbit] = useState(initialOrbitN);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [emittedPhoton, setEmittedPhoton] = useState(null);
  const timeRef = useRef(0);

  // Physical Constants
  const hPlanck = 6.626e-34; // J*s
  const cSpeed = 3e8; // m/s
  const eCharge = 1.602e-19; // C
  const r0BohrRadiusNm = 0.0529; // nm (0.529 Angstrom)
  const E1_eV = -13.6; // Ground state energy in eV

  // Energy Levels En = -13.6 / n^2 (eV)
  const getEnergy_eV = (n) => E1_eV / (n * n);
  const getRadius_nm = (n) => n * n * r0BohrRadiusNm;

  const orbitNames = { 1: 'K (n=1)', 2: 'L (n=2)', 3: 'M (n=3)', 4: 'N (n=4)', 5: 'O (n=5)', 6: 'P (n=6)' };

  const E_init = getEnergy_eV(initialOrbitN);
  const E_final = getEnergy_eV(finalOrbitN);
  const deltaE_eV = Math.abs(E_init - E_final);
  const isEmission = initialOrbitN > finalOrbitN;

  // Photon Wavelength λ = hc / ΔE (nm)
  let wavelengthNm = 0;
  let freqHz = 0;
  if (deltaE_eV > 0) {
    const deltaE_Joules = deltaE_eV * eCharge;
    wavelengthNm = (hPlanck * cSpeed) / deltaE_Joules * 1e9;
    freqHz = deltaE_Joules / hPlanck;
  }

  // Spectral Series Classification
  const getSpectralSeries = (n_low, n_high) => {
    if (n_low === 1) return { name: 'Lyman (Tử ngoại / UV)', series: 'Lyman', region: 'UV (Tử ngoại)', color: '#c084fc' };
    if (n_low === 2) {
      let lineName = 'Balmer';
      let color = '#38bdf8';
      if (n_high === 3) { lineName = 'Balmer Hα (Đỏ - 656 nm)'; color = '#ef4444'; }
      else if (n_high === 4) { lineName = 'Balmer Hβ (Lam - 486 nm)'; color = '#38bdf8'; }
      else if (n_high === 5) { lineName = 'Balmer Hγ (Chàm - 434 nm)'; color = '#818cf8'; }
      else if (n_high === 6) { lineName = 'Balmer Hδ (Tím - 410 nm)'; color = '#c084fc'; }
      return { name: lineName, series: 'Balmer', region: 'Visible (Nhìn thấy)', color };
    }
    if (n_low === 3) return { name: 'Paschen (Hồng ngoại / IR)', series: 'Paschen', region: 'IR (Hồng ngoại)', color: '#f87171' };
    if (n_low === 4) return { name: 'Brackett (Hồng ngoại xa)', series: 'Brackett', region: 'Far-IR', color: '#fb923c' };
    return { name: 'Pfund (Hồng ngoại)', series: 'Pfund', region: 'Far-IR', color: '#fb7185' };
  };

  const currentSeriesInfo = getSpectralSeries(Math.min(initialOrbitN, finalOrbitN), Math.max(initialOrbitN, finalOrbitN));

  // Animation Loop
  useEffect(() => {
    if (autoRotate) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.03;
        setAnimProgress(timeRef.current);
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [autoRotate, animProgress]);

  // Trigger Quantum Jump Transition
  const triggerJump = () => {
    setIsTransitioning(true);
    setCurrentOrbit(initialOrbitN);

    // Emit photon wavepacket
    setEmittedPhoton({
      x: 180,
      y: 190,
      progress: 0,
      color: currentSeriesInfo.color
    });

    setTimeout(() => {
      setCurrentOrbit(finalOrbitN);
      setIsTransitioning(false);
    }, 900);
  };

  const handleReset = () => {
    setCurrentOrbit(initialOrbitN);
    setIsTransitioning(false);
    setEmittedPhoton(null);
    timeRef.current = 0;
    setAnimProgress(0);
  };

  // 60 FPS Canvas Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Space Background
    const bgGrad = ctx.createRadialGradient(180, 190, 10, 180, 190, 260);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const atomCenterX = 180;
    const atomCenterY = 190;
    const baseRadiusPx = 28; // Scale factor for orbits

    // -------------------------------------------------------------
    // 1. DRAW BOHR STATIONARY CIRCULAR ORBITS (n = 1 to 6)
    // -------------------------------------------------------------
    for (let n = 1; n <= 6; n++) {
      // Visual scale: scaled with sqrt for pleasing aesthetic fit on screen
      const orbitRadiusPx = baseRadiusPx + Math.pow(n, 1.45) * 18;

      ctx.beginPath();
      ctx.arc(atomCenterX, atomCenterY, orbitRadiusPx, 0, 2 * Math.PI);
      
      const isSelectedOrbit = n === initialOrbitN || n === finalOrbitN;
      ctx.strokeStyle = isSelectedOrbit ? 'rgba(56, 189, 248, 0.8)' : 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = isSelectedOrbit ? 2 : 1;
      if (isSelectedOrbit) {
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Orbit Name Label
      ctx.font = 'bold 9px Inter';
      ctx.fillStyle = isSelectedOrbit ? '#38bdf8' : '#64748b';
      ctx.textAlign = 'left';
      ctx.fillText(`n=${n} (${orbitNames[n].split(' ')[0]})`, atomCenterX + orbitRadiusPx + 4, atomCenterY - 4);
    }

    // -------------------------------------------------------------
    // 2. POSITIVE PROTON NUCLEUS (+e)
    // -------------------------------------------------------------
    const nucleusGrad = ctx.createRadialGradient(atomCenterX, atomCenterY, 2, atomCenterX, atomCenterY, 14);
    nucleusGrad.addColorStop(0, '#fde047');
    nucleusGrad.addColorStop(0.6, '#ef4444');
    nucleusGrad.addColorStop(1, '#b91c1c');
    ctx.fillStyle = nucleusGrad;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(atomCenterX, atomCenterY, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = 'bold 11px Inter';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('+Ze', atomCenterX, atomCenterY + 4);

    // -------------------------------------------------------------
    // 3. ORBITING ELECTRON e⁻
    // -------------------------------------------------------------
    const currentOrbitRadiusPx = baseRadiusPx + Math.pow(currentOrbit, 1.45) * 18;
    const electronAngularSpeed = 3.0 / Math.pow(currentOrbit, 1.2);
    const electronAngle = animProgress * electronAngularSpeed;
    const electronX = atomCenterX + currentOrbitRadiusPx * Math.cos(electronAngle);
    const electronY = atomCenterY + currentOrbitRadiusPx * Math.sin(electronAngle);

    // Electron Glow & Core
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(electronX, electronY, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('e⁻', electronX, electronY + 3);

    // -------------------------------------------------------------
    // 4. EMITTED / ABSORBED PHOTON WAVEPACKET ANIMATION
    // -------------------------------------------------------------
    if (emittedPhoton) {
      const photonDist = (animProgress * 70) % 220;
      const photonAngle = Math.PI / 4; // Fly northeast
      const px = electronX + photonDist * Math.cos(photonAngle);
      const py = electronY - photonDist * Math.sin(photonAngle);

      // Draw photon wavepacket sine wiggle
      ctx.strokeStyle = currentSeriesInfo.color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = currentSeriesInfo.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const waveLen = 30;
      for (let w = 0; w <= waveLen; w++) {
        const wx = px + w;
        const wy = py + Math.sin(w * 0.8 - animProgress * 15) * 6;
        if (w === 0) ctx.moveTo(wx, wy); else ctx.lineTo(wx, wy);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = currentSeriesInfo.color;
      ctx.font = 'bold 9px Inter';
      ctx.fillText(`Photon hf (λ = ${wavelengthNm.toFixed(1)} nm)`, px + 15, py - 10);
    }

    // -------------------------------------------------------------
    // 5. ENERGY LEVEL LADDER DIAGRAM (Right Side: 350 to 520 px)
    // -------------------------------------------------------------
    const ladderX = 360;
    const ladderW = 150;
    const ladderTopY = 40;
    const ladderBotY = 320;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(ladderX - 10, ladderTopY - 15, ladderW + 20, ladderBotY - ladderTopY + 30);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(ladderX - 10, ladderTopY - 15, ladderW + 20, ladderBotY - ladderTopY + 30);

    ctx.font = 'bold 10px Inter';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? 'Energy Levels En (eV)' : 'Mức Năng Lượng En (eV)', ladderX + ladderW / 2, ladderTopY - 2);

    // Draw energy rungs En = -13.6 / n^2
    for (let n = 1; n <= 6; n++) {
      const en = getEnergy_eV(n);
      // Map En: -13.6 eV -> ladderBotY; 0 eV -> ladderTopY
      const rungY = ladderTopY + (Math.abs(en) / 13.6) * (ladderBotY - ladderTopY);

      const isCurrentRung = n === currentOrbit;
      ctx.strokeStyle = isCurrentRung ? '#38bdf8' : '#64748b';
      ctx.lineWidth = isCurrentRung ? 3 : 1.5;
      if (isCurrentRung) {
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.moveTo(ladderX, rungY);
      ctx.lineTo(ladderX + ladderW, rungY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      ctx.font = 'bold 9px Inter';
      ctx.fillStyle = isCurrentRung ? '#38bdf8' : '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText(`n=${n}`, ladderX + 4, rungY - 3);
      ctx.textAlign = 'right';
      ctx.fillText(`${en.toFixed(2)} eV`, ladderX + ladderW - 4, rungY - 3);
    }

    // Transition Arrow on Ladder
    const yInit = ladderTopY + (Math.abs(E_init) / 13.6) * (ladderBotY - ladderTopY);
    const yFinal = ladderTopY + (Math.abs(E_final) / 13.6) * (ladderBotY - ladderTopY);
    const arrowX = ladderX + ladderW / 2;

    ctx.strokeStyle = currentSeriesInfo.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = currentSeriesInfo.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(arrowX, yInit);
    ctx.lineTo(arrowX, yFinal);
    ctx.stroke();

    // Arrow head
    const arrowDir = yFinal > yInit ? 1 : -1;
    ctx.fillStyle = currentSeriesInfo.color;
    ctx.beginPath();
    ctx.moveTo(arrowX, yFinal);
    ctx.lineTo(arrowX - 5, yFinal - arrowDir * 8);
    ctx.lineTo(arrowX + 5, yFinal - arrowDir * 8);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // -------------------------------------------------------------
    // 6. HYDROGEN EMISSION SPECTRUM BAR (Bottom: 355 to 395 px)
    // -------------------------------------------------------------
    const specX = 30;
    const specY = 360;
    const specW = width - 60;
    const specH = 28;

    ctx.fillStyle = '#020617';
    ctx.fillRect(specX, specY, specW, specH);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(specX, specY, specW, specH);

    // Draw Hydrogen Balmer Visible Spectral Lines
    const balmerLines = [
      { name: 'Hα', lambda: 656.3, color: '#ef4444' }, // Red (3 -> 2)
      { name: 'Hβ', lambda: 486.1, color: '#38bdf8' }, // Cyan (4 -> 2)
      { name: 'Hγ', lambda: 434.0, color: '#818cf8' }, // Blue-violet (5 -> 2)
      { name: 'Hδ', lambda: 410.2, color: '#c084fc' }  // Violet (6 -> 2)
    ];

    balmerLines.forEach(line => {
      // Map 380 nm to 750 nm onto specW
      const lx = specX + ((line.lambda - 380) / (750 - 380)) * specW;
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = line.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(lx, specY);
      ctx.lineTo(lx, specY + specH);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = 'bold 8px Inter';
      ctx.fillStyle = line.color;
      ctx.textAlign = 'center';
      ctx.fillText(`${line.name} ${line.lambda}nm`, lx, specY - 3);
    });

  }, [animProgress, currentOrbit, initialOrbitN, finalOrbitN, emittedPhoton]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        Transition: `${orbitNames[initialOrbitN]} -> ${orbitNames[finalOrbitN]}`,
        E_initial_eV: `${E_init.toFixed(2)} eV`,
        E_final_eV: `${E_final.toFixed(2)} eV`,
        DeltaE_eV: `${deltaE_eV.toFixed(2)} eV`,
        Wavelength_nm: `${wavelengthNm.toFixed(1)} nm`,
        Frequency_THz: `${(freqHz / 1e12).toFixed(2)} THz`,
        Series: currentSeriesInfo.name
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

        {/* Trigger Transition Button */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={triggerJump}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition-all active:scale-95"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            {isEn ? 'Trigger Quantum Jump & Emit Photon' : 'Kích Hoạt Chuyển Mức & Phát Xạ Photon'}
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
          <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> {isEn ? 'Bohr Quantum State Controls' : 'Điều Khiển Mức Lượng Tử Bohr'}
          </h3>

          {/* Initial State n_initial */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Initial State (n_high):' : 'Trạng thái ban đầu (n_cao):'}</span>
              <span className="text-pink-400 font-bold">{orbitNames[initialOrbitN]}</span>
            </div>
            <input
              type="range" min="2" max="6" step="1"
              value={initialOrbitN}
              onChange={(e) => onParamChange('initialOrbitN', Number(e.target.value))}
              className="w-full accent-pink-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Final State n_final */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Final State (n_low):' : 'Trạng thái chuyển về (n_thấp):'}</span>
              <span className="text-cyan-400 font-bold">{orbitNames[finalOrbitN]}</span>
            </div>
            <input
              type="range" min="1" max="5" step="1"
              value={finalOrbitN}
              onChange={(e) => onParamChange('finalOrbitN', Math.min(Number(e.target.value), initialOrbitN - 1))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Quick Preset Balmer Transitions */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? '🌈 Balmer Visible Lines Presets:' : '🌈 Các Vạch Quang Phổ Balmer:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => { onParamChange('initialOrbitN', 3); onParamChange('finalOrbitN', 2); }}
                className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 font-bold hover:bg-red-900/60"
              >
                🔴 Hα (3→2) 656nm
              </button>
              <button
                onClick={() => { onParamChange('initialOrbitN', 4); onParamChange('finalOrbitN', 2); }}
                className="p-1.5 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-300 font-bold hover:bg-sky-900/60"
              >
                🔵 Hβ (4→2) 486nm
              </button>
              <button
                onClick={() => { onParamChange('initialOrbitN', 5); onParamChange('finalOrbitN', 2); }}
                className="p-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 font-bold hover:bg-indigo-900/60"
              >
                🟣 Hγ (5→2) 434nm
              </button>
              <button
                onClick={() => { onParamChange('initialOrbitN', 6); onParamChange('finalOrbitN', 2); }}
                className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-900/60"
              >
                🟣 Hδ (6→2) 410nm
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'SPECTRAL & ENERGY ANALYSIS' : 'Quang Phổ & Năng Lượng Photon'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Photon Energy ΔE:' : 'Năng lượng photon ΔE:'}</span>
              <span className="text-pink-400 font-bold text-sm">{deltaE_eV.toFixed(2)} eV</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Wavelength λ:' : 'Bước sóng phát xạ λ:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{wavelengthNm.toFixed(1)} nm</span>
            </div>

            <div className="col-span-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[11px] block">{isEn ? 'Spectral Series:' : 'Dãy quang phổ:'}</span>
                <span className="text-amber-300 font-bold text-xs">{currentSeriesInfo.name}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentSeriesInfo.region}
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Bohr Spectral Data' : 'Ghi Bảng Số Liệu Quang Phổ Bohr'}
          </button>
        </div>
      </div>
    </div>
  );
}
