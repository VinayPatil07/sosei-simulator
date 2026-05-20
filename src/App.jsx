import React from 'react';
import ControlPanel from './components/ControlPanel';
import MatrixChart from './components/MatrixChart';
import KpiDashboard from './components/KpiDashboard';
import MethodologyFooter from './components/MethodologyFooter';
import { Activity, Cpu } from 'lucide-react';
import InfoTip from './components/InfoTip';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8 font-sans">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3 flex-wrap">
          <Activity className="text-blue-500" /> SOSEI MEDIA
          <span className="text-xs bg-blue-900/40 text-blue-400 px-2 py-1 rounded-md border border-blue-800/50 flex items-center gap-1 font-bold">
            <Cpu size={12} /> V5.1 BUILTBYBIT ENGINE
          </span>
          <InfoTip
            title="About this simulator"
            body="24-month system dynamics model for a modded Minecraft network. Calibrated with BuiltByBit marketplace comps and bare-metal infra economics. Scroll down for full glossary, formulas, and sources."
          />
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Predictive dynamics dashboard — tap any{' '}
          <span className="text-slate-500 font-medium">i</span> icon for definitions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4">
          <ControlPanel />
        </div>
        <div className="xl:col-span-8 flex flex-col gap-6">
          <KpiDashboard />
          <MatrixChart />
        </div>
      </div>

      <MethodologyFooter />
    </div>
  );
}

export default App;
