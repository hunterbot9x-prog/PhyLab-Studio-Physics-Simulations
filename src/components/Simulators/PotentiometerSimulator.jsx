import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Info, ShieldCheck } from 'lucide-react';

export default function PotentiometerSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const driverEmfV = params.driverEmfV || 2.0; // Driver cell E1 (Volts)
  const testCellEmfV = params.testCellEmfV || 1.48; // Unknown test cell Ex (Volts)
  const jockeyPosCm = params.jockeyPosCm || 74; // Sliding jockey position Lx (0 - 100cm)

  const wireLengthTotalCm = 100; // 1-metre slide wire potentiometer
  const balanceLengthCm = (testCellEmfV / driverEmfV) * wireLengthTotalCm; // Lx where IG = 0

  // Calculate Galvanometer Current IG (mA)
  // Potential at jockey position V_wire = E1 * (Lx / 100)
  const wireVoltageAtJockey = driverEmfV * (jockeyPosCm / 100);
  const potentialDiff = wireVoltageAtJockey - testCellEmfV;
  const galvanometerCurrentMa = (potentialDiff / 10) * 1000; // mA (assuming 10 ohm total loop resistance)

  const isBalanced = Math.abs(jockeyPosCm - balanceLengthCm) < 0.5;

  // Dynamic Realtime Physics Description Generator
  const getPhysicsDescription = () => {
    if (isBalanced) {
      return isEn
        ? `🎯 [NULL BALANCE POINT REACHED! L_x = ${balanceLengthCm.toFixed(1)}cm] Galvanometer reads ZERO current (I_G = 0 mA). The potential drop V_Ax along balance wire matches unknown Cell EMF E_x = ${testCellEmfV}V exactly (E_x = E_driver · L_x / L_total). No current drawn from test cell!`
        : `🎯 [ĐẠT ĐIỂM CÂN BẰNG NULL! L_x = ${balanceLengthCm.toFixed(1)} cm] Kim Galvanometer chỉ đúng vạch SỐ 0 (I_G = 0 mA). Độ giảm điện thế V_Ax trên đoạn dây L_x cân bằng tuyệt đối với Suất điện động E_x = ${testCellEmfV}V của pin cần đo (E_x = E_nguồn · L_x / L_tổng). Cầu điện thế đo suất điện động thực mà không hút dòng!`;
    }

    if (jockeyPosCm < balanceLengthCm) {
      return isEn
        ? `⚡ [Jockey Left of Balance Point] Wire voltage V_Ax = ${wireVoltageAtJockey.toFixed(2)}V < Test Cell E_x = ${testCellEmfV}V. Test cell discharges through Galvanometer (I_G = ${galvanometerCurrentMa.toFixed(1)} mA). Slide Jockey RIGHT to find balance!`
        : `⚡ [Con trượt ở bên trái điểm cân bằng] Điện thế dây V_Ax = ${wireVoltageAtJockey.toFixed(2)}V < Suất điện động pin E_x = ${testCellEmfV}V. Dòng điện chảy từ pin qua Galvanometer (I_G = ${galvanometerCurrentMa.toFixed(1)} mA). Kéo con trượt SANG PHẢI để tìm điểm cân bằng!`;
    }

    return isEn
      ? `⚡ [Jockey Right of Balance Point] Wire voltage V_Ax = ${wireVoltageAtJockey.toFixed(2)}V > Test Cell E_x = ${testCellEmfV}V. Driver cell forces current into test cell (I_G = +${galvanometerCurrentMa.toFixed(1)} mA). Slide Jockey LEFT to find balance!`
      : `⚡ [Con trượt ở bên phải điểm cân bằng] Điện thế dây V_Ax = ${wireVoltageAtJockey.toFixed(2)}V > Suất điện động pin E_x = ${testCellEmfV}V. Nguồn chính đẩy dòng điện ngược vào pin test (I_G = +${galvanometerCurrentMa.toFixed(1)} mA). Kéo con trượt SANG TRÁI để tìm điểm cân bằng!`;
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
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, h); ctx.stroke();
      }

      // Title HUD Banner
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(
        isEn
          ? `CAMBRIDGE A LEVEL 9702: POTENTIOMETER METRE BRIDGE | E_x = E₁ · (L_x / L_total)`
          : `CAMBRIDGE A LEVEL 9702: CẦU ĐIỆN THẾ SLIDE WIRE POTENTIOMETER | E_x = E₁ · (L_x / L_tổng)`,
        25,
        26
      );


      // --- SECTION 1: DRIVER CELL & SLIDE WIRE AB (x: 25 to 515) ---
      const wireX = 40;
      const wireY = 110;
      const wireW = 460;

      // Wooden Base
      ctx.fillStyle = '#1e1b18';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(wireX - 15, wireY - 20, wireW + 30, 45, 8);
      ctx.fill(); ctx.stroke();

      // Metre Rule ticks
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 8px Inter';
      ctx.textAlign = 'center';

      for (let mark = 0; mark <= 10; mark++) {
        const mx = wireX + mark * (wireW / 10);
        ctx.beginPath();
        ctx.moveTo(mx, wireY - 18);
        ctx.lineTo(mx, wireY - 8);
        ctx.stroke();
        ctx.fillText(`${mark * 10}cm`, mx, wireY - 2);
      }

      // Uniform Potentiometer Wire AB
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(wireX, wireY + 8);
      ctx.lineTo(wireX + wireW, wireY + 8);
      ctx.stroke();

      // Wire Terminals A & B
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(wireX, wireY + 8, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(wireX + wireW, wireY + 8, 7, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'extrabold 12px Inter';
      ctx.fillText('A', wireX - 18, wireY + 12);
      ctx.fillText('B', wireX + wireW + 18, wireY + 12);

      // Driver Cell E1 Casing (Top Loop)
      const driverY = wireY - 60;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(wireX + wireW / 2 - 40, driverY - 18, 80, 36, 6);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`Driver E₁ = ${driverEmfV.toFixed(1)}V`, wireX + wireW / 2, driverY + 4);

      // Driver Wires
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wireX, wireY + 8);
      ctx.lineTo(wireX, driverY);
      ctx.lineTo(wireX + wireW / 2 - 40, driverY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(wireX + wireW, wireY + 8);
      ctx.lineTo(wireX + wireW, driverY);
      ctx.lineTo(wireX + wireW / 2 + 40, driverY);
      ctx.stroke();


      // --- SECTION 2: TEST CELL Ex, GALVANOMETER G & SLIDING JOCKEY ---
      const jockeyX = wireX + (jockeyPosCm / 100) * wireW;

      // Sliding Jockey Indicator
      ctx.fillStyle = isBalanced ? '#10b981' : '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(jockeyX, wireY + 8);
      ctx.lineTo(jockeyX - 6, wireY + 22);
      ctx.lineTo(jockeyX + 6, wireY + 22);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = isBalanced ? '#10b981' : '#f43f5e';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(`Jockey J (${jockeyPosCm}cm)`, jockeyX, wireY + 34);

      // Galvanometer Dial G (Center Zero)
      const galvY = wireY + 110;
      const galvX = wireX + wireW / 2;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = isBalanced ? '#10b981' : '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(galvX, galvY, 28, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 8px Inter';
      ctx.fillText('-I', galvX - 15, galvY + 3);
      ctx.fillText('0', galvX, galvY - 12);
      ctx.fillText('+I', galvX + 15, galvY + 3);
      ctx.fillText('G', galvX, galvY + 16);

      // Galvanometer Needle
      const maxRange = 50;
      const clampedCurrent = Math.max(-maxRange, Math.min(maxRange, galvanometerCurrentMa));
      const needleAngle = (clampedCurrent / maxRange) * (Math.PI * 0.35) - Math.PI * 0.5;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(galvX, galvY + 4);
      ctx.lineTo(galvX + Math.cos(needleAngle) * 20, galvY + 4 + Math.sin(needleAngle) * 20);
      ctx.stroke();

      // Test Cell Ex Casing (Lower Loop)
      const testCellY = galvY + 60;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(wireX + 40, testCellY - 18, 100, 36, 6);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.font = 'extrabold 11px Inter';
      ctx.fillText(`Test Cell E_x = ${testCellEmfV.toFixed(2)}V`, wireX + 90, testCellY + 4);

      // Test Cell Circuit Wires connecting Terminal A -> Cell Ex -> Galvanometer G -> Jockey J
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(wireX, wireY + 8);
      ctx.lineTo(wireX, testCellY);
      ctx.lineTo(wireX + 40, testCellY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(wireX + 140, testCellY);
      ctx.lineTo(galvX - 28, galvY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(galvX + 28, galvY);
      ctx.lineTo(jockeyX, wireY + 22);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [driverEmfV, testCellEmfV, jockeyPosCm, balanceLengthCm, galvanometerCurrentMa, isBalanced, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      driverEmfV: `${driverEmfV.toFixed(1)} V`,
      testCellEmfV: `${testCellEmfV.toFixed(2)} V`,
      jockeyPosCm: `${jockeyPosCm} cm`,
      balanceLengthCm: `${balanceLengthCm.toFixed(1)} cm`,
      galvanometerCurrentMa: `${galvanometerCurrentMa.toFixed(1)} mA`,
      isBalanced: isBalanced ? (isEn ? 'NULL BALANCE (IG=0)' : 'CÂN BẰNG NULL (IG=0)') : (isEn ? 'Unbalanced' : 'Chưa cân bằng')
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
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Potentiometer Controls' : 'Tham số Cầu Điện Thế'}
          </h3>

          {/* Test Cell Ex Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Unknown Cell EMF E_x:' : 'Suất điện động Pin E_x:'}</span>
              <span className="text-purple-400 font-bold">{testCellEmfV.toFixed(2)} V</span>
            </div>
            <input
              type="range" min="0.50" max="1.80" step="0.02"
              value={testCellEmfV}
              onChange={(e) => onParamChange('testCellEmfV', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-purple-400"
            />
          </div>

          {/* Jockey Position Lx Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Jockey Position L_x:' : 'Vị trí Con trượt L_x:'}</span>
              <span className="text-cyan-400 font-bold">{jockeyPosCm} cm</span>
            </div>
            <input
              type="range" min="5" max="95" step="1"
              value={jockeyPosCm}
              onChange={(e) => onParamChange('jockeyPosCm', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Auto Find Null Balance Button */}
          <button
            onClick={() => onParamChange('jockeyPosCm', Math.round(balanceLengthCm))}
            className="w-full py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>{isEn ? 'Find Null Balance (I_G = 0)' : 'Tự Động Tìm Điểm Cân Bằng (I_G = 0)'}</span>
          </button>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> {isEn ? 'GALVANOMETER MEASUREMENTS' : 'Số liệu Dòng Galvanometer'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Wire Potential V_Ax:' : 'Thế trên dây V_Ax:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{(driverEmfV * jockeyPosCm / 100).toFixed(2)} V</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Balance Length L_x:' : 'Vị trí Cân bằng:'}</span>
              <span className="text-amber-400 font-bold text-sm">{balanceLengthCm.toFixed(1)} cm</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Galvanometer Current I_G:' : 'Dòng điện I_G:'}</span>
                <span className="text-slate-400 text-[10px]">E_x = E₁·L_x / 100</span>
              </div>
              <span className={`font-extrabold text-base ${isBalanced ? 'text-emerald-400' : 'text-rose-400'}`}>
                {galvanometerCurrentMa.toFixed(1)} mA
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Potentiometer Data' : 'Ghi Bảng Số liệu Cầu Điện Thế'}
          </button>
        </div>
      </div>
    </div>
  );
}
