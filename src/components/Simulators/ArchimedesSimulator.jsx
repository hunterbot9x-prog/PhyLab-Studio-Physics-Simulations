import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Droplets, ArrowDown, ArrowUp } from 'lucide-react';

export default function ArchimedesSimulator({ lang, params = {}, onParamChange, onDataRecorded }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const [immersionPercentage, setImmersionPercentage] = useState(0);
  const [isSubmerged, setIsSubmerged] = useState(false);

  // Material densities in kg/m3
  const materials = {
    aluminum: { name: 'Nhôm', density: 2700, color: '#94a3b8' },
    iron: { name: 'Sắt', density: 7800, color: '#64748b' },
    copper: { name: 'Đồng', density: 8900, color: '#b45309' },
    wood: { name: 'Gỗ', density: 700, color: '#d97706' }
  };

  const liquids = {
    water: { name: 'Nước tinh khiết', density: 1000, color: 'rgba(0, 242, 254, 0.35)', stroke: '#00f2fe' },
    oil: { name: 'Dầu ăn', density: 800, color: 'rgba(234, 179, 8, 0.35)', stroke: '#eab308' },
    alcohol: { name: 'Cồn y tế', density: 790, color: 'rgba(168, 85, 247, 0.35)', stroke: '#a855f7' }
  };

  const gravity = params.gravity || 9.81;
  const volumeCm3 = params.volumeCm3 || 100;
  const materialKey = params.material || 'aluminum';
  const liquidKey = params.liquid || 'water';

  const selectedMaterial = materials[materialKey] || materials.aluminum;
  const selectedLiquid = liquids[liquidKey] || liquids.water;

  // Physical calculations
  const volumeM3 = volumeCm3 * 1e-6; // convert cm3 to m3
  const massKg = selectedMaterial.density * volumeM3; // m = D * V
  const weightAir = massKg * gravity; // P1 = m * g (N)

  // Submerged portion volume
  const submergedVolM3 = volumeM3 * (immersionPercentage / 100);
  const buoyantForce = selectedLiquid.density * gravity * submergedVolM3; // FA = d * V_submerged
  const weightApparent = Math.max(0, weightAir - buoyantForce); // P2 = P1 - FA

  // Draw canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 1. Draw Stand/Support Frame at top
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, 20);
    ctx.lineTo(width / 2, 20);
    ctx.lineTo(width / 2, 40);
    ctx.stroke();

    // 2. Draw Spring Scale (Lực kế)
    const scaleX = width / 2;
    const scaleY = 40;
    const scaleW = 40;
    const scaleH = 100;

    // Body
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(scaleX - scaleW / 2, scaleY, scaleW, scaleH, 8);
    ctx.fill();
    ctx.stroke();

    // Scale graduation lines & Text readout inside spring scale
    const scaleValueN = weightApparent;
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${scaleValueN.toFixed(2)} N`, scaleX, scaleY + scaleH / 2 + 4);

    // 3. Draw Beaker (Bình chia độ / Cốc chứa chất lỏng)
    const beakerW = 140;
    const beakerH = 200;
    const beakerX = width / 2 - beakerW / 2;
    const beakerY = height - 50 - beakerH;

    // Beaker Liquid
    const liquidH = 150 + (submergedVolM3 * 1e5); // Liquid level rises slightly when submerged!
    const liquidY = height - 50 - liquidH;

    ctx.fillStyle = selectedLiquid.color;
    ctx.strokeStyle = selectedLiquid.stroke;
    ctx.lineWidth = 2;
    ctx.fillRect(beakerX + 4, liquidY, beakerW - 8, liquidH);

    // Liquid surface line
    ctx.beginPath();
    ctx.moveTo(beakerX + 4, liquidY);
    ctx.lineTo(beakerX + beakerW - 4, liquidY);
    ctx.stroke();

    // Glass Beaker Outline
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(beakerX, beakerY);
    ctx.lineTo(beakerX, height - 50);
    ctx.lineTo(beakerX + beakerW, height - 50);
    ctx.lineTo(beakerX + beakerW, beakerY);
    ctx.stroke();

    // Volume Graduation Marks on Beaker
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    for (let markVol = 50; markVol <= 250; markVol += 50) {
      const markY = height - 50 - (markVol / 250) * 180;
      ctx.beginPath();
      ctx.moveTo(beakerX + beakerW - 4, markY);
      ctx.lineTo(beakerX + beakerW - 14, markY);
      ctx.stroke();
      ctx.fillText(`${markVol} ml`, beakerX + beakerW - 18, markY + 3);
    }

    // 4. Draw String & Hanging Object
    // Position of object varies with immersionPercentage
    const minObjectY = scaleY + scaleH + 20; // Object completely in air
    const maxObjectY = liquidY + 60; // Object submerged deep in liquid
    const objectY = minObjectY + (immersionPercentage / 100) * (maxObjectY - minObjectY);

    // String from scale to object
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(scaleX, scaleY + scaleH);
    ctx.lineTo(scaleX, objectY);
    ctx.stroke();

    // Object Dimensions
    const objectSize = Math.max(35, Math.min(65, Math.cbrt(volumeCm3) * 12));
    const objectX = scaleX - objectSize / 2;

    // Draw Material Box
    ctx.fillStyle = selectedMaterial.color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.shadowColor = selectedMaterial.color;
    ctx.shadowBlur = 10;
    ctx.fillRect(objectX, objectY, objectSize, objectSize);
    ctx.strokeRect(objectX, objectY, objectSize, objectSize);
    ctx.shadowBlur = 0;

    // Label inside Object
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(selectedMaterial.name, scaleX, objectY + objectSize / 2 - 4);
    ctx.fillText(`${(massKg * 1000).toFixed(0)}g`, scaleX, objectY + objectSize / 2 + 10);

    // 5. Draw Force Vector Arrows & Glowing Text Labels
    const arrowCenterX = scaleX - objectSize / 2 - 25;
    const arrowCenterY = objectY + objectSize / 2;

    // Weight P1 (Red Arrow Downward)
    const p1Len = Math.min(70, weightAir * 12);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(arrowCenterX, arrowCenterY);
    ctx.lineTo(arrowCenterX, arrowCenterY + p1Len);
    ctx.stroke();

    // Arrowhead P1
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(arrowCenterX, arrowCenterY + p1Len + 6);
    ctx.lineTo(arrowCenterX - 5, arrowCenterY + p1Len - 4);
    ctx.lineTo(arrowCenterX + 5, arrowCenterY + p1Len - 4);
    ctx.closePath();
    ctx.fill();

    // Glowing Label P1
    ctx.font = 'bold 12px Inter';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.fillText('P₁', arrowCenterX - 14, arrowCenterY + p1Len / 2);

    // Buoyant Force FA (Cyan Arrow Upward)
    if (buoyantForce > 0.05) {
      const faLen = Math.min(65, buoyantForce * 12);
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(arrowCenterX + 12, arrowCenterY);
      ctx.lineTo(arrowCenterX + 12, arrowCenterY - faLen);
      ctx.stroke();

      // Arrowhead FA
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.moveTo(arrowCenterX + 12, arrowCenterY - faLen - 6);
      ctx.lineTo(arrowCenterX + 7, arrowCenterY - faLen + 4);
      ctx.lineTo(arrowCenterX + 17, arrowCenterY - faLen + 4);
      ctx.closePath();
      ctx.fill();

      // Glowing Label FA
      ctx.fillText('F_A', arrowCenterX + 28, arrowCenterY - faLen / 2);
    }
    ctx.shadowBlur = 0;

  }, [materialKey, volumeCm3, liquidKey, gravity, immersionPercentage, weightAir, weightApparent, buoyantForce, selectedMaterial, selectedLiquid, submergedVolM3]);

  const handleRecord = () => {
    if (onDataRecorded) {
      onDataRecorded({
        v_object_cm3: `${volumeCm3} cm³`,
        material: selectedMaterial.name,
        density_material: `${selectedMaterial.density} kg/m³`,
        liquid: selectedLiquid.name,
        immersion_pct: `${immersionPercentage}%`,
        weight_air_P1: `${weightAir.toFixed(2)} N`,
        weight_submerged_P2: `${weightApparent.toFixed(2)} N`,
        buoyant_force_FA: `${buoyantForce.toFixed(2)} N`
      });
    }
  };

  return (
    <div className="sim-container flex flex-col lg:flex-row gap-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
      {/* Simulation Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={500}
          height={420}
          className="w-full max-w-[500px] h-[420px] rounded-xl border border-slate-800 shadow-2xl bg-slate-900"
        />

        {/* Submersion Slider Control */}
        <div className="mt-4 w-full max-w-[500px] bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-4">
          <Droplets className="w-5 h-5 text-cyan-400" />
          <span className="text-xs text-slate-300 font-bold whitespace-nowrap">
            {isEn ? 'Immersion Depth:' : 'Độ chìm vật thể:'}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={immersionPercentage}
            onChange={(e) => setImmersionPercentage(Number(e.target.value))}
            className="flex-1 accent-cyan-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-bold text-cyan-400 min-w-[40px] text-right">
            {immersionPercentage}%
          </span>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Droplets className="w-4 h-4" /> {isEn ? 'INPUT PARAMETERS' : 'Tham số Đầu vào'}
          </h3>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Object Material:' : 'Chất liệu vật thể:'}</label>
            <select
              value={materialKey}
              onChange={(e) => onParamChange('material', e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-medium focus:border-cyan-400 focus:outline-none"
            >
              <option value="aluminum">{isEn ? 'Aluminum (D = 2700 kg/m³)' : 'Nhôm (D = 2700 kg/m³)'}</option>
              <option value="iron">{isEn ? 'Iron (D = 7800 kg/m³)' : 'Sắt (D = 7800 kg/m³)'}</option>
              <option value="copper">{isEn ? 'Copper (D = 8900 kg/m³)' : 'Đồng (D = 8900 kg/m³)'}</option>
              <option value="wood">{isEn ? 'Wood (D = 700 kg/m³)' : 'Gỗ (D = 700 kg/m³)'}</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{isEn ? 'Object Volume V:' : 'Thể tích vật V:'}</span>
              <span className="text-cyan-400 font-bold">{volumeCm3} cm³</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={volumeCm3}
              onChange={(e) => onParamChange('volumeCm3', Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isEn ? 'Liquid Environment:' : 'Môi trường chất lỏng:'}</label>
            <select
              value={liquidKey}
              onChange={(e) => onParamChange('liquid', e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs font-medium focus:border-cyan-400 focus:outline-none"
            >
              <option value="water">{isEn ? 'Pure Water (d = 10,000 N/m³)' : 'Nước tinh khiết (d = 10,000 N/m³)'}</option>
              <option value="oil">{isEn ? 'Vegetable Oil (d = 8,000 N/m³)' : 'Dầu ăn (d = 8,000 N/m³)'}</option>
              <option value="alcohol">{isEn ? 'Medical Alcohol (d = 7,900 N/m³)' : 'Cồn y tế (d = 7,900 N/m³)'}</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
            📊 {isEn ? 'EXPERIMENTAL RESULTS' : 'Kết quả Đo lường Thực nghiệm'}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Weight P₁ (Air):' : 'Trọng lượng P₁ (KK):'}</span>
              <span className="text-rose-400 font-bold text-sm">{weightAir.toFixed(2)} N</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Weight P₂ (Submerged):' : 'Trọng lượng P₂ (Chìm):'}</span>
              <span className="text-emerald-400 font-bold text-sm">{weightApparent.toFixed(2)} N</span>
            </div>
          </div>

          <div className="bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/50 flex justify-between items-center text-xs">
            <div>
              <span className="text-cyan-300 font-semibold block">{isEn ? 'Buoyant Force F_A:' : 'Lực đẩy Archimedes F_A:'}</span>
              <span className="text-slate-400 text-[10px]">F_A = P₁ - P₂ = d × V_submerged</span>
            </div>
            <span className="font-extrabold text-sm px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {buoyantForce.toFixed(2)} N
            </span>
          </div>

          <button
            onClick={handleRecord}
            className="mt-1 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg transition-all shadow-md active:scale-95"
          >
            ➕ {isEn ? 'Record Experiment Data' : 'Ghi vào Bảng Số liệu Thí nghiệm'}
          </button>
        </div>
      </div>
    </div>
  );
}
