import React, { useEffect, useRef } from 'react';
import { Focus, Eye, CheckCircle2 } from 'lucide-react';

export default function LensSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
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
    ctx.moveTo(oX, oY - 150);
    ctx.lineTo(oX, oY + 150);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Lens Arrows (Hội tụ vs Phân kỳ)
    if (lensType === 'converging') {
      // Outward arrows (Convex)
      drawArrowHead(ctx, oX, oY - 150, -Math.PI / 2, '#00f2fe');
      drawArrowHead(ctx, oX, oY + 150, Math.PI / 2, '#00f2fe');
    } else {
      // Inward arrows (Concave)
      drawArrowHead(ctx, oX, oY - 150, Math.PI / 2, '#00f2fe');
      drawArrowHead(ctx, oX, oY + 150, -Math.PI / 2, '#00f2fe');
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

    // Draw F (Object side)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(fX, oY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.font = 'bold 11px Inter';
    ctx.fillText(lensType === 'converging' ? 'F' : "F'", fX - 4, oY + 16);

    // Draw F' (Image side)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(fPrimeX, oY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.fillText(lensType === 'converging' ? "F'" : 'F', fPrimeX - 4, oY + 16);

    // 4. Object Arrow AB (Vật sáng AB)
    const objX = oX - d * scalePxPerCm;
    const objHeightPx = h * scalePxPerCm;
    const objTopY = oY - objHeightPx;

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3.5;
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
    let imgX = 0, imgTopY = 0, imgHeightPx = 0;
    if (d !== Math.abs(f)) {
      imgX = oX + dPrime * scalePxPerCm;
      imgHeightPx = k * objHeightPx;
      imgTopY = oY - imgHeightPx;

      ctx.strokeStyle = isVirtual ? '#fbbf24' : '#10b981';
      ctx.lineWidth = 3;
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


    // --- 6. DRAW 3 SPECIAL LIGHT RAYS (Các tia sáng đặc biệt) ---
    if (d !== Math.abs(f)) {
      // RAY 1: Parallel Ray (Amber #fbbf24) - Incident parallel to axis, refracts through F'
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 4;

      // Incident ray: B -> Lens (oX, objTopY)
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(oX, objTopY);
      ctx.stroke();
      drawRayArrow(ctx, (objX + oX) / 2, objTopY, 0, '#fbbf24');

      if (lensType === 'converging') {
        if (isReal) {
          // Refracted ray: (oX, objTopY) -> B'
          ctx.beginPath();
          ctx.moveTo(oX, objTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          drawRayArrow(ctx, (oX + imgX) / 2, (objTopY + imgTopY) / 2, Math.atan2(imgTopY - objTopY, imgX - oX), '#fbbf24');
        } else {
          // Virtual image: Refracted ray goes forward, virtual extension goes back to B'
          const angle = Math.atan2(objTopY - oY, oX - fPrimeX);
          ctx.beginPath();
          ctx.moveTo(oX, objTopY);
          ctx.lineTo(width - 20, objTopY + Math.tan(angle) * (width - 20 - oX));
          ctx.stroke();

          // Dotted virtual extension back to B'
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(oX, objTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      } else {
        // Diverging Lens Ray 1
        const angle = Math.atan2(objTopY - oY, oX - fX);
        ctx.beginPath();
        ctx.moveTo(oX, objTopY);
        ctx.lineTo(width - 20, objTopY + Math.tan(angle) * (width - 20 - oX));
        ctx.stroke();

        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(oX, objTopY);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
        ctx.setLineDash([]);
      }


      // RAY 2: Central Ray (Cyan #00f2fe) - Passes straight through Optical Center O
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 4;

      const centralAngle = Math.atan2(oY - objTopY, oX - objX);
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(oX, oY);
      if (isReal) {
        ctx.lineTo(imgX, imgTopY);
      } else {
        ctx.lineTo(width - 20, oY + Math.tan(centralAngle) * (width - 20 - oX));
      }
      ctx.stroke();
      drawRayArrow(ctx, (objX + oX) / 2, (objTopY + oY) / 2, centralAngle, '#00f2fe');

      if (isVirtual) {
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(oX, oY);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
        ctx.setLineDash([]);
      }


      // RAY 3: Focal Ray (Violet #c084fc) - Passes through F, refracts parallel
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 4;

      if (lensType === 'converging') {
        if (isReal) {
          ctx.beginPath();
          ctx.moveTo(objX, objTopY);
          ctx.lineTo(oX, imgTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          drawRayArrow(ctx, (oX + imgX) / 2, imgTopY, 0, '#c084fc');
        } else {
          ctx.beginPath();
          ctx.moveTo(objX, objTopY);
          ctx.lineTo(oX, imgTopY);
          ctx.lineTo(width - 20, imgTopY);
          ctx.stroke();

          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(oX, imgTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      ctx.shadowBlur = 0; // reset glow
    }


    // --- 7. TITLE HUD BANNER ---
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'extrabold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `GEOMETRIC OPTICS: THIN LENS FORMULA (1/f = 1/d + 1/d')`
        : `QUANG HÌNH HỌC: THẦU KÍNH MỎNG (1/f = 1/d + 1/d')`,
      width * 0.5,
      28
    );

  }, [lensType, f, d, h, dPrime, k, isVirtual, isReal]);

  const drawArrowHead = (ctx, x, y, angle, color = '#00f2fe') => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8 * Math.cos(angle - Math.PI / 6), y - 8 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - 8 * Math.cos(angle + Math.PI / 6), y - 8 * Math.sin(angle + Math.PI / 6));
    ctx.fill();
  };

  const drawRayArrow = (ctx, x, y, angle, color = '#fbbf24') => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + 6 * Math.cos(angle), y + 6 * Math.sin(angle));
    ctx.lineTo(x - 6 * Math.cos(angle - Math.PI / 6), y - 6 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - 6 * Math.cos(angle + Math.PI / 6), y - 6 * Math.sin(angle + Math.PI / 6));
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => onParamChange('lensType', 'converging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lensType === 'converging'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isEn ? 'Convex (Converging)' : 'Hội Tụ'}
            </button>
            <button
              onClick={() => onParamChange('lensType', 'diverging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lensType === 'diverging'
                  ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isEn ? 'Concave (Diverging)' : 'Phân Kỳ'}
            </button>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Focus className="w-4 h-4" /> {isEn ? 'Optical Parameters' : 'Tham số Quang học'}
          </h3>

          {/* Focal Length f */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Focal Length |f|:' : 'Tiêu cự |f|:'}</span>
              <span className="text-cyan-400 font-bold">{Math.abs(f)} cm</span>
            </div>
            <input
              type="range" min="10" max="40" step="1"
              value={Math.abs(f)}
              onChange={(e) => onParamChange('focalLength', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Object Distance d */}
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
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4" /> {isEn ? 'IMAGE POSITION & NATURE' : 'Kết quả Vị trí & Tính chất Ảnh'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Image Dist d\':' : 'Khoảng cách ảnh d\':'}</span>
              <span className="text-cyan-400 font-bold text-sm">{d !== Math.abs(f) ? `${dPrime.toFixed(1)} cm` : '∞'}</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Magnification k:' : 'Độ phóng đại k:'}</span>
              <span className="text-amber-400 font-bold text-sm">{d !== Math.abs(f) ? `${k.toFixed(2)} x` : '∞'}</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Image Nature:' : 'Tính chất Ảnh:'}</span>
                <span className="text-slate-400 text-[10px]">1/f = 1/d + 1/d'</span>
              </div>
              <span className={`font-extrabold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 ${isVirtual ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isVirtual ? (isEn ? 'VIRTUAL IMAGE' : 'ẢNH ẢO') : (isEn ? 'REAL IMAGE' : 'ẢNH THẬT')}
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
