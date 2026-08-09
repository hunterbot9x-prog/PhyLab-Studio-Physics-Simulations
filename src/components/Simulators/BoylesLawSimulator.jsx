import React, { useEffect, useRef } from 'react';
import { Activity, ShieldCheck, Flame, Plus } from 'lucide-react';

export default function BoylesLawSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  const volumeMl = params.volumeMl || 50; // Gas Syringe volume in mL (10 - 100 ml)
  const tempK = params.tempK || 300; // Temperature in Kelvin (250 - 450 K)

  // Baseline constant P0 * V0 at 300K: 100 kPa * 50 ml = 5000 (kPa.ml)
  const nRT = 100 * 50;
  const pressureKpa = (nRT / volumeMl) * (tempK / 300);
  const pressureAtm = pressureKpa / 101.325;
  const invVolume = 1 / volumeMl;
  const pvProduct = pressureKpa * volumeMl;

  // Initialize Gas Particles once
  useEffect(() => {
    const numParticles = 45;
    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: Math.random(), // normalized 0 to 1 inside current gas volume
        y: Math.random(), // normalized 0 to 1 inside cylinder height
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        radius: 3 + Math.random() * 1.5
      });
    }
    particlesRef.current = newParticles;
  }, []);

  // 60 FPS Physics & Canvas Rendering Loop
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Dark Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0f172a');
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

      const syringeX = 35;
      const syringeY = 95;
      const maxSyringeW = 270;
      const syringeH = 95;

      // Current Piston Position based on volumeMl (10 - 100 ml)
      const currentGasW = (volumeMl / 100) * maxSyringeW;
      const pistonX = syringeX + currentGasW;

      // 1. Draw Temperature Thermal Heater / Flame below Cylinder
      if (tempK > 300) {
        const heatIntensity = (tempK - 300) / 150;
        const heatGrad = ctx.createRadialGradient(
          syringeX + currentGasW / 2, syringeY + syringeH + 20, 5,
          syringeX + currentGasW / 2, syringeY + syringeH + 20, currentGasW / 2 + 10
        );
        heatGrad.addColorStop(0, `rgba(239, 68, 68, ${0.7 * heatIntensity})`);
        heatGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.4 * heatIntensity})`);
        heatGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = heatGrad;
        ctx.fillRect(syringeX - 10, syringeY + syringeH, currentGasW + 20, 35);
      }

      // 2. Draw Gas Chamber Space & Glass Cylinder Tube
      const gasBgGrad = ctx.createLinearGradient(syringeX, syringeY, pistonX, syringeY + syringeH);
      if (tempK < 300) {
        gasBgGrad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
        gasBgGrad.addColorStop(1, 'rgba(56, 189, 248, 0.1)');
      } else {
        const heatRatio = Math.min(1, (tempK - 300) / 150);
        gasBgGrad.addColorStop(0, `rgba(${Math.round(239 * heatRatio)}, ${Math.round(242 * (1 - heatRatio))}, 254, 0.25)`);
        gasBgGrad.addColorStop(1, `rgba(${Math.round(245 * heatRatio)}, ${Math.round(158 * heatRatio)}, 248, 0.15)`);
      }
      ctx.fillStyle = gasBgGrad;
      ctx.fillRect(syringeX, syringeY, currentGasW, syringeH);

      // Glass Cylinder Body Outline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(syringeX, syringeY);
      ctx.lineTo(syringeX + maxSyringeW + 15, syringeY);
      ctx.moveTo(syringeX, syringeY + syringeH);
      ctx.lineTo(syringeX + maxSyringeW + 15, syringeY + syringeH);
      ctx.moveTo(syringeX, syringeY);
      ctx.lineTo(syringeX, syringeY + syringeH);
      ctx.stroke();

      // Syringe Graduation Marks (ml)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '9px Inter';
      ctx.textAlign = 'center';

      for (let ml = 10; ml <= 100; ml += 10) {
        const px = syringeX + (ml / 100) * maxSyringeW;
        ctx.beginPath();
        ctx.moveTo(px, syringeY);
        ctx.lineTo(px, syringeY + (ml % 20 === 0 ? 14 : 7));
        ctx.stroke();
        if (ml % 20 === 0) {
          ctx.fillText(`${ml}`, px, syringeY + 24);
        }
      }

      // 3. Update & Draw Bouncing Ideal Gas Molecules (Phân Tử Khí 60 FPS)
      const speedFactor = Math.sqrt(tempK / 300) * 1.5; // v_rms ~ sqrt(T)
      const particleColor = tempK > 340 ? '#ef4444' : (tempK > 310 ? '#f59e0b' : '#00f2fe');

      ctx.fillStyle = particleColor;
      ctx.shadowColor = particleColor;
      ctx.shadowBlur = 6;

      particlesRef.current.forEach((p) => {
        // Move particle inside 0..1 normalized box
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;

        // Elastic bounce off piston (right X = 1) and left wall (X = 0)
        if (p.x <= 0.02) { p.x = 0.02; p.vx = Math.abs(p.vx); }
        if (p.x >= 0.98) { p.x = 0.98; p.vx = -Math.abs(p.vx); }

        // Elastic bounce off top/bottom cylinder walls
        if (p.y <= 0.05) { p.y = 0.05; p.vy = Math.abs(p.vy); }
        if (p.y >= 0.95) { p.y = 0.95; p.vy = -Math.abs(p.vy); }

        // Convert normalized X, Y to pixel canvas coordinates
        const renderPxX = syringeX + 8 + p.x * (currentGasW - 16);
        const renderPxY = syringeY + 8 + p.y * (syringeH - 16);

        ctx.beginPath();
        ctx.arc(renderPxX, renderPxY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 4. Draw Heavy Metallic Piston Head & Handle Shaft
      ctx.fillStyle = '#f43f5e';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pistonX - 10, syringeY + 2, 14, syringeH - 4, 4);
      ctx.fill(); ctx.stroke();

      // Piston Handle Shaft
      ctx.fillStyle = '#475569';
      ctx.fillRect(pistonX + 4, syringeY + syringeH * 0.38, maxSyringeW + 35 - (pistonX - syringeX), syringeH * 0.24);

      // Piston Handle Grip End
      ctx.fillStyle = '#334155';
      ctx.fillRect(syringeX + maxSyringeW + 35, syringeY + 15, 12, syringeH - 30);

      // 5. Draw Analog Pressure Gauge Dial (Áp Kế Vòng Tròn Manometer)
      const gaugeX = width - 120;
      const gaugeY = 150;
      const gaugeR = 60;

      // Dial Outer Ring
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = pressureKpa > 200 ? '#ef4444' : '#00f2fe';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = pressureKpa > 200 ? '#ef4444' : '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      // Dial Tick Marks
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      for (let angle = -Math.PI * 0.75; angle <= Math.PI * 0.75; angle += Math.PI * 0.15) {
        const tx1 = gaugeX + Math.cos(angle) * (gaugeR - 6);
        const ty1 = gaugeY + Math.sin(angle) * (gaugeR - 6);
        const tx2 = gaugeX + Math.cos(angle) * (gaugeR - 12);
        const ty2 = gaugeY + Math.sin(angle) * (gaugeR - 12);
        ctx.beginPath(); ctx.moveTo(tx1, ty1); ctx.lineTo(tx2, ty2); ctx.stroke();
      }

      // Rotating Needle Indicator
      // Angle maps pressureKpa (50 to 500 kPa) -> (-135 deg to +135 deg)
      const maxKpa = 400;
      const minKpa = 50;
      const normPress = Math.max(0, Math.min(1, (pressureKpa - minKpa) / (maxKpa - minKpa)));
      const needleAngle = -Math.PI * 0.75 + normPress * (Math.PI * 1.5);

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(gaugeX, gaugeY);
      ctx.lineTo(gaugeX + Math.cos(needleAngle) * (gaugeR - 16), gaugeY + Math.sin(needleAngle) * (gaugeR - 16));
      ctx.stroke();

      // Needle Pin Hub
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(gaugeX, gaugeY, 4, 0, Math.PI * 2); ctx.fill();

      // Digital Pressure Readout below needle
      ctx.fillStyle = pressureKpa > 200 ? '#ef4444' : '#00f2fe';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${pressureKpa.toFixed(1)} kPa`, gaugeX, gaugeY + 30);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter';
      ctx.fillText(`${pressureAtm.toFixed(2)} atm`, gaugeX, gaugeY + 44);

      // 6. Mini P-V Isotherm Hyperbola Curve Graph (Đồ thị Đẳng Nhiệt P-V)
      const graphX = 35;
      const graphY = height - 145;
      const graphW = 160;
      const graphH = 110;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.fillRect(graphX, graphY, graphW, graphH);
      ctx.strokeRect(graphX, graphY, graphW, graphH);

      // Graph Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(graphX + 25, graphY + 10); ctx.lineTo(graphX + 25, graphY + graphH - 20); // P axis
      ctx.lineTo(graphX + graphW - 10, graphY + graphH - 20); // V axis
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('P (kPa)', graphX + 25, graphY + 8);
      ctx.fillText('V (ml)', graphX + graphW - 15, graphY + graphH - 6);

      // Plot Theoretical Isotherm Curve P = nRT / V
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let firstPoint = true;
      for (let v = 15; v <= 100; v += 2) {
        const pKpa = (nRT / v) * (tempK / 300);
        const px = graphX + 25 + ((v - 10) / 90) * (graphW - 38);
        const py = (graphY + graphH - 20) - ((pKpa - 40) / 360) * (graphH - 30);
        if (py >= graphY + 10 && py <= graphY + graphH - 20) {
          if (firstPoint) { ctx.moveTo(px, py); firstPoint = false; }
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      // Current State Point Dot (V, P) on Graph
      const curDotX = graphX + 25 + ((volumeMl - 10) / 90) * (graphW - 38);
      const curDotY = (graphY + graphH - 20) - ((pressureKpa - 40) / 360) * (graphH - 30);

      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(curDotX, curDotY, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      // HUD Title Banner at top
      ctx.fillStyle = '#00f2fe';
      ctx.font = 'bold 13px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        isEn
          ? `BOYLE'S LAW: P · V = const  (P = ${pressureKpa.toFixed(1)} kPa | V = ${volumeMl} ml)`
          : `ĐỊNH LUẬT BOYLE: P · V = hằng số  (P = ${pressureKpa.toFixed(1)} kPa | V = ${volumeMl} ml)`,
        width * 0.5,
        25
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [volumeMl, tempK, pressureKpa, pressureAtm, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      volumeMl: `${volumeMl} ml`,
      tempK: `${tempK} K`,
      pressureKpa: `${pressureKpa.toFixed(1)} kPa`,
      pressureAtm: `${pressureAtm.toFixed(2)} atm`,
      invVolume: `${invVolume.toFixed(4)} ml⁻¹`,
      pvProduct: `${pvProduct.toFixed(0)} kPa·ml`
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
            <Activity className="w-4 h-4" /> {isEn ? "Boyle's Law Controls" : 'Cambridge A Level Practical'}
          </h3>

          {/* Volume Slider V */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Gas Volume V:' : 'Thể tích khí V:'}</span>
              <span className="text-cyan-400 font-bold">{volumeMl} ml</span>
            </div>
            <input
              type="range" min="10" max="100" step="5"
              value={volumeMl}
              onChange={(e) => onParamChange('volumeMl', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Temperature Slider T */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Temperature T (Kelvin):' : 'Nhiệt độ T (Kelvin):'}</span>
              <span className="text-amber-400 font-bold">{tempK} K</span>
            </div>
            <input
              type="range" min="250" max="450" step="10"
              value={tempK}
              onChange={(e) => onParamChange('tempK', Number(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'PRESSURE & P·V RESULTS' : 'ÁP SUẤT & TÍCH P · V'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Pressure P:' : 'Áp suất P:'}</span>
              <span className="text-rose-400 font-bold text-sm">{pressureKpa.toFixed(1)} kPa</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? '1 / V (Linear):' : '1 / V (Đường thẳng):'}</span>
              <span className="text-cyan-400 font-bold text-sm">{invVolume.toFixed(4)} ml⁻¹</span>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center text-xs">
            <div>
              <span className="text-cyan-300 font-semibold block">{isEn ? 'P · V = Constant:' : 'Tích P · V = const:'}</span>
              <span className="text-slate-400 text-[10px]">{isEn ? "Boyle's Law constant" : 'Định luật Boyle'}</span>
            </div>
            <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {pvProduct.toFixed(0)}
            </span>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> {isEn ? 'Record Measurement' : 'Ghi Bảng Số liệu Khí lý tưởng'}
          </button>
        </div>
      </div>
    </div>
  );
}
