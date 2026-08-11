import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, Zap, Info, ArrowLeftRight } from 'lucide-react';

export default function FaradaySimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPoleFlipped, setIsPoleFlipped] = useState(false); // North left vs North right

  const numTurns = params.numTurns || 4; // Number of coil turns N
  const magnetSpeed = params.magnetSpeed || 5; // Magnet oscillation speed
  const [magnetPosX, setMagnetPosX] = useState(160);
  const [inducedEmf, setInducedEmf] = useState(0);

  const dragOffsetRef = useRef(0);
  const prevMagnetXRef = useRef(160);

  // Animation Loop: Move Magnet back and forth through coil
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const update = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      if (isRunning && !isDragging) {
        // Simple Harmonic Motion of magnet along coil axis
        const tSec = now / 1000;
        const newX = 350 + Math.sin(tSec * magnetSpeed) * 160;
        const velX = Math.cos(tSec * magnetSpeed) * 160 * magnetSpeed;

        setMagnetPosX(newX);

        // Faraday's Law EMF = -N * dPhi/dt
        const insideCoilFactor = Math.exp(-Math.pow((newX - 350) / 70, 2));
        const poleMultiplier = isPoleFlipped ? -1 : 1;
        const emfVal = -numTurns * (velX / 80) * insideCoilFactor * 0.8 * poleMultiplier;

        setInducedEmf(emfVal);
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, isDragging, numTurns, magnetSpeed, isPoleFlipped]);

  // Handle Drag & Drop Magnet directly on Canvas
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Magnet bounds check
    const mLen = 140;
    const mH = 40;
    const coilCenterY = 190;
    if (
      mouseX >= magnetPosX - mLen / 2 &&
      mouseX <= magnetPosX + mLen / 2 &&
      mouseY >= coilCenterY - mH / 2 &&
      mouseY <= coilCenterY + mH / 2
    ) {
      setIsDragging(true);
      dragOffsetRef.current = mouseX - magnetPosX;
      prevMagnetXRef.current = magnetPosX;
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);

    const newX = Math.max(80, Math.min(canvas.width - 80, mouseX - dragOffsetRef.current));
    const velX = (newX - prevMagnetXRef.current) * 30; // estimate velocity
    prevMagnetXRef.current = newX;

    setMagnetPosX(newX);

    // Calculate induced EMF during drag
    const insideCoilFactor = Math.exp(-Math.pow((newX - 350) / 70, 2));
    const poleMultiplier = isPoleFlipped ? -1 : 1;
    const emfVal = -numTurns * (velX / 80) * insideCoilFactor * 0.8 * poleMultiplier;
    setInducedEmf(emfVal);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setInducedEmf(0);
    }
  };

  // Dynamic Physics Explanation Text Generator
  const getPhysicsDescription = () => {
    const absEmf = Math.abs(inducedEmf);
    if (absEmf < 0.2) {
      return isEn
        ? "🛑 [Magnet Stationary (v = 0)] Magnetic flux Φ is constant (dΦ/dt = 0). Induced EMF E = 0V, no current flows, bulb is dark."
        : "🛑 [Nam châm đứng yên (v = 0)] Từ thông Φ gửi qua cuộn dây không biến thiên (dΦ/dt = 0). Suất điện động cảm ứng E = 0V, dòng điện I = 0A, bóng đèn không sáng.";
    }

    if (inducedEmf > 0) {
      return isEn
        ? `⚡ [Moving Inwards (+V)] Magnetic flux Φ through ${numTurns} coil turns INCREASES rapidly. By Lenz's Law, induced current flows counter-clockwise to resist flux growth, deflecting Galvanometer to +V (${inducedEmf.toFixed(1)}V) and lighting the bulb!`
        : `⚡ [Di chuyển lại gần cuộn dây (+V)] Từ thông Φ gửi qua ${numTurns} vòng dây TĂNG NHANH. Theo Định luật Lenz, trong cuộn dây xuất hiện dòng điện cảm ứng I_cảm ứng tạo từ trường chống lại sự tăng từ thông này. Kim Galvanometer lệch dương (+V) và bóng đèn phát sáng rực rỡ!`;
    }

    return isEn
      ? `⚡ [Moving Outwards (-V)] Magnetic flux Φ DECREASES. Induced current reverses direction to prevent flux drop, deflecting Galvanometer to -V (${inducedEmf.toFixed(1)}V)!`
      : `⚡ [Di chuyển ra xa cuộn dây (-V)] Từ thông Φ gửi qua cuộn dây GIẢM XUẤT. Dòng điện cảm ứng ngay lập tức đảo chiều để tạo từ trường chống lại sự giảm từ thông. Kim Galvanometer lệch âm (-V) và bóng đèn sáng lên!`;
  };

  // Canvas 60 FPS Graphics Renderer
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

      const coilCenterX = 350;
      const coilCenterY = 190;
      const coilRadiusY = 45;
      const coilRadiusX = 14;
      const coilLength = 140;

      // --- 1. DRAW BACK HALF OF SOLENOID COIL LOOPS ---
      ctx.lineWidth = 4;
      const startX = coilCenterX - coilLength / 2;
      const stepX = coilLength / numTurns;

      for (let i = 0; i < numTurns; i++) {
        const cx = startX + i * stepX + stepX / 2;
        ctx.strokeStyle = '#b45309'; // Back half copper wire shadow
        ctx.beginPath();
        ctx.ellipse(cx, coilCenterY, coilRadiusX, coilRadiusY, 0, Math.PI * 0.5, Math.PI * 1.5);
        ctx.stroke();
      }

      // --- 2. DRAW MAGNETIC FIELD LINES (B-Field Dipole Arcs) ---
      const mLen = 140;
      const mH = 40;

      ctx.lineWidth = 1.5;
      const arcCount = 5;
      for (let a = 1; a <= arcCount; a++) {
        const rx = (mLen / 2) + a * 24;
        const ry = 22 + a * 18;

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 - a * 0.06})`;
        // Top Arc
        ctx.beginPath();
        ctx.ellipse(magnetPosX, coilCenterY - 6, rx, ry, 0, Math.PI, 0);
        ctx.stroke();

        // Bottom Arc
        ctx.beginPath();
        ctx.ellipse(magnetPosX, coilCenterY + 6, rx, ry, 0, 0, Math.PI);
        ctx.stroke();
      }


      // --- 3. DRAW BAR MAGNET (N-S / S-N) ---
      const mY = coilCenterY - mH / 2;
      const mLeft = magnetPosX - mLen / 2;

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
      const p2Grad = ctx.createLinearGradient(magnetPosX, mY, magnetPosX + mLen / 2, mY + mH);
      p2Grad.addColorStop(0, pole2Color);
      p2Grad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = p2Grad;
      ctx.fillRect(magnetPosX, mY, mLen / 2, mH);
      ctx.strokeStyle = pole2Color;
      ctx.strokeRect(magnetPosX, mY, mLen / 2, mH);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(pole2Text, magnetPosX + (mLen * 3) / 4, mY + 26);


      // --- 4. DRAW FRONT HALF OF SOLENOID COIL LOOPS ---
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
      ctx.fillText(isEn ? `COIL: N = ${numTurns} TURNS` : `CUỘN DÂY: N = ${numTurns} VÒNG`, coilCenterX, coilCenterY + coilRadiusY + 22);


      // --- 5. CONNECTING WIRES & INDUCED ELECTRONS ---
      const wireLeftX = startX - 10;
      const wireRightX = startX + coilLength + 10;
      const bottomWireY = 320;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;

      // Wires down to meters
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

      // Flowing Induced Electrons along wires when inducedEmf != 0
      const absEmf = Math.abs(inducedEmf);
      if (absEmf > 0.1) {
        ctx.fillStyle = '#00f5d4';
        ctx.shadowColor = '#00f5d4';
        ctx.shadowBlur = 6;
        const eSpeed = Math.sign(inducedEmf) * Math.min(4, absEmf * 0.5);

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

      // Meter ticks
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('0', meterX, meterY - 14);
      ctx.fillText('-V', meterX - 18, meterY + 4);
      ctx.fillText('+V', meterX + 18, meterY + 4);
      ctx.fillText('G', meterX, meterY + 20);

      // Needle Angle
      const maxEmfRange = 15;
      const clampedEmf = Math.max(-maxEmfRange, Math.min(maxEmfRange, inducedEmf));
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
      ctx.fillText(isEn ? 'LIGHT BULB' : 'BÓNG ĐÈN', bulbX, bulbY + 26);


      // --- 8. REALTIME TITLE BANNER ---
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isEn
          ? `FARADAY'S ELECTROMAGNETIC INDUCTION: INDUCED EMF E = ${inducedEmf.toFixed(2)} V`
          : `ĐỊNH LUẬT CẢM ỨNG ĐIỆN TỪ FARADAY: SUẤT ĐIỆN ĐỘNG E = ${inducedEmf.toFixed(2)} V`,
        w * 0.5,
        25
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [magnetPosX, inducedEmf, numTurns, isPoleFlipped, isEn]);

  const handleReset = () => {
    setIsRunning(false);
    setIsDragging(false);
    setMagnetPosX(160);
    setInducedEmf(0);
  };

  const handleRecord = () => {
    onDataRecorded?.({
      numTurns,
      magnetSpeed,
      magnetPosX: `${Math.round(magnetPosX)} px`,
      inducedEmf: `${inducedEmf.toFixed(2)} V`,
      status: Math.abs(inducedEmf) > 0.5 ? (isEn ? 'Generating Power' : 'Đang sinh điện') : (isEn ? 'Static Magnet' : 'Nam châm đứng yên')
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={380}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full max-w-[540px] h-[380px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900 cursor-grab active:cursor-grabbing"
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
              <span className="text-cyan-400 font-bold text-sm">{Math.round(magnetPosX)} px</span>
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
              <span className="text-emerald-400 font-extrabold text-base">{inducedEmf.toFixed(2)} V</span>
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
