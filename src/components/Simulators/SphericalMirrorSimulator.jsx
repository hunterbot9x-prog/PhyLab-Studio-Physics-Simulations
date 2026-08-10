import React, { useEffect, useRef } from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export default function SphericalMirrorSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const mirrorType = params.mirrorType || 'concave'; // 'concave' (gương cầu lõm) | 'convex' (gương cầu lồi)
  const absFocalCm = params.absFocalCm || 20; // tiêu cự |f| (cm)
  const objectDistCm = params.objectDistCm || 35; // khoảng cách vật d (cm)
  const objectHeightCm = params.objectHeightCm || 5; // chiều cao vật h (cm)

  const f = mirrorType === 'concave' ? absFocalCm : -absFocalCm;
  const d = objectDistCm;
  const h = objectHeightCm;

  // Mirror Equation: 1/f = 1/d + 1/d' => d' = (d * f) / (d - f)
  const dPrime = (d * f) / (d - f);
  const magnification = -dPrime / d;
  const isRealImage = dPrime > 0;
  const isVirtualImage = dPrime < 0;

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

    const mirrorX = 330;
    const axisY = height / 2;
    const scalePx = 3.2; // 1 cm = 3.2 px

    // Helper to draw light propagation direction arrow
    const drawLightArrow = (x1, y1, x2, y2, color) => {
      const dist = Math.hypot(x2 - x1, y2 - y1);
      if (dist < 20) return;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const arrowLen = 7;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx - arrowLen * Math.cos(angle - Math.PI / 6), my - arrowLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(mx - arrowLen * Math.cos(angle + Math.PI / 6), my - arrowLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    };

    // Principal Axis Line
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(20, axisY);
    ctx.lineTo(width - 20, axisY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Focal point F & Center of curvature C
    const fX = mirrorX - f * scalePx;
    const cX = mirrorX - 2 * f * scalePx;

    // ENLARGED SPHERICAL MIRROR ARC (Gương to và dài hơn để bao trùm 100% tia sáng)
    const R_px = Math.max(160, Math.abs(f) * 2.8 * scalePx);
    const arcAngle = 0.72; // Góc mở rộng rộng hơn

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4.5;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.beginPath();

    if (mirrorType === 'concave') {
      ctx.arc(mirrorX + R_px, axisY, R_px, Math.PI - arcAngle, Math.PI + arcAngle, false);
    } else {
      ctx.arc(mirrorX - R_px, axisY, R_px, -arcAngle, arcAngle, false);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pole O
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.fillText('O', mirrorX - 12, axisY + 16);

    // Point F
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(fX, axisY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.fillText('F', fX - 4, axisY + 16);

    // Point C
    ctx.fillStyle = '#a855f7';
    ctx.beginPath(); ctx.arc(cX, axisY, 4, 0, 2 * Math.PI); ctx.fill();
    ctx.fillText('C', cX - 4, axisY + 16);

    // Object height scaled nicely to fit inside enlarged mirror arc
    const hScaledPx = h * scalePx * 2.5;
    const objX = mirrorX - d * scalePx;
    const objY = axisY - hScaledPx;

    // Image coordinates
    const imgX = mirrorX - dPrime * scalePx;
    const imgY = axisY - magnification * hScaledPx;

    // ----------------------------------------------------
    // ACCURATE MIRROR ARC INTERSECTION GEOMETRY
    // ----------------------------------------------------

    // Calculate EXACT hit point P1(p1X, p1Y) on the enlarged mirror arc at height y = objY
    const dyArc = Math.min(Math.abs(objY - axisY), R_px - 1);
    const sagitta = R_px - Math.sqrt(R_px * R_px - dyArc * dyArc);
    const p1X = mirrorType === 'concave' ? (mirrorX - sagitta) : (mirrorX - sagitta);
    const p1Y = objY;

    // 1. Ray 1 (Yellow #f59e0b): Incident Parallel to Axis from A -> Mirror Arc P1(p1X, p1Y)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 6;

    // Incident Ray 1: Stops EXACTLY at curved mirror arc P1(p1X, p1Y)
    ctx.beginPath();
    ctx.moveTo(objX, objY);
    ctx.lineTo(p1X, p1Y);
    ctx.stroke();
    drawLightArrow(objX, objY, p1X, p1Y, '#f59e0b');

    if (mirrorType === 'concave') {
      if (isRealImage) {
        // Real Image (d > f): Reflected Ray 1 passes from P1 through F and imgA'(imgX, imgY)
        const endX = 20;
        const endY = p1Y + (imgY - p1Y) * (20 - p1X) / (imgX - p1X);
        ctx.beginPath();
        ctx.moveTo(p1X, p1Y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        drawLightArrow(p1X, p1Y, endX, endY, '#f59e0b');
      } else {
        // Virtual Image (d < f): Reflected Ray 1 passes from P1 through F into space in front
        const slope1 = (axisY - p1Y) / (fX - p1X);
        const endX = 20;
        const endY = p1Y + slope1 * (20 - p1X);
        ctx.beginPath();
        ctx.moveTo(p1X, p1Y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        drawLightArrow(p1X, p1Y, endX, endY, '#f59e0b');

        // Virtual extension behind mirror passes through imgA'
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p1X, p1Y);
        ctx.lineTo(imgX, imgY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    } else {
      // Convex Mirror (f < 0): Virtual F is behind mirror.
      // Virtual extension (Dashed) connects P1(p1X, p1Y) on arc to virtual F(fX, axisY) passing through imgA'
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(p1X, p1Y);
      ctx.lineTo(fX, axisY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Reflected Ray 1 (Solid) diverges in front of mirror starting EXACTLY at P1(p1X, p1Y)
      const slope1 = (p1Y - axisY) / (p1X - fX);
      const endX = 20;
      const endY = p1Y + slope1 * (20 - p1X);
      ctx.beginPath();
      ctx.moveTo(p1X, p1Y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      drawLightArrow(p1X, p1Y, endX, endY, '#f59e0b');
    }

    // 2. Ray 2 (Cyan #00f2fe): Incident from A -> Pole O(mirrorX, axisY) on mirror surface
    ctx.strokeStyle = '#00f2fe';
    ctx.shadowColor = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(objX, objY);
    ctx.lineTo(mirrorX, axisY);
    ctx.stroke();
    drawLightArrow(objX, objY, mirrorX, axisY, '#00f2fe');

    const dyObj = axisY - objY;
    const dxObj = mirrorX - objX;

    if (isRealImage) {
      // Reflected Ray 2 passes below axis directly through imgA'(imgX, imgY)
      const endX = 20;
      const endY = axisY + (axisY - imgY) * (20 - mirrorX) / (imgX - mirrorX);
      ctx.beginPath();
      ctx.moveTo(mirrorX, axisY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      drawLightArrow(mirrorX, axisY, endX, endY, '#00f2fe');
    } else {
      // Reflected Ray 2 in front of mirror
      const endX = 20;
      const endY = axisY + (dyObj / dxObj) * (mirrorX - 20);
      ctx.beginPath();
      ctx.moveTo(mirrorX, axisY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      drawLightArrow(mirrorX, axisY, endX, endY, '#00f2fe');

      // Virtual extension behind mirror passes through imgA'
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mirrorX, axisY);
      ctx.lineTo(imgX, imgY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.shadowBlur = 0;

    // ----------------------------------------------------
    // DRAW OBJECT & IMAGE ON TOP OF RAYS FOR CLEAN Z-INDEX
    // ----------------------------------------------------

    // Draw Object Arrow AB (Always Upright in front of mirror)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(objX, axisY);
    ctx.lineTo(objX, objY);
    ctx.stroke();

    // Arrowhead for Object AB (Pointing UPWARDS)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(objX, objY);
    ctx.lineTo(objX - 5, objY + 8);
    ctx.lineTo(objX + 5, objY + 8);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 12px Inter';
    ctx.fillText('A', objX - 12, objY);
    ctx.fillText('B', objX - 12, axisY + 16);

    // Draw Image Arrow A'B' (if valid & within bounds)
    if (isFinite(dPrime) && Math.abs(dPrime) < 250) {
      ctx.strokeStyle = isRealImage ? '#10b981' : '#ec4899';
      ctx.lineWidth = 3.5;
      if (isVirtualImage) ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(imgX, axisY);
      ctx.lineTo(imgX, imgY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead for Image A'B'
      ctx.fillStyle = isRealImage ? '#10b981' : '#ec4899';
      ctx.beginPath();
      const dir = imgY > axisY ? 1 : -1; // 1 = down, -1 = up
      ctx.moveTo(imgX, imgY);
      ctx.lineTo(imgX - 5, imgY - dir * 8);
      ctx.lineTo(imgX + 5, imgY - dir * 8);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px Inter';
      ctx.fillText("A'", imgX + 8, imgY + (dir * 4));
      ctx.fillText("B'", imgX + 8, axisY + 16);
    }

    // Title HUD
    ctx.fillStyle = isVirtualImage ? '#ec4899' : '#10b981';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(
      isEn
        ? `${mirrorType === 'concave' ? 'CONCAVE MIRROR' : 'CONVEX MIRROR'}: ${isVirtualImage ? 'VIRTUAL IMAGE (Ảnh Ảo)' : 'REAL IMAGE (Ảnh Thật)'} (d' = ${dPrime.toFixed(1)} cm)`
        : `${mirrorType === 'concave' ? 'GƯƠNG CẦU LÕM' : 'GƯƠNG CẦU LỒI'}: ${isVirtualImage ? 'ẢNH ẢO (Cùng chiều)' : 'ẢNH THẬT (Ngược chiều)'} (d' = ${dPrime.toFixed(1)} cm)`,
      width * 0.5,
      30
    );

  }, [mirrorType, absFocalCm, objectDistCm, objectHeightCm, f, d, h, dPrime, magnification, isRealImage, isVirtualImage, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      mirrorType: mirrorType === 'concave' ? (isEn ? 'Concave Mirror' : 'Gương cầu lõm') : (isEn ? 'Convex Mirror' : 'Gương cầu lồi'),
      focalLengthCm: `${f} cm`,
      objectDistCm: `${d} cm`,
      imageDistCm: `${dPrime.toFixed(1)} cm`,
      magnification: `${magnification.toFixed(2)}x`,
      imageNature: isVirtualImage ? (isEn ? 'Virtual & Upright' : 'Ảnh ảo, cùng chiều') : (isEn ? 'Real & Inverted' : 'Ảnh thật, ngược chiều')
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
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 inline-block"></span> {isEn ? 'Ray 1: Parallel to Axis' : 'Tia 1: Song song trục chính'}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-cyan-400 inline-block"></span> {isEn ? 'Ray 2: Through Pole O' : 'Tia 2: Chiếu tới đỉnh O'}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-pink-500 border-dashed border-b inline-block"></span> {isEn ? 'Virtual Ray Extension' : 'Đường kéo dài (Ảnh ảo)'}</span>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Sun className="w-4 h-4" /> {isEn ? 'Spherical Mirror Controls' : 'Khảo sát Gương Cầu Lồi & Lõm'}
          </h3>

          {/* Mirror Type Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Mirror Type:' : 'Loại Gương cầu:'}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onParamChange('mirrorType', 'concave')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  mirrorType === 'concave'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Concave (f > 0)' : 'Lõm (f > 0)'}
              </button>
              <button
                onClick={() => onParamChange('mirrorType', 'convex')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  mirrorType === 'convex'
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isEn ? 'Convex (f < 0)' : 'Lồi (f < 0)'}
              </button>
            </div>
          </div>

          {/* Focal Length Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Focal Length |f|:' : 'Tiêu cự |f|:'}</span>
              <span className="text-amber-400 font-bold">{absFocalCm} cm</span>
            </div>
            <input
              type="range" min="10" max="40" step="2"
              value={absFocalCm}
              onChange={(e) => onParamChange('absFocalCm', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Object Distance Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Object Distance d:' : 'Khoảng cách vật d:'}</span>
              <span className="text-cyan-400 font-bold">{objectDistCm} cm</span>
            </div>
            <input
              type="range" min="5" max="75" step="1"
              value={objectDistCm}
              onChange={(e) => onParamChange('objectDistCm', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? 'IMAGE POSITION & NATURE' : 'Vị trí & Tính chất Ảnh'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Image Distance d\':' : 'Khoảng cách ảnh d\':'}</span>
              <span className="text-cyan-400 font-bold text-sm">{dPrime.toFixed(1)} cm</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Magnification k:' : 'Độ phóng đại k:'}</span>
              <span className="text-amber-400 font-bold text-sm">{magnification.toFixed(2)}x</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Image Nature:' : 'Tính chất ảnh:'}</span>
                <span className="text-slate-400 text-[10px]">1/f = 1/d + 1/d'</span>
              </div>
              <span className={`font-extrabold text-xs px-2.5 py-1 rounded-full ${
                isVirtualImage ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {isVirtualImage ? (isEn ? 'VIRTUAL IMAGE (ẢNH ẢO)' : 'ẢNH ẢO (Cùng chiều)') : (isEn ? 'REAL IMAGE (ẢNH THẬT)' : 'ẢNH THẬT (Ngược chiều)')}
              </span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Spherical Mirror Data' : 'Ghi Bảng Số liệu Gương Cầu'}
          </button>
        </div>
      </div>
    </div>
  );
}
