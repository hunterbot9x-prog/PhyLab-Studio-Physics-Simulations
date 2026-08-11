import React, { useState, useEffect, useRef } from 'react';
import { Zap, ToggleLeft, ToggleRight, RotateCcw, Activity } from 'lucide-react';

export default function CircuitSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const voltage = params.voltage !== undefined ? params.voltage : 6; // Volts
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

  // 60 FPS Physics & Wiring Canvas Renderer
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

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const cX = w * 0.5;
      const cY = h * 0.5 + 5;

      const isLive = isSwitchClosed && totalCurrent > 0;
      const wireColor = isLive ? '#38bdf8' : '#475569';

      // --- 1. TITLE & STATUS BANNER ---
      ctx.fillStyle = isLive ? '#10b981' : '#f43f5e';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isLive
          ? (isEn
              ? `🟢 CLOSED CIRCUIT (${circuitType === 'series' ? 'SERIES' : 'PARALLEL'}): Total I = ${totalCurrent.toFixed(2)}A | R_eq = ${totalResistance.toFixed(1)}Ω`
              : `🟢 MẠCH KÍN (${circuitType === 'series' ? 'GẮN NỐI TIẾP' : 'GẮN SONG SONG'}): Cường độ I_tổng = ${totalCurrent.toFixed(2)}A | R_tương đương = ${totalResistance.toFixed(1)}Ω`)
          : (isEn ? '🔴 OPEN CIRCUIT (SWITCH K OPEN): Current I = 0.00A' : '🔴 MẠCH HỞ (CÔNG TẮC K NGẮT): Cường độ I = 0.00A'),
        cX,
        28
      );


      // --- 2. CIRCUIT WIRING LAYOUT (SERIES VS PARALLEL) ---
      if (circuitType === 'series') {
        // --- SERIES CIRCUIT TOPOLOGY ---
        const sW = 360;
        const sH = 200;
        const sL = cX - sW / 2;
        const sR = cX + sW / 2;
        const sT = cY - sH / 2;
        const sB = cY + sH / 2;

        // Series Wire Loop
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(sL, sT, sW, sH, 14);
        ctx.stroke();

        // Animated Electrons along Series Loop
        if (isLive) {
          drawElectronsOnPath(ctx, [
            { x: sL, y: sB }, { x: sL, y: sT }, { x: sR, y: sT }, { x: sR, y: sB }, { x: sL, y: sB }
          ], totalCurrent, time);
        }

        // Resistor R1 (Top Wire Left)
        drawResistor(ctx, cX - 100, sT, r1, 'R₁', '#f59e0b', v1, i1);

        // Resistor R2 (Top Wire Right)
        drawResistor(ctx, cX + 35, sT, r2, 'R₂', '#f59e0b', v2, i2);

        // DC Voltage Source (Bottom Wire)
        drawBattery(ctx, cX, sB, voltage);

        // Switch K (Left Wire)
        drawSwitch(ctx, sL, cY, isSwitchClosed);

        // Ammeter A (Right Wire)
        drawAmmeter(ctx, sR, cY, totalCurrent, 'A_tổng');

      } else {
        // --- PARALLEL CIRCUIT TOPOLOGY ---
        const mainW = 380;
        const mainH = 220;
        const mL = cX - mainW / 2;
        const mR = cX + mainW / 2;
        const mT = cY - mainH / 2;
        const mB = cY + mainH / 2;

        const nodeA_x = cX - 110; // Junction Node A (Left)
        const nodeB_x = cX + 110; // Junction Node B (Right)

        const branch1_y = cY - 55; // Top Branch (R1)
        const branch2_y = cY + 25; // Bottom Branch (R2)

        // 2a. Main Circuit Outer Loop Wires
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 3;

        // Bottom battery wire + sides up to nodes
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y);
        ctx.lineTo(mL, branch1_y);
        ctx.lineTo(mL, mB);
        ctx.lineTo(mR, mB);
        ctx.lineTo(mR, branch1_y);
        ctx.lineTo(nodeB_x, branch1_y);
        ctx.stroke();

        // 2b. Parallel Branch Wires between Node A and Node B
        // Top Branch 1 (R1)
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y);
        ctx.lineTo(nodeB_x, branch1_y);
        ctx.stroke();

        // Bottom Branch 2 (R2)
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch2_y);
        ctx.lineTo(nodeB_x, branch2_y);
        ctx.stroke();

        // Connect Node A & Node B vertical trunk lines
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y);
        ctx.lineTo(nodeA_x, branch2_y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(nodeB_x, branch1_y);
        ctx.lineTo(nodeB_x, branch2_y);
        ctx.stroke();


        // 2c. Animated Electrons in Parallel Branches
        if (isLive) {
          // Main loop electrons (Total Current I)
          drawElectronsOnPath(ctx, [
            { x: mL, y: mB }, { x: mL, y: branch1_y }, { x: nodeA_x, y: branch1_y }
          ], totalCurrent, time);

          drawElectronsOnPath(ctx, [
            { x: nodeB_x, y: branch1_y }, { x: mR, y: branch1_y }, { x: mR, y: mB }, { x: cX, y: mB }
          ], totalCurrent, time);

          // Branch 1 electrons (I1)
          drawElectronsOnPath(ctx, [
            { x: nodeA_x, y: branch1_y }, { x: nodeB_x, y: branch1_y }
          ], i1, time * 1.1);

          // Branch 2 electrons (I2)
          drawElectronsOnPath(ctx, [
            { x: nodeA_x, y: branch1_y }, { x: nodeA_x, y: branch2_y }, { x: nodeB_x, y: branch2_y }, { x: nodeB_x, y: branch1_y }
          ], i2, time * 0.9);
        }


        // 2d. Resistors in Parallel Branches
        // Branch 1 Resistor R1
        drawResistor(ctx, cX - 35, branch1_y, r1, 'R₁', '#f59e0b', v1, i1);

        // Branch 2 Resistor R2
        drawResistor(ctx, cX - 35, branch2_y, r2, 'R₂', '#38bdf8', v2, i2);


        // 2e. Junction Nodes A & B (Point Nút A & Nút B)
        [ { x: nodeA_x, y: branch1_y, name: 'Nút A' },
          { x: nodeA_x, y: branch2_y, name: '' },
          { x: nodeB_x, y: branch1_y, name: 'Nút B' },
          { x: nodeB_x, y: branch2_y, name: '' }
        ].forEach(node => {
          ctx.fillStyle = '#00f2fe';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (node.name) {
            ctx.fillStyle = '#00f2fe';
            ctx.font = 'bold 11px Inter';
            ctx.textAlign = node.name === 'Nút A' ? 'right' : 'left';
            ctx.fillText(node.name, node.x + (node.name === 'Nút A' ? -8 : 8), node.y - 8);
          }
        });


        // DC Voltage Source (Bottom Wire)
        drawBattery(ctx, cX, mB, voltage);

        // Switch K (Left Wire)
        drawSwitch(ctx, mL, cY, isSwitchClosed);

        // Main Ammeter A (Right Wire)
        drawAmmeter(ctx, mR, cY, totalCurrent, 'A_tổng');
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [voltage, r1, r2, circuitType, isSwitchClosed, totalCurrent, v1, v2, i1, i2, totalResistance, isEn]);

  // Helper: Draw Resistor Component Box
  const drawResistor = (ctx, x, y, rVal, label, color, vVal, iVal) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 35, y - 14, 70, 28, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = 'extrabold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${label}: ${rVal}Ω`, x, y + 4);

    if (iVal > 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.fillText(`${vVal.toFixed(1)}V | ${iVal.toFixed(2)}A`, x, y - 18);
    }
  };

  // Helper: Draw DC Battery Source
  const drawBattery = (ctx, x, y, volts) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 40, y - 15, 80, 30, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'extrabold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${volts}V DC`, x, y + 4);
  };

  // Helper: Draw Switch K
  const drawSwitch = (ctx, x, y, isClosed) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = isClosed ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isClosed ? '#10b981' : '#f43f5e';
    ctx.font = 'extrabold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('K', x, y + 4);
  };

  // Helper: Draw Ammeter A
  const drawAmmeter = (ctx, x, y, current, label) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'extrabold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('A', x, y + 4);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`${current.toFixed(2)}A`, x + 35, y + 4);
  };

  // Helper: Draw Animated Flowing Electron Dots along a polyline path
  const drawElectronsOnPath = (ctx, points, current, time) => {
    if (points.length < 2 || current <= 0) return;

    ctx.fillStyle = '#00f5d4';
    ctx.shadowColor = '#00f5d4';
    ctx.shadowBlur = 6;

    // Calculate segments
    let totalLen = 0;
    const segments = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      segments.push({ p1, p2, len, startDist: totalLen });
      totalLen += len;
    }

    if (totalLen === 0) return;

    const particleSpacing = 28;
    const particleCount = Math.floor(totalLen / particleSpacing);
    const speed = Math.min(4, current * 1.5);

    for (let p = 0; p < particleCount; p++) {
      const dist = (p * particleSpacing + time * speed * 30) % totalLen;

      // Find segment
      const seg = segments.find(s => dist >= s.startDist && dist <= s.startDist + s.len);
      if (seg && seg.len > 0) {
        const segProgress = (dist - seg.startDist) / seg.len;
        const px = seg.p1.x + (seg.p2.x - seg.p1.x) * segProgress;
        const py = seg.p1.y + (seg.p2.y - seg.p1.y) * segProgress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.shadowBlur = 0;
  };

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

            {/* Individual Branch Readings for Parallel / Series */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">R₁ (V₁, I₁):</span>
                <span className="text-cyan-400 font-bold text-xs">{v1.toFixed(1)}V | {i1.toFixed(2)}A</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">R₂ (V₂, I₂):</span>
                <span className="text-cyan-400 font-bold text-xs">{v2.toFixed(1)}V | {i2.toFixed(2)}A</span>
              </div>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? "Ohm's Formula:" : 'Công thức Ohm:'}</span>
                <span className="text-slate-400 text-[10px]">{circuitType === 'series' ? 'R_eq = R1 + R2' : '1/R_eq = 1/R1 + 1/R2'}</span>
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
