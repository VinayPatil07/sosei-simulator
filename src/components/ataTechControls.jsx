import React from 'react';
import { useSimStore } from '../store/useSimStore';
import { Database, Server, Cpu, ShieldAlert } from 'lucide-react';

export default function DataTechControls() {
  const store = useSimStore();

  const handleSlider = (key, val) => {
    store.setLever(key, Number(val));
  };

  const formatNum = (val) => new Intl.NumberFormat('en-US').format(val);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
          <Database size={16}/> Data & Operations
        </h2>
      </div>

      <div className="p-5 space-y-6">
        
        {/* B2B Data Value */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">B2B Telemetry Value (Per Profile)</span>
            <span className="text-amber-400">${store.dataValue.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0.01" max="0.50" step="0.01" 
            value={store.dataValue} 
            onChange={(e) => handleSlider('dataValue', e.target.value)} 
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
          />
          <p className="text-[10px] text-slate-500 mt-1 leading-tight">Monthly value of an enriched player profile sold to MarTech partners.</p>
        </div>

        {/* Operational Cost Allocation */}
        <div className="pt-4 border-t border-slate-800 space-y-5">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
             <ShieldAlert size={12} className="text-orange-500"/> Fixed OpEx Budgets
           </h3>

           <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300 flex items-center gap-1.5"><Cpu size={12}/> Staff & Dev Retainer</span>
              <span className="text-orange-400">${formatNum(store.staffDevBudget)}</span>
            </div>
            <input 
              type="range" min="500" max="10000" step="250" 
              value={store.staffDevBudget} 
              onChange={(e) => handleSlider('staffDevBudget', e.target.value)} 
              className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">Monthly payroll for moderation, community managers, and custom plugin maintenance.</p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300 flex items-center gap-1.5"><Server size={12}/> Max Infra Budget Cap</span>
              <span className="text-orange-400">${formatNum(store.monthlyInfra)}</span>
            </div>
            <input 
              type="range" min="500" max="5000" step="100" 
              value={store.monthlyInfra} 
              onChange={(e) => handleSlider('monthlyInfra', e.target.value)} 
              className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
            />
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">The engine allocates spend elastically up to this limit based on CCU demand.</p>
          </div>
        </div>

      </div>
    </div>
  );
}