import React, { useState, useEffect, useRef } from 'react';
import { Zap, ToggleLeft, ToggleRight, RotateCcw, Activity, Lightbulb, Flame } from 'lucide-react';

export default function CircuitSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const voltage = params.voltage !== undefined ? params.voltage : 12; // Volts
  const r1 = params.r1 || 10; // Ohms
  const r2 = params.r2 || 20; // Ohms
  const circuitType = params.circuitType || 'series'; // 'series' | 'parallel'
  const componentType = params.componentType || 'bulbs'; // 'resistors' | 'bulbs'
  const isSwitchClosed = params.isSwitchClosed !== undefined ? params.isSwitchClosed : true;
  const isBranch1Closed = params.isBranch1Closed !== undefined ? params.isBranch1Closed : true;
  const isBranch2Closed = params.isBranch2Closed !== undefined ? params.isBranch2Closed : true;

  // Circuit calculations
  let totalResistance = 0;
  let totalCurrent = 0; // Amperes
  let v1 = 0; // Voltage across R1
  let v2 = 0; // Voltage across R2
  let i1 = 0; // Current through R1
  let i2 = 0; // Current through R2
  let p1 = 0; // Power dissipated on R1 (Watts)
  let p2 = 0; // Power dissipated on R2 (Watts)
  let pTotal = 0; // Total Power (Watts)

  if (isSwitchClosed && voltage > 0) {
    if (circuitType === 'series') {
      if (isBranch1Closed && isBranch2Closed) {
        totalResistance = r1 + r2;
        totalCurrent = voltage / totalResistance;
        i1 = totalCurrent;
        i2 = totalCurrent;
        v1 = i1 * r1;
        v2 = i2 * r2;
      }
    } else {
      // Parallel
      const r1Active = isBranch1Closed ? r1 : Infinity;
      const r2Active = isBranch2Closed ? r2 : Infinity;

      if (isBranch1Closed && isBranch2Closed) {
        totalResistance = (r1 * r2) / (r1 + r2);
      } else if (isBranch1Closed) {
        totalResistance = r1;
      } else if (isBranch2Closed) {
        totalResistance = r2;
      } else {
        totalResistance = Infinity;
      }

      if (totalResistance < Infinity) {
        totalCurrent = voltage / totalResistance;
      }

      if (isBranch1Closed) {
        v1 = voltage;
        i1 = v1 / r1;
      }
      if (isBranch2Closed) {
        v2 = voltage;
        i2 = v2 / r2;
      }
    }

    p1 = i1 * v1;
    p2 = i2 * v2;
    pTotal = totalCurrent * voltage;
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

      // Dark Physics Background
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

      // --- 1. TITLE BANNER ---
      ctx.fillStyle = isLive ? '#10b981' : '#f43f5e';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isLive
          ? (isEn
              ? `🟢 LIVE CIRCUIT (${circuitType.toUpperCase()}): Total Power P = ${pTotal.toFixed(1)}W | R_eq = ${totalResistance.toFixed(1)}Ω`
              : `🟢 MẠCH HOẠT ĐỘNG (${circuitType === 'series' ? 'NỐI TIẾP' : 'SONG SONG'}): Tổng Công Suất P = ${pTotal.toFixed(1)}W | R_tương đương = ${totalResistance.toFixed(1)}Ω`)
          : (isEn ? '🔴 OPEN CIRCUIT: Switch Open or Branch Disconnected' : '🔴 MẠCH HỞ: Công tắc ngắt hoặc Ngắt nhánh'),
        cX,
        25
      );


      // --- 2. CIRCUIT TOPOLOGY (SERIES VS PARALLEL) ---
      if (circuitType === 'series') {
        const sW = 360;
        const sH = 200;
        const sL = cX - sW / 2;
        const sR = cX + sW / 2;
        const sT = cY - sH / 2;
        const sB = cY + sH / 2;

        // Series Wire Loop
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.roundRect(sL, sT, sW, sH, 14);
        ctx.stroke();

        // Flowing Electrons
        if (isLive) {
          drawElectronsOnPath(ctx, [
            { x: sL, y: sB }, { x: sL, y: sT }, { x: sR, y: sT }, { x: sR, y: sB }, { x: sL, y: sB }
          ], totalCurrent, time);
        }

        // Component 1 (Top Left)
        if (componentType === 'bulbs') {
          drawBulb(ctx, cX - 90, sT, r1, 'Đèn L₁', v1, i1, p1, isBranch1Closed && isLive, time);
        } else {
          drawResistor(ctx, cX - 90, sT, r1, 'R₁', '#f59e0b', v1, i1, p1);
        }

        // Component 2 (Top Right)
        if (componentType === 'bulbs') {
          drawBulb(ctx, cX + 45, sT, r2, 'Đèn L₂', v2, i2, p2, isBranch2Closed && isLive, time);
        } else {
          drawResistor(ctx, cX + 45, sT, r2, 'R₂', '#f59e0b', v2, i2, p2);
        }

        // DC Voltage Source (Bottom Wire)
        drawBattery(ctx, cX, sB, voltage);

        // Switch K (Left Wire)
        drawSwitch(ctx, sL, cY, isSwitchClosed, 'K_chính');

        // Ammeter A (Right Wire)
        drawAmmeter(ctx, sR, cY, totalCurrent, 'A_tổng');

        // Voltmeter Probes V1 and V2
        drawVoltmeter(ctx, cX - 90, sT - 32, v1, 'V₁');
        drawVoltmeter(ctx, cX + 45, sT - 32, v2, 'V₂');

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

        const branch1_y = cY - 55; // Top Branch (R1 / L1)
        const branch2_y = cY + 25; // Bottom Branch (R2 / L2)

        // Main Circuit Wires
        ctx.strokeStyle = wireColor;
        ctx.lineWidth = 3.5;

        // Bottom main loop
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y);
        ctx.lineTo(mL, branch1_y);
        ctx.lineTo(mL, mB);
        ctx.lineTo(mR, mB);
        ctx.lineTo(mR, branch1_y);
        ctx.lineTo(nodeB_x, branch1_y);
        ctx.stroke();

        // Branch 1 Wire (Top)
        ctx.strokeStyle = isSwitchClosed && i1 > 0 ? '#38bdf8' : '#475569';
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y);
        ctx.lineTo(nodeB_x, branch1_y);
        ctx.stroke();

        // Branch 2 Wire (Bottom)
        ctx.strokeStyle = isSwitchClosed && i2 > 0 ? '#38bdf8' : '#475569';
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch2_y);
        ctx.lineTo(nodeB_x, branch2_y);
        ctx.stroke();

        // Vertical Junction Trunks
        ctx.strokeStyle = wireColor;
        ctx.beginPath();
        ctx.moveTo(nodeA_x, branch1_y); ctx.lineTo(nodeA_x, branch2_y);
        ctx.moveTo(nodeB_x, branch1_y); ctx.lineTo(nodeB_x, branch2_y);
        ctx.stroke();


        // Flowing Electrons in Parallel Branches
        if (isLive) {
          // Main loop electrons (I_total)
          drawElectronsOnPath(ctx, [
            { x: mL, y: mB }, { x: mL, y: branch1_y }, { x: nodeA_x, y: branch1_y }
          ], totalCurrent, time);

          drawElectronsOnPath(ctx, [
            { x: nodeB_x, y: branch1_y }, { x: mR, y: branch1_y }, { x: mR, y: mB }, { x: cX, y: mB }
          ], totalCurrent, time);

          // Branch 1 electrons (I1)
          if (i1 > 0) {
            drawElectronsOnPath(ctx, [
              { x: nodeA_x, y: branch1_y }, { x: nodeB_x, y: branch1_y }
            ], i1, time * 1.1);
          }

          // Branch 2 electrons (I2)
          if (i2 > 0) {
            drawElectronsOnPath(ctx, [
              { x: nodeA_x, y: branch1_y }, { x: nodeA_x, y: branch2_y }, { x: nodeB_x, y: branch2_y }, { x: nodeB_x, y: branch1_y }
            ], i2, time * 0.9);
          }
        }


        // Components in Parallel Branches
        if (componentType === 'bulbs') {
          drawBulb(ctx, cX - 35, branch1_y, r1, 'Đèn L₁', v1, i1, p1, isBranch1Closed && isLive, time);
          drawBulb(ctx, cX - 35, branch2_y, r2, 'Đèn L₂', v2, i2, p2, isBranch2Closed && isLive, time);
        } else {
          drawResistor(ctx, cX - 35, branch1_y, r1, 'R₁', '#f59e0b', v1, i1, p1);
          drawResistor(ctx, cX - 35, branch2_y, r2, 'R₂', '#38bdf8', v2, i2, p2);
        }

        // Branch Switches K1 & K2
        drawSwitch(ctx, cX + 45, branch1_y, isBranch1Closed, 'K₁');
        drawSwitch(ctx, cX + 45, branch2_y, isBranch2Closed, 'K₂');

        // Junction Nodes A & B
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
            ctx.font = 'extrabold 11px Inter';
            ctx.textAlign = node.name === 'Nút A' ? 'right' : 'left';
            ctx.fillText(node.name, node.x + (node.name === 'Nút A' ? -8 : 8), node.y - 8);
          }
        });


        // DC Voltage Source (Bottom Wire)
        drawBattery(ctx, cX, mB, voltage);

        // Switch K Main (Left Wire)
        drawSwitch(ctx, mL, cY, isSwitchClosed, 'K_chính');

        // Main Ammeter A (Right Wire)
        drawAmmeter(ctx, mR, cY, totalCurrent, 'A_tổng');

        // Voltmeter measuring V = V1 = V2
        drawVoltmeter(ctx, cX, branch1_y - 28, voltage, 'V_mạch');
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [voltage, r1, r2, circuitType, componentType, isSwitchClosed, isBranch1Closed, isBranch2Closed, totalCurrent, v1, v2, i1, i2, p1, p2, pTotal, totalResistance, isEn]);


  // --- HELPER COMPONENT RENDERERS ---

  // Helper 1: Draw Incandescent Light Bulb L (Đèn sợi đốt có vầng sáng P = U·I)
  const drawBulb = (ctx, x, y, rVal, label, vVal, iVal, pVal, isLit, time) => {
    // Glass Bulb Glow Aura
    if (isLit && pVal > 0) {
      const glowRadius = Math.min(45, 18 + Math.sqrt(pVal) * 5 + Math.sin(time * 10) * 2);
      const bulbGrad = ctx.createRadialGradient(x, y, 4, x, y, glowRadius);
      bulbGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
      bulbGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.5)');
      bulbGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');

      ctx.fillStyle = bulbGrad;
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Metal Base & Glass Circle
    ctx.fillStyle = isLit ? '#fef08a' : '#1e293b';
    ctx.strokeStyle = isLit ? '#eab308' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Filament Wire inside bulb (X cross)
    ctx.strokeStyle = isLit ? '#ffffff' : '#94a3b8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x - 6, y - 6); ctx.lineTo(x + 6, y + 6);
    ctx.moveTo(x + 6, y - 6); ctx.lineTo(x - 6, y + 6);
    ctx.stroke();

    // Label & Power Wattage
    ctx.fillStyle = isLit ? '#fef08a' : '#94a3b8';
    ctx.font = 'extrabold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${label} (${rVal}Ω)`, x, y + 28);

    if (iVal > 0) {
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 9px Inter';
      ctx.fillText(`P = ${pVal.toFixed(1)}W`, x, y - 20);
    }
  };

  // Helper 2: Draw Resistor Component Box with Joule Heating Thermal Glow
  const drawResistor = (ctx, x, y, rVal, label, color, vVal, iVal, pVal) => {
    // Thermal Glow if power > 0
    if (pVal > 0) {
      ctx.fillStyle = `rgba(244, 63, 94, ${Math.min(0.4, pVal * 0.03)})`;
      ctx.beginPath();
      ctx.roundRect(x - 40, y - 18, 80, 36, 8);
      ctx.fill();
    }

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

  // Helper 3: Draw DC Battery Source
  const drawBattery = (ctx, x, y, volts) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 42, y - 15, 84, 30, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'extrabold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${volts}V DC`, x, y + 4);
  };

  // Helper 4: Draw Switch K
  const drawSwitch = (ctx, x, y, isClosed, label = 'K') => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = isClosed ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isClosed ? '#10b981' : '#f43f5e';
    ctx.font = 'extrabold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 4);
  };

  // Helper 5: Draw Ammeter A
  const drawAmmeter = (ctx, x, y, current, label) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'extrabold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('A', x, y + 4);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`${current.toFixed(2)}A`, x + 32, y + 4);
  };

  // Helper 6: Draw Digital Voltmeter V Probe
  const drawVoltmeter = (ctx, x, y, volts, label) => {
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(x - 28, y - 10, 56, 20, 5);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'extrabold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${label}: ${volts.toFixed(1)}V`, x, y + 4);
  };

  // Helper 7: Draw Animated Flowing Electron Dots along a polyline path
  const drawElectronsOnPath = (ctx, points, current, time) => {
    if (points.length < 2 || current <= 0) return;

    ctx.fillStyle = '#00f5d4';
    ctx.shadowColor = '#00f5d4';
    ctx.shadowBlur = 6;

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

    const particleSpacing = 26;
    const particleCount = Math.floor(totalLen / particleSpacing);
    const speed = Math.min(4.5, current * 1.6);

    for (let p = 0; p < particleCount; p++) {
      const dist = (p * particleSpacing + time * speed * 30) % totalLen;
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
      componentType: componentType === 'bulbs' ? (isEn ? 'Light Bulbs' : 'Đèn sợi đốt') : (isEn ? 'Resistors' : 'Điện trở'),
      voltage: `${voltage} V`,
      r1: `${r1} Ω`,
      r2: `${r2} Ω`,
      rTotal: `${totalResistance.toFixed(1)} Ω`,
      iTotal: `${totalCurrent.toFixed(2)} A`,
      pTotal: `${pTotal.toFixed(1)} W`,
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
            {isSwitchClosed ? (isEn ? 'MAIN SWITCH K: CLOSED' : 'CÔNG TẮC CHÍNH K: ĐÓNG') : (isEn ? 'MAIN SWITCH K: OPEN' : 'CÔNG TẮC CHÍNH K: NGẮT')}
          </button>

          {/* Voltage Source Slider */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>{isEn ? 'Voltage U:' : 'Điện áp U:'}</span>
            <input
              type="range" min="3" max="24" step="3"
              value={voltage}
              onChange={(e) => onParamChange('voltage', Number(e.target.value))}
              className="w-24 accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-cyan-400 font-bold min-w-[32px]">{voltage} V</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" /> {isEn ? 'CIRCUIT CONFIGURATION' : 'Cấu hình Mạch điện'}
          </h3>

          {/* Connection Mode (Series vs Parallel) */}
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

          {/* Component Type (Light Bulbs vs Resistors) */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Component Element:' : 'Linh kiện tiêu thụ:'}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onParamChange('componentType', 'bulbs')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  componentType === 'bulbs' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {isEn ? 'Light Bulbs' : 'Đèn Sợi Đốt'}
              </button>
              <button
                onClick={() => onParamChange('componentType', 'resistors')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  componentType === 'resistors' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {isEn ? 'Resistors' : 'Điện Trở R'}
              </button>
            </div>
          </div>

          {/* Branch Disconnect Switches for Parallel Mode */}
          {circuitType === 'parallel' && (
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-300">{isEn ? 'Branch Switches:' : 'Công tắc ngắt từng nhánh:'}</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onParamChange('isBranch1Closed', !isBranch1Closed)}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all ${
                    isBranch1Closed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {isBranch1Closed ? 'K₁: BẬT (ON)' : 'K₁: NGẮT (OFF)'}
                </button>
                <button
                  onClick={() => onParamChange('isBranch2Closed', !isBranch2Closed)}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all ${
                    isBranch2Closed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {isBranch2Closed ? 'K₂: BẬT (ON)' : 'K₂: NGẮT (OFF)'}
                </button>
              </div>
            </div>
          )}

          {/* Resistor / Bulb 1 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{componentType === 'bulbs' ? (isEn ? 'Bulb L₁ Resistance:' : 'Điện trở Đèn L₁:') : (isEn ? 'Resistor R₁:' : 'Điện trở R₁:')}</span>
              <span className="text-amber-400 font-bold">{r1} Ω</span>
            </div>
            <input
              type="range" min="2" max="50" step="1"
              value={r1}
              onChange={(e) => onParamChange('r1', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Resistor / Bulb 2 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{componentType === 'bulbs' ? (isEn ? 'Bulb L₂ Resistance:' : 'Điện trở Đèn L₂:') : (isEn ? 'Resistor R₂:' : 'Điện trở R₂:')}</span>
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
              <span className="text-amber-400 font-bold text-sm">{totalResistance < Infinity ? `${totalResistance.toFixed(1)} Ω` : '∞ (Mạch hở)'}</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Total Current I:' : 'Cường độ dòng I:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{totalCurrent.toFixed(2)} A</span>
            </div>

            {/* Individual Branch Readings for Parallel / Series */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">{componentType === 'bulbs' ? 'Đèn L₁ (V₁, I₁, P₁):' : 'R₁ (V₁, I₁, P₁):'}</span>
                <span className="text-cyan-400 font-bold text-[11px]">{v1.toFixed(1)}V | {i1.toFixed(2)}A | {p1.toFixed(1)}W</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">{componentType === 'bulbs' ? 'Đèn L₂ (V₂, I₂, P₂):' : 'R₂ (V₂, I₂, P₂):'}</span>
                <span className="text-cyan-400 font-bold text-[11px]">{v2.toFixed(1)}V | {i2.toFixed(2)}A | {p2.toFixed(1)}W</span>
              </div>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Total Power P:' : 'Tổng Công suất P_tổng:'}</span>
                <span className="text-slate-400 text-[10px]">P = U · I = I² · R_eq</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">
                {pTotal.toFixed(1)} W
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
