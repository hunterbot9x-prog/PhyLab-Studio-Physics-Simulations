import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Info } from 'lucide-react';

export default function ResistivityWireSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const materials = {
    nichrome: { name: isEn ? 'Nichrome' : 'Niken-Crom (Nichrome)', rho: 1.1e-6 },
    constantan: { name: isEn ? 'Constantan' : 'Constantan (Đồng-Niken)', rho: 4.9e-7 },
    manganin: { name: isEn ? 'Manganin' : 'Manganin (Đồng-Mangan)', rho: 4.8e-7 },
    copper: { name: isEn ? 'Copper' : 'Đồng tinh khiết (Copper)', rho: 1.7e-8 }
  };

  const selectedMaterialKey = params.material || 'constantan';
  const activeMaterial = materials[selectedMaterialKey] || materials.constantan;

  const wireLengthCm = params.wireLengthCm || 50; // cm (10cm - 100cm)
  const wireDiameterMm = params.wireDiameterMm || 0.45; // mm (0.2mm - 1.0mm)
  const driverVoltageV = params.driverVoltageV || 2.0; // Volts DC supply

  // Physics calculations
  const wireRadiusM = (wireDiameterMm * 1e-3) / 2;
  const crossAreaM2 = Math.PI * Math.pow(wireRadiusM, 2); // Area A = pi*r^2
  const lengthM = wireLengthCm * 1e-2;

  // Resistance R = rho * L / A
  const resistanceOhm = (activeMaterial.rho * lengthM) / crossAreaM2;
  const circuitCurrentA = driverVoltageV / (resistanceOhm + 0.2); // 0.2 ohm wire internal
  const measuredVoltageV = circuitCurrentA * resistanceOhm;

  const measuredResistivityRho = (resistanceOhm * crossAreaM2) / lengthM;

  // Dynamic Realtime Physics Description Generator
  const getPhysicsDescription = () => {
    return isEn
      ? `⚡ [Resistivity ρ = ${measuredResistivityRho.toExponential(2)} Ω·m] Wire length L = ${wireLengthCm}cm, diameter d = ${wireDiameterMm}mm (Area A = ${(crossAreaM2 * 1e6).toFixed(3)} mm²). Measured Resistance R = ${resistanceOhm.toFixed(2)} Ω. Formula R = ρ·L/A shows Resistance is directly proportional to Length L!`
      : `⚡ [Điện trở suất ρ = ${measuredResistivityRho.toExponential(2)} Ω·m] Dây dài L = ${wireLengthCm} cm, đường kính d = ${wireDiameterMm} mm (Diện tích A = ${(crossAreaM2 * 1e6).toFixed(3)} mm²). Điện trở đo được R = ${resistanceOhm.toFixed(2)} Ω. Công thức R = ρ·L/A chứng minh điện trở tỉ lệ thuận với chiều dài L!`;
  };

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

      // Title HUD Banner
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(
        isEn
          ? `CAMBRIDGE A LEVEL 9702: WIRE RESISTIVITY ρ = R·A / L | MATERIAL: ${activeMaterial.name}`
          : `CAMBRIDGE A LEVEL 9702: ĐIỆN TRỞ SUẤT DÂY KIM LOẠI ρ = R·A / L | CHẤT LIỆU: ${activeMaterial.name}`,
        25,
        26
      );


      // --- SECTION 1: METRE RULE BOARD & RESISTANCE WIRE (Left side, x: 25 to 330) ---
      const boardX = 25;
      const boardY = 55;
      const boardW = 310;
      const boardH = 140;

      // Wooden Metre Rule Base
      ctx.fillStyle = '#1e1b18';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boardX, boardY, boardW, boardH, 10);
      ctx.fill(); ctx.stroke();

      // Rule ticks (0cm to 100cm)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 8px Inter';
      ctx.textAlign = 'center';

      for (let mark = 0; mark <= 10; mark++) {
        const mx = boardX + 20 + mark * 27;
        ctx.beginPath();
        ctx.moveTo(mx, boardY + 10);
        ctx.lineTo(mx, boardY + 22);
        ctx.stroke();
        ctx.fillText(`${mark * 10}cm`, mx, boardY + 32);
      }

      // Metallic Resistance Wire along ruler
      const wireY = boardY + 65;
      const wireStartX = boardX + 20;
      const wireLengthPx = 270;
      const activeJockeyX = wireStartX + (wireLengthCm / 100) * wireLengthPx;
      const wireThickPx = Math.max(2, wireDiameterMm * 4);

      // Inactive wire segment
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = wireThickPx;
      ctx.beginPath();
      ctx.moveTo(wireStartX, wireY);
      ctx.lineTo(wireStartX + wireLengthPx, wireY);
      ctx.stroke();

      // Active wire segment (glowing amber)
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = wireThickPx;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(wireStartX, wireY);
      ctx.lineTo(activeJockeyX, wireY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Brass Binding Posts (Left & Right Ends)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(wireStartX, wireY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(wireStartX + wireLengthPx, wireY, 6, 0, Math.PI * 2); ctx.fill();

      // Sliding Contact Jockey Indicator (Arrow at activeJockeyX)
      ctx.fillStyle = '#00f2fe';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(activeJockeyX, wireY - 18);
      ctx.lineTo(activeJockeyX - 6, wireY - 28);
      ctx.lineTo(activeJockeyX + 6, wireY - 28);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 10px Inter';
      ctx.fillText(`Jockey (${wireLengthCm}cm)`, activeJockeyX, wireY - 32);


      // --- SECTION 2: MICROMETER SCREW GAUGE DISPLAY (Bottom left) ---
      const microY = boardY + boardH + 20;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(boardX, microY, boardW, 80, 8);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(isEn ? 'MICROMETER SCREW GAUGE' : 'THƯỚC KẸP PANME (MICROMETER)', boardX + 12, microY + 20);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(isEn ? `Wire Diameter d = ${wireDiameterMm.toFixed(2)} mm` : `Đường kính dây d = ${wireDiameterMm.toFixed(2)} mm`, boardX + 12, microY + 40);
      ctx.fillText(isEn ? `Cross Section A = π·(d/2)² = ${(crossAreaM2 * 1e6).toFixed(4)} mm²` : `Tiết diện A = π·(d/2)² = ${(crossAreaM2 * 1e6).toFixed(4)} mm²`, boardX + 12, microY + 58);


      // --- SECTION 3: REALTIME R vs L GRAPH (Right side, x: 360 to 520) ---
      const gx = 360;
      const gy = 55;
      const gw = 165;
      const gh = 240;

      // Graph Panel Container
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(gx, gy, gw, gh, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'RESISTANCE R vs LENGTH L' : 'ĐỒ THỊ R THEO L CHIỀU DÀI', gx + gw / 2, gy + 16);

      // Axes
      const originX = gx + 45;
      const originY = gy + gh - 35;
      const axisW = gw - 55;
      const axisH = gh - 55;

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(originX, gy + 25);
      ctx.lineTo(originX, originY);
      ctx.lineTo(originX + axisW, originY);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.fillText('R(Ω)', originX - 10, gy + 30);
      ctx.fillText('L(cm)', originX + axisW - 5, originY + 16);

      // Theoretical Linear R(L) Line
      const maxL = 100; // cm
      const maxR = (activeMaterial.rho * 1.0) / crossAreaM2; // R at 100cm

      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + axisW, originY - axisH);
      ctx.stroke();

      // Current Operating Point Dot
      const curPx = originX + (wireLengthCm / maxL) * axisW;
      const curPy = originY - (resistanceOhm / maxR) * axisH;

      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [wireLengthCm, wireDiameterMm, driverVoltageV, activeMaterial, resistanceOhm, crossAreaM2, measuredResistivityRho, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      material: activeMaterial.name,
      wireLengthCm: `${wireLengthCm} cm`,
      wireDiameterMm: `${wireDiameterMm} mm`,
      crossAreaMm2: `${(crossAreaM2 * 1e6).toFixed(4)} mm²`,
      resistanceOhm: `${resistanceOhm.toFixed(2)} Ω`,
      resistivityRho: `${measuredResistivityRho.toExponential(3)} Ω·m`
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={320}
          className="w-full max-w-[540px] h-[320px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* DYNAMIC REALTIME PHYSICAL PHENOMENON LOG BANNER */}
        <div className="w-full max-w-[540px] mt-3 bg-slate-900/90 p-3 rounded-xl border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {getPhysicsDescription()}
          </p>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Resistivity Wire Controls' : 'Tham số Dây Kim Loại'}
          </h3>

          {/* Material Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Wire Material:' : 'Chất liệu Dây dẫn:'}</label>
            <select
              value={selectedMaterialKey}
              onChange={(e) => onParamChange('material', e.target.value)}
              className="w-full bg-slate-950 text-cyan-400 text-xs font-bold p-2 rounded-lg border border-slate-800 focus:outline-none"
            >
              {Object.entries(materials).map(([key, m]) => (
                <option key={key} value={key}>
                  {m.name} (ρ = {m.rho.toExponential(2)} Ω·m)
                </option>
              ))}
            </select>
          </div>

          {/* Wire Length L Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Wire Length L:' : 'Chiều dài dây L:'}</span>
              <span className="text-amber-400 font-bold">{wireLengthCm} cm</span>
            </div>
            <input
              type="range" min="10" max="100" step="1"
              value={wireLengthCm}
              onChange={(e) => onParamChange('wireLengthCm', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-amber-400"
            />
          </div>

          {/* Wire Diameter d Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Diameter d (Micrometer):' : 'Đường kính d (Panme):'}</span>
              <span className="text-cyan-400 font-bold">{wireDiameterMm.toFixed(2)} mm</span>
            </div>
            <input
              type="range" min="0.20" max="1.00" step="0.05"
              value={wireDiameterMm}
              onChange={(e) => onParamChange('wireDiameterMm', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> {isEn ? 'MEASURED RESISTIVITY' : 'Số liệu Điện trở & Điện trở suất'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Resistance R:' : 'Điện trở R = V/I:'}</span>
              <span className="text-amber-400 font-bold text-sm">{resistanceOhm.toFixed(2)} Ω</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Area A:' : 'Tiết diện A:'}</span>
              <span className="text-purple-400 font-bold text-sm">{(crossAreaM2 * 1e6).toFixed(3)} mm²</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Resistivity ρ:' : 'Điện trở suất ρ:'}</span>
                <span className="text-slate-400 text-[10px]">ρ = R·A / L</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{measuredResistivityRho.toExponential(2)} Ω·m</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Resistivity Data' : 'Ghi Bảng Số liệu Điện trở suất'}
          </button>
        </div>
      </div>
    </div>
  );
}
