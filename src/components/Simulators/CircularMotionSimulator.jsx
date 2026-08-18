import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Play, RotateCcw, ShieldCheck, Sliders, Activity, Zap, Compass } from 'lucide-react';

export default function CircularMotionSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Parameters
  const massKg = params.massKg !== undefined ? params.massKg : 1.5; // kg (0.5 to 10 kg)
  const radiusM = params.radiusM !== undefined ? params.radiusM : 1.2; // m (0.4 to 3.0 m)
  const rpmSpeed = params.rpmSpeed !== undefined ? params.rpmSpeed : 30; // RPM (10 to 90 RPM)
  const viewMode = params.viewMode || 'top_disk'; // 'top_disk' (Mặt phẳng tròn) | 'banked_curve' (Nghiêng góc đường cong)

  const [isRunning, setIsRunning] = useState(true);
  const [animProgress, setAnimProgress] = useState(0);
  const timeRef = useRef(0);

  // Physics Calculations
  const g = 9.81; // m/s²
  const omegaRadS = (rpmSpeed * 2 * Math.PI) / 60; // rad/s
  const linearSpeedMs = omegaRadS * radiusM; // v = ω * r (m/s)
  const linearSpeedKmh = linearSpeedMs * 3.6; // km/h
  const periodT = (2 * Math.PI) / omegaRadS; // s
  const frequencyHz = 1 / periodT; // Hz

  // Centripetal Acceleration a_ht = v^2 / r = ω^2 * r (m/s²)
  const aCentripetal = Math.pow(linearSpeedMs, 2) / radiusM;
  const aCentripetal_g = aCentripetal / g; // in 'g' units

  // Centripetal Force F_ht = m * a_ht = m * v^2 / r (N)
  const fCentripetalN = massKg * aCentripetal;

  // Safe Banking Angle for Curved Road: tan(θ) = v^2 / (g * r)
  const bankAngleRad = Math.atan(Math.pow(linearSpeedMs, 2) / (g * radiusM));
  const bankAngleDeg = (bankAngleRad * 180) / Math.PI;

  // Animation Loop
  useEffect(() => {
    if (isRunning) {
      animRef.current = requestAnimationFrame(() => {
        timeRef.current += 0.035;
        setAnimProgress(timeRef.current);
      });
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isRunning, animProgress]);

  const handleReset = () => {
    setIsRunning(true);
    setAnimProgress(0);
    timeRef.current = 0;
  };

  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Radial Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, 280);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const centerX = width / 2;
    const centerY = height / 2;

    if (viewMode === 'top_disk') {
      // -------------------------------------------------------------
      // TOP VIEW: ROTATING DISC & CENTRIPETAL FORCE VECTORS
      // -------------------------------------------------------------
      const visualRadiusPx = Math.min(150, radiusM * 65);

      // Rotating Disc Surface
      ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, visualRadiusPx + 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Circular Orbit Line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, visualRadiusPx, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center Pivot Pin
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, 2 * Math.PI);
      ctx.fill();

      // Moving Mass Puck / Vehicle
      const currentAngle = animProgress * omegaRadS;
      const puckX = centerX + visualRadiusPx * Math.cos(currentAngle);
      const puckY = centerY + visualRadiusPx * Math.sin(currentAngle);

      // Tension Wire / Connecting Rod
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(puckX, puckY);
      ctx.stroke();

      // Puck Body
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(puckX, puckY, 12, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${massKg}kg`, puckX, puckY + 3);

      // Vector 1: Tangential Velocity Vector v (Green)
      const vAngle = currentAngle + Math.PI / 2;
      const vVectorLen = Math.min(65, linearSpeedMs * 12);
      const vEndX = puckX + vVectorLen * Math.cos(vAngle);
      const vEndY = puckY + vVectorLen * Math.sin(vAngle);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(puckX, puckY);
      ctx.lineTo(vEndX, vEndY);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(`v = ${linearSpeedMs.toFixed(1)} m/s`, vEndX + 10 * Math.cos(vAngle), vEndY + 10 * Math.sin(vAngle));

      // Vector 2: Centripetal Force Vector F_ht (Pink, towards center)
      const fAngle = currentAngle + Math.PI;
      const fVectorLen = Math.min(75, fCentripetalN * 1.5 + 20);
      const fEndX = puckX + fVectorLen * Math.cos(fAngle);
      const fEndY = puckY + fVectorLen * Math.sin(fAngle);

      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(puckX, puckY);
      ctx.lineTo(fEndX, fEndY);
      ctx.stroke();

      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(`F_ht = ${fCentripetalN.toFixed(1)} N`, puckX + (fVectorLen / 2) * Math.cos(fAngle), puckY + (fVectorLen / 2) * Math.sin(fAngle) - 8);

    } else {
      // -------------------------------------------------------------
      // BANKED ROAD VIEW: ROAD INCLINE & FORCES RESOLUTION
      // -------------------------------------------------------------
      const roadW = 280;
      const roadX = centerX - roadW / 2;
      const roadY = centerY + 60;
      const bankH = roadW * Math.sin(bankAngleRad);

      // Incline Ramp Road Surface
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(roadX, roadY);
      ctx.lineTo(roadX + roadW, roadY - bankH);
      ctx.lineTo(roadX + roadW, roadY);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Angle Arc θ
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(roadX, roadY, 50, -bankAngleRad, 0);
      ctx.stroke();
      ctx.font = 'bold 11px Inter';
      ctx.fillStyle = '#fde047';
      ctx.fillText(`θ = ${bankAngleDeg.toFixed(1)}°`, roadX + 65, roadY - 12);

      // Vehicle on Banked Surface
      const carCenterX = roadX + roadW / 2;
      const carCenterY = roadY - bankH / 2 - 15;

      ctx.save();
      ctx.translate(carCenterX, carCenterY);
      ctx.rotate(-bankAngleRad);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-20, -12, 40, 24);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(-20, -12, 40, 24);
      ctx.restore();

      // Normal Force N (Perpendicular to road)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(carCenterX, carCenterY);
      ctx.lineTo(carCenterX - 55 * Math.sin(bankAngleRad), carCenterY - 55 * Math.cos(bankAngleRad));
      ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.fillText('Normal Force N', carCenterX - 55 * Math.sin(bankAngleRad), carCenterY - 55 * Math.cos(bankAngleRad) - 8);

      // Gravity Force P = mg (Straight Down)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(carCenterX, carCenterY);
      ctx.lineTo(carCenterX, carCenterY + 60);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`P = ${(massKg * g).toFixed(1)} N`, carCenterX, carCenterY + 75);

      // Resultant Centripetal Force F_ht (Horizontal Left)
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(carCenterX, carCenterY);
      ctx.lineTo(carCenterX - 60, carCenterY);
      ctx.stroke();
      ctx.fillStyle = '#ec4899';
      ctx.fillText(`F_ht = ${fCentripetalN.toFixed(1)} N`, carCenterX - 85, carCenterY + 4);
    }

  }, [animProgress, massKg, radiusM, rpmSpeed, viewMode]);

  const recordPoint = () => {
    if (onDataRecorded) {
      onDataRecorded({
        id: Date.now(),
        Mass_kg: `${massKg} kg`,
        Radius_m: `${radiusM} m`,
        Speed_RPM: `${rpmSpeed} RPM`,
        Linear_v_ms: `${linearSpeedMs.toFixed(2)} m/s (${linearSpeedKmh.toFixed(1)} km/h)`,
        Accel_a_ht: `${aCentripetal.toFixed(2)} m/s² (${aCentripetal_g.toFixed(1)} g)`,
        Force_F_ht: `${fCentripetalN.toFixed(1)} N`,
        Bank_Angle: `${bankAngleDeg.toFixed(1)}°`
      });
    }
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={405}
          className="w-full max-w-[540px] h-[405px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Playback Controls */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" />
            {isRunning ? (isEn ? 'Pause Rotation' : 'Tạm Dừng Chuyển Động') : (isEn ? 'Start Rotation' : 'Quay Tròn Đều')}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {isEn ? 'Reset' : 'Đặt Lại'}
          </button>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <RotateCw className="w-4 h-4" /> {isEn ? 'Circular Motion Controls' : 'Điều Khiển Chuyển Động Tròn'}
          </h3>

          {/* View Mode Toggle */}
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-semibold">
              {isEn ? 'Perspective View Mode:' : 'Góc Quan Sát Thí Nghiệm:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onParamChange('viewMode', 'top_disk')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'top_disk' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                🔄 {isEn ? 'Top Orbit View' : 'Mặt Phẳng Tròn'}
              </button>
              <button
                onClick={() => onParamChange('viewMode', 'banked_curve')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'banked_curve' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}
              >
                📐 {isEn ? 'Banked Road θ' : 'Góc Nghiêng Khúc Cua'}
              </button>
            </div>
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Mass m:' : 'Khối lượng vật m:'}</span>
              <span className="text-cyan-400 font-bold">{massKg} kg</span>
            </div>
            <input
              type="range" min="0.5" max="8.0" step="0.5"
              value={massKg}
              onChange={(e) => onParamChange('massKg', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Radius r Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Orbit Radius r:' : 'Bán kính quỹ đạo r:'}</span>
              <span className="text-pink-400 font-bold">{radiusM} m</span>
            </div>
            <input
              type="range" min="0.4" max="2.5" step="0.1"
              value={radiusM}
              onChange={(e) => onParamChange('radiusM', Number(e.target.value))}
              className="w-full accent-pink-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Rotation Speed RPM Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Rotation Speed (RPM):' : 'Tốc độ quay (vòng/phút):'}</span>
              <span className="text-amber-400 font-bold">{rpmSpeed} RPM</span>
            </div>
            <input
              type="range" min="10" max="80" step="5"
              value={rpmSpeed}
              onChange={(e) => onParamChange('rpmSpeed', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Physics Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'CENTRIPETAL MEASUREMENTS' : 'Động Học & Lực Hướng Tâm'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Linear Velocity v:' : 'Vận tốc dài v:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{linearSpeedMs.toFixed(2)} m/s</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Centripetal Force F_ht:' : 'Lực hướng tâm F_ht:'}</span>
              <span className="text-pink-400 font-bold text-sm">{fCentripetalN.toFixed(1)} N</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Centripetal Accel a_ht:' : 'Gia tốc hướng tâm:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{aCentripetal.toFixed(1)} m/s²</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Safe Bank Angle θ:' : 'Góc nghiêng an toàn θ:'}</span>
              <span className="text-amber-400 font-bold text-sm">{bankAngleDeg.toFixed(1)}°</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Circular Motion Data' : 'Ghi Bảng Số Liệu Chuyển Động Tròn'}
          </button>
        </div>
      </div>
    </div>
  );
}
