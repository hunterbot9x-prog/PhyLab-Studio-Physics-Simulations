import React, { useState, useEffect, useRef } from 'react';
import { Zap, Plus, Trash2, Play, Pause, Activity, ToggleLeft, ToggleRight, Sparkles, CheckCircle2, AlertTriangle, Network, Info, Move, MousePointer, Sliders, X, Lightbulb } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function InteractiveWiringWorkbench({ lang }) {
  const isEn = lang === 'en';
  const canvasRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [components, setComponents] = useState([
    { id: 'batt1', type: 'battery', label: isEn ? '12V Battery Source' : 'Nguồn Pin 12V', x: 100, y: 220, voltage: 12 },
    { id: 'sw1', type: 'switch', label: isEn ? 'Switch K' : 'Công tắc K', x: 260, y: 90, isClosed: true },
    { id: 'res1', type: 'resistor', label: isEn ? 'Resistor R1 (20Ω)' : 'Điện trở R1 (20Ω)', x: 440, y: 90, r: 20 },
    { id: 'amm1', type: 'ammeter', label: isEn ? 'Ammeter A (Series)' : 'Ampe kế A (Nối tiếp)', x: 590, y: 220 },
    { id: 'vol1', type: 'voltmeter', label: isEn ? 'Voltmeter V (Parallel)' : 'Vôn kế V (Song song)', x: 440, y: 280 }
  ]);

  const [wires, setWires] = useState([
    { id: 'w1', fromId: 'batt1', fromPin: 'pos', toId: 'sw1', toPin: 'pin1' },
    { id: 'w2', fromId: 'sw1', fromPin: 'pin2', toId: 'res1', toPin: 'pin1' },
    { id: 'w3', fromId: 'res1', fromPin: 'pin2', toId: 'amm1', toPin: 'pos' },
    { id: 'w4', fromId: 'amm1', fromPin: 'neg', toId: 'batt1', toPin: 'neg' },
    { id: 'w5', fromId: 'vol1', fromPin: 'pos', toId: 'res1', toPin: 'pin1' },
    { id: 'w6', fromId: 'vol1', fromPin: 'neg', toId: 'res1', toPin: 'pin2' }
  ]);

  const [selectedPin, setSelectedPin] = useState(null);
  const [currentMousePos, setCurrentMousePos] = useState({ x: 0, y: 0 });
  const [draggingCompId, setDraggingCompId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedCompId, setSelectedCompId] = useState('res1'); // Default select R1
  const [animOffset, setAnimOffset] = useState(0);

  const [circuitStatus, setCircuitStatus] = useState({
    isClosed: true,
    totalVoltage: 12,
    totalResistance: 20,
    currentAmp: 0.6,
    voltmeterVal: 12,
    message: isEn ? '🟢 CLOSED CIRCUIT: Current is flowing!' : 'Mạch kín - Dòng điện đang chạy!'
  });

  const getComponentPins = (comp) => {
    const { x, y, type } = comp;
    switch (type) {
      case 'battery':
        return [
          { id: 'pos', label: '(+)', x: x - 40, y: y, dir: 'left' },
          { id: 'neg', label: '(-)', x: x + 40, y: y, dir: 'right' }
        ];
      case 'resistor':
      case 'bulb':
        return [
          { id: 'pin1', label: 'A', x: x - 38, y: y, dir: 'left' },
          { id: 'pin2', label: 'B', x: x + 38, y: y, dir: 'right' }
        ];
      case 'switch':
        return [
          { id: 'pin1', label: 'K1', x: x - 32, y: y, dir: 'left' },
          { id: 'pin2', label: 'K2', x: x + 32, y: y, dir: 'right' }
        ];
      case 'ammeter':
        return [
          { id: 'pos', label: '(+)', x: x, y: y - 32, dir: 'top' },
          { id: 'neg', label: '(-)', x: x, y: y + 32, dir: 'bottom' }
        ];
      case 'voltmeter':
        return [
          { id: 'pos', label: '(+)', x: x - 28, y: y - 28, dir: 'top' },
          { id: 'neg', label: '(-)', x: x + 28, y: y - 28, dir: 'top' }
        ];
      default:
        return [];
    }
  };

  // Nodal Kirchhoff Circuit Solver
  useEffect(() => {
    const batteries = components.filter(c => c.type === 'battery');
    const resistors = components.filter(c => c.type === 'resistor' || c.type === 'bulb');
    const switches = components.filter(c => c.type === 'switch');

    const openSwitch = switches.find(s => !s.isClosed);
    if (openSwitch || batteries.length === 0) {
      setCircuitStatus({
        isClosed: false,
        totalVoltage: 0,
        totalResistance: 0,
        currentAmp: 0,
        voltmeterVal: 0,
        message: isEn
          ? '🔴 OPEN CIRCUIT (SWITCH OFF OR NO POWER SOURCE): Current I = 0.00A.'
          : '🔴 MẠCH HỞ (TẮT CÔNG TẮC HOẶC KHÔNG CÓ NGUỒN): Dòng điện I = 0.00A.'
      });
      return;
    }

    const adj = {};
    const addEdge = (u, v) => {
      if (!adj[u]) adj[u] = [];
      if (!adj[v]) adj[v] = [];
      adj[u].push(v);
      adj[v].push(u);
    };

    wires.forEach(w => addEdge(`${w.fromId}:${w.fromPin}`, `${w.toId}:${w.toPin}`));
    components.forEach(comp => {
      if (comp.type === 'resistor' || comp.type === 'bulb') addEdge(`${comp.id}:pin1`, `${comp.id}:pin2`);
      else if (comp.type === 'switch' && comp.isClosed) addEdge(`${comp.id}:pin1`, `${comp.id}:pin2`);
      else if (comp.type === 'ammeter') addEdge(`${comp.id}:pos`, `${comp.id}:neg`);
    });

    const mainBatt = batteries[0];
    const startNode = `${mainBatt.id}:pos`;
    const targetNode = `${mainBatt.id}:neg`;
    const visited = new Set();
    const queue = [startNode];
    visited.add(startNode);
    let isLoopClosed = false;

    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr === targetNode) {
        isLoopClosed = true;
        break;
      }
      const neighbors = adj[curr] || [];
      for (const nxt of neighbors) {
        if (!visited.has(nxt)) {
          visited.add(nxt);
          queue.push(nxt);
        }
      }
    }

    if (!isLoopClosed) {
      setCircuitStatus({
        isClosed: false,
        totalVoltage: 0,
        totalResistance: 0,
        currentAmp: 0,
        voltmeterVal: 0,
        message: isEn
          ? '⚠️ OPEN CIRCUIT: Wires are not connected in a closed loop from (+) to (-) battery terminal!'
          : '⚠️ MẠCH HỞ: Dây điện chưa nối kín từ cực (+) về cực (-) của Pin!'
      });
      return;
    }

    let E_total = 0;
    batteries.forEach(b => {
      if (visited.has(`${b.id}:pos`) || visited.has(`${b.id}:neg`)) E_total += (b.voltage || 12);
    });
    if (E_total === 0) E_total = 12;

    const activeResistors = resistors.filter(r => visited.has(`${r.id}:pin1`) || visited.has(`${r.id}:pin2`));
    let R_total = 20;
    if (activeResistors.length === 0) R_total = 1;
    else if (activeResistors.length === 1) R_total = activeResistors[0].r || 20;
    else {
      const resistorNodes = activeResistors.map(r => {
        const pin1Wired = wires.filter(w => (w.fromId === r.id && w.fromPin === 'pin1') || (w.toId === r.id && w.toPin === 'pin1'));
        const pin2Wired = wires.filter(w => (w.fromId === r.id && w.fromPin === 'pin2') || (w.toId === r.id && w.toPin === 'pin2'));
        return { r: r.r || 20, p1Count: pin1Wired.length, p2Count: pin2Wired.length };
      });
      const isParallel = resistorNodes.length >= 2 && resistorNodes.every(rn => rn.p1Count >= 1 && rn.p2Count >= 1);
      if (isParallel) {
        let invR = 0;
        activeResistors.forEach(r => invR += 1 / (r.r || 20));
        R_total = 1 / invR;
      } else {
        let sumR = 0;
        activeResistors.forEach(r => sumR += (r.r || 20));
        R_total = sumR;
      }
    }

    const I_total = E_total / R_total;
    setCircuitStatus({
      isClosed: true,
      totalVoltage: E_total,
      totalResistance: R_total,
      currentAmp: I_total,
      voltmeterVal: E_total,
      message: isEn
        ? `🟢 CLOSED CIRCUIT: Total Voltage E = ${E_total}V, Resistance R_eq = ${R_total.toFixed(1)}Ω ➔ Current I = ${I_total.toFixed(2)}A.`
        : `🟢 MẠCH KÍN: Tổng Pin E = ${E_total}V, Điện trở R_tđ = ${R_total.toFixed(1)}Ω ➔ Dòng điện I = ${I_total.toFixed(2)}A.`
    });
  }, [components, wires, isEn]);

  // Electron Animation Loop
  useEffect(() => {
    let animId;
    if (circuitStatus.isClosed) {
      const step = () => {
        setAnimOffset(prev => (prev + 1.2 * (circuitStatus.currentAmp || 0.6)) % 20);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [circuitStatus]);

  const handleAddComponent = (type, label, extra = {}) => {
    const newId = `${type}_${Date.now()}`;
    const newComp = { id: newId, type, label, x: 320 + (Math.random() - 0.5) * 60, y: 180 + (Math.random() - 0.5) * 60, ...extra };
    setComponents(prev => [...prev, newComp]);
    setSelectedCompId(newId);
  };

  const handleDeleteComponent = (id) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    setWires(prev => prev.filter(w => w.fromId !== id && w.toId !== id));
    if (selectedCompId === id) setSelectedCompId(null);
  };

  const handleUpdateSelectedCompProps = (key, val) => {
    if (!selectedCompId) return;
    setComponents(prev => prev.map(c => c.id === selectedCompId ? { ...c, [key]: val } : c));
  };

  const handleResetToStandard = () => {
    setComponents([
      { id: 'batt1', type: 'battery', label: isEn ? '12V Battery Source' : 'Nguồn Pin 12V', x: 100, y: 220, voltage: 12 },
      { id: 'sw1', type: 'switch', label: isEn ? 'Switch K' : 'Công tắc K', x: 260, y: 90, isClosed: true },
      { id: 'res1', type: 'resistor', label: isEn ? 'Resistor R1 (20Ω)' : 'Điện trở R1 (20Ω)', x: 440, y: 90, r: 20 },
      { id: 'amm1', type: 'ammeter', label: isEn ? 'Ammeter A (Series)' : 'Ampe kế A (Nối tiếp)', x: 590, y: 220 },
      { id: 'vol1', type: 'voltmeter', label: isEn ? 'Voltmeter V (Parallel)' : 'Vôn kế V (Song song)', x: 440, y: 280 }
    ]);
    setWires([
      { id: 'w1', fromId: 'batt1', fromPin: 'pos', toId: 'sw1', toPin: 'pin1' },
      { id: 'w2', fromId: 'sw1', fromPin: 'pin2', toId: 'res1', toPin: 'pin1' },
      { id: 'w3', fromId: 'res1', fromPin: 'pin2', toId: 'amm1', toPin: 'pos' },
      { id: 'w4', fromId: 'amm1', fromPin: 'neg', toId: 'batt1', toPin: 'neg' },
      { id: 'w5', fromId: 'vol1', fromPin: 'pos', toId: 'res1', toPin: 'pin1' },
      { id: 'w6', fromId: 'vol1', fromPin: 'neg', toId: 'res1', toPin: 'pin2' }
    ]);
    setSelectedPin(null);
    setSelectedCompId('res1');
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (const comp of components) {
      const pins = getComponentPins(comp);
      for (const pin of pins) {
        if (Math.hypot(pin.x - mx, pin.y - my) <= 14) {
          if (!selectedPin) setSelectedPin({ compId: comp.id, pinId: pin.id, label: `${comp.label} [${pin.label}]`, x: pin.x, y: pin.y });
          else {
            if (selectedPin.compId !== comp.id) {
              setWires(prev => [...prev, { id: `wire_${Date.now()}`, fromId: selectedPin.compId, fromPin: selectedPin.pinId, toId: comp.id, toPin: pin.id }]);
            }
            setSelectedPin(null);
          }
          return;
        }
      }
    }

    for (let i = components.length - 1; i >= 0; i--) {
      const comp = components[i];
      if (Math.hypot(comp.x - mx, comp.y - my) <= 35) {
        setDraggingCompId(comp.id);
        setSelectedCompId(comp.id);
        setDragOffset({ x: mx - comp.x, y: my - comp.y });
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setCurrentMousePos({ x: mx, y: my });
    if (draggingCompId) setComponents(prev => prev.map(c => c.id === draggingCompId ? { ...c, x: mx - dragOffset.x, y: my - dragOffset.y } : c));
  };

  const handleMouseUp = () => setDraggingCompId(null);

  // Canvas Drawing Engine (NEAT ORTHOGONAL / ADAPTIVE BEZIER WIRES)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Dark Circuit Workbench Grid
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    for (let x = 0; x < w; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    const getPinCoords = (compId, pinId) => {
      const comp = components.find(c => c.id === compId);
      if (!comp) return { x: 0, y: 0, dir: 'left' };
      const pins = getComponentPins(comp);
      const pin = pins.find(p => p.id === pinId);
      return pin ? { x: pin.x, y: pin.y, dir: pin.dir } : { x: comp.x, y: comp.y, dir: 'left' };
    };

    // Draw Smooth Wires without Overlapping Text
    wires.forEach(wire => {
      const start = getPinCoords(wire.fromId, wire.fromPin);
      const end = getPinCoords(wire.toId, wire.toPin);

      // Adaptive Control Points based on pin direction
      let cp1x = start.x;
      let cp1y = start.y;
      let cp2x = end.x;
      let cp2y = end.y;

      const offset = Math.min(80, Math.hypot(end.x - start.x, end.y - start.y) * 0.4);

      if (start.dir === 'left') cp1x -= offset;
      else if (start.dir === 'right') cp1x += offset;
      else if (start.dir === 'top') cp1y -= offset;
      else if (start.dir === 'bottom') cp1y += offset;

      if (end.dir === 'left') cp2x -= offset;
      else if (end.dir === 'right') cp2x += offset;
      else if (end.dir === 'top') cp2y -= offset;
      else if (end.dir === 'bottom') cp2y += offset;

      ctx.strokeStyle = circuitStatus.isClosed ? '#00f2fe' : '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, end.x, end.y);
      ctx.stroke();

      // Flowing Electron Dots along Wire
      if (circuitStatus.isClosed) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 6;
        for (let i = 0; i < 6; i++) {
          const t = (i / 6 + animOffset / 20) % 1;
          const cx = Math.pow(1 - t, 3) * start.x + 3 * Math.pow(1 - t, 2) * t * cp1x + 3 * (1 - t) * Math.pow(t, 2) * cp2x + Math.pow(t, 3) * end.x;
          const cy = Math.pow(1 - t, 3) * start.y + 3 * Math.pow(1 - t, 2) * t * cp1y + 3 * (1 - t) * Math.pow(t, 2) * cp2y + Math.pow(t, 3) * end.y;
          ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    });

    // Active Wire Drawing Line
    if (selectedPin) {
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(selectedPin.x, selectedPin.y); ctx.lineTo(currentMousePos.x, currentMousePos.y); ctx.stroke(); ctx.setLineDash([]);
    }

    // Render Circuit Components
    components.forEach(comp => {
      const isSelected = comp.id === selectedCompId;
      if (isSelected) {
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(comp.x, comp.y, 44, 0, Math.PI * 2); ctx.stroke();
      }

      switch (comp.type) {
        case 'battery':
          ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(comp.x - 40, comp.y - 20, 80, 40, 8); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#38bdf8'; ctx.font = 'extrabold 12px Inter'; ctx.textAlign = 'center'; ctx.fillText(`Pin ${comp.voltage || 12}V`, comp.x, comp.y + 4);
          break;
        case 'resistor':
          // Joule Heat Glow
          if (circuitStatus.isClosed) {
            ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 10;
          }
          ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(comp.x - 35, comp.y - 15, 70, 30, 6); ctx.fill(); ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#f59e0b'; ctx.font = 'extrabold 11px Inter'; ctx.textAlign = 'center'; ctx.fillText(`R = ${comp.r || 20}Ω`, comp.x, comp.y + 4);
          break;
        case 'bulb':
          // Incandescent Bulb Filament Glow
          const glowI = circuitStatus.isClosed ? Math.min(1, circuitStatus.currentAmp / 1.0) : 0;
          if (glowI > 0.05) {
            const glowGrad = ctx.createRadialGradient(comp.x, comp.y, 2, comp.x, comp.y, 35 * glowI);
            glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
            glowGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');
            ctx.fillStyle = glowGrad; ctx.beginPath(); ctx.arc(comp.x, comp.y, 35 * glowI, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = glowI > 0.1 ? 'rgba(254, 240, 138, 0.8)' : '#0f172a'; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(comp.x, comp.y, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center'; ctx.fillText(`Đèn ${comp.r || 20}Ω`, comp.x, comp.y + 4);
          break;
        case 'switch':
          ctx.fillStyle = '#1e293b'; ctx.strokeStyle = comp.isClosed ? '#10b981' : '#f43f5e'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(comp.x - 30, comp.y - 15, 60, 30, 6); ctx.fill(); ctx.stroke();
          ctx.fillStyle = comp.isClosed ? '#10b981' : '#f43f5e'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center'; ctx.fillText(`K (${comp.isClosed ? (isEn ? 'CLOSED' : 'ĐÓNG') : (isEn ? 'OPEN' : 'MỞ')})`, comp.x, comp.y + 4);
          break;
        case 'ammeter':
          ctx.fillStyle = '#090d16'; ctx.strokeStyle = '#00f2fe'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(comp.x, comp.y, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#00f2fe'; ctx.font = 'extrabold 11px Inter'; ctx.textAlign = 'center'; ctx.fillText(`A: ${circuitStatus.isClosed ? circuitStatus.currentAmp.toFixed(2) : '0.00'}A`, comp.x, comp.y + 4);
          break;
        case 'voltmeter':
          ctx.fillStyle = '#090d16'; ctx.strokeStyle = '#e11d48'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(comp.x, comp.y, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#e11d48'; ctx.font = 'extrabold 11px Inter'; ctx.textAlign = 'center'; ctx.fillText(`V: ${circuitStatus.isClosed ? circuitStatus.voltmeterVal.toFixed(1) : '0.0'}V`, comp.x, comp.y + 4);
          break;
      }

      // Draw Component Label (Above Component)
      const getDisplayLabel = (c) => {
        if (!isEn) return c.label;
        switch (c.type) {
          case 'battery': return `Battery ${c.voltage || 12}V`;
          case 'switch': return 'Switch K';
          case 'resistor': return `Resistor (${c.r || 20}Ω)`;
          case 'ammeter': return 'Ammeter A';
          case 'voltmeter': return 'Voltmeter V';
          case 'bulb': return `Light Bulb (${c.r || 20}Ω)`;
          default: return c.label;
        }
      };

      ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center'; ctx.fillText(getDisplayLabel(comp), comp.x, comp.y - 32);

      // Render Connection Pins with Clear Margins
      getComponentPins(comp).forEach(pin => {
        ctx.fillStyle = selectedPin?.pinId === pin.id && selectedPin?.compId === comp.id ? '#f59e0b' : '#38bdf8';
        ctx.beginPath(); ctx.arc(pin.x, pin.y, 6, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
        const pinLabelY = pin.dir === 'bottom' ? pin.y + 14 : pin.y - 9;
        ctx.fillText(pin.label, pin.x, pinLabelY);
      });
    });
  }, [components, wires, selectedPin, selectedCompId, draggingCompId, currentMousePos, circuitStatus, animOffset, isEn]);

  const selectedComp = components.find(c => c.id === selectedCompId);

  return (
    <div className="flex flex-col gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <MousePointer className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              {isEn ? 'Interactive Circuit Builder & Nodal Solver' : 'Bàn Nối Mạch Điện Trực Quan & Giải Mạch Nodal Kirchhoff'}
            </h3>
            <p className="text-[11px] text-slate-400">
              💡 <strong>{isEn ? 'Guide:' : 'Hướng dẫn:'}</strong> {isEn ? 'Click component to' : 'Click khối để'} <span className="text-amber-400 font-bold">{isEn ? 'CUSTOMIZE VALUES / VOLTAGE / RESISTANCE' : 'CHỈNH SỬA ĐIỆN ÁP / ĐIỆN TRỞ TỨC THÌ'}</span> | {isEn ? 'Click pin to' : 'Click chân cắm để'} <span className="text-cyan-400 font-bold">{isEn ? 'WIRE CIRCUIT' : 'NỐI DÂY ĐIỆN'}</span>
            </p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border ${circuitStatus.isClosed ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50' : 'bg-rose-950/80 text-rose-400 border-rose-500/50'}`}>
          {circuitStatus.isClosed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{circuitStatus.message}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        {/* Interactive Canvas */}
        <div className="lg:col-span-3 relative">
          <canvas
            ref={canvasRef}
            width={680}
            height={400}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-[400px] rounded-xl border border-slate-800 bg-slate-950 shadow-2xl cursor-crosshair"
          />
          {selectedPin && (
            <div className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 animate-bounce pointer-events-none">
              <span>🔗 {isEn ? `Wiring from: ${selectedPin.label}. Click 2nd pin to complete wire!` : `Đang nối dây từ: ${selectedPin.label}. Click chân cắm thứ 2 để nối dây!`}</span>
            </div>
          )}
        </div>

        {/* Sidebar Inspector & Controls */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {/* COMPONENT VALUE INSPECTOR & QUICK PRESETS CARD */}
          {selectedComp ? (
            <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/50 flex flex-col gap-3 shadow-xl text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-extrabold text-cyan-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> {isEn ? `Inspector: ${selectedComp.label}` : `Chỉnh Sửa Linh Kiện: ${selectedComp.label}`}
                </span>
                <button onClick={() => setSelectedCompId(null)} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* BATTERY VOLTAGE SLIDER & PRESET BUTTONS */}
              {selectedComp.type === 'battery' && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{isEn ? 'Source Voltage U:' : 'Điện áp Nguồn U:'}</span>
                    <span className="text-amber-400 font-bold">{selectedComp.voltage || 12} V</span>
                  </div>
                  <input
                    type="range" min="1" max="24" step="1"
                    value={selectedComp.voltage || 12}
                    onChange={(e) => handleUpdateSelectedCompProps('voltage', Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    {[3, 6, 9, 12, 24].map(v => (
                      <button
                        key={v}
                        onClick={() => handleUpdateSelectedCompProps('voltage', v)}
                        className={`py-1 rounded text-[11px] font-bold ${
                          selectedComp.voltage === v ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* RESISTOR & BULB RESISTANCE SLIDER & PRESET BUTTONS */}
              {(selectedComp.type === 'resistor' || selectedComp.type === 'bulb') && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{isEn ? 'Resistance R:' : 'Điện trở R:'}</span>
                    <span className="text-amber-400 font-bold">{selectedComp.r || 20} Ω</span>
                  </div>
                  <input
                    type="range" min="2" max="100" step="2"
                    value={selectedComp.r || 20}
                    onChange={(e) => handleUpdateSelectedCompProps('r', Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="grid grid-cols-4 gap-1 mt-1">
                    {[5, 10, 20, 50, 100].map(rVal => (
                      <button
                        key={rVal}
                        onClick={() => handleUpdateSelectedCompProps('r', rVal)}
                        className={`py-1 rounded text-[11px] font-bold ${
                          selectedComp.r === rVal ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {rVal}Ω
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SWITCH TOGGLE BUTTON */}
              {selectedComp.type === 'switch' && (
                <button
                  onClick={() => handleUpdateSelectedCompProps('isClosed', !selectedComp.isClosed)}
                  className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 ${
                    selectedComp.isClosed ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                  }`}
                >
                  <ToggleRight className="w-4 h-4" />
                  <span>{selectedComp.isClosed ? (isEn ? 'SWITCH CLOSED (ON)' : 'CÔNG TẮC ĐÓNG (BẬT)') : (isEn ? 'SWITCH OPEN (OFF)' : 'CÔNG TẮC MỞ (TẮT)')}</span>
                </button>
              )}

              <button
                onClick={() => handleDeleteComponent(selectedComp.id)}
                className="w-full mt-1 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all border border-rose-500/30"
              >
                <Trash2 className="w-4 h-4" /> {isEn ? 'DELETE THIS COMPONENT' : 'XÓA LINH KIỆN NÀY'}
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> {isEn ? 'Add Components' : 'Thêm Linh Kiện Vào Mạch'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => handleAddComponent('battery', isEn ? 'Battery 12V' : 'Pin 12V', { voltage: 12 })} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">⚡ {isEn ? '+ 12V Battery' : 'Thêm Pin 12V'}</button>
                <button onClick={() => handleAddComponent('resistor', isEn ? 'Resistor R' : 'Điện trở R', { r: 20 })} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">🔌 {isEn ? '+ Resistor R' : 'Điện trở R'}</button>
                <button onClick={() => handleAddComponent('bulb', isEn ? 'Light Bulb' : 'Bóng đèn L', { r: 20 })} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">💡 {isEn ? '+ Light Bulb' : 'Bóng đèn L'}</button>
                <button onClick={() => handleAddComponent('switch', isEn ? 'Switch K' : 'Công tắc K', { isClosed: true })} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">🎚️ {isEn ? '+ Switch K' : 'Công tắc K'}</button>
                <button onClick={() => handleAddComponent('ammeter', isEn ? 'Ammeter A' : 'Ampe kế A', {})} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">🅰️ {isEn ? '+ Ammeter A' : 'Ampe kế A'}</button>
                <button onClick={() => handleAddComponent('voltmeter', isEn ? 'Voltmeter V' : 'Vôn kế V', {})} className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 font-bold">Ⓥ {isEn ? '+ Voltmeter V' : 'Vôn kế V'}</button>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
            <button onClick={() => setComponents(prev => prev.map(c => c.type === 'switch' ? { ...c, isClosed: !c.isClosed } : c))} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-lg">
              <ToggleRight className="w-4 h-4" /> {isEn ? 'TOGGLE ALL SWITCHES' : 'BẬT / TẮT TẤT CẢ CÔNG TẮC K'}
            </button>
            <button onClick={handleResetToStandard} className="w-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all border border-emerald-500/40">
              <Info className="w-4 h-4" /> {isEn ? 'Reset Standard Circuit' : 'Khôi Phục Sơ Đồ Chuẩn'}
            </button>
            <button onClick={() => setWires([])} className="w-full bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all">
              <Trash2 className="w-4 h-4" /> {isEn ? 'Remove All Wires' : 'Tháo Tất Cả Dây Điện'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
