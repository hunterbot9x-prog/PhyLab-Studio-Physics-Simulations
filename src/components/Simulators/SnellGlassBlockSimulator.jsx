import React, { useEffect, useRef } from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export default function SnellGlassBlockSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const incidentDeg = params.incidentDeg !== undefined ? params.incidentDeg : 40; // Incident angle in degrees (0 to 80 deg)
  const glassN = params.glassN || 1.50; // Glass refractive index n

  // Snell's Law calculations: n1 * sin(i) = n2 * sin(r)
  const incidentRad = (incidentDeg * Math.PI) / 180;
  const sinR = Math.sin(incidentRad) / glassN;
  const refractRad = Math.asin(sinR);
  const refractDeg = (refractRad * 180) / Math.PI;

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

    const glassX = 120;
    const glassY = height * 0.35;
    const glassW = 300;
    const glassH = 140;

    // 1. Draw Rectangular Glass Block (Khối Thủy tinh n)
    ctx.fillStyle = 'rgba(0, 242, 254, 0.12)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(glassX, glassY, glassW, glassH, 4);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(isEn ? `Glass Block (n = ${glassN})` : `Khối Thủy tinh (n = ${glassN})`, glassX + glassW / 2, glassY + glassH / 2);

    // Normal line N1
    const entryX = glassX + glassW / 2;
    const entryY = glassY;

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(entryX, entryY - 60);
    ctx.lineTo(entryX, entryY + glassH + 60);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Incident Ray (Air to Glass)
    const rayLen = 140;
    const inX = entryX - rayLen * Math.sin(incidentRad);
    const inY = entryY - rayLen * Math.cos(incidentRad);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(inX, inY);
    ctx.lineTo(entryX, entryY);
    ctx.stroke();

    // 3. Refracted Ray inside Glass
    const exitX = entryX + glassH * Math.tan(refractRad);
    const exitY = glassY + glassH;

    ctx.strokeStyle = '#00f2fe';
    ctx.shadowColor = '#00f2fe';
    ctx.beginPath();
    ctx.moveTo(entryX, entryY);
    ctx.lineTo(exitX, exitY);
    ctx.stroke();

    // 4. Emergent Ray (Glass back to Air)
    const outX = exitX + rayLen * Math.sin(incidentRad);
    const outY = exitY + rayLen * Math.cos(incidentRad);

    ctx.strokeStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(exitX, exitY);
    ctx.lineTo(outX, outY);
    ctx.stroke();
    ctx.shadowBlur = 0;

  }, [incidentDeg, glassN, incidentRad, refractRad, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      incidentDeg: `${incidentDeg}°`,
      glassN,
      refractDeg: `${refractDeg.toFixed(1)}°`,
      sinI: Math.sin(incidentRad).toFixed(3),
      sinR: sinR.toFixed(3),
      snellCheck: (Math.sin(incidentRad) / sinR).toFixed(2)
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
            <Sun className="w-4 h-4" /> {isEn ? "Snell's Law Controls" : 'Cambridge IGCSE Refraction'}
          </h3>

          {/* Incident Angle Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Incident Angle i:' : 'Góc tới i:'}</span>
              <span className="text-cyan-400 font-bold">{incidentDeg}°</span>
            </div>
            <input
              type="range" min="0" max="80" step="1"
              value={incidentDeg}
              onChange={(e) => onParamChange('incidentDeg', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          {/* Glass Refractive Index n */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Glass Refractive Index n:' : 'Chiết suất thủy tinh n:'}</span>
              <span className="text-amber-400 font-bold">{glassN}</span>
            </div>
            <input
              type="range" min="1.30" max="1.80" step="0.02"
              value={glassN}
              onChange={(e) => onParamChange('glassN', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> {isEn ? "SNELL'S LAW VERIFICATION" : 'Kiểm chứng Định luật Snell'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">sin(i):</span>
              <span className="text-cyan-400 font-bold text-sm">{Math.sin(incidentRad).toFixed(3)}</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">sin(r):</span>
              <span className="text-amber-400 font-bold text-sm">{sinR.toFixed(3)}</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Refractive Index n:' : 'Chiết suất n:'}</span>
                <span className="text-slate-400 text-[10px]">n = sin(i) / sin(r)</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{glassN}</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Refraction Data' : 'Ghi Bảng Số liệu Khúc xạ'}
          </button>
        </div>
      </div>
    </div>
  );
}
