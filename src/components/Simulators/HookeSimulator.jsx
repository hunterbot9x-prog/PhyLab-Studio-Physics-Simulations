import React, { useEffect, useRef } from 'react';
import { Scale, RotateCcw, Plus, Trash2 } from 'lucide-react';

export default function HookeSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const k = params.springConstant || 50; // N/m
  const massGrams = params.massGrams || 200; // grams
  const g = 9.81; // m/s2

  // Force F = m * g (N)
  const force = (massGrams / 1000) * g;
  // Extension x = F / k (m) -> cm
  const extensionCm = (force / k) * 100;
  const elasticEnergyJ = 0.5 * k * Math.pow(extensionCm / 100, 2);

  useEffect(() => {
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

    // Grid Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    const standX = width * 0.40;
    const topY = 40;
    const startY = topY + 9;
    const unextendedLenPx = 90;
    const scalePxPerCm = 6;
    const extensionPx = extensionCm * scalePxPerCm;

    // Ruler Zero-mark reference line Y (L0)
    const rulerX = standX + 95;
    const zeroY = startY + unextendedLenPx; // Exactly lines up at 0 cm mark

    // Current Bottom Y of spring & top hook of mass
    const springBottomY = zeroY + extensionPx; // 100% perfectly horizontal with ruler pointer!

    // 1. Draw Support Stand Frame
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(standX - 110, 25);
    ctx.lineTo(standX, 25);
    ctx.lineTo(standX, topY);
    ctx.stroke();

    // Support Hook ring
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(standX, topY + 4, 5, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Draw Coil Spring (Zig-zag Spring)
    const numCoils = 14;
    const coilWidth = 24;
    const endY = springBottomY;
    const coilStepY = (endY - startY) / numCoils;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(standX, startY);
    for (let i = 0; i <= numCoils; i++) {
      const y = startY + i * coilStepY;
      const xOffset = (i === 0 || i === numCoils) ? 0 : (i % 2 === 0 ? coilWidth / 2 : -coilWidth / 2);
      ctx.lineTo(standX + xOffset, y);
    }
    ctx.stroke();

    // Bottom Hook
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(standX, springBottomY + 4, 4, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Draw Hanging Mass Weight (Brass Weight)
    const weightW = 46;
    const weightH = 36 + (massGrams / 800) * 18;
    const weightX = standX - weightW / 2;
    const weightY = springBottomY + 8;

    // Weight Body Gradient (Brass Metal Look)
    const brassGrad = ctx.createLinearGradient(weightX, weightY, weightX + weightW, weightY);
    brassGrad.addColorStop(0, '#d97706');
    brassGrad.addColorStop(0.5, '#fef08a');
    brassGrad.addColorStop(1, '#b45309');

    ctx.fillStyle = brassGrad;
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(weightX, weightY, weightW, weightH, 6);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Mass Label text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${massGrams}g`, standX, weightY + weightH / 2 + 4);

    // 4. Draw Parallel Graduated Ruler (Thước đo độ giãn)
    const rulerTopY = startY - 20;
    const rulerH = 340;

    // Ruler Body
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.fillRect(rulerX, rulerTopY, 48, rulerH);
    ctx.strokeRect(rulerX, rulerTopY, 48, rulerH);

    // Zero-mark line at natural length (L0)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rulerX - 15, zeroY);
    ctx.lineTo(rulerX + 48, zeroY);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('0 cm (L₀)', rulerX + 5, zeroY - 4);

    // Graduation Marks
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px Inter';
    for (let cm = 0; cm <= 45; cm += 1) {
      const markY = zeroY + cm * scalePxPerCm;
      if (markY <= rulerTopY + rulerH - 8) {
        const isMajor = cm % 5 === 0;
        ctx.strokeStyle = isMajor ? '#00f2fe' : '#475569';
        ctx.lineWidth = isMajor ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(rulerX, markY);
        ctx.lineTo(rulerX + (isMajor ? 16 : 8), markY);
        ctx.stroke();

        if (cm % 10 === 0 && cm > 0) {
          ctx.fillText(`${cm}`, rulerX + 20, markY + 3);
        }
      }
    }

    // Current Position Horizontal Pointer Line (Cyan) - 100% PERFECTLY HORIZONTAL
    const currentY = springBottomY;
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(standX + weightW / 2 + 4, currentY);
    ctx.lineTo(rulerX + 48, currentY);
    ctx.stroke();

    // Pointer Arrow Head pointing to ruler
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(rulerX, currentY);
    ctx.lineTo(rulerX - 8, currentY - 5);
    ctx.lineTo(rulerX - 8, currentY + 5);
    ctx.closePath();
    ctx.fill();

    // Glowing extension label above pointer line
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`Δx = ${extensionCm.toFixed(1)} cm`, rulerX - 12, currentY - 6);

    // 5. Force Vectors
    const arrowX = standX - 45;
    const arrowCenterY = weightY + weightH / 2;

    // Gravity Force P = m*g (Red Arrow Down)
    const fLen = Math.min(65, force * 15);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowCenterY);
    ctx.lineTo(arrowX, arrowCenterY + fLen);
    ctx.stroke();

    // Arrowhead Down
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowCenterY + fLen + 6);
    ctx.lineTo(arrowX - 5, arrowCenterY + fLen - 4);
    ctx.lineTo(arrowX + 5, arrowCenterY + fLen - 4);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 11px Inter';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.fillText('P = m·g', arrowX - 25, arrowCenterY + fLen / 2);

    // Restoring Elastic Force F_đh = k*x (Cyan Arrow Up)
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowCenterY);
    ctx.lineTo(arrowX, arrowCenterY - fLen);
    ctx.stroke();

    // Arrowhead Up
    ctx.fillStyle = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowCenterY - fLen - 6);
    ctx.lineTo(arrowX - 5, arrowCenterY - fLen + 4);
    ctx.lineTo(arrowX + 5, arrowCenterY - fLen + 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillText('F_đh = k·x', arrowX - 30, arrowCenterY - fLen / 2);
    ctx.shadowBlur = 0;

    // HUD Title at top
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? `HOOKE'S LAW: F = k·x = ${force.toFixed(2)} N` : `ĐỊNH LUẬT HOOKE: F = k·x = ${force.toFixed(2)} N`, width * 0.5, 25);

  }, [k, massGrams, force, extensionCm, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      springConstant: `${k} N/m`,
      massGrams: `${massGrams} g`,
      forceN: `${force.toFixed(2)} N`,
      extensionCm: `${extensionCm.toFixed(1)} cm`,
      elasticEnergyJ: `${elasticEnergyJ.toFixed(3)} J`
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
            <Scale className="w-4 h-4" /> {isEn ? "Hooke's Law Controls" : 'Cambridge IGCSE Practical'}
          </h3>

          {/* Spring Constant Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Spring Constant k:' : 'Độ cứng lò xo k:'}</span>
              <span className="text-cyan-400 font-bold">{k} N/m</span>
            </div>
            <input
              type="range" min="10" max="150" step="5"
              value={k}
              onChange={(e) => onParamChange('springConstant', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Mass Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Hanging Mass m:' : 'Khối lượng quả cân m:'}</span>
              <span className="text-amber-400 font-bold">{massGrams} g</span>
            </div>
            <input
              type="range" min="50" max="800" step="25"
              value={massGrams}
              onChange={(e) => onParamChange('massGrams', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'RESULTS' : 'KẾT QUẢ ĐỊNH LUẬT HOOKE'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Force F = mg:' : 'Trọng lực kéo F = mg:'}</span>
              <span className="text-rose-400 font-bold text-sm">{force.toFixed(2)} N</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Stretch x = F/k:' : 'Độ giãn x = F / k:'}</span>
              <span className="text-cyan-400 font-bold text-sm">{extensionCm.toFixed(1)} cm</span>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center text-xs">
            <div>
              <span className="text-cyan-300 font-semibold block">{isEn ? 'Elastic Potential Energy:' : 'Thế năng đàn hồi E_p:'}</span>
              <span className="text-slate-400 text-[10px]">E_p = 1/2 k x²</span>
            </div>
            <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {elasticEnergyJ.toFixed(3)} J
            </span>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> {isEn ? 'Record Measurement' : 'Ghi vào Bảng Số liệu'}
          </button>
        </div>
      </div>
    </div>
  );
}
