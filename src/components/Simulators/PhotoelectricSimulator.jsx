import React, { useState, useEffect, useRef } from 'react';
import { Zap, Sparkles, Activity, Sun, Info, Sliders } from 'lucide-react';

export default function PhotoelectricSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);

  const metals = {
    sodium: { name: isEn ? 'Sodium (Na)' : 'Natri (Na)', workFuncEv: 2.36, lambda0Nm: 526 },
    potassium: { name: isEn ? 'Potassium (K)' : 'Kali (K)', workFuncEv: 2.29, lambda0Nm: 542 },
    caesium: { name: isEn ? 'Caesium (Cs)' : 'Xesi (Cs)', workFuncEv: 1.88, lambda0Nm: 660 },
    zinc: { name: isEn ? 'Zinc (Zn)' : 'Kẽm (Zn)', workFuncEv: 4.31, lambda0Nm: 288 },
    copper: { name: isEn ? 'Copper (Cu)' : 'Đồng (Cu)', workFuncEv: 4.70, lambda0Nm: 264 }
  };

  const selectedMetalKey = params.metal || 'sodium';
  const selectedMetal = metals[selectedMetalKey] || metals.sodium;

  const wavelengthNm = params.wavelengthNm || 350; // nm
  const uAKVolts = params.uAKVolts !== undefined ? params.uAKVolts : 1.0; // Volts (-5V to +5V)
  const lightIntensity = params.lightIntensity || 70; // % (Photon Flux)

  const hJss = 6.626e-34; // Planck constant
  const eCoulomb = 1.602e-19; // electron charge
  const cSpeed = 3e8; // speed of light
  const mElectron = 9.109e-31; // electron mass kg

  const freqHz = cSpeed / (wavelengthNm * 1e-9); // Hz
  const photonEnergyJ = hJss * freqHz;
  const photonEnergyEv = photonEnergyJ / eCoulomb;

  // Stopping potential Vs = (h*f - Phi) / e (Volts)
  const stoppingVolts = Math.max(0, photonEnergyEv - selectedMetal.workFuncEv);
  const maxKineticEnergyEv = Math.max(0, photonEnergyEv - selectedMetal.workFuncEv);
  const maxVelocityMs = Math.sqrt((2 * maxKineticEnergyEv * eCoulomb) / mElectron);

  const isEmissionOccurring = photonEnergyEv >= selectedMetal.workFuncEv;

  // Calculate Photoelectric Current I (microamperes)
  // I = 0 if uAK <= -stoppingVolts
  // I increases to Saturation Current I_sat as uAK increases
  let photoCurrentUa = 0;
  if (isEmissionOccurring) {
    if (uAKVolts > -stoppingVolts) {
      const satCurrentMax = (lightIntensity / 100) * 12.0; // uA
      const currentProgress = Math.min(1, (uAKVolts + stoppingVolts) / (stoppingVolts + 2.0));
      photoCurrentUa = satCurrentMax * Math.pow(currentProgress, 0.7);
    }
  }

  // Wavelength to RGB Color Converter for Light Beam & Photons
  const getWavelengthColor = (nm) => {
    if (nm < 380) return { hex: '#c084fc', name: isEn ? 'Ultraviolet (UV)' : 'Tia Tử Ngoại (UV)', glow: 'rgba(192, 132, 252, 0.6)' };
    if (nm < 440) return { hex: '#818cf8', name: isEn ? 'Violet Beam' : 'Chùm Tím (Violet)', glow: 'rgba(129, 140, 248, 0.6)' };
    if (nm < 490) return { hex: '#38bdf8', name: isEn ? 'Blue Beam' : 'Chùm Lam (Blue)', glow: 'rgba(56, 189, 248, 0.6)' };
    if (nm < 560) return { hex: '#4ade80', name: isEn ? 'Green Beam' : 'Chùm Lục (Green)', glow: 'rgba(74, 222, 128, 0.6)' };
    if (nm < 590) return { hex: '#facc15', name: isEn ? 'Yellow Beam' : 'Chùm Vàng (Yellow)', glow: 'rgba(250, 204, 21, 0.6)' };
    if (nm < 640) return { hex: '#fb923c', name: isEn ? 'Orange Beam' : 'Chùm Cam (Orange)', glow: 'rgba(251, 146, 60, 0.6)' };
    if (nm <= 750) return { hex: '#f87171', name: isEn ? 'Red Beam' : 'Chùm Đỏ (Red)', glow: 'rgba(248, 113, 113, 0.6)' };
    return { hex: '#991b1b', name: isEn ? 'Infrared (IR)' : 'Tia Hồng Ngoại (IR)', glow: 'rgba(153, 27, 27, 0.4)' };
  };

  const lightColorObj = getWavelengthColor(wavelengthNm);

  // Dynamic Realtime Physics Description Generator
  const getPhysicsDescription = () => {
    if (!isEmissionOccurring) {
      return isEn
        ? `⚠️ [No Photoelectric Effect] Photon energy E = ${photonEnergyEv.toFixed(2)}eV is lower than Work Function Φ = ${selectedMetal.workFuncEv}eV (λ = ${wavelengthNm}nm > Red Threshold λ₀ = ${selectedMetal.lambda0Nm}nm). No electrons ejected regardless of light intensity!`
        : `⚠️ [Không có Hiện tượng Quang điện] Năng lượng photon E = ${photonEnergyEv.toFixed(2)} eV nhỏ hơn Công thoát Φ = ${selectedMetal.workFuncEv} eV (Bước sóng λ = ${wavelengthNm} nm > Giới hạn quang điện λ₀ = ${selectedMetal.lambda0Nm} nm). Không có electron bứt ra dù tăng cường độ sáng!`;
    }

    if (uAKVolts <= -stoppingVolts) {
      return isEn
        ? `🛑 [Stopping Potential V_s = ${stoppingVolts.toFixed(2)}V] Retarding Voltage U_AK = ${uAKVolts.toFixed(2)}V is more negative than -V_s. Electric field force repels all photoelectrons back to Cathode. Current I = 0 µA!`
        : `🛑 [Điện thế hãm V_s = ${stoppingVolts.toFixed(2)}V] Điện áp hãm U_AK = ${uAKVolts.toFixed(2)}V âm hơn -V_s. Lực điện trường hãm công toàn bộ động năng ban đầu cực đại K_max = ${maxKineticEnergyEv.toFixed(2)} eV, đẩy electron quay lại Cathode. Dòng quang điện I = 0 µA!`;
    }

    if (uAKVolts >= 2.0) {
      return isEn
        ? `⚡ [Saturation Current I_sat = ${photoCurrentUa.toFixed(1)}µA] Accelerating voltage U_AK pulls 100% of ejected photoelectrons to Anode A. Current reaches Saturation I_sat. Increasing light intensity will boost I_sat!`
        : `⚡ [Dòng Quang điện Bão hòa I_bh = ${photoCurrentUa.toFixed(1)} µA] Điện áp tăng tốc U_AK = ${uAKVolts.toFixed(2)}V hút toàn bộ số electron quang điện bứt ra về Anode A. Dòng quang điện đạt giá trị Bão hòa I_bh!`;
    }

    return isEn
      ? `⚡ [Photoelectric Emission] Photons (E = ${photonEnergyEv.toFixed(2)}eV > Φ = ${selectedMetal.workFuncEv}eV) eject photoelectrons with max kinetic energy K_max = ${maxKineticEnergyEv.toFixed(2)}eV (v_max = ${(maxVelocityMs / 1e5).toFixed(1)}×10⁵ m/s). Current I = ${photoCurrentUa.toFixed(1)} µA.`
      : `⚡ [Bứt Electron Quang điện] Photon (E = ${photonEnergyEv.toFixed(2)} eV > Φ = ${selectedMetal.workFuncEv} eV) truyền toàn bộ năng lượng cho electron, giải phóng electron khỏi Cathode với Động năng ban đầu cực đại K_max = ${maxKineticEnergyEv.toFixed(2)} eV (v_max = ${(maxVelocityMs / 1e5).toFixed(1)}×10⁵ m/s).`;
  };


  // 60 FPS Canvas Physics Renderer
  useEffect(() => {
    let animId;
    let time = 0;
    const electrons = [];

    const render = () => {
      time += 0.03;
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
          ? `PHOTOELECTRIC EFFECT EINSTEIN EQUATION: h·f = Φ + ½m·v²_max | METAL: ${selectedMetal.name}`
          : `THÍ NGHIỆM QUANG ĐIỆN PHƯƠNG TRÌNH EINSTEIN: h·f = Φ + ½m·v²_max | KIM LOẠI: ${selectedMetal.name}`,
        25,
        26
      );


      // --- SECTION 1: VACUUM PHOTOTUBE CHAMBER (x: 25 to 330) ---
      const tubeX = 25;
      const tubeY = 45;
      const tubeW = 310;
      const tubeH = 210;

      // Vacuum Glass Tube Casing
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(tubeX, tubeY, tubeW, tubeH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(isEn ? 'VACUUM TUBE' : 'BÌNH CHÂN KHÔNG', tubeX + 12, tubeY + 16);

      const cathodeX = tubeX + 45;
      const anodeX = tubeX + tubeW - 45;
      const plateTopY = tubeY + 35;
      const plateH = tubeH - 70;

      // Cathode K Plate (-)
      const cGrad = ctx.createLinearGradient(cathodeX, plateTopY, cathodeX + 14, plateTopY + plateH);
      cGrad.addColorStop(0, '#f59e0b');
      cGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = cGrad;
      ctx.fillRect(cathodeX, plateTopY, 14, plateH);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(cathodeX, plateTopY, 14, plateH);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Cathode K', cathodeX + 7, plateTopY + plateH + 16);

      // Anode A Plate (+)
      const aGrad = ctx.createLinearGradient(anodeX, plateTopY, anodeX + 14, plateTopY + plateH);
      aGrad.addColorStop(0, '#38bdf8');
      aGrad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = aGrad;
      ctx.fillRect(anodeX, plateTopY, 14, plateH);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(anodeX, plateTopY, 14, plateH);

      ctx.fillStyle = '#60a5fa';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Anode A', anodeX + 7, plateTopY + plateH + 16);


      // --- SECTION 2: LIGHT LAMP & MONOCHROMATIC LIGHT BEAM ---
      const lampX = tubeX - 10;
      const lampY = tubeY - 10;

      // Light Beam Polygon (Lamp to Cathode K)
      ctx.fillStyle = lightColorObj.glow;
      ctx.beginPath();
      ctx.moveTo(lampX + 30, lampY + 15);
      ctx.lineTo(cathodeX + 2, plateTopY + 10);
      ctx.lineTo(cathodeX + 2, plateTopY + plateH - 10);
      ctx.lineTo(lampX + 15, lampY + 30);
      ctx.closePath();
      ctx.fill();

      // Light Lamp Housing
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = lightColorObj.hex;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lampX + 15, lampY + 15, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = lightColorObj.hex;
      ctx.font = 'bold 9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`${wavelengthNm}nm`, lampX + 15, lampY + 19);

      // Photons Energy Quanta Stream along Beam
      const photonSpeed = 3.5;
      const photonCount = Math.floor(lightIntensity / 10);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = lightColorObj.hex;
      ctx.shadowBlur = 8;

      for (let p = 0; p < photonCount; p++) {
        const pProgress = ((p * 0.15 + time * photonSpeed * 0.1) % 1);
        const px = (lampX + 20) + (cathodeX - (lampX + 20)) * pProgress;
        const py = (lampY + 20) + ((plateTopY + plateH / 2) - (lampY + 20)) * pProgress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;


      // --- SECTION 3: EMITTED PHOTOELECTRONS (e-) IN VACUUM ---
      if (isEmissionOccurring) {
        // Spawn new electron probabilistically based on light intensity
        if (Math.random() < (lightIntensity / 100) * 0.6) {
          const spawnY = plateTopY + 10 + Math.random() * (plateH - 20);
          // Initial velocity prop to maxVelocity
          const baseV = 1.2 + (maxVelocityMs / 1e5) * 0.35;
          electrons.push({
            x: cathodeX + 14,
            y: spawnY,
            vx: baseV * (0.7 + Math.random() * 0.6),
            vy: (Math.random() - 0.5) * 0.8,
            life: 1.0
          });
        }

        // Electric Field acceleration/deceleration factor inside tube
        // Force F = e * E, E = U_AK / d
        const aElectric = (uAKVolts / 2.0) * 0.15;

        for (let idx = electrons.length - 1; idx >= 0; idx--) {
          const ele = electrons[idx];
          ele.vx += aElectric * 0.05; // Accelerate towards Anode if U_AK > 0, decelerate if U_AK < 0
          ele.x += ele.vx;
          ele.y += ele.vy;

          // Reached Anode A (+)
          if (ele.x >= anodeX) {
            electrons.splice(idx, 1);
            continue;
          }

          // Repelled back to Cathode K (-) due to Retarding Voltage U_AK <= -V_s
          if (ele.x <= cathodeX + 10 && ele.vx < 0) {
            electrons.splice(idx, 1);
            continue;
          }

          // Out of vertical bounds
          if (ele.y < plateTopY - 10 || ele.y > plateTopY + plateH + 10) {
            electrons.splice(idx, 1);
            continue;
          }

          // Render Electron
          ctx.fillStyle = '#00f5d4';
          ctx.shadowColor = '#00f5d4';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(ele.x, ele.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }


      // --- SECTION 4: EXTERNAL CIRCUIT & VOLTAGE POWER SUPPLY U_AK ---
      const circuitY = tubeY + tubeH + 25;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      // Cathode wire down to Power Supply
      ctx.beginPath();
      ctx.moveTo(cathodeX + 7, plateTopY + plateH);
      ctx.lineTo(cathodeX + 7, circuitY);
      ctx.lineTo(tubeX + 80, circuitY);
      ctx.stroke();

      // Anode wire down to Power Supply
      ctx.beginPath();
      ctx.moveTo(anodeX + 7, plateTopY + plateH);
      ctx.lineTo(anodeX + 7, circuitY);
      ctx.lineTo(tubeX + 220, circuitY);
      ctx.stroke();

      // Variable DC Voltage Power Supply Unit (U_AK)
      const psuX = tubeX + 150;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = uAKVolts < 0 ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(psuX - 45, circuitY - 16, 90, 32, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = uAKVolts < 0 ? '#f43f5e' : '#10b981';
      ctx.font = 'extrabold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`U_AK = ${uAKVolts.toFixed(2)}V`, psuX, circuitY + 4);

      // Microammeter (uA)
      const ammeterX = tubeX + 220;
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ammeterX, circuitY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'extrabold 10px Inter';
      ctx.fillText('µA', ammeterX, circuitY + 4);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Inter';
      ctx.fillText(`I = ${photoCurrentUa.toFixed(1)}µA`, ammeterX + 42, circuitY + 4);


      // --- SECTION 5: REALTIME CHARACTERISTIC I - U_AK GRAPH (Right side, x: 360 to 520) ---
      const gx = 360;
      const gy = 45;
      const gw = 165;
      const gh = 230;

      // Graph Container
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
      ctx.fillText(isEn ? 'CHARACTERISTIC I - U_AK' : 'ĐẶC TUYẾN I - U_AK', gx + gw / 2, gy + 16);

      // Axes
      const originX = gx + 50;
      const originY = gy + gh - 35;
      const axisW = gw - 60;
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
      ctx.fillText('I(µA)', originX - 10, gy + 30);
      ctx.fillText('U_AK(V)', originX + axisW - 5, originY + 16);

      // Plot Theoretical Curve I vs U_AK
      const maxU = 4.0;
      const maxI = 15.0; // max scale

      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let px = -30; px <= axisW; px += 2) {
        const uVal = (px / axisW) * maxU;
        let iVal = 0;

        if (isEmissionOccurring && uVal > -stoppingVolts) {
          const satCurrentMax = (lightIntensity / 100) * 12.0;
          const currentProgress = Math.min(1, (uVal + stoppingVolts) / (stoppingVolts + 2.0));
          iVal = satCurrentMax * Math.pow(currentProgress, 0.7);
        }

        const plotX = originX + (uVal / maxU) * axisW;
        const plotY = originY - (iVal / maxI) * axisH;

        if (px === -30) ctx.moveTo(plotX, plotY);
        else ctx.lineTo(plotX, plotY);
      }
      ctx.stroke();

      // Mark Stopping Potential -V_s
      if (isEmissionOccurring && stoppingVolts > 0) {
        const vsPx = originX + (-stoppingVolts / maxU) * axisW;
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.arc(vsPx, originY, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.font = 'bold 8px Inter';
        ctx.fillText(`-V_s`, vsPx - 2, originY + 12);
      }

      // Operating Point Dot (U_AK, I)
      const curPx = originX + (uAKVolts / maxU) * axisW;
      const curPy = originY - (photoCurrentUa / maxI) * axisH;

      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(curPx, curPy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [wavelengthNm, uAKVolts, lightIntensity, selectedMetal, photonEnergyEv, maxKineticEnergyEv, maxVelocityMs, isEmissionOccurring, stoppingVolts, photoCurrentUa, lightColorObj, isEn]);

  const recordPoint = () => {
    onDataRecorded?.({
      metal: selectedMetal.name,
      wavelengthNm: `${wavelengthNm} nm`,
      photonEnergyEv: `${photonEnergyEv.toFixed(2)} eV`,
      workFuncEv: `${selectedMetal.workFuncEv} eV`,
      maxKineticEnergyEv: `${maxKineticEnergyEv.toFixed(2)} eV`,
      stoppingVolts: `${stoppingVolts.toFixed(2)} V`,
      uAKVolts: `${uAKVolts.toFixed(2)} V`,
      photoCurrentUa: `${photoCurrentUa.toFixed(1)} µA`
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
            <Zap className="w-4 h-4 text-amber-400" /> {isEn ? 'Photoelectric Controls' : 'Tham số Thí nghiệm Quang Điện'}
          </h3>

          {/* Metal Cathode Select */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Cathode Metal:' : 'Kim loại Cathode K:'}</label>
            <select
              value={selectedMetalKey}
              onChange={(e) => onParamChange('metal', e.target.value)}
              className="w-full bg-slate-950 text-cyan-400 text-xs font-bold p-2 rounded-lg border border-slate-800 focus:outline-none"
            >
              {Object.entries(metals).map(([key, m]) => (
                <option key={key} value={key}>
                  {m.name} (Φ = {m.workFuncEv} eV | λ₀ = {m.lambda0Nm}nm)
                </option>
              ))}
            </select>
          </div>

          {/* Wavelength Lambda Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Light Wavelength λ:' : 'Bước sóng chiếu λ:'}</span>
              <span className="font-bold" style={{ color: lightColorObj.hex }}>
                {wavelengthNm} nm ({lightColorObj.name})
              </span>
            </div>
            <input
              type="range" min="150" max="750" step="5"
              value={wavelengthNm}
              onChange={(e) => onParamChange('wavelengthNm', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Retarding / Accelerating Voltage U_AK Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Anode Voltage U_AK:' : 'Điện áp Anode-Cathode U_AK:'}</span>
              <span className={`font-bold ${uAKVolts < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {uAKVolts.toFixed(2)} V
              </span>
            </div>
            <input
              type="range" min="-4.0" max="4.0" step="0.1"
              value={uAKVolts}
              onChange={(e) => onParamChange('uAKVolts', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-purple-400"
            />
          </div>

          {/* Light Intensity Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Light Intensity (Flux):' : 'Cường độ chùm sáng (Photon):'}</span>
              <span className="text-amber-400 font-bold">{lightIntensity} %</span>
            </div>
            <input
              type="range" min="10" max="100" step="5"
              value={lightIntensity}
              onChange={(e) => onParamChange('lightIntensity', Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Realtime Measured Results */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> {isEn ? 'PHOTOELECTRIC MEASUREMENTS' : 'Số liệu Điện thế Hãm & Động năng'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Photon Energy E:' : 'Năng lượng E = h·f:'}</span>
              <span className="text-amber-400 font-bold text-sm">{photonEnergyEv.toFixed(2)} eV</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Stopping Voltage V_s:' : 'Điện thế hãm V_s:'}</span>
              <span className="text-purple-400 font-bold text-sm">{stoppingVolts.toFixed(2)} V</span>
            </div>

            <div className="col-span-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/50 flex justify-between items-center">
              <div>
                <span className="text-emerald-300 font-semibold block text-xs">{isEn ? 'Photo Current I:' : 'Dòng quang điện I:'}</span>
                <span className="text-slate-400 text-[10px]">K_max = {maxKineticEnergyEv.toFixed(2)} eV</span>
              </div>
              <span className="text-emerald-400 font-extrabold text-base">{photoCurrentUa.toFixed(1)} µA</span>
            </div>
          </div>

          <button
            onClick={recordPoint}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all"
          >
            ➕ {isEn ? 'Record Photoelectric Data' : 'Ghi Bảng Số liệu Quang Điện'}
          </button>
        </div>
      </div>
    </div>
  );
}
