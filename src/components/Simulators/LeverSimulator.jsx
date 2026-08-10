import React, { useEffect, useRef } from 'react';
import { Scale, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function LeverSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const leftMass = params.leftMass || 200; // grams
  const leftDistance = params.leftDistance || 15; // cm
  const rightMass = params.rightMass || 300; // grams
  const rightDistance = params.rightDistance || 10; // cm

  // Torques
  const g = 9.8;
  const torque1 = (leftMass / 1000) * g * (leftDistance / 100); // N.m
  const torque2 = (rightMass / 1000) * g * (rightDistance / 100); // N.m

  const netTorque = torque2 - torque1;
  const isBalanced = Math.abs(netTorque) < 0.005;

  // Calculate beam tilt angle in radians
  const tiltAngle = Math.max(-0.25, Math.min(0.25, netTorque * 0.5));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
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

    const pivotX = width * 0.5;
    const pivotY = height * 0.6;

    // 1. Draw Pivot Support Stand
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX - 30, pivotY + 70);
    ctx.lineTo(pivotX + 30, pivotY + 70);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 6, 0, 2 * Math.PI); ctx.fill();

    // 2. Draw Lever Beam (Thanh đòn bẩy O)
    const beamLength = 440;
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(tiltAngle);

    // Beam rectangle
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(-beamLength / 2, -10, beamLength, 20, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Graduation ticks (cm)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '8px Inter';
    ctx.textAlign = 'center';

    for (let cm = -25; cm <= 25; cm += 5) {
      const px = cm * 8;
      ctx.beginPath();
      ctx.moveTo(px, -10);
      ctx.lineTo(px, cm % 10 === 0 ? 0 : -5);
      ctx.stroke();
      if (cm !== 0 && cm % 5 === 0) {
        ctx.fillText(`${Math.abs(cm)}`, px, -12);
      }
    }

    // Left Mass (Mass 1)
    const leftPx = -leftDistance * 8;
    const leftHeight = Math.min(50, 15 + leftMass * 0.08);

    ctx.fillStyle = '#f43f5e';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(leftPx - 16, -10 - leftHeight, 32, leftHeight, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`${leftMass}g`, leftPx, -14 - leftHeight / 2);

    // Right Mass (Mass 2)
    const rightPx = rightDistance * 8;
    const rightHeight = Math.min(50, 15 + rightMass * 0.08);

    ctx.fillStyle = '#3b82f6';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rightPx - 16, -10 - rightHeight, 32, rightHeight, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`${rightMass}g`, rightPx, -14 - rightHeight / 2);

    ctx.restore();

    // 3. Draw Balance Indicator Status Badge
    ctx.fillStyle = isBalanced ? '#10b981' : '#f43f5e';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    const statusText = isBalanced
      ? (isEn ? '⚖️ LEVER EQUILIBRIUM (M₁ = M₂)' : '⚖️ ĐÒN BẨY CÂN BẰNG (M₁ = M₂)')
      : netTorque > 0
        ? (isEn ? '⚠️ TILTED RIGHT (M₂ > M₁)' : '⚠️ NGHIÊNG BÊN PHẢI (M₂ > M₁)')
        : (isEn ? '⚠️ TILTED LEFT (M₁ > M₂)' : '⚠️ NGHIÊNG BÊN TRÁI (M₁ > M₂)');
    ctx.fillText(statusText, pivotX, 40);

  }, [leftMass, leftDistance, rightMass, rightDistance, tiltAngle, isBalanced, netTorque, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      leftMass: `${leftMass} g`,
      leftDistance: `${leftDistance} cm`,
      rightMass: `${rightMass} g`,
      rightDistance: `${rightDistance} cm`,
      momentLeft: `${(leftMass * leftDistance).toLocaleString()} g·cm`,
      momentRight: `${(rightMass * rightDistance).toLocaleString()} g·cm`,
      status: isBalanced ? (isEn ? 'Balanced (M₁ = M₂)' : 'Cân bằng (M₁ = M₂)') : (netTorque > 0 ? (isEn ? 'Right Tilted' : 'Nghiêng Phải') : (isEn ? 'Left Tilted' : 'Nghiêng Trái'))
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
        {/* Left Side Controls */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            🔴 {isEn ? 'Left Side (Object 1)' : 'Bên trái (Vật 1)'}
          </h3>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Mass m₁:' : 'Khối lượng m₁:'}</span>
              <span className="text-rose-400 font-bold">{leftMass} g</span>
            </div>
            <input
              type="range" min="50" max="500" step="10"
              value={leftMass}
              onChange={(e) => onParamChange('leftMass', Number(e.target.value))}
              className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Distance d₁:' : 'Khoảng cách d₁:'}</span>
              <span className="text-rose-400 font-bold">{leftDistance} cm</span>
            </div>
            <input
              type="range" min="5" max="25" step="1"
              value={leftDistance}
              onChange={(e) => onParamChange('leftDistance', Number(e.target.value))}
              className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            🔵 {isEn ? 'Right Side (Object 2)' : 'Bên phải (Vật 2)'}
          </h3>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Mass m₂:' : 'Khối lượng m₂:'}</span>
              <span className="text-blue-400 font-bold">{rightMass} g</span>
            </div>
            <input
              type="range" min="50" max="500" step="10"
              value={rightMass}
              onChange={(e) => onParamChange('rightMass', Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Distance d₂:' : 'Khoảng cách d₂:'}</span>
              <span className="text-blue-400 font-bold">{rightDistance} cm</span>
            </div>
            <input
              type="range" min="5" max="25" step="1"
              value={rightDistance}
              onChange={(e) => onParamChange('rightDistance', Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Moment Calculations */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">{isEn ? 'Left Torque M₁:' : 'Moment trái M₁:'}</span>
              <span className="text-rose-400 font-bold">{(leftMass * leftDistance).toLocaleString()} g·cm</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">{isEn ? 'Right Torque M₂:' : 'Moment phải M₂:'}</span>
              <span className="text-blue-400 font-bold">{(rightMass * rightDistance).toLocaleString()} g·cm</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Lever Data' : 'Ghi Bảng Số liệu Đòn bẩy'}
          </button>
        </div>
      </div>
    </div>
  );
}
