import React, { useEffect, useRef } from 'react';
import { Sun, ShieldCheck, Sparkles, Plus } from 'lucide-react';

export default function DiffractionGratingSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const wavelengthNm = params.wavelengthNm || 532; // Laser wavelength in nm (405, 532, 589, 650)
  const linesPerMm = params.linesPerMm || 300; // N lines/mm (100, 300, 600)
  const screenDistM = params.screenDistM || 1.5; // Distance to screen L (meters)

  // Grating spacing d in meters
  const dMeters = (1e-3) / linesPerMm; // d = 1mm / N
  const lambdaMeters = wavelengthNm * 1e-9;

  // Calculate diffraction angles theta_m for m = 1, 2, 3
  const calcThetaDeg = (m) => {
    const sinTheta = (m * lambdaMeters) / dMeters;
    if (sinTheta > 0.999) return null; // evanescent / out of range
    return (Math.asin(sinTheta) * 180) / Math.PI;
  };

  const theta1 = calcThetaDeg(1);
  const theta2 = calcThetaDeg(2);

  // Position x_m on screen: x_m = L * tan(theta_m)
  const x1Cm = theta1 !== null ? Math.tan((theta1 * Math.PI) / 180) * screenDistM * 100 : null;
  const x2Cm = theta2 !== null ? Math.tan((theta2 * Math.PI) / 180) * screenDistM * 100 : null;

  const getLaserInfo = (nm) => {
    if (nm <= 430) return { name: 'Laser Tím / Violet', color: '#a855f7', glow: '#c084fc', hex: '#a855f7' };
    if (nm <= 490) return { name: 'Laser Lam / Blue', color: '#3b82f6', glow: '#60a5fa', hex: '#3b82f6' };
    if (nm <= 560) return { name: 'Laser Lục / Green', color: '#10b981', glow: '#34d399', hex: '#10b981' };
    if (nm <= 610) return { name: 'Laser Vàng / Yellow', color: '#f59e0b', glow: '#fbbf24', hex: '#f59e0b' };
    return { name: 'Laser Đỏ / Red', color: '#ef4444', glow: '#f87171', hex: '#ef4444' };
  };

  const laserInfo = getLaserInfo(wavelengthNm);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020408');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const laserX = 50;
    const laserY = height / 2;
    const gratingX = 180;
    const screenX = 460;

    // 1. Draw Laser Emitter Device
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(15, laserY - 18, 55, 36, 6);
    ctx.fill(); ctx.stroke();

    // Laser Aperture Tip
    ctx.fillStyle = '#475569';
    ctx.fillRect(70, laserY - 8, 12, 16);

    // Laser Label
    ctx.fillStyle = laserInfo.glow;
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${wavelengthNm}nm`, 42, laserY + 4);

    // 2. Incident Laser Beam (Laser -> Grating)
    ctx.shadowColor = laserInfo.glow;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(82, laserY);
    ctx.lineTo(gratingX, laserY);
    ctx.stroke();

    // 3. Draw Diffraction Grating Slide (Cách Mạng Nhiễu Xạ)
    const gratingH = 180;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.fillRect(gratingX - 6, laserY - gratingH / 2, 12, gratingH);
    ctx.strokeRect(gratingX - 6, laserY - gratingH / 2, 12, gratingH);

    // Fine Etched Slits Lines Texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    for (let sy = laserY - gratingH / 2 + 10; sy <= laserY + gratingH / 2 - 10; sy += 8) {
      ctx.beginPath(); ctx.moveTo(gratingX - 4, sy); ctx.lineTo(gratingX + 4, sy); ctx.stroke();
    }

    // Grating Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`N = ${linesPerMm} vạch/mm`, gratingX, laserY + gratingH / 2 + 18);
    ctx.fillText(`d = ${(dMeters * 1e6).toFixed(1)} µm`, gratingX, laserY + gratingH / 2 + 30);

    // 4. Draw Observation Screen (Màn Quan Sát)
    const screenH = 340;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.fillRect(screenX - 4, laserY - screenH / 2, 14, screenH);
    ctx.strokeRect(screenX - 4, laserY - screenH / 2, 14, screenH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? 'SCREEN (Màn)' : 'MÀN QUAN SÁT', screenX, laserY - screenH / 2 - 12);

    // 5. Draw Diffracted Beams & Screen Spots (m = 0, ±1, ±2)
    const availableOrders = [0];
    if (theta1 !== null) availableOrders.push(1, -1);
    if (theta2 !== null) availableOrders.push(2, -2);

    availableOrders.forEach((m) => {
      let angleDeg = 0;
      if (m === 1) angleDeg = theta1;
      else if (m === -1) angleDeg = -theta1;
      else if (m === 2) angleDeg = theta2;
      else if (m === -2) angleDeg = -theta2;

      const angleRad = (angleDeg * Math.PI) / 180;
      const targetY = laserY - Math.tan(angleRad) * (screenX - gratingX);

      // Render Diffracted Beam Ray
      ctx.shadowColor = laserInfo.glow;
      ctx.shadowBlur = m === 0 ? 16 : 10;
      ctx.strokeStyle = laserInfo.color;
      ctx.lineWidth = m === 0 ? 3.5 : (Math.abs(m) === 1 ? 2.5 : 1.8);
      ctx.beginPath();
      ctx.moveTo(gratingX + 6, laserY);
      ctx.lineTo(screenX - 4, targetY);
      ctx.stroke();

      // Render Intense Bright Spot on Observation Screen
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(screenX + 3, targetY, m === 0 ? 6 : (Math.abs(m) === 1 ? 4.5 : 3.5), 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = laserInfo.color;
      ctx.beginPath();
      ctx.arc(screenX + 3, targetY, m === 0 ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();

      // Label order m beside spot
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`m = ${m > 0 ? '+' + m : m}`, screenX + 16, targetY + 3);

      // Angle indicator for m = +1
      if (m === 1 && theta1 !== null) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(gratingX, laserY, 45, 0, -angleRad, true);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`θ₁ = ${theta1.toFixed(1)}°`, gratingX + 52, laserY - 14);
      }
    });

    ctx.shadowBlur = 0;

    // Optical Path Distance Annotation (L)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(gratingX, laserY + 120); ctx.lineTo(screenX, laserY + 120); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`Khoảng cách L = ${screenDistM} m`, (gratingX + screenX) / 2, laserY + 135);

    // HUD Title at top
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `DIFFRACTION GRATING: d·sin(θ) = m·λ (N = ${linesPerMm} lines/mm)`
        : `CÁCH MẠNG NHIỄU XẠ: d·sin(θ) = m·λ (N = ${linesPerMm} vạch/mm)`,
      width * 0.5,
      25
    );

  }, [wavelengthNm, linesPerMm, screenDistM, laserInfo, dMeters, theta1, theta2, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      wavelengthNm: `${wavelengthNm} nm`,
      linesPerMm: `${linesPerMm} lines/mm`,
      dMicrons: `${(dMeters * 1e6).toFixed(2)} µm`,
      screenDistM: `${screenDistM} m`,
      theta1: theta1 !== null ? `${theta1.toFixed(1)}°` : 'N/A',
      x1Cm: x1Cm !== null ? `${x1Cm.toFixed(1)} cm` : 'N/A',
      theta2: theta2 !== null ? `${theta2.toFixed(1)}°` : 'N/A'
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
            <Sun className="w-4 h-4" /> {isEn ? 'Diffraction Grating Controls' : 'Cambridge A Level Practical'}
          </h3>

          {/* Wavelength Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Laser Wavelength λ:' : 'Bước sóng Nguồn Laser λ:'}</label>
            <select
              value={wavelengthNm}
              onChange={(e) => onParamChange('wavelengthNm', Number(e.target.value))}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            >
              <option value="405">405 nm (Laser Tím / Violet)</option>
              <option value="532">532 nm (Laser Lục / Green - Chuẩn)</option>
              <option value="589">589 nm (Laser Vàng Na / Sodium Yellow)</option>
              <option value="650">650 nm (Laser Đỏ / Red)</option>
            </select>
          </div>

          {/* Lines Per mm (N) */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Grating Density N:' : 'Mật độ vạch cách mạng N:'}</label>
            <select
              value={linesPerMm}
              onChange={(e) => onParamChange('linesPerMm', Number(e.target.value))}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            >
              <option value="100">100 vạch/mm (d = 10.0 µm)</option>
              <option value="300">300 vạch/mm (d = 3.33 µm)</option>
              <option value="600">600 vạch/mm (d = 1.67 µm)</option>
            </select>
          </div>

          {/* Screen Distance Slider L */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Distance to Screen L:' : 'Khoảng cách đến màn L:'}</span>
              <span className="text-cyan-400 font-bold">{screenDistM} m</span>
            </div>
            <input
              type="range" min="0.5" max="3.0" step="0.1"
              value={screenDistM}
              onChange={(e) => onParamChange('screenDistM', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'DIFFRACTION RESULTS' : 'KẾT QUẢ CÁCH MẠNG NHIỄU XẠ'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Grating Constant d:' : 'Chu kỳ cách mạng d:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{(dMeters * 1e6).toFixed(2)} µm</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? '1st Order Angle θ₁:' : 'Góc nhiễu xạ bậc 1 θ₁:'}</span>
              <span className="text-amber-400 font-bold text-sm">{theta1 !== null ? `${theta1.toFixed(1)}°` : 'N/A'}</span>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center text-xs">
            <div>
              <span className="text-cyan-300 font-semibold block">{isEn ? '1st Order Spot Dist x₁:' : 'Khoảng cách cực đại bậc 1 x₁:'}</span>
              <span className="text-slate-400 text-[10px]">x₁ = L × tan(θ₁)</span>
            </div>
            <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {x1Cm !== null ? `${x1Cm.toFixed(1)} cm` : 'N/A'}
            </span>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> {isEn ? 'Record Measurement' : 'Ghi vào Bảng Số liệu Nhiễu Xạ'}
          </button>
        </div>
      </div>
    </div>
  );
}
