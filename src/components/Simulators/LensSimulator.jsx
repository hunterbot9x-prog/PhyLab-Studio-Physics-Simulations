import React, { useEffect, useRef } from 'react';
import { Focus, Eye, CheckCircle2 } from 'lucide-react';

export default function LensSimulator({ lang, params, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const lensType = params.lensType || 'converging'; // 'converging' | 'diverging'
  const f = (lensType === 'converging' ? 1 : -1) * (params.focalLength || 20); // cm
  const d = params.objectDistance || 35; // cm
  const h = params.objectHeight || 12; // cm

  // Lens equations
  let dPrime = 0;
  let k = 0;
  let isVirtual = false;
  let isReal = false;

  if (d !== Math.abs(f)) {
    dPrime = (d * f) / (d - f);
    k = -dPrime / d;
    isVirtual = dPrime < 0;
    isReal = dPrime > 0;
  }

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

    const oX = width * 0.5; // Optical Center O
    const oY = height * 0.5; // Principal Axis line
    const scalePxPerCm = 3.5;

    // 1. Draw Principal Axis (Trục chính Δ)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, oY);
    ctx.lineTo(width - 30, oY);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'italic 11px Inter';
    ctx.fillText('Δ', width - 25, oY - 6);

    // 2. Draw Lens (Thấu kính)
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(oX, oY - 140);
    ctx.lineTo(oX, oY + 140);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Lens Arrows (Hội tụ vs Phân kỳ)
    ctx.fillStyle = '#00f2fe';
    if (lensType === 'converging') {
      // Outward arrows (Convex)
      drawArrowHead(ctx, oX, oY - 140, -Math.PI / 2);
      drawArrowHead(ctx, oX, oY + 140, Math.PI / 2);
    } else {
      // Inward arrows (Concave)
      drawArrowHead(ctx, oX, oY - 140, Math.PI / 2);
      drawArrowHead(ctx, oX, oY + 140, -Math.PI / 2);
    }

    // Optical Center O
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath(); ctx.arc(oX, oY, 5, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter';
    ctx.fillText('O', oX - 14, oY + 16);

    // 3. Focal Points F and F' (Tiêu điểm)
    const fPx = Math.abs(f) * scalePxPerCm;
    const fX = oX - fPx;
    const fPrimeX = oX + fPx;

    // Draw F (Vật side)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(fX, oY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.font = 'bold 11px Inter';
    ctx.fillText(lensType === 'converging' ? 'F' : "F'", fX - 4, oY + 16);

    // Draw F' (Ảnh side)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(fPrimeX, oY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.fillText(lensType === 'converging' ? "F'" : 'F', fPrimeX - 4, oY + 16);

    // 4. Object Arrow AB (Vật sáng AB)
    const objX = oX - d * scalePxPerCm;
    const objHeightPx = h * scalePxPerCm;
    const objTopY = oY - objHeightPx;

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(objX, oY);
    ctx.lineTo(objX, objTopY);
    ctx.stroke();
    drawArrowHead(ctx, objX, objTopY, -Math.PI / 2, '#f43f5e');
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 12px Inter';
    ctx.fillText('A', objX - 4, oY + 16);
    ctx.fillText('B', objX - 4, objTopY - 8);

    // 5. Image Arrow A'B' (Ảnh A'B')
    if (d !== Math.abs(f)) {
      const imgX = oX + dPrime * scalePxPerCm;
      const imgHeightPx = k * objHeightPx;
      const imgTopY = oY - imgHeightPx;

      ctx.strokeStyle = isVirtual ? '#fbbf24' : '#10b981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = isVirtual ? '#fbbf24' : '#10b981';
      ctx.shadowBlur = 8;

      if (isVirtual) {
        ctx.setLineDash([5, 5]);
      }

      ctx.beginPath();
      ctx.moveTo(imgX, oY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();
      ctx.setLineDash([]);

      drawArrowHead(ctx, imgX, imgTopY, imgHeightPx > 0 ? -Math.PI / 2 : Math.PI / 2, isVirtual ? '#fbbf24' : '#10b981');
      ctx.shadowBlur = 0;

      ctx.fillStyle = isVirtual ? '#fbbf24' : '#10b981';
      ctx.font = 'bold 12px Inter';
      ctx.fillText("A'", imgX - 4, oY + 16);
      ctx.fillText("B'", imgX - 4, imgTopY + (imgHeightPx > 0 ? -8 : 16));
    }

  }, [lensType, f, d, h, dPrime, k, isVirtual, isReal]);

  const drawArrowHead = (ctx, x, y, angle, color = '#00f2fe') => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8 * Math.cos(angle - Math.PI / 6), y - 8 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - 8 * Math.cos(angle + Math.PI / 6), y - 8 * Math.sin(angle + Math.PI / 6));
    ctx.fill();
  };

  const recordPoint = () => {
    onDataRecorded?.({
      lensType: lensType === 'converging' ? (isEn ? 'Convex' : 'Hội tụ') : (isEn ? 'Concave' : 'Phân kỳ'),
      focalLength: `${f} cm`,
      objectDistance: `${d} cm`,
      imageDistance: `${dPrime.toFixed(1)} cm`,
      magnification: `${k.toFixed(2)}x`,
      imageType: isVirtual ? (isEn ? 'Virtual Image' : 'Ảnh ảo') : (isEn ? 'Real Image' : 'Ảnh thật')
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

        {/* Quick Lens Switch */}
        <div className="w-full max-w-[540px] mt-4 flex items-center justify-between gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-300">{isEn ? 'Lens Type:' : 'Loại Thấu Kính:'}</span>
          <div className="grid grid-cols-2 gap-2 flex-1 max-w-[300px]">
            <button
              onClick={() => onParamChange('lensType', 'converging')}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                lensType === 'converging' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isEn ? 'Convex (f > 0)' : 'Hội Tụ (f > 0)'}
            </button>
            <button
              onClick={() => onParamChange('lensType', 'diverging')}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                lensType === 'diverging' ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isEn ? 'Concave (f < 0)' : 'Phân Kỳ (f < 0)'}
            </button>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Focus className="w-4 h-4" /> {isEn ? 'OPTICAL PARAMETERS' : 'Tham số Quang học'}
          </h3>

          {/* Focal Length Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Focal Length |f|:' : 'Tiêu cự |f|:'}</span>
              <span className="text-cyan-400 font-bold">{Math.abs(f)} cm</span>
            </div>
            <input
              type="range" min="10" max="40" step="5"
              value={Math.abs(f)}
              onChange={(e) => onParamChange('focalLength', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Object Distance Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Object Distance d:' : 'Khoảng cách vật d:'}</span>
              <span className="text-amber-400 font-bold">{d} cm</span>
            </div>
            <input
              type="range" min="10" max="70" step="1"
              value={d}
              onChange={(e) => onParamChange('objectDistance', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'IMAGE POSITION & NATURE' : 'Kết quả Vị trí & Tính chất Ảnh'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? "Image Distance d':" : "Khoảng cách ảnh d':"}</span>
              <span className="text-emerald-400 font-bold text-sm">{dPrime.toFixed(1)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Magnification k:' : 'Độ phóng đại k:'}</span>
              <span className="text-amber-400 font-bold text-sm">{k.toFixed(2)} x</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Image Nature:' : 'Tính chất Ảnh:'}</span>
                <span className="text-slate-400 text-[10px]">1/f = 1/d + 1/d'</span>
              </div>
              <span className={`font-extrabold text-sm ${isVirtual ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isVirtual ? (isEn ? '🔴 VIRTUAL IMAGE' : '🔴 ẢNH ẢO') : (isEn ? '🟢 REAL IMAGE' : '🟢 ẢNH THẬT')}
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Lens Data' : 'Ghi Bảng Số liệu Thấu kính'}
          </button>
        </div>
      </div>
    </div>
  );
}
