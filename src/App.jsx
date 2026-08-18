import React, { useState, useEffect, lazy, Suspense } from 'react';
import { EXPERIMENTS_DATA } from './data/experimentsData';
import { TRANSLATIONS } from './i18n/translations';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Stopwatch from './components/Tools/Stopwatch';
import DataPlotter from './components/Tools/DataPlotter';
import TheoryModal from './components/TheoryModal';
import ReportModal from './components/ReportModal';
import ExamMethodologyModal from './components/ExamMethodologyModal';

// Interactive Wiring Workbench
import InteractiveWiringWorkbench from './components/InteractiveWiringWorkbench';

// 3D Modular Workbench Components
import ModularLab3D from './components/3D/ModularLab3D';
import ComponentLibrary3D from './components/3D/ComponentLibrary3D';
import Inspector3D from './components/3D/Inspector3D';
import PresetsManager from './components/3D/PresetsManager';

// Lazy Loaded 2D Simulators (Code-splitting for ultra-fast switching & low RAM usage)
const ArchimedesSimulator = lazy(() => import('./components/Simulators/ArchimedesSimulator'));
const ReflectionSimulator = lazy(() => import('./components/Simulators/ReflectionSimulator'));
const SphericalMirrorSimulator = lazy(() => import('./components/Simulators/SphericalMirrorSimulator'));
const PulleySimulator = lazy(() => import('./components/Simulators/PulleySimulator'));
const InclinedPlaneSimulator = lazy(() => import('./components/Simulators/InclinedPlaneSimulator'));
const VerticalSpringSimulator = lazy(() => import('./components/Simulators/VerticalSpringSimulator'));
const FreeFallSimulator = lazy(() => import('./components/Simulators/FreeFallSimulator'));
const LeverSimulator = lazy(() => import('./components/Simulators/LeverSimulator'));
const CircuitSimulator = lazy(() => import('./components/Simulators/CircuitSimulator'));
const ProjectileSimulator = lazy(() => import('./components/Simulators/ProjectileSimulator'));
const LensSimulator = lazy(() => import('./components/Simulators/LensSimulator'));
const RLCSimulator = lazy(() => import('./components/Simulators/RLCSimulator'));
const HookeSimulator = lazy(() => import('./components/Simulators/HookeSimulator'));
const YoungInterferenceSimulator = lazy(() => import('./components/Simulators/YoungInterferenceSimulator'));
const PhotoelectricSimulator = lazy(() => import('./components/Simulators/PhotoelectricSimulator'));
const RadioactiveSimulator = lazy(() => import('./components/Simulators/RadioactiveSimulator'));
const SoundSpeedSimulator = lazy(() => import('./components/Simulators/SoundSpeedSimulator'));
const SnellGlassBlockSimulator = lazy(() => import('./components/Simulators/SnellGlassBlockSimulator'));
const PendulumGSimulator = lazy(() => import('./components/Simulators/PendulumGSimulator'));
const InternalResistanceSimulator = lazy(() => import('./components/Simulators/InternalResistanceSimulator'));
const BoylesLawSimulator = lazy(() => import('./components/Simulators/BoylesLawSimulator'));
const DiffractionGratingSimulator = lazy(() => import('./components/Simulators/DiffractionGratingSimulator'));
const ResistivityWireSimulator = lazy(() => import('./components/Simulators/ResistivityWireSimulator'));
const PotentiometerSimulator = lazy(() => import('./components/Simulators/PotentiometerSimulator'));
const ResonanceTubeSimulator = lazy(() => import('./components/Simulators/ResonanceTubeSimulator'));

// PhET Simulators
const Newton2Simulator = lazy(() => import('./components/Simulators/Newton2Simulator'));
const MomentumSimulator = lazy(() => import('./components/Simulators/MomentumSimulator'));
const FaradaySimulator = lazy(() => import('./components/Simulators/FaradaySimulator'));
const CapacitorSimulator = lazy(() => import('./components/Simulators/CapacitorSimulator'));
const StandingWaveSimulator = lazy(() => import('./components/Simulators/StandingWaveSimulator'));

