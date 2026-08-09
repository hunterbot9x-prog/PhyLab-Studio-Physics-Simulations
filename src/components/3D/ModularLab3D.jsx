import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Move, Trash2, Zap, Play, Pause, Sparkles, Sliders } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function ModularLab3D({
  lang,
  placedComponents,
  selectedCompId,
  onSelectComponent,
  onRemoveComponent,
  onUpdateComponent,
  isSimulating,
  onToggleSimulate
}) {
  const canvasRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // 3D Camera Controls State
  const [camera, setCamera] = useState({
    rotX: 35, // deg
    rotY: 45, // deg
    zoom: 1.0,
    panX: 0,
    panY: 0
  });

  const [isDraggingCam, setIsDraggingCam] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle Camera Drag (Rotate 360 deg)
  const handleMouseDown = (e) => {
    if (e.target.tagName === 'CANVAS') {
      setIsDraggingCam(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingCam) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setCamera(prev => ({
        ...prev,
        rotY: (prev.rotY + dx * 0.5) % 360,
        rotX: Math.max(10, Math.min(80, prev.rotX - dy * 0.5))
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCam(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
    setCamera(prev => ({
      ...prev,
      zoom: Math.max(0.6, Math.min(2.0, prev.zoom + zoomDelta))
    }));
  };

  // 3D Engine Projection & Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Dark Futuristic Cyber-Lab 3D Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#020408');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2 + camera.panX, height / 2 + camera.panY);
    ctx.scale(camera.zoom, camera.zoom);

    // 3D Isometric / Perspective Transformation Matrix
    const rotXRad = (camera.rotX * Math.PI) / 180;
    const rotYRad = (camera.rotY * Math.PI) / 180;

    const project3D = (x, y, z) => {
      // Rotate Y
      const x1 = x * Math.cos(rotYRad) - z * Math.sin(rotYRad);
      const z1 = x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      // Rotate X
      const y2 = y * Math.cos(rotXRad) - z1 * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z1 * Math.cos(rotXRad);
      return { px: x1, py: y2, depth: z2 };
    };

    // 2. Draw 3D Laboratory Grid Workbench Table (Mặt bàn thí nghiệm 3D)
    const tableSize = 360;
    const step = 40;

    ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
    ctx.lineWidth = 1;

    for (let x = -tableSize / 2; x <= tableSize / 2; x += step) {
      const p1 = project3D(x, 0, -tableSize / 2);
      const p2 = project3D(x, 0, tableSize / 2);
      ctx.beginPath(); ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke();
    }

    for (let z = -tableSize / 2; z <= tableSize / 2; z += step) {
      const p1 = project3D(-tableSize / 2, 0, z);
      const p2 = project3D(tableSize / 2, 0, z);
      ctx.beginPath(); ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke();
    }

    // Table Border Frame 3D
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    const c1 = project3D(-tableSize / 2, 0, -tableSize / 2);
    const c2 = project3D(tableSize / 2, 0, -tableSize / 2);
    const c3 = project3D(tableSize / 2, 0, tableSize / 2);
    const c4 = project3D(-tableSize / 2, 0, tableSize / 2);

    ctx.beginPath();
    ctx.moveTo(c1.px, c1.py); ctx.lineTo(c2.px, c2.py);
    ctx.lineTo(c3.px, c3.py); ctx.lineTo(c4.px, c4.py);
    ctx.closePath();
    ctx.stroke();

    // 3D Table Legs
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    [c1, c2, c3, c4].forEach(pt => {
      ctx.beginPath(); ctx.moveTo(pt.px, pt.py); ctx.lineTo(pt.px, pt.py + 80); ctx.stroke();
    });

    // 3. Sort placed 3D components by depth for back-to-front rendering
    const sortedComps = [...placedComponents].map(comp => {
      const p = project3D(comp.x, comp.y || 0, comp.z);
      return { ...comp, px: p.px, py: p.py, depth: p.depth };
    }).sort((a, b) => b.depth - a.depth);

    // 4. Render Wires / Optical Rays between connected 3D components
    render3DConnections(ctx, sortedComps, project3D, isSimulating);

    // 5. Render 3D Component Models on Workbench
    sortedComps.forEach(comp => {
      const isSelected = comp.id === selectedCompId;
      draw3DComponentBlock(ctx, comp, isSelected, isSimulating);
    });

    ctx.restore();

    // Compass indicator (Góc xoay Camera 3D)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`Camera X: ${Math.round(camera.rotX)}° | Y: ${Math.round(camera.rotY)}° | Zoom: ${(camera.zoom * 100).toFixed(0)}%`, 15, height - 15);

  }, [camera, placedComponents, selectedCompId, isSimulating]);

  // Render 3D Wires / Light Rays Helper
  const render3DConnections = (ctx, comps, project3D, isSim) => {
    // Check if optical components exist (Laser + Lens + Mirror + Screen)
    const laser = comps.find(c => c.type === 'laser');
    if (laser) {
      const start = project3D(laser.x, laser.y - 15, laser.z);
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(start.px, start.py);

      // Find optics in front
      const opticalTargets = comps.filter(c => c.type === 'lens' || c.type === 'mirror' || c.type === 'screen');
      if (opticalTargets.length > 0) {
        opticalTargets.forEach(target => {
          const tPt = project3D(target.x, target.y - 15, target.z);
          ctx.lineTo(tPt.px, tPt.py);
        });
      } else {
        const end = project3D(laser.x + 200, laser.y - 15, laser.z);
        ctx.lineTo(end.px, end.py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Check circuit wires between electrical components
    const electricComps = comps.filter(c => ['battery', 'resistor', 'ammeter', 'voltmeter', 'switch', 'bulb'].includes(c.type));
    if (electricComps.length > 1) {
      ctx.strokeStyle = isSim ? '#00f5d4' : '#475569';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 5]);

      for (let i = 0; i < electricComps.length - 1; i++) {
        const p1 = project3D(electricComps[i].x, electricComps[i].y - 10, electricComps[i].z);
        const p2 = project3D(electricComps[i + 1].x, electricComps[i + 1].y - 10, electricComps[i + 1].z);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }
      // Close loop if >= 3
      if (electricComps.length >= 3) {
        const pFirst = project3D(electricComps[0].x, electricComps[0].y - 10, electricComps[0].z);
        const pLast = project3D(electricComps[electricComps.length - 1].x, electricComps[electricComps.length - 1].y - 10, electricComps[electricComps.length - 1].z);
        ctx.beginPath(); ctx.moveTo(pLast.px, pLast.py); ctx.lineTo(pFirst.px, pFirst.py); ctx.stroke();
      }
      ctx.setLineDash([]);
    }
  };

  // Draw Individual 3D Component Models
  const draw3DComponentBlock = (ctx, comp, isSelected, isSim) => {
    const { px, py, type, label, valStr } = comp;

    // Selection Glow Aura
    if (isSelected) {
      ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py - 12, 28, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // Render 3D Mesh shapes according to type
    ctx.save();
    ctx.translate(px, py);

    switch (type) {
      case 'battery':
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(-18, -25, 36, 25, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#38bdf8'; ctx.fillRect(-6, -30, 12, 5);
        break;

      case 'resistor':
        ctx.fillStyle = '#f59e0b';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(-20, -18, 40, 18, 4); ctx.fill(); ctx.stroke();
        break;

      case 'laser':
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.roundRect(-22, -22, 44, 22, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#00f2fe'; ctx.beginPath(); ctx.arc(12, -11, 4, 0, 2 * Math.PI); ctx.fill();
        break;

      case 'lens':
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, -35); ctx.lineTo(0, 5); ctx.stroke();
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath(); ctx.arc(0, -35, 4, 0, 2 * Math.PI); ctx.fill();
        ctx.beginPath(); ctx.arc(0, 5, 4, 0, 2 * Math.PI); ctx.fill();
        break;

      case 'spring':
        ctx.strokeStyle = '#00f5d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -40);
        for (let i = 0; i < 6; i++) {
          ctx.lineTo(i % 2 === 0 ? 8 : -8, -40 + i * 6);
        }
        ctx.lineTo(0, 0);
        ctx.stroke();
        break;

      case 'mass':
        ctx.fillStyle = '#a855f7';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, -12, 14, 0, 2 * Math.PI); ctx.fill(); ctx.stroke();
        break;

      default:
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(-16, -18, 32, 18, 4); ctx.fill(); ctx.stroke();
        break;
    }

    // Component Text Label & Value
    ctx.fillStyle = isSelected ? '#00f2fe' : '#ffffff';
    ctx.font = 'bold 10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(label || type.toUpperCase(), 0, 12);

    if (valStr) {
      ctx.fillStyle = '#38bdf8';
      ctx.font = '9px Inter';
      ctx.fillText(valStr, 0, 24);
    }

    ctx.restore();
  };

  return (
    <div className="relative w-full h-[460px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* 3D Toolbar Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-auto">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">{lang === 'en' ? '3D Spatial Lab Workbench' : 'Bàn Thí Nghiệm 3D Không Gian'}</span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md font-mono">
            {placedComponents.length} {lang === 'en' ? 'components' : 'khối dụng cụ'}
          </span>
        </div>

        {/* Orbit Controls Actions */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800 pointer-events-auto">
          <button
            onClick={() => setCamera(prev => ({ ...prev, rotY: (prev.rotY + 45) % 360 }))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
            title="Xoay 360°"
          >
            <RotateCw className="w-3.5 h-3.5" /> {lang === 'en' ? 'Rotate 3D' : 'Xoay 3D'}
          </button>
          <button
            onClick={() => setCamera(prev => ({ ...prev, zoom: Math.min(2.0, prev.zoom + 0.15) }))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            title={lang === 'en' ? 'Zoom In' : 'Phóng to'}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCamera(prev => ({ ...prev, zoom: Math.max(0.6, prev.zoom - 0.15) }))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            title={lang === 'en' ? 'Zoom Out' : 'Thu nhỏ'}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleSimulate}
            className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
              isSimulating ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
            {isSimulating ? (lang === 'en' ? 'PAUSE 3D' : 'DỪNG 3D') : (lang === 'en' ? 'RUN 3D SIMULATION' : 'CHẠY MÔ PHỎNG 3D')}
          </button>
        </div>
      </div>

      {/* 3D WebGL / Canvas Viewport */}
      <canvas
        ref={canvasRef}
        width={760}
        height={460}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-slate-950"
      />

      {/* Selected Component Quick Action Bar */}
      {selectedCompId && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/50 flex items-center gap-3 shadow-2xl">
          <span className="text-xs font-bold text-cyan-400">
            {lang === 'en' ? 'Selected 3D component:' : 'Đang chọn khối:'} {placedComponents.find(c => c.id === selectedCompId)?.label}
          </span>
          <button
            onClick={() => onRemoveComponent(selectedCompId)}
            className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> {lang === 'en' ? 'Remove 3D Component' : 'Xóa khối 3D'}
          </button>
        </div>
      )}
    </div>
  );
}
