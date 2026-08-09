import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Pause, Activity } from 'lucide-react';

export default function PendulumGSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animTime, setAnimTime] = useState(0);

  const pendulumLenM = params.lengthM || 0.8; // pendulum length L in meters
  const g = params.gravity || 9.81; // m/s2
  const initialAngleDeg = 10; // small angle approx

  const omega = Math.sqrt(g / pendulumLenM); // rad/s
  const periodT = 2 * Math.PI * Math.sqrt(pendulumLenM / g); // seconds
  const tSquared = periodT * periodT;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimTime(prev => prev + 0.03);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020408');
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
    const pivotY = 50;
    const scalePxPerM = 220; // 1 meter = 220 px
    const stringLenPx = pendulumLenM * scalePxPerM;

    // Angle theta in radians
    const currentAngleRad = (initialAngleDeg * Math.PI / 180) * Math.cos(omega * animTime);

    const bobX = pivotX + stringLenPx * Math.sin(currentAngleRad);
    const bobY = pivotY + stringLenPx * Math.cos(currentAngleRad);

    // Fixed Ceiling Stand
    ctx.fillStyle = '#334155';
    ctx.fillRect(pivotX - 50, pivotY - 12, 100, 12);

    // String
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Pendulum Bob
    ctx.fillStyle = '#f43f5e';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bobX, bobY, 16, 0, 2 * Math.PI);
    ctx.fill(); ctx.stroke();

    // Title HUD
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? `SIMPLE PENDULUM: PERIOD T = ${periodT.toFixed(2)}s` : `CON LẮC ĐƠN: CHU KỲ T = ${periodT.toFixed(2)}s`, width * 0.5, 30);

  }, [pendulumLenM, g, omega, animTime, periodT, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      lengthM: `${pendulumLenM} m`,
      gravity: `${g} m/s²`,
      periodT: `${periodT.toFixed(2)} s`,
      tSquared: `${tSquared.toFixed(3)} s²`,
      calculatedG: `${((4 * Math.PI * Math.PI * pendulumLenM) / tSquared).toFixed(2)} m/s²`
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
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> {isEn ? 'Pendulum & Gravity Controls' : 'Cambridge Pendulum & Gravity'}
          </h3>

          {/* Pendulum Length L */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Pendulum Length L:' : 'Chiều dài con lắc L:'}</span>
              <span className="text-cyan-400 font-bold">{pendulumLenM} m</span>
            </div>
            <input
              type="range" min="0.3" max="1.5" step="0.1"
              value={pendulumLenM}
              onChange={(e) => onParamChange('lengthM', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Acceleration g */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Gravity Acceleration g:' : 'Gia tốc trọng trường g:'}</span>
              <span className="text-amber-400 font-bold">{g} m/s²</span>
            </div>
            <input
              type="range" min="1.6" max="25" step="0.1"
              value={g}
              onChange={(e) => onParamChange('gravity', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'PERIOD T & T² MEASUREMENTS' : 'Chu Kỳ T & Bình Phương T²'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Period T:' : 'Chu kỳ T:'}</span>
              <span className="text-rose-400 font-bold text-sm">{periodT.toFixed(2)} s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'T² (Linear T²-L):' : 'Bình phương T²:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{tSquared.toFixed(3)} s²</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Gravity Formula g:' : 'Công thức tính g:'}</span>
                <span className="text-slate-400 text-[10px]">g = 4π²L / T²</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{((4 * Math.PI * Math.PI * pendulumLenM) / tSquared).toFixed(2)} m/s²</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Pendulum Data' : 'Ghi Bảng Số liệu Con lắc'}
          </button>
        </div>
      </div>
    </div>
  );
}