import { BookOpen, FileText, Sparkles, Box, Layers, Network, Loader2, Target } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('vi'); // 'vi' | 'en'
  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  const [theme, setTheme] = useState('cyber'); // 'cyber' | 'space' | 'light' | 'gold'
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExpId, setActiveExpId] = useState('g6-archimedes');
  const [activeMode, setActiveMode] = useState('free'); // 'free' | 'guided'

  const [viewTab, setViewTab] = useState('2dSim'); // 'interactiveWiring' | '3dWorkbench' | '2dSim'

  // Dynamic Experiment Parameters State
  const [expParams, setExpParams] = useState({});

  // Measured Recorded Data
  const [recordedData, setRecordedData] = useState([]);

  // Modals state
  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isExamMethodologyOpen, setIsExamMethodologyOpen] = useState(false);

  // 3D Placed Components & Selection
  const [placed3DComponents, setPlaced3DComponents] = useState([]);
  const [selected3DCompId, setSelected3DCompId] = useState(null);
  const [is3DSimulating, setIs3DSimulating] = useState(false);

  const handleToggleLang = () => setLang(prev => (prev === 'vi' ? 'en' : 'vi'));

  const getCategoryLabel = (catKey) => {
    switch (catKey) {
      case 'Cơ học': return t.catMechanics;
      case 'Quang học': return t.catOptics;
      case 'Điện - Từ': return t.catElectricity;
      case 'Nhiệt học': return t.catThermodynamics;
      case 'Vật lý Hiện đại': return t.catModernPhysics;
      default: return catKey;
    }
  };

  const filteredExperiments = EXPERIMENTS_DATA.filter((exp) => {
    const matchesGrade = selectedGrade === 'all' || String(exp.grade) === String(selectedGrade);
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;

    const titleStr = lang === 'en' ? (exp.titleEn || exp.title) : exp.title;
    const subStr = lang === 'en' ? (exp.subtitleEn || exp.subtitle) : exp.subtitle;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || titleStr.toLowerCase().includes(q) || subStr.toLowerCase().includes(q);

    return matchesGrade && matchesCategory && matchesSearch;
  });

  // Automatically sync activeExpId to first item when filter changes if activeExpId is not in filtered results
  useEffect(() => {
    if (filteredExperiments.length > 0) {
      const isCurrentInFiltered = filteredExperiments.some((e) => e.id === activeExpId);
      if (!isCurrentInFiltered) {
        setActiveExpId(filteredExperiments[0].id);
      }
    }
  }, [selectedGrade, selectedCategory, searchQuery, activeExpId]);

  const activeExp = EXPERIMENTS_DATA.find((e) => e.id === activeExpId) || EXPERIMENTS_DATA[0];

  const handleParamChange = (paramKey, value) => {
    setExpParams((prev) => ({
      ...prev,
      [activeExpId]: {
        ...(prev[activeExpId] || activeExp.defaultParams || {}),
        [paramKey]: value
      }
    }));
  };

  const handleDataRecorded = (newRecord) => {
    const recordWithMeta = {
      id: Date.now(),
      expId: activeExpId,
      expTitle: lang === 'en' ? (activeExp.titleEn || activeExp.title) : activeExp.title,
      timestamp: new Date().toLocaleTimeString(),
      ...newRecord
    };
    setRecordedData((prev) => [recordWithMeta, ...prev]);
  };

  // 3D Workbench Handlers
  const handleAdd3DComponent = (compType) => {
    const newComp = {
      id: `comp-${Date.now()}`,
      type: compType,
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      properties: { value: 10, state: 'off' }
    };
    setPlaced3DComponents(prev => [...prev, newComp]);
    setSelected3DCompId(newComp.id);
  };

  const handleUpdate3DComponent = (id, newProps) => {
    setPlaced3DComponents(prev =>
      prev.map(c => (c.id === id ? { ...c, properties: { ...c.properties, ...newProps } } : c))
    );
  };

  const handleRemove3DComponent = (id) => {
    setPlaced3DComponents(prev => prev.filter(c => c.id !== id));
    if (selected3DCompId === id) setSelected3DCompId(null);
  };

  const currentParams = expParams[activeExpId] || activeExp.defaultParams || {};
  const activeTitle = lang === 'en' ? (activeExp.titleEn || activeExp.title) : activeExp.title;
  const activeSubtitle = lang === 'en' ? (activeExp.subtitleEn || activeExp.subtitle) : activeExp.subtitle;

  const selected3DComp = placed3DComponents.find(c => c.id === selected3DCompId);

  const renderSimulator = () => {
    const commonProps = {
      lang,
      params: currentParams,
      onParamChange: handleParamChange,
      onDataRecorded: handleDataRecorded
    };

    let comp = null;
    switch (activeExp.id) {
      case 'g6-archimedes': comp = <ArchimedesSimulator {...commonProps} />; break;
      case 'g7-reflection': comp = <ReflectionSimulator {...commonProps} />; break;
      case 'g7-spherical-mirror': comp = <SphericalMirrorSimulator {...commonProps} />; break;
      case 'g8-pulley': comp = <PulleySimulator {...commonProps} />; break;
      case 'g8-inclined-plane': comp = <InclinedPlaneSimulator {...commonProps} />; break;
      case 'g10-vertical-spring': comp = <VerticalSpringSimulator {...commonProps} />; break;
      case 'g10-free-fall': comp = <FreeFallSimulator {...commonProps} />; break;
      case 'g8-lever': comp = <LeverSimulator {...commonProps} />; break;
      case 'g9-circuit': comp = <CircuitSimulator {...commonProps} />; break;
      case 'g10-projectile': comp = <ProjectileSimulator {...commonProps} />; break;
      case 'g10-newton2': comp = <Newton2Simulator {...commonProps} />; break;
      case 'g10-momentum': comp = <MomentumSimulator {...commonProps} />; break;
      case 'g11-lens': comp = <LensSimulator {...commonProps} />; break;
      case 'g11-faraday': comp = <FaradaySimulator {...commonProps} />; break;
      case 'g11-capacitor': comp = <CapacitorSimulator {...commonProps} />; break;
      case 'g12-rlc':
      case 'g11-rlc': comp = <RLCSimulator {...commonProps} />; break;
      case 'g12-standingwave':
      case 'g11-standingwave': comp = <StandingWaveSimulator {...commonProps} />; break;
      case 'igcse-hooke':
      case 'g12-hooke': comp = <HookeSimulator {...commonProps} />; break;
      case 'igcse-sound':
      case 'g12-sound-speed': comp = <SoundSpeedSimulator {...commonProps} />; break;
      case 'igcse-snell':
      case 'g12-snell-glass': comp = <SnellGlassBlockSimulator {...commonProps} />; break;
      case 'alevel-pendulumg':
      case 'g12-pendulum-g': comp = <PendulumGSimulator {...commonProps} />; break;
      case 'alevel-internalr':
      case 'g12-internal-r': comp = <InternalResistanceSimulator {...commonProps} />; break;
      case 'alevel-boyle':
      case 'g12-boyles-law': comp = <BoylesLawSimulator {...commonProps} />; break;
      case 'alevel-diffraction':
      case 'g12-diffraction-grating': comp = <DiffractionGratingSimulator {...commonProps} />; break;
      case 'alevel-young':
      case 'g12-young': comp = <YoungInterferenceSimulator {...commonProps} />; break;
      case 'alevel-photoelectric':
      case 'g12-photoelectric': comp = <PhotoelectricSimulator {...commonProps} />; break;
      case 'alevel-radioactive':
      case 'g12-radioactive': comp = <RadioactiveSimulator {...commonProps} />; break;
      case 'alevel-resistivity': comp = <ResistivityWireSimulator {...commonProps} />; break;
      case 'alevel-potentiometer': comp = <PotentiometerSimulator {...commonProps} />; break;
      case 'alevel-resonance-tube': comp = <ResonanceTubeSimulator {...commonProps} />; break;
      default: comp = <ArchimedesSimulator {...commonProps} />; break;
    }

    return (
      <Suspense fallback={
        <div className="w-full h-[420px] rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-xs font-bold text-slate-400">
            {lang === 'en' ? 'Loading Experiment Module...' : 'Đang tải bài thí nghiệm...'}
          </span>
        </div>
      }>
        {comp}
      </Suspense>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-100 text-slate-900' :
      theme === 'space' ? 'bg-[#02040a] text-slate-100' :
      theme === 'gold' ? 'bg-[#0c0a09] text-stone-100' :
      'bg-slate-950 text-slate-100'
    }`}>
      {/* Top Header Controls */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        selectedGrade={selectedGrade}
        onSelectGrade={setSelectedGrade}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeMode={activeMode}
        onToggleMode={() => setActiveMode(prev => (prev === 'free' ? 'guided' : 'free'))}
        theme={theme}
        onSelectTheme={setTheme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar List */}
        <Sidebar
          experiments={filteredExperiments}
          activeExpId={activeExpId}
          onSelectExp={(id) => setActiveExpId(id)}
          lang={lang}
        />

        {/* Center Workspace */}
        <main className="flex-1 p-4 lg:p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Active Experiment Header Bar */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-extrabold">
                  {lang === 'en' ? `Grade ${activeExp.grade}` : activeExp.gradeLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-semibold">
                  {getCategoryLabel(activeExp.category)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100">{activeTitle}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{activeSubtitle}</p>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsExamMethodologyOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Target className="w-4 h-4" /> {t.examMethodologyBtn || "🎯 Phương Pháp Giải Bài Tập Thi"}
              </button>

              <button
                onClick={() => setIsTheoryOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all shadow-md active:scale-95"
              >
                <BookOpen className="w-4 h-4" /> {t.theoryTab}
              </button>

              <button
                onClick={() => setIsReportOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:opacity-90 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <FileText className="w-4 h-4" /> {t.exportReport}
              </button>
            </div>
          </div>

          {/* Tab Switcher: 2D Wiring Workbench vs 3D Modular Workbench vs 2D Preset Simulators */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setViewTab('interactiveWiring')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                viewTab === 'interactiveWiring'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Network className="w-4 h-4" /> {lang === 'en' ? '2D WIRING WORKBENCH' : 'BÀN NỐI DÂY & LẮP MẠCH 2D'}
            </button>

            <button
              onClick={() => setViewTab('3dWorkbench')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                viewTab === '3dWorkbench'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Box className="w-4 h-4" /> {lang === 'en' ? '3D EXPERIMENT WORKBENCH' : 'BÀN THÍ NGHIỆM 3D KHÔNG GIAN'}
            </button>

            <button
              onClick={() => setViewTab('2dSim')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                viewTab === '2dSim'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" /> {lang === 'en' ? '2D SGK PRESET SIMULATOR' : 'THÍ NGHIỆM MẪU 2D SGK'}
            </button>
          </div>

          {/* Active View Container */}
          {viewTab === 'interactiveWiring' && (
            <InteractiveWiringWorkbench
              lang={lang}
              onDataRecorded={handleDataRecorded}
            />
          )}

          {viewTab === '3dWorkbench' && (
            <div className="flex flex-col gap-6">
              <PresetsManager
                lang={lang}
                onLoadPreset={(components) => setPlaced3DComponents(components)}
              />

              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                  <ModularLab3D
                    lang={lang}
                    placedComponents={placed3DComponents}
                    selectedCompId={selected3DCompId}
                    onSelectComponent={(id) => setSelected3DCompId(id)}
                    onRemoveComponent={handleRemove3DComponent}
                    onUpdateComponent={handleUpdate3DComponent}
                    isSimulating={is3DSimulating}
                    onToggleSimulate={() => setIs3DSimulating(prev => !prev)}
                  />
                </div>

                <div className="xl:col-span-1">
                  <Inspector3D
                    lang={lang}
                    component={selected3DComp}
                    onUpdateComponent={handleUpdate3DComponent}
                    onClose={() => setSelected3DCompId(null)}
                  />
                </div>
              </div>

              <ComponentLibrary3D
                lang={lang}
                onAddComponent={handleAdd3DComponent}
              />
            </div>
          )}

          {viewTab === '2dSim' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Stopwatch lang={lang} />
                <div className="text-xs text-slate-400 italic flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> {t.dragHint}
                </div>
              </div>

              {renderSimulator()}
            </>
          )}

          {/* Data Table & Plotter Section */}
          <DataPlotter
            lang={lang}
            recordedData={recordedData}
            onClearData={() => setRecordedData([])}
          />
        </main>
      </div>

      {/* Modals */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        experiment={activeExp}
        lang={lang}
      />

      <ExamMethodologyModal
        isOpen={isExamMethodologyOpen}
        onClose={() => setIsExamMethodologyOpen(false)}
        experiment={activeExp}
        lang={lang}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        experiment={activeExp}
        recordedData={recordedData.filter(d => d.expId === activeExpId)}
        lang={lang}
      />
    </div>
  );
}
