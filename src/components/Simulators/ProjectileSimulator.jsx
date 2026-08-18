import React, { useState, useEffect, useRef } from 'react';
import { Target, Play, RotateCcw, Pause, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export default function ProjectileSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flightTime, setFlightTime] = useState(0);
  const [trajectory, setTrajectory] = useState([]);
  const [showVectors, setShowVectors] = useState(true);

  const v0 = params.v0 || 25; // m/s
  const angle = params.angle !== undefined ? params.angle : 45; // degrees
  const g = params.gravity || 9.8; // m/s2
  const airResistance = params.airResistance || false;

  const radAngle = (angle * Math.PI) / 180;
  const vx0 = v0 * Math.cos(radAngle);
  const vy0 = v0 * Math.sin(radAngle);

  // Theoretical max values
  const totalFlightTime = (2 * vy0) / g;
  const maxHeight = (vy0 * vy0) / (2 * g);
  const maxRange = (v0 * v0 * Math.sin(2 * radAngle)) / g;

  // Current Instantaneous values
  const currentVx = vx0;
  const currentVy = vy0 - g * flightTime;
  const currentV = Math.sqrt(currentVx * currentVx + currentVy * currentVy);
  const currentX = vx0 * flightTime;
  const currentY = Math.max(0, vy0 * flightTime - 0.5 * g * flightTime * flightTime);

  // Animation step loop
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const dt = 0.035;
      animId = requestAnimationFrame(function step() {
        setFlightTime(prevTime => {
          const nextTime = prevTime + dt;
          if (nextTime >= totalFlightTime) {
            setIsPlaying(false);
            return totalFlightTime;
          }

          // Calculate current position
          let currX = vx0 * nextTime;
          let currY = vy0 * nextTime - 0.5 * g * nextTime * nextTime;
          if (currY < 0) currY = 0;

          setTrajectory(prev => [...prev, { x: currX, y: currY }]);
          return nextTime;
        });

        if (isPlaying) {
          animId = requestAnimationFrame(step);
        }
      });
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, totalFlightTime, vx0, vy0, g]);

  const handleLaunch = () => {
    setFlightTime(0);
    setTrajectory([]);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setFlightTime(0);
    setTrajectory([]);
  };

  const recordPoint = () => {
    onDataRecorded?.({
      time: new Date().toLocaleTimeString(),
      v0: `${v0} m/s`,
      angle: `${angle}°`,
      maxHeight: `${maxHeight.toFixed(1)} m`,
      maxRange: `${maxRange.toFixed(1)} m`,
      totalTime: `${totalFlightTime.toFixed(2)} s`
    });
  };

  // Helper to draw clean vector arrows
  const drawVector = (ctx, fromX, fromY, toX, toY, color, label, width = 2.5) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    const headLen = 8;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    if (label) {
      ctx.font = 'bold 9px Inter';
      ctx.fillText(label, toX + 6 * Math.cos(angle), toY + 6 * Math.sin(angle));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Sky Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const groundY = height - 50;
    const originX = 50;

    // Dynamic Scaling: fits maxRange into canvas width gracefully
    const scalePxPerM = Math.min(5.2, (width - originX - 60) / Math.max(30, maxRange));

    // 1. Draw Ground (Mặt đất)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, groundY, width, height - groundY);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(width, groundY); ctx.stroke();

    // 2. Draw Target Mark (Bia trúng đích)
    const targetX = originX + maxRange * scalePxPerM;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(targetX, groundY, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(targetX, groundY, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(targetX, groundY, 2, 0, Math.PI * 2); ctx.fill();

    // Label for max range
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${isEn ? 'Max Range L' : 'Tầm xa L'} = ${maxRange.toFixed(1)}m`, Math.min(targetX, width - 65), groundY + 25);

    // 3. Draw Cannon Base (Khẩu pháo)
    ctx.save();
    ctx.translate(originX, groundY);
    ctx.rotate(-radAngle);

    // Cannon Barrel
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, -8, 38, 16);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, -8, 38, 16);
    ctx.restore();

    // Cannon wheel base
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(originX, groundY, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // 4. Draw Trajectory Curve (Đường Parabol)
    if (trajectory.length > 1) {
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX, groundY);
      trajectory.forEach(pt => {
        const px = originX + pt.x * scalePxPerM;
        const py = groundY - pt.y * scalePxPerM;
        ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Draw Peak Height Line (Đường Hmax)
    const peakX = originX + (maxRange / 2) * scalePxPerM;
    const peakY = groundY - maxHeight * scalePxPerM;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(peakX, groundY); ctx.lineTo(peakX, peakY); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`H_max = ${maxHeight.toFixed(1)}m`, peakX, peakY - 8);

    // 6. Draw Current Flying Ball (Quả pháo đang bay)
    let ballX = originX;
    let ballY = groundY;
    if (trajectory.length > 0) {
      const currentPt = trajectory[trajectory.length - 1];
      ballX = originX + currentPt.x * scalePxPerM;
      ballY = groundY - currentPt.y * scalePxPerM;
    }

    // Ball Glow & Body
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.arc(ballX, ballY, 7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // 7. REAL-TIME 2D VELOCITY VECTOR DECOMPOSITION (vx, vy, v, g)
    if (showVectors && (isPlaying || flightTime > 0)) {
      const vScale = 1.8; // Scale factor for vector length

      const vxLen = currentVx * vScale;
      const vyLen = -currentVy * vScale; // - for canvas coordinates

      // Component vx (Green - Horizontal Thẳng đều)
      drawVector(ctx, ballX, ballY, ballX + vxLen, ballY, '#10b981', `vx = ${currentVx.toFixed(1)} m/s`, 2);

      // Component vy (Orange - Vertical Rơi tự do)
      drawVector(ctx, ballX, ballY, ballX, ballY + vyLen, '#f59e0b', `vy = ${currentVy.toFixed(1)} m/s`, 2);

      // Parallelogram Resolution Dashed Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(ballX + vxLen, ballY);
      ctx.lineTo(ballX + vxLen, ballY + vyLen);
      ctx.lineTo(ballX, ballY + vyLen);
      ctx.stroke();
      ctx.setLineDash([]);

      // Resultant Velocity Vector v (Cyan - Tangent to curve)
      drawVector(ctx, ballX, ballY, ballX + vxLen, ballY + vyLen, '#38bdf8', `v = ${currentV.toFixed(1)} m/s`, 3);

      // Gravity Acceleration g (Red - Points Down)
      drawVector(ctx, ballX, ballY, ballX, ballY + 30, '#ef4444', 'g', 2);
    }

    // 8. 2D Independent Motion Breakdown Box (Top-Right inside Canvas)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(width - 225, 15, 215, 82);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(width - 225, 15, 215, 82);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(isEn ? '2D INDEPENDENT MOTIONS:' : 'PHÂN TÍCH 2 CHUYỂN ĐỘNG:', width - 215, 32);

    ctx.fillStyle = '#10b981';
    ctx.font = '9px Inter';
    ctx.fillText(isEn ? '• Ox (Uniform): x = vx·t, vx = v0·cosα' : '• Trục Ox (Thẳng đều): x = vx·t', width - 215, 48);

    ctx.fillStyle = '#f59e0b';
    ctx.fillText(isEn ? '• Oy (Free Fall): y = vy0·t - ½gt²' : '• Trục Oy (Biến đổi đều): y = vy0·t - ½gt²', width - 215, 64);

    ctx.fillStyle = '#ec4899';
    ctx.fillText(isEn ? '• Trajectory: y = (tanα)·x - g·x²/(2v0²cos²α)' : '• Quỹ đạo: y = (tanα)·x - [g/(2v0²cos²α)]·x²', width - 215, 80);

  }, [trajectory, maxRange, maxHeight, radAngle, isEn, showVectors, isPlaying, flightTime, currentV, currentVx, currentVy]);

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

        {/* Playback Action Bar */}
        <div className="w-full max-w-[540px] mt-4 flex items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="flex gap-2">
            {!isPlaying ? (
              <button
                onClick={handleLaunch}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" /> {isEn ? 'FIRE PROJECTILE' : 'BẮN PHÁO'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Pause className="w-4 h-4 fill-slate-950" /> {isEn ? 'PAUSE' : 'TẠM DỪNG'}
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-all border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" /> {isEn ? 'RESET' : 'ĐẶT LẠI'}
            </button>
          </div>

          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all border ${
              showVectors
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {showVectors ? (isEn ? 'Vectors ON' : 'Vectơ: BẬT') : (isEn ? 'Vectors OFF' : 'Vectơ: TẮT')}
          </button>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Controls Card */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" /> {isEn ? 'LAUNCH PARAMETERS' : 'THÔNG SỐ BẮN PHÁO'}
          </h3>

          {/* Initial Velocity v0 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Initial Velocity v₀:' : 'Vận tốc đầu v₀:'}</span>
              <span className="text-cyan-400 font-bold">{v0} m/s</span>
            </div>
            <input
              type="range" min="10" max="45" step="1"
              value={v0}
              onChange={(e) => onParamChange('v0', Number(e.target.value))}
              disabled={isPlaying}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Launch Angle α Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Launch Angle α:' : 'Góc bắn α:'}</span>
              <span className="text-amber-400 font-bold">{angle}°</span>
            </div>
            <input
              type="range" min="10" max="80" step="1"
              value={angle}
              onChange={(e) => onParamChange('angle', Number(e.target.value))}
              disabled={isPlaying}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Gravitational acceleration g Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Gravity Acceleration g:' : 'Gia tốc trọng trường g:'}</span>
              <span className="text-slate-200 font-bold">{g} m/s²</span>
            </div>
            <input
              type="range" min="1.6" max="25" step="0.2"
              value={g}
              onChange={(e) => onParamChange('gravity', Number(e.target.value))}
              disabled={isPlaying}
              className="w-full accent-pink-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Measured Results Card */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> {isEn ? 'MEASURED KINEMATICS' : 'KẾT QUẢ ĐO ĐỘNG HỌC'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Range (L):' : 'Tầm xa cực đại (L):'}</span>
              <span className="text-cyan-400 font-bold text-sm">{maxRange.toFixed(1)} m</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Height (H_max):' : 'Độ cao cực đại (H):'}</span>
              <span className="text-amber-400 font-bold text-sm">{maxHeight.toFixed(1)} m</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Flight Time (t_total):' : 'Thời gian bay (t):'}</span>
              <span className="text-pink-400 font-bold text-sm">{totalFlightTime.toFixed(2)} s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Current Speed (v):' : 'Vận tốc tức thời:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{currentV.toFixed(1)} m/s</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Projectile Data' : 'Ghi Bảng Số Liệu Ném Xiên'}
          </button>
        </div>
      </div>
    </div>
  );
}
