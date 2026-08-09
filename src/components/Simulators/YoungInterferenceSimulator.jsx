import React, { useEffect, useRef } from 'react';
import { Sun, Sparkles, Activity, Plus } from 'lucide-react';

export default function YoungInterferenceSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const wavelengthNm = params.wavelengthNm || 650; // nm (Violet 405, Blue 450, Green 532, Yellow 589, Red 650)
  const slitDistanceMm = params.slitDistanceMm || 0.25; // Slit distance 'a' in mm (0.1 - 1.0 mm)
  const screenDistanceM = params.screenDistanceM || 2.0; // Distance 'D' to screen in meters (1.0 - 3.0 m)

  // Physical calculations
  const lambdaM = wavelengthNm * 1e-9;
  const aM = slitDistanceMm * 1e-3;
  const DM = screenDistanceM;

  // Fringe spacing i = (lambda * D) / a (meters) -> convert to mm
  const fringeSpacingMm = ((lambdaM * DM) / aM) * 1e3;

  const getLaserInfo = (nm) => {
    if (nm <= 430) return { name: 'Laser Tím / Violet', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' };
    if (nm <= 490) return { name: 'Laser Lam / Blue', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.8)' };
    if (nm <= 560) return { name: 'Laser Lục / Green', color: '#10b981', glow: 'rgba(16, 185, 129, 0.8)' };
    if (nm <= 610) return { name: 'Laser Vàng / Yellow', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.8)' };
    return { name: 'Laser Đỏ / Red', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.8)' };
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

    const laserX = 45;
    const centerY = height / 2;
    const slitX = 170;
    const screenX = 430;

    // 1. Draw Laser Emitter Device
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(15, centerY - 18, 55, 36, 6);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = laserInfo.color;
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${wavelengthNm}nm`, 42, centerY + 4);

    // Primary Incident Laser Beam (Laser -> Double Slit)
    ctx.shadowColor = laserInfo.glow;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(70, centerY);
    ctx.lineTo(slitX, centerY);
    ctx.stroke();

    // 2. Double Slit Plate (Màn Khe Kép Young S1, S2)
    const slitPlateH = 320;
    const slitGapPx = 28; // Distance between S1 & S2 on screen
    const s1Y = centerY - slitGapPx / 2;
    const s2Y = centerY + slitGapPx / 2;

    // Plate Body
    ctx.fillStyle = '#334155';
    ctx.fillRect(slitX - 5, centerY - slitPlateH / 2, 10, slitPlateH);

    // Open Slits S1 & S2 gaps
    ctx.fillStyle = '#090d16';
    ctx.fillRect(slitX - 6, s1Y - 2.5, 12, 5);
    ctx.fillRect(slitX - 6, s2Y - 2.5, 12, 5);

    // Glowing Slit Apertures S1 & S2
    ctx.fillStyle = laserInfo.color;
    ctx.fillRect(slitX - 2, s1Y - 2.5, 4, 5);
    ctx.fillRect(slitX - 2, s2Y - 2.5, 4, 5);

    // Slit Labels S1, S2 & Distance 'a'
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText('S₁', slitX - 10, s1Y + 3);
    ctx.fillText('S₂', slitX - 10, s2Y + 3);

    // Dimension Bracket for Slit Distance 'a'
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(slitX - 24, s1Y); ctx.lineTo(slitX - 24, s2Y);
    ctx.moveTo(slitX - 28, s1Y); ctx.lineTo(slitX - 20, s1Y);
    ctx.moveTo(slitX - 28, s2Y); ctx.lineTo(slitX - 20, s2Y);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`a = ${slitDistanceMm}mm`, slitX - 30, centerY + 3);

    // 3. Draw Concentric Coherent Wave Fronts from S1 and S2
    ctx.lineWidth = 1;
    for (let r = 15; r <= 240; r += 15) {
      ctx.strokeStyle = `${laserInfo.color}33`; // Semi-transparent wave arc
      ctx.beginPath();
      ctx.arc(slitX, s1Y, r, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(slitX, s2Y, r, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();
    }

    // 4. Draw Intersecting Rays connecting S1 & S2 to Bright Fringe Spots on Screen
    // Calculate fringe locations on screen for k = 0, ±1, ±2
    const orders = [0, 1, -1, 2, -2];
    const fringeScalePxPerMm = 18 / Math.max(1, fringeSpacingMm * 0.5); // Scale for visual clarity

    orders.forEach((kOrder) => {
      const fringeOffsetY = kOrder * fringeSpacingMm * fringeScalePxPerMm;
      const targetY = centerY + fringeOffsetY;

      if (targetY >= centerY - slitPlateH / 2 + 15 && targetY <= centerY + slitPlateH / 2 - 15) {
        // Ray from S1 to target spot
        ctx.strokeStyle = `${laserInfo.color}88`;
        ctx.lineWidth = kOrder === 0 ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(slitX + 5, s1Y);
        ctx.lineTo(screenX, targetY);
        ctx.stroke();

        // Ray from S2 to target spot
        ctx.beginPath();
        ctx.moveTo(slitX + 5, s2Y);
        ctx.lineTo(screenX, targetY);
        ctx.stroke();

        // Order Label on Rays Path
        if (Math.abs(kOrder) <= 1) {
          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 9px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(`k = ${kOrder > 0 ? '+' + kOrder : kOrder}`, (slitX + screenX) / 2 + kOrder * 15, centerY + fringeOffsetY * 0.6);
        }
      }
    });

    // 5. Draw Observation Projection Screen (Màn Giao Thoa Young)
    const screenW = 42;
    const screenH = slitPlateH;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.98)';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    ctx.fillRect(screenX, centerY - screenH / 2, screenW, screenH);
    ctx.strokeRect(screenX, centerY - screenH / 2, screenW, screenH);

    // Render Sinusoidal Intensity Distribution of Bright & Dark Fringes on Screen
    for (let py = centerY - screenH / 2 + 2; py <= centerY + screenH / 2 - 2; py += 1) {
      const yMm = (py - centerY) / fringeScalePxPerMm;
      // Intensity I = I0 * cos^2( (pi * a * y) / (lambda * D) ) = cos^2( pi * y / i )
      const phase = (Math.PI * yMm) / fringeSpacingMm;
      const intensity = Math.pow(Math.cos(phase), 2);

      if (intensity > 0.02) {
        ctx.fillStyle = laserInfo.color;
        ctx.globalAlpha = intensity * 0.9;
        ctx.fillRect(screenX + 2, py, screenW - 4, 1.2);
      }
    }
    ctx.globalAlpha = 1.0;

    // Screen Order Markers & Labels (k = 0, ±1, ±2)
    orders.forEach((kOrder) => {
      const fringeOffsetY = kOrder * fringeSpacingMm * fringeScalePxPerMm;
      const targetY = centerY + fringeOffsetY;

      if (targetY >= centerY - screenH / 2 + 10 && targetY <= centerY + screenH / 2 - 10) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'left';
        const labelText = kOrder === 0
          ? (isEn ? 'Central (k=0)' : 'Vân sáng trung tâm (k=0)')
          : `k = ${kOrder > 0 ? '+' + kOrder : kOrder}`;

        ctx.fillText(labelText, screenX + screenW + 8, targetY + 3);

        // Indicator Tick line
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(screenX + screenW, targetY);
        ctx.lineTo(screenX + screenW + 5, targetY);
        ctx.stroke();
      }
    });

    // 6. Dimension Bracket for Fringe Spacing 'i' (Khoảng Vân i)
    const iY1 = centerY;
    const iY2 = centerY - fringeSpacingMm * fringeScalePxPerMm;
    const bracketX = screenX + screenW + 115;

    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bracketX, iY1); ctx.lineTo(bracketX, iY2);
    ctx.moveTo(bracketX - 4, iY1); ctx.lineTo(bracketX + 4, iY1);
    ctx.moveTo(bracketX - 4, iY2); ctx.lineTo(bracketX + 4, iY2);
    ctx.stroke();

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`i = ${fringeSpacingMm.toFixed(2)} mm`, bracketX + 8, (iY1 + iY2) / 2 + 4);

    // Distance 'D' Annotation line at bottom
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(slitX, centerY + 135); ctx.lineTo(screenX, centerY + 135); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`Khoảng cách D = ${screenDistanceM} m`, (slitX + screenX) / 2, centerY + 150);

    // HUD Title at top
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `YOUNG'S DOUBLE SLIT INTERFERENCE: i = (λ·D) / a  (i = ${fringeSpacingMm.toFixed(2)} mm)`
        : `GIAO THOA KHE YOUNG: i = (λ·D) / a  (Khoảng vân i = ${fringeSpacingMm.toFixed(2)} mm)`,
      width * 0.5,
      25
    );

  }, [wavelengthNm, slitDistanceMm, screenDistanceM, fringeSpacingMm, laserInfo, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      wavelengthNm: `${wavelengthNm} nm`,
      slitDistance_a_mm: `${slitDistanceMm} mm`,
      screenDistance_D_m: `${screenDistanceM} m`,
      fringeSpacing_i_mm: `${fringeSpacingMm.toFixed(2)} mm`
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
            <Sun className="w-4 h-4" /> {isEn ? 'Young Interference Controls' : 'Cambridge A Level Practical'}
          </h3>

          {/* Laser Wavelength Selector */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Laser Wavelength λ:' : 'Bước sóng Nguồn Laser λ:'}</label>
            <select
              value={wavelengthNm}
              onChange={(e) => onParamChange('wavelengthNm', Number(e.target.value))}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            >
              <option value="405">405 nm (Laser Tím / Violet)</option>
              <option value="450">450 nm (Laser Lam / Blue)</option>
              <option value="532">532 nm (Laser Lục / Green)</option>
              <option value="589">589 nm (Laser Vàng / Yellow)</option>
              <option value="650">650 nm (Laser Đỏ / Red - Chuẩn)</option>
            </select>
          </div>

          {/* Slit Distance 'a' Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Slit Distance a:' : 'Khoảng cách giữa 2 khe a:'}</span>
              <span className="text-amber-400 font-bold">{slitDistanceMm} mm</span>
            </div>
            <input
              type="range" min="0.10" max="0.80" step="0.05"
              value={slitDistanceMm}
              onChange={(e) => onParamChange('slitDistanceMm', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Screen Distance 'D' Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Screen Distance D:' : 'Khoảng cách từ khe đến màn D:'}</span>
              <span className="text-cyan-400 font-bold">{screenDistanceM} m</span>
            </div>
            <input
              type="range" min="1.0" max="3.0" step="0.1"
              value={screenDistanceM}
              onChange={(e) => onParamChange('screenDistanceM', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'INTERFERENCE RESULTS' : 'KẾT QUẢ GIAO THOA YOUNG'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Fringe Spacing i:' : 'Khoảng vân i = (λD)/a:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{fringeSpacingMm.toFixed(2)} mm</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? '1st Bright Fringe x₁:' : 'Vị trí Vân sáng bậc 1 x₁:'}</span>
              <span className="text-amber-400 font-bold text-sm">±{fringeSpacingMm.toFixed(2)} mm</span>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center text-xs">
            <div>
              <span className="text-cyan-300 font-semibold block">{isEn ? '2nd Bright Fringe x₂:' : 'Vị trí Vân sáng bậc 2 x₂:'}</span>
              <span className="text-slate-400 text-[10px]">x_k = k × i</span>
            </div>
            <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              ±{(fringeSpacingMm * 2).toFixed(2)} mm
            </span>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> {isEn ? 'Record Measurement' : 'Ghi vào Bảng Số liệu Giao Thoa'}
          </button>
        </div>
      </div>
    </div>
  );
}
