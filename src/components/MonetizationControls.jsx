import React from 'react';
import { useSimStore } from '../store/useSimStore';
import { ShoppingCart, Zap, Crown, Key, Package, ShieldCheck } from 'lucide-react';

export default function MonetizationControls() {
  const store = useSimStore();

  const handleSlider = (key, val) => {
    store.setLever(key, Number(val));
  };

  const handleToggle = (key, val) => {
    store.setLever(key, val);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
          <ShoppingCart size={16}/> B2C Storefront Matrix
        </h2>
        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500/70 uppercase tracking-wider bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/50">
          <ShieldCheck size={12} /> EULA Compliant
        </div>
      </div>

      {/* Catalog Display Section (Read-Only for Investor Optics) */}
      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Crown size={12}/> Subscription Ladder (MRR)
          </h3>
          <div className="grid grid-cols-7 gap-1">
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T1</p><p className="text-[10px] font-bold text-slate-300">$5</p></div>
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T2</p><p className="text-[10px] font-bold text-slate-300">$10</p></div>
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T3</p><p className="text-[10px] font-bold text-slate-300">$20</p></div>
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T4</p><p className="text-[10px] font-bold text-slate-300">$35</p></div>
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T5</p><p className="text-[10px] font-bold text-emerald-400">$55</p></div>
            <div className="bg-slate-950 border border-slate-800 rounded text-center py-1.5"><p className="text-[9px] text-slate-500 font-bold">T6</p><p className="text-[10px] font-bold text-emerald-400">$90</p></div>
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded text-center py-1.5"><p className="text-[9px] text-emerald-500 font-bold">T7</p><p className="text-[10px] font-bold text-emerald-400">$150</p></div>
          </div>
          <p className="text-[9px] text-slate-500 mt-1.5 leading-tight">Tiers 1-4 capture mass-market minnows/dolphins. Tiers 5-7 capture high-LTV whales.</p>
        </div>

        {/* Crate & Utility Pricing Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Key size={12}/> Gacha Crate Keys
            </h3>
            <div className="flex flex-col gap-1 text-[10px]">
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">Common / Uncommon</span><span className="font-bold text-slate-300">$1.99 - $4.99</span></div>
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">Rare / Epic</span><span className="font-bold text-slate-300">$9.99 - $14.99</span></div>
              <div className="flex justify-between bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/30"><span className="text-emerald-400 font-medium">Mythic Variant Key</span><span className="font-bold text-emerald-400">$24.99</span></div>
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">Cosmetic Player Trail</span><span className="font-bold text-slate-300">$3.99</span></div>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Package size={12}/> Claim Block Utility
            </h3>
            <div className="flex flex-col gap-1 text-[10px]">
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">1k Blocks</span><span className="font-bold text-slate-300">$4.99</span></div>
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">2.5k / 7.5k Blocks</span><span className="font-bold text-slate-300">$9.99 - $24.99</span></div>
              <div className="flex justify-between bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50"><span className="text-slate-400">17k Town Blocks</span><span className="font-bold text-slate-300">$49.99</span></div>
              <div className="flex justify-between bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/30"><span className="text-emerald-400 font-medium">45k Enterprise Pkg</span><span className="font-bold text-emerald-400">$99.99</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Conversion Levers */}
      <div className="bg-slate-950/50 p-5 border-t border-slate-800 space-y-5">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Zap size={12} className="text-emerald-500"/> Storefront Conversion Levers
        </h3>

        {/* F2P Store Conversion */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Impulse Purchase Tendency</span>
            <span className="text-emerald-400">{store.purchaseTendency}%</span>
          </div>
          <input 
            type="range" min="0.5" max="8.0" step="0.1" 
            value={store.purchaseTendency} 
            onChange={(e) => handleSlider('purchaseTendency', e.target.value)} 
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
          />
          <p className="text-[10px] text-slate-500 mt-1 leading-tight">% of Monthly Active Users (MAU) executing standalone cart checkouts.</p>
        </div>

        {/* Subscription Conversion */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Rank Subscription Conversion</span>
            <span className="text-emerald-400">{store.subConversion}%</span>
          </div>
          <input 
            type="range" min="0.5" max="5.0" step="0.1" 
            value={store.subConversion} 
            onChange={(e) => handleSlider('subConversion', e.target.value)} 
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
          />
          <p className="text-[10px] text-slate-500 mt-1 leading-tight">% of MAU migrating into the recurring revenue (MRR) ladder.</p>
        </div>

        {/* Gamemode Aggressiveness */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Economy Target (Gamemode Multiplier)</span>
            <span className="text-amber-400">{store.gamemodeMultiplier}x</span>
          </div>
          <input 
            type="range" min="0.8" max="2.0" step="0.1" 
            value={store.gamemodeMultiplier} 
            onChange={(e) => handleSlider('gamemodeMultiplier', e.target.value)} 
            className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
          />
          <p className="text-[10px] text-slate-500 mt-1 leading-tight">Controls crate key velocity. (1.0 = Standard Survival | 1.8+ = Hardcore Box Economy)</p>
        </div>

        {/* Whale-Catcher Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 block tracking-wide">High-Tier Whale Bundles</span>
            <span className="text-[10px] text-slate-400 block">Unlocks exponential volume for T7 Ranks & Mythic Crates</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={store.whaleCatcherEnabled} 
              onChange={(e) => handleToggle('whaleCatcherEnabled', e.target.checked)} 
            />
            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

      </div>
    </div>
  );
}