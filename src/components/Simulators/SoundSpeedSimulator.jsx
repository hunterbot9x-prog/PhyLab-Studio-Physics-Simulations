import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, RotateCcw, Activity, ShieldCheck, Sparkles } from 'lucide-react';

export default function SoundSpeedSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const wavePhaseRef = useRef(0);

  const frequencyHz = params.frequencyHz || 512; // Tuning fork frequency Hz (256, 440, 512, 1024)
  const tubeLengthCm = params.tubeLengthCm || 16.5; // Resonance air column length cm (1 - 40 cm)
  const airTempC = params.airTempC || 20; // Ambient air temp C (0 - 40 C)

  // Speed of sound in air v = 331.3 + 0.606 * T (m/s)
  const speedOfSound = 331.3 + 0.606 * airTempC;

  // Theoretical resonance length for 1st harmonic: L1 ≈ (lambda / 4) - 0.3 * d
  const tubeDiameterCm = 4.0;
  const theoreticalLambdaM = speedOfSound / frequencyHz;
  const idealResonanceL1Cm = (theoreticalLambdaM / 4) * 100 - 0.3 * tubeDiameterCm;

  // Resonance intensity (peaks sharply when tubeLength ≈ idealResonanceL1Cm)
  const lengthDiffCm = Math.abs(tubeLengthCm - idealResonanceL1Cm);
  const resonanceIntensity = Math.max(0.05, Math.exp(-Math.pow(lengthDiffCm / 1.2, 2)));
  const isResonating = resonanceIntensity > 0.80;

  // Animation Loop for Sound Waves & Tuning Fork Vibration
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      wavePhaseRef.current += 0.15;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Dark Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
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

      const tubeX = width * 0.42;
      const tubeTopY = 95;
      const maxAirH = 260; // corresponds to 40 cm
      const scalePxPerCm = maxAirH / 40;
      const tubeW = 54;

      // Air column height in pixels & water level Y
      const airColumnPx = tubeLengthCm * scalePxPerCm;
      const waterLevelY = tubeTopY + airColumnPx;
      const tubeBottomY = tubeTopY + maxAirH + 30;

      // 1. Draw Glass Resonance Tube Container
      // Water Reservoir at Bottom
      ctx.fillStyle = 'rgba(0, 242, 254, 0.35)';
      ctx.fillRect(tubeX - tubeW / 2 + 2, waterLevelY, tubeW - 4, tubeBottomY - waterLevelY);

      // Water Surface Line
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tubeX - tubeW / 2 + 2, waterLevelY);
      ctx.lineTo(tubeX + tubeW / 2 - 2, waterLevelY);
      ctx.stroke();

      // Water meniscus reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(tubeX, waterLevelY, tubeW / 2 - 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glass Tube Double Outline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(tubeX - tubeW / 2, tubeTopY);
      ctx.lineTo(tubeX - tubeW / 2, tubeBottomY);
      ctx.lineTo(tubeX + tubeW / 2, tubeBottomY);
      ctx.lineTo(tubeX + tubeW / 2, tubeTopY);
      ctx.stroke();

      // 2. Draw Tuning Fork (Âm thoa kim loại) above Open Top of Tube
      const forkY = tubeTopY - 55;
      const forkWidth = 26;
      const forkProngH = 35;
      const vibrationAmp = isResonating ? 3.5 : 1.2;
      const vibrOffset = Math.sin(wavePhaseRef.current * 2) * vibrationAmp;

      // Metal Shaft & Handle
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(tubeX, forkY - 20);
      ctx.lineTo(tubeX, forkY);
      ctx.stroke();

      // U-Base
      ctx.beginPath();
      ctx.arc(tubeX, forkY, forkWidth / 2, 0, Math.PI);
      ctx.stroke();

      // Prongs (Vibrating Left & Right)
      ctx.beginPath();
      ctx.moveTo(tubeX - forkWidth / 2, forkY);
      ctx.lineTo(tubeX - forkWidth / 2 + vibrOffset, forkY - forkProngH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tubeX + forkWidth / 2, forkY);
      ctx.lineTo(tubeX + forkWidth / 2 - vibrOffset, forkY - forkProngH);
      ctx.stroke();

      // Sound Wave Arcs from Tuning Fork
      ctx.strokeStyle = isResonating ? '#10b981' : 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = isResonating ? 3 : 1.5;
      for (let r = 10; r <= 35; r += 10) {
        const ringR = (r + (wavePhaseRef.current * 8) % 30);
        const alpha = Math.max(0, 1 - ringR / 45);
        ctx.strokeStyle = isResonating ? `rgba(16, 185, 129, ${alpha})` : `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(tubeX, forkY - 10, ringR, Math.PI * 0.2, Math.PI * 0.8);
        ctx.stroke();
      }

      // 3. Draw Air Column Standing Wave Envelope (1st Harmonic Resonance: Node at Water, Antinode at Top)
      const waveColor = isResonating ? 'rgba(16, 185, 129, 0.85)' : 'rgba(56, 189, 248, 0.4)';
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = isResonating ? 3.5 : 2;

      const numPoints = 40;
      const airH = waterLevelY - tubeTopY;

      // Left Wave Profile: A * cos( (y - top) / L * (pi/2) ) * sin(phase)
      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const currY = tubeTopY + (i / numPoints) * airH;
        const normDist = (currY - tubeTopY) / airH; // 0 at top, 1 at water
        const envelope = Math.cos(normDist * (Math.PI / 2)); // 1 at antinode (top), 0 at node (water)
        const offset = envelope * (tubeW / 2 - 6) * Math.sin(wavePhaseRef.current) * (0.3 + 0.7 * resonanceIntensity);
        const currX = tubeX - offset;
        if (i === 0) ctx.moveTo(currX, currY);
        else ctx.lineTo(currX, currY);
      }
      ctx.stroke();

      // Right Wave Profile (opposite phase)
      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const currY = tubeTopY + (i / numPoints) * airH;
        const normDist = (currY - tubeTopY) / airH;
        const envelope = Math.cos(normDist * (Math.PI / 2));
        const offset = envelope * (tubeW / 2 - 6) * Math.sin(wavePhaseRef.current) * (0.3 + 0.7 * resonanceIntensity);
        const currX = tubeX + offset;
        if (i === 0) ctx.moveTo(currX, currY);
        else ctx.lineTo(currX, currY);
      }
      ctx.stroke();

      // Node & Antinode Labels inside Air Column
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'ANTINODE (Max Motion)' : 'BỤNG SÓNG (A)', tubeX, tubeTopY + 16);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(isEn ? 'NODE (Surface)' : 'NÚT SÓNG (N)', tubeX, waterLevelY - 8);

      // 4. Draw Parallel Ruler (Thước đo độ dài cột không khí L)
      const rulerX = tubeX + 85;
      const rulerTopY = tubeTopY;
      const rulerH = maxAirH;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.fillRect(rulerX, rulerTopY, 48, rulerH);
      ctx.strokeRect(rulerX, rulerTopY, 48, rulerH);

      // 0 cm Top Mark
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(rulerX - 10, rulerTopY); ctx.lineTo(rulerX + 48, rulerTopY); ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('0 cm', rulerX + 5, rulerTopY - 4);

      // Ruler cm ticks
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px Inter';
      for (let cm = 0; cm <= 40; cm += 2) {
        const markY = rulerTopY + cm * scalePxPerCm;
        if (markY <= rulerTopY + rulerH) {
          const isMajor = cm % 10 === 0;
          ctx.strokeStyle = isMajor ? '#00f2fe' : '#475569';
          ctx.lineWidth = isMajor ? 1.8 : 1;
          ctx.beginPath(); ctx.moveTo(rulerX, markY); ctx.lineTo(rulerX + (isMajor ? 16 : 8), markY); ctx.stroke();
          if (isMajor && cm > 0) ctx.fillText(`${cm}`, rulerX + 20, markY + 3);
        }
      }

      // Theoretical Ideal Resonance Line (Gold Dotted Line)
      const idealY = rulerTopY + idealResonanceL1Cm * scalePxPerCm;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(tubeX - tubeW / 2 - 20, idealY); ctx.lineTo(rulerX + 48, idealY); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`L₁ = ${idealResonanceL1Cm.toFixed(1)}cm`, rulerX + 5, idealY - 4);

      // Water Level Pointer Line (Cyan) - Horizontal to Ruler
      ctx.strokeStyle = isResonating ? '#10b981' : '#00f2fe';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tubeX + tubeW / 2 + 4, waterLevelY);
      ctx.lineTo(rulerX + 48, waterLevelY);
      ctx.stroke();

      // Arrow head pointing to ruler
      ctx.fillStyle = isResonating ? '#10b981' : '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(rulerX, waterLevelY);
      ctx.lineTo(rulerX - 7, waterLevelY - 4);
      ctx.lineTo(rulerX - 7, waterLevelY + 4);
      ctx.closePath();
      ctx.fill();

      // Current L Label
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(`L = ${tubeLengthCm.toFixed(1)} cm`, rulerX - 10, waterLevelY - 5);

      // HUD Title & Resonance Status Banner
      if (isResonating) {
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
        ctx.font = 'bold 13px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(
          isEn ? '🔊 RESONANCE REACHED! MAX SOUND VOLUME' : '🔊 ĐẠT CỘNG HƯỞNG! ÂM THANH TO NHẤT (CỘNG HƯỞNG CỰC ĐẠI)',
          width * 0.5,
          25
        );
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(
          isEn ? '🔉 Adjust Air Column Length L to Find Resonance' : '🔉 Kéo thanh trượt L để tìm vị trí Cột Không Khí Cùng Tần Số',
          width * 0.5,
          25
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [tubeLengthCm, airTempC, frequencyHz, idealResonanceL1Cm, resonanceIntensity, isResonating, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      frequencyHz: `${frequencyHz} Hz`,
      tubeLengthCm: `${tubeLengthCm} cm`,
      airTempC: `${airTempC} °C`,
      speedOfSound: `${speedOfSound.toFixed(1)} m/s`,
      idealL1Cm: `${idealResonanceL1Cm.toFixed(1)} cm`,
      resonanceStatus: isResonating ? (isEn ? 'Resonating' : 'Cộng hưởng') : (isEn ? 'Off-Resonance' : 'Chưa cộng hưởng')
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
            <Volume2 className="w-4 h-4" /> {isEn ? 'Sound Speed Controls' : 'Cambridge IGCSE Sound Speed'}
          </h3>

          {/* Tuning Fork Frequency */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Tuning Fork Frequency f:' : 'Tần số Âm thoa f:'}</label>
            <select
              value={frequencyHz}
              onChange={(e) => onParamChange('frequencyHz', Number(e.target.value))}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-bold focus:border-cyan-400 focus:outline-none"
            >
              <option value="256">256 Hz (Nốt C4 / Trầm)</option>
              <option value="440">440 Hz (Nốt A4 / Chuẩn Piano)</option>
              <option value="512">512 Hz (Nốt C5 / Chuẩn Thí nghiệm)</option>
              <option value="1024">1024 Hz (Nốt C6 / Cao)</option>
            </select>
          </div>

          {/* Air Column Length Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Air Column Length L:' : 'Chiều dài cột không khí L:'}</span>
              <span className="text-cyan-400 font-bold">{tubeLengthCm} cm</span>
            </div>
            <input
              type="range" min="1" max="40" step="0.5"
              value={tubeLengthCm}
              onChange={(e) => onParamChange('tubeLengthCm', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Air Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Air Temperature T:' : 'Nhiệt độ không khí T:'}</span>
              <span className="text-amber-400 font-bold">{airTempC} °C</span>
            </div>
            <input
              type="range" min="0" max="40" step="1"
              value={airTempC}
              onChange={(e) => onParamChange('airTempC', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'SOUND SPEED RESULTS' : 'KẾT QUẢ VẬN TỐC ÂM THANH'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Speed v = 331.3 + 0.6T:' : 'Vận tốc v = 331.3 + 0.6T:'}</span>
              <span className="text-emerald-400 font-bold text-sm">{speedOfSound.toFixed(1)} m/s</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Ideal L₁ Theoretical:' : 'Chiều dài L₁ lý thuyết:'}</span>
              <span className="text-amber-400 font-bold text-sm">{idealResonanceL1Cm.toFixed(1)} cm</span>
            </div>
          </div>

          <div className={`p-3 rounded-lg border flex justify-between items-center text-xs transition-all ${
            isResonating
              ? 'bg-emerald-950/60 border-emerald-500/80 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-950 border-slate-800'
          }`}>
            <div>
              <span className={`font-bold block ${isResonating ? 'text-emerald-400' : 'text-slate-300'}`}>
                {isResonating ? (isEn ? '🔊 RESONANCE ACTIVE' : '🔊 CỘNG HƯỞNG CỰC ĐẠI') : (isEn ? '🔉 OFF-RESONANCE' : '🔉 CHƯA CỘNG HƯỞNG')}
              </span>
              <span className="text-slate-400 text-[10px]">L₁ = (λ / 4) - 0.3d</span>
            </div>
            <span className={`font-extrabold text-xs px-2.5 py-1 rounded-full border ${
              isResonating
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {isResonating ? (isEn ? 'MATCHED' : 'KHỚP SÓNG') : (isEn ? 'SEARCHING' : 'TÌM L₁')}
            </span>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Activity className="w-4 h-4" /> {isEn ? 'Record Measurement' : 'Ghi Bảng Số liệu Vận tốc Âm'}
          </button>
        </div>
      </div>
    </div>
  );
}
