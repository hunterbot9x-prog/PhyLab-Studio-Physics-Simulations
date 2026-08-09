import React, { useState, useEffect, useRef } from 'react';
import { Target, Play, RotateCcw, Pause, ShieldAlert } from 'lucide-react';

export default function ProjectileSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flightTime, setFlightTime] = useState(0);
  const [trajectory, setTrajectory] = useState([]);

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

  // Animation step loop
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const dt = 0.04;
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

    // Scale pixels per meter (fit max range 100m into canvas)
    const scalePxPerM = 4.2;

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
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`${isEn ? 'Max Range L' : 'Tầm xa L'} = ${maxRange.toFixed(1)}m`, Math.min(targetX - 30, width - 110), groundY + 25);

    // 3. Draw Cannon Base (Khẩu pháo)
    ctx.save();
    ctx.translate(originX, groundY);
    ctx.rotate(-radAngle);

    // Cannon Barrel
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, -8, 40, 16);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, -8, 40, 16);
    ctx.restore();

    // Cannon wheel base
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(originX, groundY, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // 4. Draw Trajectory Curve (Đường Parabol)
    if (trajectory.length > 1) {
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.lineWidth = 2;
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
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath(); ctx.moveTo(peakX, groundY); ctx.lineTo(peakX, peakY); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`H_max = ${maxHeight.toFixed(1)}m`, peakX - 35, peakY - 8);

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

  }, [trajectory, maxRange, maxHeight, radAngle, isEn]);

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
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
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
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> {isEn ? 'Reset' : 'Đặt lại'}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {isEn ? 'Time t:' : 'Thời gian t:'} <span className="text-cyan-400 font-bold">{flightTime.toFixed(2)}s</span> / {totalFlightTime.toFixed(2)}s
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" /> {isEn ? 'PROJECTILE PARAMETERS' : 'Thông số Ném xiên'}
          </h3>

          {/* Initial Velocity v0 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Initial Velocity v₀:' : 'Vận tốc ban đầu v₀:'}</span>
              <span className="text-cyan-400 font-bold">{v0} m/s</span>
            </div>
            <input
              type="range" min="10" max="45" step="1"
              value={v0}
              onChange={(e) => onParamChange('v0', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Angle Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Launch Angle α (°):' : 'Góc ném α (°):'}</span>
              <span className="text-amber-400 font-bold">{angle}°</span>
            </div>
            <input
              type="range" min="10" max="80" step="5"
              value={angle}
              onChange={(e) => onParamChange('angle', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Calculated Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📐 {isEn ? 'DYNAMICS RESULTS' : 'Kết quả Động lực học'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Height H_max:' : 'Tầm cao H_max:'}</span>
              <span className="text-amber-400 font-bold text-sm">{maxHeight.toFixed(1)} m</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Max Range L:' : 'Tầm xa cực đại L:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{maxRange.toFixed(1)} m</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Flight Time t_flight:' : 'Thời gian bay t_bay:'}</span>
                <span className="text-slate-400 text-[10px]">t = 2 v₀ sin(α) / g</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{totalFlightTime.toFixed(2)} {isEn ? 's' : 'giây'}</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Data Point' : 'Ghi Bảng Số liệu Chuyển động'}
          </button>
        </div>
      </div>
    </div>
  );
}
