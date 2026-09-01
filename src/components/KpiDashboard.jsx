import React, { useState } from 'react';
import { useSimStore } from '../store/useSimStore';
import { calculateSimulation } from '../engine/DynamicsEngine';
import { Server, DollarSign, ChevronDown } from 'lucide-react';

export default function KpiDashboard() {
  const levers = useSimStore();
  const { data } = calculateSimulation(levers);
  const [selectedMonth, setSelectedMonth] = useState(24);

  const mData = data.find(d => d.month === selectedMonth) || data[23];
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Header & Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Server size={16} className="text-blue-500" /> Economic Milestones
        </h3>
        <select 
          className="bg-slate-950 border border-slate-700 text-xs text-white p-1 rounded cursor-pointer"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {[1, 12, 24].map(m => <option key={m} value={m}>Month {m}</option>)}
          <option disabled>---</option>
          {data.map(d => <option key={d.month} value={d.month}>Month {d.month}</option>)}
        </select>
      </div>

      {/* Economic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Snapshot 1: Server Health */}
        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">Server Health (M{selectedMonth})</p>
          <h4 className="text-emerald-500 text-lg font-black">OPTIMAL</h4>
          <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 mb-1 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${mData.serverLoad}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mb-4">Load: {Math.round(mData.serverLoad)}%</p>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">CCU: <b className="text-white">{mData.ccu}</b></span>
            <span className="text-slate-400">MAU: <b className="text-white">{mData.mau}</b></span>
          </div>
        </div>

        {/* Snapshot 2: Economics */}
        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-4">B2C Gross / CCU</p>
          <h4 className="text-emerald-400 text-xl font-black">{formatMoney(mData.b2cPerCcu)}</h4>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-1"><span>Staff OpEx</span><span className="text-purple-400 font-bold">{formatMoney(levers.staffDevBudget)}</span></div>
            <div className="flex justify-between pt-1"><span>Monthly Net</span><span className="text-emerald-400 font-bold">{formatMoney(mData.net)}</span></div>
          </div>
        </div>

        {/* Snapshot 3: Scale */}
        <div className="bg-slate-950/50 p-4 rounded-lg border border-blue-900/20">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-4">Month {selectedMonth} Scale</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span>Gross Revenue</span><span className="font-bold">{formatMoney(mData.grossRev)}</span></div>
            <div className="flex justify-between border-b border-slate-800 pb-2"><span>Staff OpEx</span><span className="text-purple-400 font-bold">{formatMoney(levers.staffDevBudget)}</span></div>
            <div className="flex justify-between pt-1"><span>Monthly Net</span><span className="text-emerald-400 text-lg font-black">{formatMoney(mData.net)}</span></div>
          </div>
          <p className="text-[9px] text-slate-600 mt-2">Margin {mData.netMargin.toFixed(0)}% • BuiltByBit Benchmarks</p>
        </div>
      </div>
    </div>
  );
}