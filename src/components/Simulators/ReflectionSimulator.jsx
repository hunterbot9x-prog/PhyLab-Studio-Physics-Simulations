import React, { useEffect, useRef } from 'react';
import { Sun, RotateCcw, Eye, ShieldCheck } from 'lucide-react';

export default function ReflectionSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const incidentAngle = params.incidentAngle !== undefined ? params.incidentAngle : 45;
  const reflectedAngle = incidentAngle; // i' = i

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020408');
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

    const mirrorX = width * 0.5;
    const mirrorY = height * 0.55;
    const mirrorLength = 280;

    // 1. Draw Protractor
    const protractorRadius = 140;
    ctx.save();
    ctx.translate(mirrorX, mirrorY);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.fillStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(0, 0, protractorRadius, Math.PI, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ticks & Degree labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '9px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let deg = -90; deg <= 90; deg += 10) {
      const rad = (deg - 90) * Math.PI / 180;
      const innerR = deg % 30 === 0 ? protractorRadius - 12 : protractorRadius - 6;
      const rx1 = protractorRadius * Math.cos(rad);
      const ry1 = protractorRadius * Math.sin(rad);
      const rx2 = innerR * Math.cos(rad);
      const ry2 = innerR * Math.sin(rad);

      ctx.beginPath(); ctx.moveTo(rx1, ry1); ctx.lineTo(rx2, ry2); ctx.stroke();

      if (deg % 30 === 0) {
        const lx = (protractorRadius - 20) * Math.cos(rad);
        const ly = (protractorRadius - 20) * Math.sin(rad);
        ctx.fillText(`${Math.abs(deg)}°`, lx, ly + 3);
      }
    }
    ctx.restore();

    // 2. Draw Flat Mirror Line (Gương phẳng)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(mirrorX - mirrorLength / 2, mirrorY);
    ctx.lineTo(mirrorX + mirrorLength / 2, mirrorY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Hatch lines behind mirror
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    for (let x = mirrorX - mirrorLength / 2; x <= mirrorX + mirrorLength / 2; x += 10) {
      ctx.beginPath(); ctx.moveTo(x, mirrorY); ctx.lineTo(x - 6, mirrorY + 10); ctx.stroke();
    }

    // Mirror Title Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? 'Flat Mirror M' : 'Gương phẳng M', mirrorX, mirrorY + 25);

    // 3. Draw Normal Line N (Đường Pháp tuyến)
    if (params.showNormals !== false) {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mirrorX, mirrorY);
      ctx.lineTo(mirrorX, mirrorY - 170);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(isEn ? 'Normal N' : 'Pháp tuyến N', mirrorX, mirrorY - 175);
    }

    // Convert angles to radians relative to normal
    const incRad = (incidentAngle * Math.PI) / 180;
    const rayLen = 160;

    // Incident Ray SI (Tia tới)
    const sX = mirrorX - rayLen * Math.sin(incRad);
    const sY = mirrorY - rayLen * Math.cos(incRad);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(mirrorX, mirrorY);
    ctx.stroke();

    // Reflected Ray IR (Tia phản xạ)
    const rX = mirrorX + rayLen * Math.sin(incRad);
    const rY = mirrorY - rayLen * Math.cos(incRad);

    ctx.strokeStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(mirrorX, mirrorY);
    ctx.lineTo(rX, rY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Light Source Point S
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(sX, sY, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('S', sX - 12, sY - 8);

    // Angle Arcs
    if (incidentAngle > 0) {
      // Incident Angle Arc
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mirrorX, mirrorY, 40, -Math.PI / 2 - incRad, -Math.PI / 2);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`i = ${incidentAngle}°`, mirrorX - 25 * Math.sin(incRad / 2), mirrorY - 48 * Math.cos(incRad / 2));

      // Reflected Angle Arc
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(mirrorX, mirrorY, 40, -Math.PI / 2, -Math.PI / 2 + incRad);
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`i' = ${reflectedAngle}°`, mirrorX + 25 * Math.sin(incRad / 2), mirrorY - 48 * Math.cos(incRad / 2));
    }

    // 4. Draw Virtual Image S' (Ảnh ảo sau gương)
    if (params.showVirtualImage !== false) {
      const sPrimeX = mirrorX - rayLen * Math.sin(incRad);
      const sPrimeY = mirrorY + rayLen * Math.cos(incRad);

      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(mirrorX, mirrorY);
      ctx.lineTo(sPrimeX, sPrimeY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.beginPath(); ctx.arc(sPrimeX, sPrimeY, 5, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(isEn ? "S' (Virtual Image)" : "S' (Ảnh ảo)", sPrimeX - 15, sPrimeY + 18);
    }

  }, [params, incidentAngle, reflectedAngle, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      incidentAngle: `${incidentAngle}°`,
      reflectedAngle: `${reflectedAngle}°`,
      status: incidentAngle === reflectedAngle ? (isEn ? "i = i' (Verified)" : "i = i' (Chính xác)") : 'Error'
    });
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={540}
          height={420}
          className="w-full max-w-[540px] h-[420px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Angle Slider Control */}
        <div className="w-full max-w-[540px] mt-4 flex items-center gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <Sun className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">{isEn ? 'Incident Angle i (°):' : 'Góc tới i (°):'}</span>
          <input
            type="range"
            min="0"
            max="80"
            value={incidentAngle}
            onChange={(e) => onParamChange('incidentAngle', Number(e.target.value))}
            className="flex-1 accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
          />
          <span className="text-sm font-bold text-amber-400 min-w-[45px] text-right">{incidentAngle}°</span>
        </div>
      </div>

      {/* Control Sidebar & Live Verification */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Sun className="w-4 h-4" /> {isEn ? 'DISPLAY OPTIONS' : 'Tùy chọn Hiển thị'}
          </h3>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={params.showNormals !== false}
              onChange={(e) => onParamChange('showNormals', e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            {isEn ? 'Show Normal Line N' : 'Hiển thị Đường pháp tuyến N'}
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={params.showVirtualImage !== false}
              onChange={(e) => onParamChange('showVirtualImage', e.target.checked)}
              className="accent-rose-400 rounded"
            />
            {isEn ? "Show Virtual Image S' behind mirror" : "Hiển thị Ảnh ảo S' sau gương"}
          </label>
        </div>

        {/* Realtime Law Verification Card */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'LAW VERIFICATION' : 'Kiểm chứng Định luật'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="text-cyan-400 block text-[11px] font-semibold">{isEn ? 'Incident Angle i:' : 'Góc tới i:'}</span>
              <span className="text-cyan-300 font-extrabold text-base">{incidentAngle}°</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
              <span className="text-rose-400 block text-[11px] font-semibold">{isEn ? "Reflected Angle i':" : "Góc phản xạ i':"}</span>
              <span className="text-rose-300 font-extrabold text-base">{reflectedAngle}°</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 text-center">
              <span className="text-emerald-300 font-bold text-sm block">{isEn ? 'Law of Reflection:' : 'Định luật phản xạ:'}</span>
              <span className="text-emerald-400 font-extrabold text-lg">i' = i = {incidentAngle}°</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            ➕ {isEn ? 'Record Optics Data' : 'Ghi Bảng Số liệu Quang học'}
          </button>
        </div>
      </div>
    </div>
  );
}
