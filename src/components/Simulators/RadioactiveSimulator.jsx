import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, RotateCcw, Pause, Sparkles, ShieldAlert, Radio } from 'lucide-react';

export default function RadioactiveSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [decayHistory, setDecayHistory] = useState([]);

  const selectedIsotopeId = params.isotopeId || 'c14';
  const halfLifeSec = params.halfLifeSec || 10; // seconds for simulation
  const initialNucleiCount = 400; // Total starting nuclei

  const isotopePresets = [
    { id: 'c14', name: 'Carbon-14 (¹⁴C)', decayType: 'Beta (β⁻)', color: '#00f2fe', realT: '5730 năm' },
    { id: 'rn222', name: 'Radon-222 (²²²Rn)', decayType: 'Alpha (α)', color: '#fbbf24', realT: '3.82 ngày' },
    { id: 'co60', name: 'Cobalt-60 (⁶⁰Co)', decayType: 'Gamma (γ)', color: '#c084fc', realT: '5.27 năm' },
    { id: 'u238', name: 'Uranium-238 (²³⁸U)', decayType: 'Alpha (α)', color: '#f43f5e', realT: '4.5 tỷ năm' }
  ];

  const activeIsotope = isotopePresets.find(i => i.id === selectedIsotopeId) || isotopePresets[0];

  const decayConstant = Math.LN2 / halfLifeSec; // lambda = ln(2) / T_1/2
  const remainingFraction = Math.exp(-decayConstant * elapsedTime);
  const currentNucleiCount = Math.round(initialNucleiCount * remainingFraction);
  const decayedNucleiCount = initialNucleiCount - currentNucleiCount;
  const currentActivityBq = Math.round(decayConstant * currentNucleiCount * 10); // Activity A(t) = lambda * N(t)

  // Track decay timestamps for individual nuclei (400 items)
  const nucleiDecayTimesRef = useRef([]);
  const particleEffectsRef = useRef([]);

  // Initialize decay times for each nucleus probabilistically
  const initializeNuclei = () => {
    const times = [];
    for (let i = 0; i < initialNucleiCount; i++) {
      // Exponential distribution t = -ln(U) / lambda
      const u = Math.random();
      const tDecay = -Math.log(Math.max(1e-5, u)) / decayConstant;
      times.push(tDecay);
    }
    nucleiDecayTimesRef.current = times;
    particleEffectsRef.current = [];
  };

  useEffect(() => {
    initializeNuclei();
    setElapsedTime(0);
    setDecayHistory([{ t: 0, count: initialNucleiCount }]);
  }, [halfLifeSec, selectedIsotopeId]);

  // Animation Loop
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const dt = 0.05;
      animId = requestAnimationFrame(function step() {
        setElapsedTime(prev => {
          const next = prev + dt;
          if (next >= halfLifeSec * 3.5) {
            setIsPlaying(false);
            return halfLifeSec * 3.5;
          }

          // Count remaining undecayed nuclei at time `next`
          const undecayed = nucleiDecayTimesRef.current.filter(t => t > next).length;

          // Spawn emitted radiation particle burst for newly decayed nuclei
          nucleiDecayTimesRef.current.forEach((tDecay, idx) => {
            if (tDecay >= prev && tDecay < next) {
              const col = idx % 20;
              const row = Math.floor(idx / 20);
              const originX = 35 + col * 12 + 6;
              const originY = 65 + row * 12 + 6;

              const angle = Math.random() * Math.PI * 2;
              particleEffectsRef.current.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * (2 + Math.random() * 3),
                vy: Math.sin(angle) * (2 + Math.random() * 3),
                life: 1.0,
                color: activeIsotope.color
              });
            }
          });

          setDecayHistory(hist => [...hist, { t: next, count: undecayed }]);
          return next;
        });

        if (isPlaying) {
          animId = requestAnimationFrame(step);
        }
      });
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, halfLifeSec, activeIsotope]);

  const handleStart = () => {
    if (elapsedTime >= halfLifeSec * 3.5) {
      setElapsedTime(0);
      setDecayHistory([{ t: 0, count: initialNucleiCount }]);
      initializeNuclei();
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    setDecayHistory([{ t: 0, count: initialNucleiCount }]);
    initializeNuclei();
  };

  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    let animId;

    const render = () => {
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

      // Grid
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
          ? `RADIOACTIVE DECAY N(t) = N₀ · e⁻λt | ISOTOPE: ${activeIsotope.name}`
          : `MÔ PHỎNG PHÂN RÃ PHÓNG XẠ N(t) = N₀ · e⁻λt | ĐỒNG VỊ: ${activeIsotope.name}`,
        25,
        28
      );


      // --- SECTION 1: NUCLEI MATRIX SAMPLE (Left side, x: 25 to 270) ---
      const matrixX = 25;
      const matrixY = 55;
      const cols = 20;
      const cellSize = 10;
      const cellGap = 2;

      // Sample Container Casing
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(matrixX - 8, matrixY - 8, 20 * (cellSize + cellGap) + 12, 20 * (cellSize + cellGap) + 12, 8);
      ctx.fill();
      ctx.stroke();

      // Render 400 Nuclei Dots
      for (let i = 0; i < initialNucleiCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const nx = matrixX + col * (cellSize + cellGap);
        const ny = matrixY + row * (cellSize + cellGap);

        const decayTime = nucleiDecayTimesRef.current[i] || 0;
        const isUndecayed = decayTime > elapsedTime;

        if (isUndecayed) {
          // Parent Nuclei (Glowing Red)
          ctx.fillStyle = '#f43f5e';
          ctx.strokeStyle = '#fda4af';
          ctx.lineWidth = 1;
        } else {
          // Daughter Nuclei (Stable Cyan/Grey)
          ctx.fillStyle = '#334155';
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.arc(nx + cellSize / 2, ny + cellSize / 2, cellSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }


      // --- SECTION 2: EMITTED RADIATION PARTICLES (α, β, γ rays) ---
      for (let pIdx = particleEffectsRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particleEffectsRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;

        if (p.life <= 0) {
          particleEffectsRef.current.splice(pIdx, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }


      // --- SECTION 3: GEIGER-MÜLLER COUNTER & ACTIVITY METER (Below Sample) ---
      const gmY = matrixY + 20 * (cellSize + cellGap) + 20;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(matrixX - 8, gmY, 245, 55, 8);
      ctx.fill();
      ctx.stroke();

      // GM Detector Probe
      ctx.fillStyle = isPlaying ? '#10b981' : '#64748b';
      ctx.beginPath();
      ctx.arc(matrixX + 15, gmY + 27, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('GM', matrixX + 15, gmY + 30);

      // Digital Activity A(t) Display
      ctx.fillStyle = '#10b981';
      ctx.font = 'extrabold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(
        isEn ? `ACTIVITY A(t) = ${currentActivityBq} Bq` : `ĐỘ PHÓNG XẠ A(t) = ${currentActivityBq} Bq`,
        matrixX + 35,
        gmY + 24
      );

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(
        isEn ? `Decay Ray: ${activeIsotope.decayType} | λ = ${decayConstant.toFixed(3)}s⁻¹` : `Tia phát xạ: ${activeIsotope.decayType} | λ = ${decayConstant.toFixed(3)}s⁻¹`,
        matrixX + 35,
        gmY + 42
      );


      // --- SECTION 4: REALTIME EXPONENTIAL DECAY GRAPH (Right side, x: 290 to 510) ---
      const gx = 290;
      const gy = 55;
      const gw = 220;
      const gh = 260;

      // Graph Panel Container
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(gx, gy, gw, gh, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'DECAY CURVE N(t) = N₀ · e⁻λt' : 'ĐỒ THỊ HÀM MŨ N(t) = N₀ · e⁻λt', gx + gw / 2, gy + 16);

      // Axes
      const originX = gx + 30;
      const originY = gy + gh - 30;
      const axisW = gw - 40;
      const axisH = gh - 50;

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
      ctx.fillText('N(hạt)', originX - 10, gy + 30);
      ctx.fillText('t(s)', originX + axisW - 5, originY + 16);

      // Theoretical Exponential Curve N(t)
      const maxT = halfLifeSec * 3.5;

      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let px = 0; px <= axisW; px += 2) {
        const tVal = (px / axisW) * maxT;
        const nVal = initialNucleiCount * Math.exp(-decayConstant * tVal);
        const py = originY - (nVal / initialNucleiCount) * axisH;
        if (px === 0) ctx.moveTo(originX + px, py);
        else ctx.lineTo(originX + px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Half Life Reference Lines (T_1/2, 2*T_1/2, 3*T_1/2)
      [1, 2, 3].forEach(k => {
        const tK = k * halfLifeSec;
        if (tK <= maxT) {
          const kx = originX + (tK / maxT) * axisW;
          const ky = originY - (Math.pow(0.5, k)) * axisH;

          ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(kx, originY);
          ctx.lineTo(kx, ky);
          ctx.lineTo(originX, ky);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 8px Inter';
          ctx.fillText(`${k}T`, kx, originY + 12);
        }
      });

      // Live Plot Points from decayHistory
      if (decayHistory.length > 1) {
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        decayHistory.forEach((pt, idx) => {
          const px = originX + (pt.t / maxT) * axisW;
          const py = originY - (pt.count / initialNucleiCount) * axisH;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // Current Operating Point Dot
        const curPx = originX + (elapsedTime / maxT) * axisW;
        const curPy = originY - (currentNucleiCount / initialNucleiCount) * axisH;

        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curPx, curPy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [currentNucleiCount, initialNucleiCount, elapsedTime, halfLifeSec, decayConstant, currentActivityBq, activeIsotope, decayHistory, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      isotope: activeIsotope.name,
      halfLifeSec: `${halfLifeSec} s`,
      elapsedTime: `${elapsedTime.toFixed(1)} s`,
      currentNucleiCount,
      decayedNucleiCount,
      activityBq: `${currentActivityBq} Bq`,
      decayConstant: `${decayConstant.toFixed(3)} s⁻¹`
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

        {/* Playback Controls */}
        <div className="w-full max-w-[540px] mt-4 flex items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="flex gap-2">
            {!isPlaying ? (
              <button
                onClick={handleStart}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" /> {isEn ? 'START DECAY' : 'BẮT ĐẦU PHÂN RÃ'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Pause className="w-4 h-4 fill-slate-950" /> {isEn ? 'PAUSE' : 'TẠM DỪNG'}
              </button>
            )}

            <button
              onClick={handleReset}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> {isEn ? 'Reset' : 'Đặt lại'}
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {isEn ? 'Elapsed Time t:' : 'Thời gian t:'} <span className="text-cyan-400 font-bold">{elapsedTime.toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400" /> {isEn ? 'Isotope & Decay Controls' : 'Mẫu Đồng Vị & Bán Rã'}
          </h3>

          {/* Isotope Selection Buttons */}
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isEn ? 'Select Isotope:' : 'Chọn Đồng vị Phóng xạ:'}</span>
            <div className="grid grid-cols-2 gap-1.5">
              {isotopePresets.map((iso) => (
                <button
                  key={iso.id}
                  onClick={() => onParamChange('isotopeId', iso.id)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all text-left truncate ${
                    selectedIsotopeId === iso.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {iso.name}
                </button>
              ))}
            </div>
          </div>

          {/* Half Life T1/2 Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Simulated T₁/₂:' : 'Chu kỳ bán rã T₁/₂:'}</span>
              <span className="text-amber-400 font-bold">{halfLifeSec} {isEn ? 'sec' : 'giây'}</span>
            </div>
            <input
              type="range" min="3" max="30" step="1"
              value={halfLifeSec}
              onChange={(e) => onParamChange('halfLifeSec', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
            📊 {isEn ? 'MEASURED ACTIVITY & NUCLEI' : 'Độ Phóng Xạ & Số Hạt Nhân'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Parent Undecayed N(t):' : 'Hạt mẹ N(t):'}</span>
              <span className="text-rose-400 font-bold text-sm">{currentNucleiCount} / 400</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Activity A(t):' : 'Độ phóng xạ A(t):'}</span>
              <span className="text-emerald-400 font-bold text-sm">{currentActivityBq} Bq</span>
            </div>

            <div className="col-span-2 bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 font-semibold block text-xs">{isEn ? 'Decay Constant λ:' : 'Hằng số phân rã λ:'}</span>
                <span className="text-slate-400 text-[10px]">λ = ln(2) / T₁/₂</span>
              </div>
              <span className="text-cyan-400 font-extrabold text-base">{decayConstant.toFixed(3)} s⁻¹</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Decay Data' : 'Ghi Bảng Số liệu Phân rã'}
          </button>
        </div>
      </div>
    </div>
  );
}
