import React, { useEffect, useRef, useState } from 'react';
import { Zap, Activity, ShieldCheck, Gauge } from 'lucide-react';

export default function InternalResistanceSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
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
  const internalPowerWatts = currentAmp * currentAmp * internalR;

  const isMaxPowerTransfer = Math.abs(loadR - internalR) < 0.1;

  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    let animId;
    let time = 0;

    const render = () => {
      time += 0.025;
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

      // Title & Status HUD Banner
      ctx.fillStyle = isMaxPowerTransfer ? '#10b981' : '#00f2fe';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isMaxPowerTransfer
          ? (isEn ? `⚡ MAXIMUM POWER MATCHING (R = r = ${internalR}Ω | P_max = ${powerWatts.toFixed(2)}W)` : `⚡ ĐẠT CỘNG HƯỞNG CÔNG SUẤT MẠCH NGOÀI (R = r = ${internalR}Ω | P_max = ${powerWatts.toFixed(2)}W)`)
          : (isEn ? `TERMINAL VOLTAGE V = E - I·r = ${terminalVolts.toFixed(2)} V` : `ĐIỆN ÁP ĐẦU CỰC V = E - I·r = ${terminalVolts.toFixed(2)} V`),
        w * 0.5,
        24
      );


      // --- SECTION 1: REALISTIC PHYSICAL CIRCUIT WIRING (Left side, x: 20 to 330) ---
      const cktL = 40;
      const cktR = 330;
      const cktT = 55;
      const cktB = 275;

      // Outer Circuit Copper Wire
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cktL, cktT);
      ctx.lineTo(cktR, cktT);
      ctx.lineTo(cktR, cktB);
      ctx.lineTo(cktL, cktB);
      ctx.closePath();
      ctx.stroke();

      // Flowing Electron Particles along wire
      const currentSpeed = Math.min(3.5, currentAmp * 1.2);
      if (currentSpeed > 0.05) {
        ctx.fillStyle = '#00f5d4';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 6;
        const totalLen = 2 * (cktR - cktL) + 2 * (cktB - cktT);
        const particleCount = 20;

        for (let p = 0; p < particleCount; p++) {
          let dist = (p * (totalLen / particleCount) + time * currentSpeed * 35) % totalLen;
          let px, py;

          if (dist < (cktR - cktL)) { // Top wire (left to right)
            px = cktL + dist; py = cktT;
          } else if (dist < (cktR - cktL + cktB - cktT)) { // Right wire (top to bottom)
            px = cktR; py = cktT + (dist - (cktR - cktL));
          } else if (dist < (2 * (cktR - cktL) + cktB - cktT)) { // Bottom wire (right to left)
            px = cktR - (dist - (cktR - cktL + cktB - cktT)); py = cktB;
          } else { // Left wire (bottom to top)
            px = cktL; py = cktB - (dist - (2 * (cktR - cktL) + cktB - cktT));
          }

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }


      // --- COMPONENT 1: BATTERY CELL CONTAINER (Top Wire) ---
      const battX = (cktL + cktR) / 2;
      const battY = cktT;
      const battW = 190;
      const battH = 46;

      // Heat Dissipation Glow inside battery due to r
      if (internalPowerWatts > 0.5) {
        ctx.fillStyle = `rgba(244, 63, 94, ${Math.min(0.4, internalPowerWatts * 0.05)})`;
        ctx.beginPath();
        ctx.roundRect(battX - battW / 2, battY - battH / 2, battW, battH, 10);
        ctx.fill();
      }

      // Battery Casing
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(battX - battW / 2, battY - battH / 2, battW, battH, 10);
      ctx.fill();
      ctx.stroke();

      // Battery Terminals (+) and (-)
      ctx.fillStyle = '#ef4444';
      ctx.font = 'extrabold 12px Inter';
      ctx.fillText('(+)', battX - battW / 2 + 16, battY + 4);

      ctx.fillStyle = '#3b82f6';
      ctx.fillText('(-)', battX + battW / 2 - 16, battY + 4);

      // Ideal EMF E Symbol
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`E = ${emfVolts}V`, battX - 42, battY + 4);

      // Internal Resistance r Resistor Symbol
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(battX + 15, battY - 10, 42, 20);
      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(`r=${internalR}Ω`, battX + 36, battY + 4);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.fillText(isEn ? 'BATTERY CELL WITH INTERNAL r' : 'PIN CÓ ĐIỆN TRỞ TRONG r', battX, battY - 27);


      // --- COMPONENT 2: DIGITAL VOLTMETER V (Across Battery Terminals) ---
      const voltY = cktT - 30;
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);

      // Voltmeter Lead Wires
      ctx.beginPath();
      ctx.moveTo(battX - battW / 2 + 16, battY - battH / 2);
      ctx.lineTo(battX - battW / 2 + 16, voltY);
      ctx.lineTo(battX + battW / 2 - 16, voltY);
      ctx.lineTo(battX + battW / 2 - 16, battY - battH / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Voltmeter Meter Unit
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(battX, voltY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('V', battX, voltY + 4);

      ctx.fillStyle = '#e9d5ff';
      ctx.font = 'bold 11px Inter';
      ctx.fillText(`V = ${terminalVolts.toFixed(2)}V`, battX, voltY - 22);


      // --- COMPONENT 3: EXTERNAL LOAD RESISTOR R (Bottom Wire) ---
      const loadX = (cktL + cktR) / 2;
      const loadY = cktB;

      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(loadX - 35, loadY - 12, 70, 24, 6);
      ctx.fill();
      ctx.stroke();

      // Color bands
      ['#78350f', '#000000', '#dc2626', '#fbbf24'].forEach((c, idx) => {
        ctx.fillStyle = c;
        ctx.fillRect(loadX - 20 + idx * 10, loadY - 12, 4, 24);
      });

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`R = ${loadR}Ω`, loadX, loadY + 28);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.fillText(isEn ? 'LOAD RESISTOR' : 'TẢI MẠCH NGOÀI R', loadX, loadY - 18);


      // --- COMPONENT 4: DIGITAL AMMETER A (Right Wire) ---
      const ammeterX = cktR;
      const ammeterY = (cktT + cktB) / 2;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ammeterX, ammeterY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('A', ammeterX, ammeterY + 4);

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px Inter';
      ctx.fillText(`I = ${currentAmp.toFixed(2)}A`, ammeterX + 38, ammeterY + 4);


      // --- SECTION 2: CHARACTERISTIC V - I GRAPH (Right side, x: 360 to 520) ---
      const gx = 370;
      const gy = 70;
      const gw = 150;
      const gh = 180;

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
      ctx.fillText(isEn ? 'CHARACTERISTIC V = E - I·r' : 'ĐẶC TUYẾN V = E - I·r', gx + gw / 2, gy + 16);

      // Axes
      const originX = gx + 25;
      const originY = gy + gh - 25;
      const axisW = gw - 35;
      const axisH = gh - 45;

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
      ctx.fillText('V(V)', originX - 10, gy + 32);
      ctx.fillText('I(A)', originX + axisW - 5, originY + 16);

      // Plot Line V = E - I*r
      const maxI = (emfVolts / internalR) * 1.1; // Short circuit current I_sc
      const maxV = emfVolts * 1.1;

      const p1x = originX;
      const p1y = originY - (emfVolts / maxV) * axisH; // (I=0, V=E)

      const isc = emfVolts / internalR;
      const p2x = originX + (isc / maxI) * axisW;
      const p2y = originY; // (I=I_sc, V=0)

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.stroke();

      // Mark Intercept E (I=0)
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(p1x, p1y, 3, 0, Math.PI * 2); ctx.fill();
      ctx.font = 'bold 9px Inter';
      ctx.fillText(`E=${emfVolts}V`, p1x + 22, p1y + 3);

      // Current Operating Point (I_cur, V_cur)
      const curPx = originX + (currentAmp / maxI) * axisW;
      const curPy = originY - (terminalVolts / maxV) * axisH;

      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Dashed projection lines for operating point
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.setLineDash([2, 2]);
      ctx.beginPath(); ctx.moveTo(curPx, originY); ctx.lineTo(curPx, curPy); ctx.lineTo(originX, curPy); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 9px Inter';
      ctx.fillText(`(${currentAmp.toFixed(1)}A, ${terminalVolts.toFixed(1)}V)`, curPx + 15, curPy - 8);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [emfVolts, internalR, loadR, currentAmp, terminalVolts, internalPowerWatts, powerWatts, isMaxPowerTransfer, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      emfVolts: `${emfVolts} V`,
      internalR: `${internalR} Ω`,
      loadR: `${loadR} Ω`,
      currentAmp: `${currentAmp.toFixed(2)} A`,
      terminalVolts: `${terminalVolts.toFixed(2)} V`,
      powerWatts: `${powerWatts.toFixed(2)} W`,
      internalPowerWatts: `${internalPowerWatts.toFixed(2)} W`
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
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Circuit Parameters' : 'Tham số Mạch Nguồn & Tải'}
          </h3>

          {/* Battery EMF E */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Battery EMF E:' : 'Suất điện động E:'}</span>
              <span className="text-amber-400 font-bold">{emfVolts} V</span>
            </div>
            <input
              type="range" min="1.5" max="24" step="0.5"
              value={emfVolts}
              onChange={(e) => onParamChange('emfVolts', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Internal Resistance r */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Internal Resistance r:' : 'Điện trở trong r:'}</span>
              <span className="text-rose-400 font-bold">{internalR} Ω</span>
            </div>
            <input
              type="range" min="0.1" max="10" step="0.1"
              value={internalR}
              onChange={(e) => onParamChange('internalR', Number(e.target.value))}
              className="w-full accent-rose-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Load Resistance R */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Load Resistance R:' : 'Điện trở mạch ngoài R:'}</span>
              <span className="text-cyan-400 font-bold">{loadR} Ω</span>
            </div>
            <input
              type="range" min="0.5" max="20" step="0.5"
              value={loadR}
              onChange={(e) => onParamChange('loadR', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'TERMINAL MEASUREMENTS' : 'Điện áp Đầu cực & Dòng điện'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Terminal Volts V:' : 'Điện áp đầu cực V:'}</span>
              <span className="text-purple-400 font-bold text-sm">{terminalVolts.toFixed(2)} V</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Circuit Current I:' : 'Cường độ dòng I:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{currentAmp.toFixed(2)} A</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Power Disspation P:' : 'Công suất tỏa trên R:'}</span>
                <span className="text-slate-400 text-[10px]">P = I²·R</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{powerWatts.toFixed(2)} W</span>
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
