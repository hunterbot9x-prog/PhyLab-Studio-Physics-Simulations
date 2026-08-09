import React, { useState } from 'react';
import { X, Printer, FileText, Download } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function ReportModal({ isOpen, experiment, recordedData, onClose, lang }) {
  if (!isOpen || !experiment) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
  const isEn = lang === 'en';

  const [studentName, setStudentName] = useState(isEn ? 'John Doe' : 'Nguyễn Văn A');
  const [studentClass, setStudentClass] = useState(isEn ? `Grade ${experiment.grade}` : `Lớp ${experiment.grade}A1`);
  const [notes, setNotes] = useState(isEn ? 'Experimental data matches theoretical formulas.' : 'Kết quả đo đạc phù hợp với lý thuyết trong sách giáo khoa.');

  const handlePrint = () => {
    window.print();
  };

  const dataPoints = recordedData || [];
  const keys = dataPoints && dataPoints.length > 0 ? Object.keys(dataPoints[0]) : [];

  const handleExportCSV = () => {
    if (!dataPoints || dataPoints.length === 0) return;
    const headers = keys.join(',');
    const rows = dataPoints.map(row => keys.map(k => `"${row[k]}"`).join(','));
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n'); // UTF-8 BOM for Excel
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PhyLab_${experiment.id}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 print:hidden">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <FileText className="w-5 h-5" /> {t.exportReport}
          </div>
          <div className="flex items-center gap-2">
            {dataPoints && dataPoints.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" /> {isEn ? 'Export CSV' : 'Xuất File Excel/CSV'}
              </button>
            )}
            <button
              onClick={handlePrint}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" /> {t.printBtn}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-extrabold text-cyan-400 uppercase tracking-wider">
              {isEn ? 'PHYSICS PRACTICAL EXPERIMENT REPORT' : 'BÁO CÁO THỰC HÀNH THÍ NGHIỆM VẬT LÝ'}
            </h1>
            <p className="text-sm font-semibold text-slate-400">
              {lang === 'en' ? (experiment.titleEn || experiment.title) : experiment.title} ({lang === 'en' ? `Grade ${experiment.grade}` : experiment.gradeLabel})
            </p>
          </div>

          {/* Student Info Inputs */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">{isEn ? 'Student Name:' : 'Họ và tên học sinh:'}</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-900 text-cyan-300 font-bold text-xs p-2 rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">{isEn ? 'Class:' : 'Lớp:'}</label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full bg-slate-900 text-cyan-300 font-bold text-xs p-2 rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Measured Data Table */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isEn ? 'I. MEASURED EXPERIMENTAL DATA' : 'I. BẢNG SỐ LIỆU ĐO ĐẠC THỰC NGHIỆM'}
            </h2>
            {dataPoints && dataPoints.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-cyan-400 font-bold">
                      {keys.filter(k => k !== 'id' && k !== 'expId' && k !== 'expTitle').map(k => (
                        <th key={k} className="p-2.5 border-b border-slate-700">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataPoints.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-800/60 hover:bg-slate-800/30">
                        {keys.filter(k => k !== 'id' && k !== 'expId' && k !== 'expTitle').map(k => (
                          <td key={k} className="p-2.5 font-medium">{row[k]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                {isEn ? 'No measurement data recorded yet.' : 'Chưa có số liệu thực nghiệm được ghi lại.'}
              </p>
            )}
          </div>

          {/* Observations & Notes */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isEn ? 'II. OBSERVATIONS & EXPERIMENTAL CONCLUSION' : 'II. NHẬN XÉT VÀ KẾT LUẬN THÍ NGHIỆM'}
            </h2>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs p-3 rounded-xl border border-slate-800 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Signature Footer */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs font-bold text-slate-400 border-t border-slate-800/60">
            <div>
              <p className="uppercase">{isEn ? 'STUDENT SIGNATURE' : 'HỌC SINH KÝ TÊN'}</p>
              <div className="h-16" />
              <p className="text-slate-200">{studentName}</p>
            </div>
            <div>
              <p className="uppercase">{isEn ? 'TEACHER EVALUATION' : 'GIÁO VIÊN CHẤM ĐIỂM'}</p>
              <div className="h-16" />
              <p className="text-slate-200">{isEn ? 'Grade: ......... / 10' : 'Điểm số: ......... / 10'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
