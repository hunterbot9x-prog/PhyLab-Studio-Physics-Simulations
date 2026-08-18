import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Activity, Plus, Target, Layers } from 'lucide-react';

export default function YoungInterferenceSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const wavelengthNm = params.wavelengthNm || 650; // nm (Violet 405, Blue 450, Green 532, Yellow 589, Red 650)
  const slitDistanceMm = params.slitDistanceMm || 0.25; // Slit distance 'a' in mm (0.1 - 1.0 mm)
  const screenDistanceM = params.screenDistanceM || 2.0; // Distance 'D' to screen in meters (1.0 - 3.0 m)
  const pointXOffsetMm = params.pointXOffsetMm !== undefined ? params.pointXOffsetMm : 5.2; // Probe position x on screen in mm

  // Physical calculations
  const lambdaM = wavelengthNm * 1e-9;
  const aM = slitDistanceMm * 1e-3;
  const DM = screenDistanceM;

  // Fringe spacing i = (lambda * D) / a (meters) -> convert to mm
  const fringeSpacingMm = ((lambdaM * DM) / aM) * 1e3;

  // Optical Path Difference: delta_d = a * x / D (meters) -> convert to micrometers (µm) or nm
  const deltaDMeters = (aM * (pointXOffsetMm * 1e-3)) / DM;
  const deltaDNm = deltaDMeters * 1e9;
  const deltaDInLambda = deltaDMeters / lambdaM; // k = delta_d / lambda

  // Phase Difference: delta_phi = 2pi * delta_d / lambda
  const deltaPhiRad = (2 * Math.PI * deltaDMeters) / lambdaM;
  const normalizedIntensity = Math.pow(Math.cos(deltaPhiRad / 2), 2); // 0 to 1.0

  // Interference classification for point M(x)
  const kNearest = Math.round(deltaDInLambda);
  const diffFromInteger = Math.abs(deltaDInLambda - kNearest);
  const isBrightFringe = diffFromInteger < 0.08;
  const isDarkFringe = Math.abs(diffFromInteger - 0.5) < 0.08;

  let fringeStatusText = isEn ? 'Intermediate Phase Point' : 'Điểm pha trung gian';
  let fringeStatusColor = '#94a3b8';
  if (isBrightFringe) {
    fringeStatusText = isEn ? `Bright Fringe Order k = ${kNearest}` : `Vân Sáng Bậc ${kNearest} (Cùng pha)`;
    fringeStatusColor = '#10b981';
  } else if (isDarkFringe) {
    const kDark = Math.floor(Math.abs(deltaDInLambda)) + 1;
    fringeStatusText = isEn ? `Dark Fringe Order ${kDark}` : `Vân Tối Thứ ${kDark} (Ngược pha)`;
    fringeStatusColor = '#f59e0b';
  }

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

    const laserX = 40;
    const centerY = height / 2;
    const slitX = 150;
    const screenX = 385;

    // 1. Draw Laser Emitter Device
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(10, centerY - 18, 55, 36, 6);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = laserInfo.color;
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${wavelengthNm}nm`, 37, centerY + 4);

    // Incident Laser Beam (Laser -> Double Slit)
    ctx.shadowColor = laserInfo.glow;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(65, centerY);
    ctx.lineTo(slitX, centerY);
    ctx.stroke();

    // 2. Double Slit Plate (Màn Khe Kép Young S1, S2)
    const slitPlateH = 320;
    const slitGapPx = 30; // Distance between S1 & S2 on screen
    const s1Y = centerY - slitGapPx / 2;
    const s2Y = centerY + slitGapPx / 2;

    ctx.fillStyle = '#334155';
    ctx.fillRect(slitX - 5, centerY - slitPlateH / 2, 10, slitPlateH);

    // Glowing Slit Apertures S1 & S2
    ctx.fillStyle = laserInfo.color;
    ctx.fillRect(slitX - 2, s1Y - 2.5, 4, 5);
    ctx.fillRect(slitX - 2, s2Y - 2.5, 4, 5);

    // Slit Labels S1, S2
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
    ctx.font = 'bold 9px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`a = ${slitDistanceMm}mm`, slitX - 30, centerY + 3);

    // 3. Concentric Coherent Wave Fronts from S1 and S2
    ctx.lineWidth = 1;
    for (let r = 15; r <= 220; r += 16) {
      ctx.strokeStyle = `${laserInfo.color}26`;
      ctx.beginPath();
      ctx.arc(slitX, s1Y, r, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(slitX, s2Y, r, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();
    }

    // 4. Observation Screen (Màn Giao Thoa Young)
    const screenW = 35;
    const screenH = slitPlateH;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.98)';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.fillRect(screenX, centerY - screenH / 2, screenW, screenH);
    ctx.strokeRect(screenX, centerY - screenH / 2, screenW, screenH);

    // Scale factor: pixels per mm
    const fringeScalePxPerMm = 16 / Math.max(0.8, fringeSpacingMm * 0.4);

    // Render Sinusoidal Intensity Distribution of Bright & Dark Fringes on Screen
    for (let py = centerY - screenH / 2 + 2; py <= centerY + screenH / 2 - 2; py += 1) {
      const yMm = (py - centerY) / fringeScalePxPerMm;
      const phase = (Math.PI * yMm) / fringeSpacingMm;
      const intensity = Math.pow(Math.cos(phase), 2);

      if (intensity > 0.02) {
        ctx.fillStyle = laserInfo.color;
        ctx.globalAlpha = intensity * 0.92;
        ctx.fillRect(screenX + 2, py, screenW - 4, 1.2);
      }
    }
    ctx.globalAlpha = 1.0;

    // 5. INTERACTIVE PROBE POINT M(x) ON SCREEN
    const probePixelY = centerY - pointXOffsetMm * fringeScalePxPerMm;

    // Draw Light Ray 1: S1 -> M
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(slitX + 3, s1Y);
    ctx.lineTo(screenX, probePixelY);
    ctx.stroke();

    // Draw Light Ray 2: S2 -> M
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(slitX + 3, s2Y);
    ctx.lineTo(screenX, probePixelY);
    ctx.stroke();

    // Probe Point Dot M
    ctx.fillStyle = '#fde047';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(screenX, probePixelY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`M (x = ${pointXOffsetMm >= 0 ? '+' : ''}${pointXOffsetMm.toFixed(2)} mm)`, screenX + 8, probePixelY - 8);

    // 6. CONTINUOUS INTENSITY GRAPH I(x) on the Right (430 to 520 px)
    const graphX = 435;
    const graphW = 85;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(graphX, centerY - screenH / 2, graphW, screenH);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(graphX, centerY - screenH / 2, graphW, screenH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 8px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('I(x) Curve', graphX + graphW / 2, centerY - screenH / 2 + 12);

    // Plot I(x) Curve vertically matching screen coordinates
    ctx.strokeStyle = laserInfo.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let py = centerY - screenH / 2 + 15; py <= centerY + screenH / 2 - 10; py += 2) {
      const yMm = (py - centerY) / fringeScalePxPerMm;
      const phase = (Math.PI * yMm) / fringeSpacingMm;
      const intensity = Math.pow(Math.cos(phase), 2);
      const px = graphX + 8 + intensity * (graphW - 20);

      if (py === centerY - screenH / 2 + 15) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Probe point intensity horizontal line
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(screenX + screenW, probePixelY);
    ctx.lineTo(graphX + graphW, probePixelY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 7. Optical Path Difference Overlay Box (Top Center)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(slitX + 25, 35, 185, 60);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(slitX + 25, 35, 185, 60);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 9px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`Δd = d₂ - d₁ = (a·x)/D`, slitX + 32, 50);

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 10px Inter';
    ctx.fillText(`Δd = ${deltaDNm.toFixed(0)} nm = ${deltaDInLambda.toFixed(2)} λ`, slitX + 32, 66);

    ctx.fillStyle = fringeStatusColor;
    ctx.font = 'bold 9px Inter';
    ctx.fillText(fringeStatusText, slitX + 32, 82);

    // Distance 'D' Notation at bottom
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(slitX, centerY + 130); ctx.lineTo(screenX, centerY + 130); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`Distance D = ${screenDistanceM} m`, (slitX + screenX) / 2, centerY + 144);

  }, [wavelengthNm, slitDistanceMm, screenDistanceM, pointXOffsetMm, fringeSpacingMm, laserInfo, deltaDNm, deltaDInLambda, fringeStatusText, fringeStatusColor, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      wavelengthNm: `${wavelengthNm} nm`,
      slitDistance_a_mm: `${slitDistanceMm} mm`,
      screenDistance_D_m: `${screenDistanceM} m`,
      fringeSpacing_i_mm: `${fringeSpacingMm.toFixed(2)} mm`,
      probePoint_x_mm: `${pointXOffsetMm.toFixed(2)} mm`,
      pathDiff_deltaD_nm: `${deltaDNm.toFixed(0)} nm (${deltaDInLambda.toFixed(2)} λ)`,
      stateAtPointM: fringeStatusText
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
            <Sun className="w-4 h-4" /> {isEn ? 'Young Interference Controls' : 'Khảo Sát Giao Thoa Khe Young'}
          </h3>

          {/* Probe Point M(x) Position Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Probe Point M Position x:' : 'Vị trí điểm khảo sát M(x):'}</span>
              <span className="text-yellow-300 font-bold">{pointXOffsetMm >= 0 ? '+' : ''}{pointXOffsetMm.toFixed(2)} mm</span>
            </div>
            <input
              type="range" min="-12.0" max="12.0" step="0.1"
              value={pointXOffsetMm}
              onChange={(e) => onParamChange('pointXOffsetMm', Number(e.target.value))}
              className="w-full accent-yellow-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

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
            📊 {isEn ? 'OPTICAL PATH & FRINGE ANALYSIS' : 'PHÂN TÍCH HIỆU ĐƯỜNG ĐI & KHOẢNG VÂN'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Fringe Spacing i:' : 'Khoảng vân i = (λD)/a:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{fringeSpacingMm.toFixed(2)} mm</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Path Difference Δd:' : 'Hiệu quang trình Δd:'}</span>
              <span className="text-amber-400 font-bold text-sm">{deltaDNm.toFixed(0)} nm</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">{isEn ? 'Interference State at M:' : 'Trạng thái giao thoa tại M:'}</span>
              <span className="font-bold text-xs" style={{ color: fringeStatusColor }}>
                {fringeStatusText}
              </span>
            </div>
            <span className="font-extrabold text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
              Δd = {deltaDInLambda.toFixed(2)}λ
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
