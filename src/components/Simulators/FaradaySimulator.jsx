import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Zap, Info, ArrowLeftRight, Gauge, Clock } from 'lucide-react';

export default function FaradaySimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPoleFlipped, setIsPoleFlipped] = useState(false); // false: N-S, true: S-N
  const [simSpeedMode, setSimSpeedMode] = useState(1.0); // 1.0x | 0.5x | 0.25x

  const numTurns = params.numTurns || 4; // Number of coil turns N
  const magnetSpeed = params.magnetSpeed || 5; // Magnet oscillation speed

  // Animation & Dragging References (prevents React state re-render jitter!)
  const magnetPosXRef = useRef(160);
  const inducedEmfRef = useRef(0);
  const prevMagnetXRef = useRef(160);
  const dragOffsetRef = useRef(0);

  // Throttled UI State for sidebar measurements (updated smoothly at 10Hz)
  const [uiMagnetX, setUiMagnetX] = useState(160);
  const [uiInducedEmf, setUiInducedEmf] = useState(0);

  // Sync state for recording
  useEffect(() => {
    magnetPosXRef.current = 160;
    inducedEmfRef.current = 0;
    prevMagnetXRef.current = 160;
    setUiMagnetX(160);
    setUiInducedEmf(0);
  }, [numTurns]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    const curX = magnetPosXRef.current;
    const mLen = 140;
    const mH = 40;
    const coilCenterY = 180;

    if (
      mouseX >= curX - mLen / 2 &&
      mouseX <= curX + mLen / 2 &&
      mouseY >= coilCenterY - mH / 2 &&
      mouseY <= coilCenterY + mH / 2
    ) {
      setIsDragging(true);
      dragOffsetRef.current = mouseX - curX;
      prevMagnetXRef.current = curX;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);

    const newX = Math.max(80, Math.min(canvas.width - 80, mouseX - dragOffsetRef.current));
    const velX = (newX - prevMagnetXRef.current) * 30;
    prevMagnetXRef.current = newX;

    magnetPosXRef.current = newX;

    const insideCoilFactor = Math.exp(-Math.pow((newX - 350) / 70, 2));
    const poleMultiplier = isPoleFlipped ? -1 : 1;
    const emfVal = -numTurns * (velX / 80) * insideCoilFactor * 0.8 * poleMultiplier;
    inducedEmfRef.current = emfVal;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      inducedEmfRef.current = 0;
    }
  };

  // Dynamic Realtime Physics Description Generator
  const getPhysicsDescription = () => {
    const absEmf = Math.abs(uiInducedEmf);
    if (absEmf < 0.2) {
      return isEn
        ? "🛑 [Magnet Stationary (v = 0)] Magnetic flux Φ through coil is constant (dΦ/dt = 0). Induced EMF E = 0V, bulb is OFF."
        : "🛑 [Nam châm đứng yên (v = 0)] Từ thông Φ gửi qua cuộn dây không biến thiên (dΦ/dt = 0). Suất điện động cảm ứng E = 0V, bóng đèn không sáng.";
    }

    if (uiInducedEmf > 0) {
      return isEn
        ? `⚡ [Magnet Approaching (+V)] Magnetic flux Φ through ${numTurns} coil turns INCREASES. By Lenz's Law, induced current flows counter-clockwise to resist flux growth, deflecting Galvanometer to +V (${uiInducedEmf.toFixed(1)}V) and lighting bulb!`
        : `⚡ [Nam châm di chuyển LẠI GẦN (+V)] Từ thông Φ gửi qua ${numTurns} vòng dây TĂNG NHANH. Theo Định luật Lenz, dòng điện cảm ứng tạo từ trường B_cảm ứng chống lại sự tăng từ thông. Kim Galvanometer lệch dương (+V) và bóng đèn sáng rực!`;
    }

    return isEn
      ? `⚡ [Magnet Moving Away (-V)] Magnetic flux Φ DECREASES. Induced current reverses direction to prevent flux drop, deflecting Galvanometer to -V (${uiInducedEmf.toFixed(1)}V)!`
      : `⚡ [Nam châm di chuyển RA XA (-V)] Từ thông Φ gửi qua cuộn dây GIẢM XUẤT. Dòng điện cảm ứng lập tức đảo chiều để chống lại sự giảm từ thông. Kim Galvanometer lệch âm (-V) và bóng đèn phát sáng!`;
  };


  // --- SINGLE 60 FPS CANVAS & PHYSICS RENDER LOOP (Zero Jitter!) ---
  useEffect(() => {
    let animId;
    let time = 0;
    let lastUiUpdate = 0;

    const render = () => {
      time += 0.02 * simSpeedMode;
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

      // Physics Motion Calculation if Auto-Running
      if (isRunning && !isDragging) {
        const newX = 350 + Math.sin(time * magnetSpeed) * 160;
        const velX = Math.cos(time * magnetSpeed) * 160 * magnetSpeed * simSpeedMode;

        magnetPosXRef.current = newX;

        const insideCoilFactor = Math.exp(-Math.pow((newX - 350) / 70, 2));
        const poleMultiplier = isPoleFlipped ? -1 : 1;
        const emfVal = -numTurns * (velX / 80) * insideCoilFactor * 0.8 * poleMultiplier;
        inducedEmfRef.current = emfVal;
      }

      const curMagnetX = magnetPosXRef.current;
      const curEmf = inducedEmfRef.current;

      // Throttle UI Sidebar State update (10Hz) to keep sidebar text in sync without causing canvas flicker
      const nowMs = performance.now();
      if (nowMs - lastUiUpdate > 80) {
        lastUiUpdate = nowMs;
        setUiMagnetX(curMagnetX);
        setUiInducedEmf(curEmf);
      }


      const coilCenterX = 350;
      const coilCenterY = 180;
      const coilRadiusY = 45;
      const coilRadiusX = 14;
      const coilLength = 140;

      // --- 1. BACK HALF OF SOLENOID COIL LOOPS ---
      ctx.lineWidth = 4;
      const startX = coilCenterX - coilLength / 2;
      const stepX = coilLength / numTurns;

      for (let i = 0; i < numTurns; i++) {
        const cx = startX + i * stepX + stepX / 2;
        ctx.strokeStyle = '#b45309';
        ctx.beginPath();
        ctx.ellipse(cx, coilCenterY, coilRadiusX, coilRadiusY, 0, Math.PI * 0.5, Math.PI * 1.5);
        ctx.stroke();
      }


      // --- 2. MAGNETIC B-FIELD LINES WITH DIRECTIONAL ARROWS ("VÀO S, RA N") ---
      const mLen = 140;
      const mH = 40;
      const arcCount = 4;

      const isNorthLeft = !isPoleFlipped; // false: N left, S right. true: S left, N right

      for (let a = 1; a <= arcCount; a++) {
        const rx = (mLen / 2) + a * 26;
        const ry = 20 + a * 18;

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 - a * 0.08})`;
        ctx.lineWidth = 1.5;

        // Top B-Field Arc
        ctx.beginPath();
        ctx.ellipse(curMagnetX, coilCenterY - 4, rx, ry, 0, Math.PI, 0);
        ctx.stroke();

        // Bottom B-Field Arc
        ctx.beginPath();
        ctx.ellipse(curMagnetX, coilCenterY + 4, rx, ry, 0, 0, Math.PI);
        ctx.stroke();

        // Directional B-Field Arrows (Out from N, into S)
        ctx.fillStyle = '#00f2fe';
        const arrowDirection = isNorthLeft ? -1 : 1; // Direction of B field on top arc

        // Arrow on Top Arc
        const topArrowX = curMagnetX + arrowDirection * (rx * 0.3);
        const topArrowY = coilCenterY - 4 - ry;
        drawArrowHead(ctx, topArrowX, topArrowY, arrowDirection > 0 ? 0 : Math.PI, '#00f2fe');

        // Arrow on Bottom Arc
        const botArrowX = curMagnetX + arrowDirection * (rx * 0.3);
        const botArrowY = coilCenterY + 4 + ry;
        drawArrowHead(ctx, botArrowX, botArrowY, arrowDirection > 0 ? 0 : Math.PI, '#00f2fe');
      }

      // Central Axis B-Field Line (Straight through center S -> N inside magnet)
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(curMagnetX - mLen * 0.9, coilCenterY);
      ctx.lineTo(curMagnetX + mLen * 0.9, coilCenterY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Central Axis Direction Arrow
      const centerArrowDir = isNorthLeft ? -1 : 1;
      drawArrowHead(ctx, curMagnetX + centerArrowDir * (mLen * 0.7), coilCenterY, centerArrowDir > 0 ? 0 : Math.PI, '#00f2fe');


      // --- 3. BAR MAGNET (N-S / S-N) ---
      const mY = coilCenterY - mH / 2;
      const mLeft = curMagnetX - mLen / 2;

      const pole1Color = isPoleFlipped ? '#3b82f6' : '#ef4444';
      const pole1Text = isPoleFlipped ? 'S' : 'N';

      const pole2Color = isPoleFlipped ? '#ef4444' : '#3b82f6';
      const pole2Text = isPoleFlipped ? 'N' : 'S';

      // Pole 1 (Left)
      const p1Grad = ctx.createLinearGradient(mLeft, mY, mLeft + mLen / 2, mY + mH);
      p1Grad.addColorStop(0, pole1Color);
      p1Grad.addColorStop(1, '#991b1b');
      ctx.fillStyle = p1Grad;
      ctx.fillRect(mLeft, mY, mLen / 2, mH);
      ctx.strokeStyle = pole1Color;
      ctx.strokeRect(mLeft, mY, mLen / 2, mH);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'extrabold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(pole1Text, mLeft + mLen / 4, mY + 26);

      // Pole 2 (Right)
      const p2Grad = ctx.createLinearGradient(curMagnetX, mY, curMagnetX + mLen / 2, mY + mH);
      p2Grad.addColorStop(0, pole2Color);
      p2Grad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = p2Grad;
      ctx.fillRect(curMagnetX, mY, mLen / 2, mH);
      ctx.strokeStyle = pole2Color;
      ctx.strokeRect(curMagnetX, mY, mLen / 2, mH);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(pole2Text, curMagnetX + (mLen * 3) / 4, mY + 26);


      // --- 4. FRONT HALF OF SOLENOID COIL LOOPS ---
      for (let i = 0; i < numTurns; i++) {
        const cx = startX + i * stepX + stepX / 2;

        const wireGrad = ctx.createLinearGradient(cx - 10, coilCenterY - 45, cx + 10, coilCenterY + 45);
        wireGrad.addColorStop(0, '#f59e0b');
        wireGrad.addColorStop(0.5, '#fbbf24');
        wireGrad.addColorStop(1, '#d97706');

        ctx.strokeStyle = wireGrad;
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.ellipse(cx, coilCenterY, coilRadiusX, coilRadiusY, 0, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.stroke();
      }

      // Solenoid Tube Casing
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX - 10, coilCenterY - coilRadiusY - 4, coilLength + 20, coilRadiusY * 2 + 8);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? `COIL: N = ${numTurns} TURNS` : `CUỘN DÂY: N = ${numTurns} VÒNG`, coilCenterX, coilCenterY + coilRadiusY + 20);


      // --- 5. CONNECTING WIRES & FLOWING INDUCED ELECTRONS ---
      const wireLeftX = startX - 10;
      const wireRightX = startX + coilLength + 10;
      const bottomWireY = 310;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(wireLeftX, coilCenterY + coilRadiusY + 4);
      ctx.lineTo(wireLeftX, bottomWireY);
      ctx.lineTo(coilCenterX - 70, bottomWireY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(wireRightX, coilCenterY + coilRadiusY + 4);
      ctx.lineTo(wireRightX, bottomWireY);
      ctx.lineTo(coilCenterX + 70, bottomWireY);
      ctx.stroke();

      // Flowing Induced Electrons along wires when curEmf != 0
      const absEmf = Math.abs(curEmf);
      if (absEmf > 0.1) {
        ctx.fillStyle = '#00f5d4';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 6;
        const eSpeed = Math.sign(curEmf) * Math.min(4, absEmf * 0.5);

        for (let e = 0; e < 8; e++) {
          const dist = (e * 30 + time * eSpeed * 25) % 240;
          let ex = wireLeftX + dist;
          let ey = bottomWireY;
          if (ex <= wireRightX) {
            ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.shadowBlur = 0;
      }


      // --- 6. CENTER-ZERO GALVANOMETER VOLTMETER DIAL ---
      const meterX = coilCenterX - 70;
      const meterY = bottomWireY;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(meterX, meterY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('0', meterX, meterY - 14);
      ctx.fillText('-V', meterX - 18, meterY + 4);
      ctx.fillText('+V', meterX + 18, meterY + 4);
      ctx.fillText('G', meterX, meterY + 20);

      // Needle Angle based on curEmf
      const maxEmfRange = 15;
      const clampedEmf = Math.max(-maxEmfRange, Math.min(maxEmfRange, curEmf));
      const needleAngle = (clampedEmf / maxEmfRange) * (Math.PI * 0.35) - Math.PI * 0.5;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(meterX, meterY + 6);
      ctx.lineTo(meterX + Math.cos(needleAngle) * 24, meterY + 6 + Math.sin(needleAngle) * 24);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(meterX, meterY + 6, 3, 0, Math.PI * 2);
      ctx.fill();


      // --- 7. INCANDESCENT LIGHT BULB ---
      const bulbX = coilCenterX + 70;
      const bulbY = bottomWireY;
      const glowIntensity = Math.min(1, absEmf / 8);

      if (glowIntensity > 0.05) {
        const glowGrad = ctx.createRadialGradient(bulbX, bulbY - 10, 2, bulbX, bulbY - 10, 45 * glowIntensity);
        glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
        glowGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.4)');
        glowGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(bulbX, bulbY - 10, 45 * glowIntensity, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = glowIntensity > 0.1 ? 'rgba(254, 240, 138, 0.8)' : 'rgba(148, 163, 184, 0.2)';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY - 12, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.fillRect(bulbX - 8, bulbY + 2, 16, 12);

      ctx.strokeStyle = glowIntensity > 0.1 ? '#ffffff' : '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bulbX - 6, bulbY - 4);
      ctx.lineTo(bulbX - 2, bulbY - 16);
      ctx.lineTo(bulbX + 2, bulbY - 16);
      ctx.lineTo(bulbX + 6, bulbY - 4);
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'LIGHT BULB' : 'BÓNG ĐÈN', bulbX, bulbY + 24);


      // --- 8. REALTIME TITLE BANNER ---
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isEn
          ? `FARADAY'S ELECTROMAGNETIC INDUCTION: INDUCED EMF E = ${curEmf.toFixed(2)} V`
          : `ĐỊNH LUẬT CẢM ỨNG ĐIỆN TỪ FARADAY: SUẤT ĐIỆN ĐỘNG E = ${curEmf.toFixed(2)} V`,
        w * 0.5,
        24
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [numTurns, magnetSpeed, isPoleFlipped, simSpeedMode, isRunning, isDragging, isEn]);

  const drawArrowHead = (ctx, x, y, angle, color = '#00f2fe') => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 6 * Math.cos(angle), y + 6 * Math.sin(angle));
    ctx.lineTo(x - 6 * Math.cos(angle - Math.PI / 6), y - 6 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - 6 * Math.cos(angle + Math.PI / 6), y - 6 * Math.sin(angle + Math.PI / 6));
    ctx.fill();
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsDragging(false);
    magnetPosXRef.current = 160;
    inducedEmfRef.current = 0;
    setUiMagnetX(160);
    setUiInducedEmf(0);
  };

  const handleRecord = () => {
    onDataRecorded?.({
      numTurns,
      magnetSpeed,
      simSpeedMode: `${simSpeedMode}x`,
      magnetPosX: `${Math.round(uiMagnetX)} px`,
      inducedEmf: `${uiInducedEmf.toFixed(2)} V`,
      status: Math.abs(uiInducedEmf) > 0.5 ? (isEn ? 'Generating Power' : 'Đang sinh điện') : (isEn ? 'Static Magnet' : 'Nam châm đứng yên')
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={370}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full max-w-[540px] h-[370px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900 cursor-grab active:cursor-grabbing"
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
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Faraday Experiment Controls' : 'Tham số Thí nghiệm Faraday'}
          </h3>

          {/* Slow Motion Speed Controls (0.25x / 0.5x / 1.0x) */}
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isEn ? 'Simulation Speed:' : 'Tốc độ quay mô phỏng (Slow Motion):'}</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '0.25x (Rất chậm)', val: 0.25 },
                { label: '0.5x (Vừa)', val: 0.5 },
                { label: '1.0x (Chuẩn)', val: 1.0 }
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => setSimSpeedMode(s.val)}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all ${
                    simSpeedMode === s.val
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Coil Turns N */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Coil Turns N:' : 'Số vòng dây N:'}</span>
              <span className="text-amber-400 font-bold">{numTurns} {isEn ? 'turns' : 'vòng'}</span>
            </div>
            <input
              type="range" min="1" max="10" step="1"
              value={numTurns}
              onChange={(e) => onParamChange('numTurns', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Magnet Speed */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Auto Move Speed:' : 'Tốc độ di chuyển Nam châm:'}</span>
              <span className="text-cyan-400 font-bold">{magnetSpeed}</span>
            </div>
            <input
              type="range" min="1" max="10" step="1"
              value={magnetSpeed}
              onChange={(e) => onParamChange('magnetSpeed', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Flip Poles Button */}
          <button
            onClick={() => setIsPoleFlipped(!isPoleFlipped)}
            className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isEn ? 'Flip Magnet Poles (N ↔ S)' : 'Đảo Cực Nam Châm (N ↔ S)'}</span>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? (isEn ? 'Pause Auto' : 'Tạm dừng') : (isEn ? 'Auto Oscillate' : 'Di chuyển Tự động')}</span>
            </button>

            <button
              onClick={handleReset}
              className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset' : 'Đặt lại'}</span>
            </button>
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'FARADAY MEASUREMENTS' : 'Số liệu Cảm ứng Điện từ'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Position X:' : 'Vị trí X:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{Math.round(uiMagnetX)} px</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Coil Turns:' : 'Số vòng N:'}</span>
              <span className="text-amber-400 font-bold text-sm">{numTurns} vòng</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Induced EMF E:' : 'Suất điện động E:'}</span>
                <span className="text-slate-400 text-[10px]">{isEn ? 'Formula E = -N·dΦ/dt' : 'Công thức E = -N·dΦ/dt'}</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{uiInducedEmf.toFixed(2)} V</span>
            </div>
          </div>

          <button
            onClick={handleRecord}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Faraday Data' : 'Ghi Bảng Số liệu Faraday'}
          </button>
        </div>
      </div>
    </div>
  );
}
