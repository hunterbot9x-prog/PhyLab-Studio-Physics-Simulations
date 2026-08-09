import React from 'react';
import { Layers, Sparkles, Trash2 } from 'lucide-react';

export default function PresetsManager({ onLoadPreset, onClearWorkbench }) {
  const presets = [
    {
      id: 'circuit3d',
      name: '⚡ Mạch điện Ôm 3D',
      components: [
        { id: 'b1', type: 'battery', label: 'Nguồn Pin DC (12V)', x: -80, z: 0, voltage: 12, valStr: '12V' },
        { id: 'r1', type: 'resistor', label: 'Điện trở R1 (20Ω)', x: 0, z: -60, r: 20, valStr: '20Ω' },
        { id: 'a1', type: 'ammeter', label: 'Ampe kế 3D', x: 80, z: 0, valStr: '0.6A' },
        { id: 'sw1', type: 'switch', label: 'Công tắc K', x: 0, z: 60, isClosed: true }
      ]
    },
    {
      id: 'optics3d',
      name: '💡 Trục Quang học 3D',
      components: [
        { id: 'l1', type: 'laser', label: 'Đèn Laser Đỏ', x: -120, z: 0, wavelengthNm: 650, valStr: '650nm' },
        { id: 'lens1', type: 'lens', label: 'Thấu kính Hội tụ', x: 0, z: 0, focalLength: 20, valStr: 'f=20cm' },
        { id: 's1', type: 'screen', label: 'Màn hứng Ảnh 3D', x: 120, z: 0, valStr: 'd\'=60cm' }
      ]
    },
    {
      id: 'mechanics3d',
      name: '⚖️ Thí nghiệm Lò xo 3D',
      components: [
        { id: 'sp1', type: 'spring', label: 'Lò xo đàn hồi', x: 0, z: -30, k: 50, valStr: 'k=50N/m' },
        { id: 'm1', type: 'mass', label: 'Quả cân (200g)', x: 0, z: 30, massGrams: 200, valStr: '200g' }
      ]
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold text-slate-200">Mẫu Lắp Ráp 3D Mẫu:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => onLoadPreset(p.components)}
              className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-xs font-bold text-slate-300 hover:text-cyan-300 transition-all active:scale-95 shadow-md"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onClearWorkbench}
        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1 transition-all"
        title="Dọn sạch bàn 3D"
      >
        <Trash2 className="w-3.5 h-3.5" /> Dọn Bàn 3D
      </button>
    </div>
  );
}
