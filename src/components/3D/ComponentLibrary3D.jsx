import React, { useState } from 'react';
import { Zap, Sun, Scale, Activity, Plus, Package } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function ComponentLibrary3D({ lang, onAddComponent }) {
  const isEn = lang === 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const [activeTab, setActiveTab] = useState('electricity');

  const libraryData = {
    electricity: [
      { type: 'battery', label: isEn ? '12V DC Power Source' : 'Nguồn Pin DC 12V', icon: '⚡', category: isEn ? 'Electric' : 'Điện', defaultVal: { voltage: 12 } },
      { type: 'resistor', label: isEn ? 'Resistor R (20Ω)' : 'Điện trở R (20Ω)', icon: '🔌', category: isEn ? 'Electric' : 'Điện', defaultVal: { r: 20 } },
      { type: 'ammeter', label: isEn ? '3D Ammeter' : 'Ampe kế 3D', icon: '🅰️', category: isEn ? 'Electric' : 'Điện', defaultVal: {} },
      { type: 'voltmeter', label: isEn ? '3D Voltmeter' : 'Vôn kế 3D', icon: 'Ⓥ', category: isEn ? 'Electric' : 'Điện', defaultVal: {} },
      { type: 'switch', label: isEn ? 'Switch K' : 'Công tắc K', icon: '🎚️', category: isEn ? 'Electric' : 'Điện', defaultVal: { isClosed: true } },
      { type: 'bulb', label: isEn ? '3D Light Bulb' : 'Bóng đèn 3D', icon: '💡', category: isEn ? 'Electric' : 'Điện', defaultVal: {} },
    ],
    optics: [
      { type: 'laser', label: isEn ? 'Laser Source (650nm)' : 'Nguồn Laser (650nm)', icon: '🔴', category: isEn ? 'Optics' : 'Quang', defaultVal: { wavelengthNm: 650 } },
      { type: 'lens', label: isEn ? 'Convex Lens' : 'Thấu kính Hội tụ', icon: '🔍', category: isEn ? 'Optics' : 'Quang', defaultVal: { focalLength: 20 } },
      { type: 'mirror', label: isEn ? '3D Flat Mirror' : 'Gương phẳng 3D', icon: '🪞', category: isEn ? 'Optics' : 'Quang', defaultVal: { angle: 45 } },
      { type: 'glassblock', label: isEn ? 'Glass Block n=1.52' : 'Khối Thủy tinh n=1.5', icon: '🧊', category: isEn ? 'Optics' : 'Quang', defaultVal: { n: 1.52 } },
      { type: 'screen', label: isEn ? '3D Projection Screen' : 'Màn hứng Ảnh 3D', icon: '🖼️', category: isEn ? 'Optics' : 'Quang', defaultVal: {} },
    ],
    mechanics: [
      { type: 'spring', label: 'Lò xo đàn hồi (k=50)', icon: '🌀', category: isEn ? 'Mechanics' : 'Cơ', defaultVal: { k: 50 } },
      { type: 'mass', label: isEn ? 'Standard Mass (200g)' : 'Quả cân (200g)', icon: '🧱', category: isEn ? 'Mechanics' : 'Cơ', defaultVal: { massGrams: 200 } },
      { type: 'cannon', label: isEn ? '3D Projectile Cannon' : 'Pháo Ném xiên 3D', icon: '🎯', category: isEn ? 'Mechanics' : 'Cơ', defaultVal: { v0: 25, angle: 45 } },
      { type: 'pendulum', label: isEn ? '3D Simple Pendulum' : 'Con lắc đơn 3D', icon: '⏱️', category: isEn ? 'Mechanics' : 'Cơ', defaultVal: { lengthM: 0.8 } },
      { type: 'lever', label: isEn ? 'Lever Arm O' : 'Thanh Đòn bẩy O', icon: '⚖️', category: isEn ? 'Mechanics' : 'Cơ', defaultVal: {} },
    ],
    nuclear: [
      { type: 'radioactive', label: isEn ? 'Radioactive Isotope Sample' : 'Mẫu Phóng xạ Isotope', icon: '☢️', category: isEn ? 'Nuclear' : 'Hạt nhân', defaultVal: { halfLifeSec: 10 } },
      { type: 'gmcounter', label: isEn ? 'Geiger-Müller GM Counter' : 'Ống đếm Geiger GM', icon: '📻', category: isEn ? 'Nuclear' : 'Hạt nhân', defaultVal: {} },
      { type: 'heater', label: isEn ? '3D Thermal Heater' : 'Bộ sưởi Nhiệt 3D', icon: '🔥', category: isEn ? 'Thermal' : 'Nhiệt', defaultVal: {} },
    ]
  };

  const tabs = [
    { id: 'electricity', label: isEn ? '⚡ Electricity' : '⚡ Điện - Từ', icon: Zap },
    { id: 'optics', label: isEn ? '💡 Optics' : '💡 Quang học', icon: Sun },
    { id: 'mechanics', label: isEn ? '⚖️ Mechanics' : '⚖️ Cơ học', icon: Scale },
    { id: 'nuclear', label: isEn ? '☢️ Nuclear / Thermal' : '☢️ Hạt nhân / Nhiệt', icon: Activity }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Package className="w-4 h-4" /> {isEn ? '3D Modular Component Library' : 'Thư Viện Khối Dụng Cụ 3D Tách Rời'}
        </h3>
        <span className="text-[10px] text-slate-400">{isEn ? 'Click to add component to 3D workbench' : 'Click để thêm khối vào bàn 3D'}</span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Palette */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {libraryData[activeTab]?.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onAddComponent?.(item)}
            className="group bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 p-2.5 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center active:scale-95 shadow-md"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-[11px] font-bold text-slate-200 line-clamp-1">{item.label}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 flex items-center gap-0.5">
              <Plus className="w-2.5 h-2.5" /> {isEn ? 'Add' : 'Thêm'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
