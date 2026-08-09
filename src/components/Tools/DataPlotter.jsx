import React from 'react';
import { Table, Trash2, Download, LineChart } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function DataPlotter({ dataPoints, onClearData, onOpenReport, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  if (!dataPoints || dataPoints.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
        <LineChart className="w-8 h-8 text-slate-600" />
        <div className="text-sm font-semibold text-slate-400">{t.emptyDataTable}</div>
        <p className="text-xs text-slate-500 max-w-sm">
          {t.emptyDataTableHint}
        </p>
      </div>
    );
  }

  // Get keys of data object
  const keys = Object.keys(dataPoints[0]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <Table className="w-4 h-4" /> {t.dataTableSection} ({dataPoints.length})
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReport}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" /> {t.exportReport}
          </button>

          <button
            onClick={onClearData}
            className="bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs p-1.5 rounded-lg transition-all"
            title="Delete Data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-cyan-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-2.5 text-center">{t.stt}</th>
              {keys.map((k) => (
                <th key={k} className="p-2.5 capitalize">{k.replace(/([A-Z])/g, ' $1')}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {dataPoints.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="p-2.5 text-center text-slate-500 font-bold">{idx + 1}</td>
                {keys.map((k) => (
                  <td key={k} className="p-2.5 text-slate-200">{row[k]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
