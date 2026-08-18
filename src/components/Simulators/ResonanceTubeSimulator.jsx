import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, Info, Volume2 } from 'lucide-react';

export default function ResonanceTubeSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const forkFreqHz = params.forkFreqHz || 512; // Hz (256, 384, 512, 1024)
  const tubeLengthCm = params.tubeLengthCm || 16.5; // cm (water level adjustment 5cm - 80cm)
  const speedOfSoundMs = 343.0; // m/s in air at 20 deg C

  // Theoretical resonance wavelength lambda = v / f
  const wavelengthM = speedOfSoundMs / forkFreqHz;
  const wavelengthCm = wavelengthM * 100;
  const endCorrectionCm = 0.6 * 1.5; // c = 0.6 * r

  // Resonance node condition for quarter-wave closed tube: L + c = (2n-1) * lambda / 4
  // 1st resonance L1 = lambda/4 - c
  // 2nd resonance L2 = 3*lambda/4 - c
  const res1Cm = (wavelengthCm / 4) - endCorrectionCm;
  const res2Cm = ((3 * wavelengthCm) / 4) - endCorrectionCm;

  // Calculate Sound Intensity (Resonance Peak)
  const distToRes1 = Math.abs(tubeLengthCm - res1Cm);
  const distToRes2 = Math.abs(tubeLengthCm - res2Cm);
  const minDist = Math.min(distToRes1, distToRes2);

  const soundIntensity = Math.max(0.05, Math.exp(-Math.pow(minDist / 2.5, 2)));
  const isResonating = soundIntensity > 0.6;

  // Dynamic Realtime Physics Description Generator
  const getPhysicsDescription = () => {
    if (isResonating) {
      return isEn
        ? `🔊 [STANDING WAVE RESONANCE PEAK!] Air column length L = ${tubeLengthCm.toFixed(1)}cm matches Quarter-Wave condition (L + c = λ/4). Stationary sound waves form with a Displacement NODE at water surface and ANTINODE at open top! Loud sound intensity peak!`
        : `🔊 [ĐẠT ĐỈNH CỘNG HƯỞNG SÓNG DỪNG!] Cột không khí L = ${tubeLengthCm.toFixed(1)} cm thỏa mãn điều kiện sóng dừng ống một đầu kín một đầu hở (L + c = λ/4). NÚT sóng tại mặt nước và BỤNG sóng tại miệng ống. Âm thanh phát ra to nhất!`;
    }

    return isEn
      ? `🎵 [Air Column Adjustment] Tuning fork f = ${forkFreqHz}Hz (Wavelength λ = ${wavelengthCm.toFixed(1)}cm). Current air length L = ${tubeLengthCm.toFixed(1)}cm. Adjust water level to L₁ = ${res1Cm.toFixed(1)}cm or L₂ = ${res2Cm.toFixed(1)}cm to find resonance peaks!`
      : `🎵 [Điều chỉnh cột không khí] Âm thoa f = ${forkFreqHz} Hz (Bước sóng λ = ${wavelengthCm.toFixed(1)} cm). Chiều dài cột khí L = ${tubeLengthCm.toFixed(1)} cm. Điều chỉnh mực nước tới L₁ = ${res1Cm.toFixed(1)} cm hoặc L₂ = ${res2Cm.toFixed(1)} cm để đạt cực đại cộng hưởng!`;
  };

  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    let animId;
    let time = 0;

    const render = () => {
      time += 0.05;
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

      // Title HUD Banner
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(
        isEn
          ? `CAMBRIDGE A LEVEL 9702: AIR COLUMN RESONANCE TUBE & SPEED OF SOUND v = f·λ`
          : `CAMBRIDGE A LEVEL 9702: CỘNG HƯỞNG SÓNG DỪNG CỘT KHÔNG KHÍ & TỐC ĐỘ ÂM v = f·λ`,
        25,
        26
      );


      // --- SECTION 1: VERTICAL RESONANCE TUBE & WATER LEVEL (x: 100 to 220) ---
      const tubeX = 140;
      const tubeTopY = 70;
      const tubeTotalH = 220;
      const tubeW = 44;

      const waterH = Math.max(10, Math.min(tubeTotalH - 20, (1 - tubeLengthCm / 60) * tubeTotalH));
      const airH = tubeTotalH - waterH;
      const waterTopY = tubeTopY + airH;

      // Outer Acrylic Tube Body
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(tubeX - tubeW / 2, tubeTopY, tubeW, tubeTotalH);

      // Blue Water Fill
      const waterGrad = ctx.createLinearGradient(tubeX, waterTopY, tubeX, tubeTopY + waterH);
      waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.7)');
      waterGrad.addColorStop(1, 'rgba(3, 105, 161, 0.9)');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(tubeX - tubeW / 2 + 2, waterTopY, tubeW - 4, waterH);

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tubeX - tubeW / 2, waterTopY);
      ctx.lineTo(tubeX + tubeW / 2, waterTopY);
      ctx.stroke();

      // Standing Sound Wave Loops inside Air Column
      if (soundIntensity > 0.1) {
        ctx.strokeStyle = `rgba(0, 242, 254, ${soundIntensity * 0.8})`;
        ctx.lineWidth = 2;

        const wavePts = 30;
        ctx.beginPath();
        for (let p = 0; p <= wavePts; p++) {
          const py = tubeTopY + (p / wavePts) * airH;
          const phase = (p / wavePts) * Math.PI * 0.5; // Antinode at top, node at bottom
          const amp = Math.sin(phase) * (tubeW / 2 - 4) * Math.sin(time * 15) * soundIntensity;

          if (p === 0) ctx.moveTo(tubeX + amp, py);
          else ctx.lineTo(tubeX + amp, py);
        }
        ctx.stroke();

        ctx.beginPath();
        for (let p = 0; p <= wavePts; p++) {
          const py = tubeTopY + (p / wavePts) * airH;
          const phase = (p / wavePts) * Math.PI * 0.5;
          const amp = -Math.sin(phase) * (tubeW / 2 - 4) * Math.sin(time * 15) * soundIntensity;

          if (p === 0) ctx.moveTo(tubeX + amp, py);
          else ctx.lineTo(tubeX + amp, py);
        }
        ctx.stroke();
      }

      // --- SECTION 2: VIBRATING TUNING FORK OVER OPEN TOP ---
      const forkX = tubeX;
      const forkY = tubeTopY - 25;
      const forkVibeOffset = Math.sin(time * 25) * (soundIntensity * 3);

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      // Left tine
      ctx.beginPath();
      ctx.moveTo(forkX - 10 + forkVibeOffset, forkY - 25);
      ctx.lineTo(forkX - 10, forkY);
      ctx.lineTo(forkX, forkY + 12);
      ctx.stroke();

      // Right tine
      ctx.beginPath();
      ctx.moveTo(forkX + 10 - forkVibeOffset, forkY - 25);
      ctx.lineTo(forkX + 10, forkY);
      ctx.lineTo(forkX, forkY + 12);
      ctx.stroke();

      // Handle
      ctx.fillStyle = '#64748b';
      ctx.fillRect(forkX - 3, forkY + 12, 6, 12);

      // Sound Radial Waves emitting from Tuning Fork if Resonating
      if (soundIntensity > 0.4) {
        ctx.strokeStyle = `rgba(251, 191, 36, ${soundIntensity * 0.7})`;
        ctx.lineWidth = 1.5;
        for (let r = 1; r <= 3; r++) {
          const rRad = ((r * 12 + time * 20) % 40);
          ctx.beginPath();
          ctx.arc(forkX, forkY - 10, rRad, Math.PI * 0.8, Math.PI * 0.2, true);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${forkFreqHz} Hz`, forkX, forkY - 35);


      // --- SECTION 3: SOUND INTENSITY & SPECTRUM DISPLAY (Right side, x: 300 to 510) ---
      const gx = 300;
      const gy = 55;
      const gw = 220;
      const gh = 235;

      // Container
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(gx, gy, gw, gh, 8);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'SOUND INTENSITY vs AIR LENGTH L' : 'CƯỜNG ĐỘ ÂM CỘNG HƯỞNG I(L)', gx + gw / 2, gy + 16);

      // Axes
      const originX = gx + 40;
      const originY = gy + gh - 35;
      const axisW = gw - 50;
      const axisH = gh - 55;

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(originX, gy + 25);
      ctx.lineTo(originX, originY);
      ctx.lineTo(originX + axisW, originY);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.fillText('I(Âm)', originX - 10, gy + 30);
      ctx.fillText('L(cm)', originX + axisW - 5, originY + 16);

      // Plot Theoretical Sound Intensity Curve vs Air Length L
      const maxL = 50; // cm
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let px = 0; px <= axisW; px += 2) {
        const lVal = (px / axisW) * maxL;
        const d1 = Math.abs(lVal - res1Cm);
        const d2 = Math.abs(lVal - res2Cm);
        const iVal = Math.max(0.05, Math.exp(-Math.pow(Math.min(d1, d2) / 2.5, 2)));

        const plotX = originX + px;
        const plotY = originY - iVal * axisH;

        if (px === 0) ctx.moveTo(plotX, plotY);
        else ctx.lineTo(plotX, plotY);
      }
      ctx.stroke();

      // Mark 1st and 2nd Resonance Peaks
      [res1Cm, res2Cm].forEach((resL, idx) => {
        if (resL <= maxL) {
          const rPx = originX + (resL / maxL) * axisW;
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(rPx, originY - axisH, 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.font = 'bold 8px Inter';
          ctx.fillText(`L${idx + 1}`, rPx, originY + 12);
        }
      });

      // Current Operating Point Dot
      const curPx = originX + (tubeLengthCm / maxL) * axisW;
      const curPy = originY - soundIntensity * axisH;

      ctx.fillStyle = isResonating ? '#10b981' : '#f43f5e';
      ctx.shadowColor = isResonating ? '#10b981' : '#f43f5e';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [forkFreqHz, tubeLengthCm, res1Cm, res2Cm, soundIntensity, isResonating, wavelengthCm, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      forkFreqHz: `${forkFreqHz} Hz`,
      tubeLengthCm: `${tubeLengthCm.toFixed(1)} cm`,
      res1Cm: `${res1Cm.toFixed(1)} cm`,
      res2Cm: `${res2Cm.toFixed(1)} cm`,
      soundIntensity: `${(soundIntensity * 100).toFixed(0)}%`,
      status: isResonating ? (isEn ? 'RESONANCE PEAK' : 'CỰC ĐẠI CỘNG HƯỞNG') : (isEn ? 'Off Resonance' : 'Chưa cộng hưởng')
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas View */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={320}
          className="w-full max-w-[540px] h-[320px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
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
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Resonance Tube Controls' : 'Tham số Ống Cộng Hưởng'}
          </h3>

          {/* Tuning Fork Frequency Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Tuning Fork Frequency f:' : 'Tần số Âm thoa f:'}</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[256, 384, 512, 1024].map(freq => (
                <button
                  key={freq}
                  onClick={() => onParamChange('forkFreqHz', freq)}
                  className={`py-1.5 rounded-md text-[11px] font-bold transition-all ${
                    forkFreqHz === freq
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {freq}Hz
                </button>
              ))}
            </div>
          </div>

          {/* Air Column Length L Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Air Column Length L:' : 'Chiều dài Cột khí L:'}</span>
              <span className="text-amber-400 font-bold">{tubeLengthCm.toFixed(1)} cm</span>
            </div>
            <input
              type="range" min="5.0" max="45.0" step="0.2"
              value={tubeLengthCm}
              onChange={(e) => onParamChange('tubeLengthCm', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-amber-400"
            />
          </div>

          {/* Auto Tune to 1st Resonance Button */}
          <button
            onClick={() => onParamChange('tubeLengthCm', Number(res1Cm.toFixed(1)))}
            className="w-full py-2 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>{isEn ? 'Tune to 1st Peak (L₁)' : 'Chỉnh tới Cực Đại 1 (L₁)'}</span>
          </button>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> {isEn ? 'RESONANCE MEASUREMENTS' : 'Số liệu Sóng Dừng Cột Khí'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? '1st Peak L₁:' : 'Cực đại 1 (L₁):'}</span>
              <span className="text-cyan-400 font-bold text-sm">{res1Cm.toFixed(1)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Sound Wavelength λ:' : 'Bước sóng λ:'}</span>
              <span className="text-amber-400 font-bold text-sm">{wavelengthCm.toFixed(1)} cm</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Speed of Sound v:' : 'Tốc độ Âm thanh v:'}</span>
                <span className="text-slate-400 text-[10px]">v = f·λ = 4f·(L₁ + c)</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{speedOfSoundMs} m/s</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Resonance Data' : 'Ghi Bảng Số liệu Cộng Hưởng'}
          </button>
        </div>
      </div>
    </div>
  );
}
