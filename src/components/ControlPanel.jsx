import React from 'react';
import { useSimStore } from '../store/useSimStore';
import { ShieldAlert, Zap, TrendingUp, Users } from 'lucide-react';

export default function ControlPanel() {
  const store = useSimStore();

  const handleSlider = (key, val) => store.setLever(key, Number(val));
  const handleToggle = (key, val) => store.setLever(key, val);

  return (
    <div className="space-y-6">
      {/* Configuration Group 1: User Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
          <Users size={14}/> Network Funnel Strategy
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Monthly Top-Funnel Views</span>
              <span className="text-indigo-400">{store.creatorViews.toLocaleString()}</span>
            </div>
            <input type="range" min="50000" max="1000000" step="50000" value={store.creatorViews} onChange={(e) => handleSlider('creatorViews', e.target.value)} className="w-full accent-indigo-500 h-1 bg-slate-800 rounded" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Creator Rev Share Payout</span>
              <span className="text-rose-400">{store.creatorShare}%</span>
            </div>
            <input type="range" min="10" max="50" step="5" value={store.creatorShare} onChange={(e) => handleSlider('creatorShare', e.target.value)} className="w-full accent-rose-500 h-1 bg-slate-800 rounded" />
          </div>
        </div>
      </div>

      {/* Configuration Group 2: Interactive Storefront Parameters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
          <Zap size={14}/> Storefront Conversion Levers
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Rank Subscription Conversion</span>
              <span className="text-emerald-400">{store.subConversion}%</span>
            </div>
            <input type="range" min="0.5" max="5.0" step="0.1" value={store.subConversion} onChange={(e) => handleSlider('subConversion', e.target.value)} className="w-full accent-emerald-500 h-1 bg-slate-800 rounded" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Cosmetic Store Conversion</span>
              <span className="text-emerald-400">{store.purchaseTendency}%</span>
            </div>
            <input type="range" min="0.5" max="8.0" step="0.1" value={store.purchaseTendency} onChange={(e) => handleSlider('purchaseTendency', e.target.value)} className="w-full accent-emerald-500 h-1 bg-slate-800 rounded" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Economy Target (Gamemode Multiplier)</span>
              <span className="text-amber-400">{store.gamemodeMultiplier}x</span>
            </div>
            <input type="range" min="0.8" max="1.5" step="0.1" value={store.gamemodeMultiplier} onChange={(e) => handleSlider('gamemodeMultiplier', e.target.value)} className="w-full accent-amber-500 h-1 bg-slate-800 rounded" />
            <p className="text-[10px] text-slate-500 mt-1">0.8 = Core Survival ($40/CCU) | 1.5 = Hardcore Box Economy ($60/CCU)</p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 block">High-Tier Whale Bundles</span>
              <span className="text-[10px] text-slate-500 block">Unlocks exponential $149.99 Tier-7 optimizations</span>
            </div>
            <input type="checkbox" checked={store.whaleCatcherEnabled} onChange={(e) => handleToggle('whaleCatcherEnabled', e.target.checked)} className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Configuration Group 3: OpEx Boundaries */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2">
          <ShieldAlert size={14}/> Operational Cost Allocation
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Fixed Staff & Dev Payroll /mo</span>
              <span className="text-orange-400">${store.staffDevBudget.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="6000" step="250" value={store.staffDevBudget} onChange={(e) => handleSlider('staffDevBudget', e.target.value)} className="w-full accent-orange-500 h-1 bg-slate-800 rounded" />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Server Infrastructure Budget Cap</span>
              <span className="text-orange-400">${store.monthlyInfra.toLocaleString()}</span>
            </div>
            <input type="range" min="500" max="3500" step="100" value={store.monthlyInfra} onChange={(e) => handleSlider('monthlyInfra', e.target.value)} className="w-full accent-orange-500 h-1 bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}