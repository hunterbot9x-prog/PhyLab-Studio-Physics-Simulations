import React from 'react';
import { Sliders, X, Move, RotateCw } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function Inspector3D({ lang, component, onUpdateComponent, onClose }) {
  const isEn = lang === 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  if (!component) return null;

  const handleChange = (key, value) => {
    onUpdateComponent(component.id, { [key]: value });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-xl text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
          <Sliders className="w-4 h-4" /> {isEn ? `3D Inspector: ${component.label}` : `Bảng Thông Số 3D Inspector: ${component.label}`}
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Position X & Z Controls */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>{isEn ? 'Position X (3D):' : 'Vị trí X (3D):'}</span>
            <span className="text-cyan-400 font-bold">{Math.round(component.x)}</span>
          </div>
          <input
            type="range" min="-150" max="150" step="5"
            value={component.x}
            onChange={(e) => handleChange('x', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>{isEn ? 'Position Z (3D):' : 'Vị trí Z (3D):'}</span>
            <span className="text-cyan-400 font-bold">{Math.round(component.z)}</span>
          </div>
          <input
            type="range" min="-150" max="150" step="5"
            value={component.z}
            onChange={(e) => handleChange('z', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      </div>

      {/* Specific Physics Values */}
      {component.type === 'battery' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Source Voltage U:' : 'Điện áp Nguồn U:'}</span>
            <span className="text-amber-400 font-bold">{component.voltage || 12} V</span>
          </div>
          <input
            type="range" min="1" max="24" step="1"
            value={component.voltage || 12}
            onChange={(e) => handleChange('voltage', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      )}

      {component.type === 'resistor' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Resistance R:' : 'Điện trở R:'}</span>
            <span className="text-amber-400 font-bold">{component.r || 20} Ω</span>
          </div>
          <input
            type="range" min="2" max="100" step="2"
            value={component.r || 20}
            onChange={(e) => handleChange('r', Number(e.target.value))}
            className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      )}

      {component.type === 'laser' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Wavelength λ:' : 'Bước sóng λ:'}</span>
            <span className="text-purple-400 font-bold">{component.wavelengthNm || 650} nm</span>
          </div>
          <input
            type="range" min="400" max="700" step="10"
            value={component.wavelengthNm || 650}
            onChange={(e) => handleChange('wavelengthNm', Number(e.target.value))}
            className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      )}

      {component.type === 'spring' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Stiffness k:' : 'Độ cứng k:'}</span>
            <span className="text-cyan-400 font-bold">{component.k || 50} N/m</span>
          </div>
          <input
            type="range" min="10" max="150" step="5"
            value={component.k || 50}
            onChange={(e) => handleChange('k', Number(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      )}

      {component.type === 'mass' && (
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{isEn ? 'Mass m:' : 'Khối lượng m:'}</span>
            <span className="text-purple-400 font-bold">{component.massGrams || 200} g</span>
          </div>
          <input
            type="range" min="50" max="500" step="25"
            value={component.massGrams || 200}
            onChange={(e) => handleChange('massGrams', Number(e.target.value))}
            className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
