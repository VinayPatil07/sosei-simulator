import React from 'react';
import useSimStore from '../store/useSimStore';
import { MonitorPlay, ShoppingCart, Database, Users } from 'lucide-react';
import { LeverLabel } from './InfoTip';
import { LEVER_TIPS } from '../data/simGlossary';

const formatMoney = (val) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

const LeverRow = ({ label, tipKey, valueDisplay, valueClass, children }) => (
  <div>
    <div className="flex justify-between mb-2 text-xs font-semibold">
      <LeverLabel label={label} tipKey={tipKey} tips={LEVER_TIPS} />
      <span className={valueClass}>{valueDisplay}</span>
    </div>
    {children}
  </div>
);

const AcquisitionControls = ({ store, handleChange, formatNum }) => (
  <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg">
    <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
      <MonitorPlay size={16} /> Content Acquisition
    </h2>
    <div className="space-y-6">
      <LeverRow
        label="Monthly Active Views"
        tipKey="creatorViews"
        valueDisplay={formatNum(store.creatorViews)}
        valueClass="text-indigo-400"
      >
        <input
          type="range"
          min="10000"
          max="500000"
          step="5000"
          value={store.creatorViews}
          onChange={(e) => handleChange('creatorViews', e.target.value)}
          className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <LeverRow
        label="Viewer Conversion Rate"
        tipKey="viewerConversion"
        valueDisplay={`${store.viewerConversion.toFixed(1)}%`}
        valueClass="text-indigo-400"
      >
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.1"
          value={store.viewerConversion}
          onChange={(e) => handleChange('viewerConversion', e.target.value)}
          className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <div className="pt-4 border-t border-slate-800">
        <LeverRow
          label="Creator Rev Share"
          tipKey="creatorShare"
          valueDisplay={`${store.creatorShare}%`}
          valueClass="text-rose-400"
        >
          <input
            type="range"
            min="5"
            max="50"
            value={store.creatorShare}
            onChange={(e) => handleChange('creatorShare', e.target.value)}
            className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
        </LeverRow>
      </div>
    </div>
  </div>
);

const MonetizationControls = ({ store, handleChange }) => (
  <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg">
    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
      <ShoppingCart size={16} /> B2C Monetization
    </h2>
    <div className="space-y-6">
      <LeverRow
        label="Gamemode Aggressiveness"
        tipKey="gamemodeMultiplier"
        valueDisplay={`${store.gamemodeMultiplier.toFixed(1)}×`}
        valueClass="text-emerald-400"
      >
        <input
          type="range"
          min="0.8"
          max="1.5"
          step="0.1"
          value={store.gamemodeMultiplier}
          onChange={(e) => handleChange('gamemodeMultiplier', e.target.value)}
          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <LeverRow
        label="Avg Cart Value"
        tipKey="itemPrice"
        valueDisplay={formatMoney(store.itemPrice)}
        valueClass="text-emerald-400"
      >
        <input
          type="range"
          min="1"
          max="30"
          value={store.itemPrice}
          onChange={(e) => handleChange('itemPrice', e.target.value)}
          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <LeverRow
        label="F2P Conversion Rate"
        tipKey="purchaseTendency"
        valueDisplay={`${store.purchaseTendency}%`}
        valueClass="text-emerald-400"
      >
        <input
          type="range"
          min="1"
          max="10"
          value={store.purchaseTendency}
          onChange={(e) => handleChange('purchaseTendency', e.target.value)}
          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <div className="pt-4 border-t border-slate-800">
        <LeverRow
          label="VIP Sub Price /mo"
          tipKey="subPrice"
          valueDisplay={formatMoney(store.subPrice)}
          valueClass="text-emerald-400"
        >
          <input
            type="range"
            min="0"
            max="20"
            value={store.subPrice}
            onChange={(e) => handleChange('subPrice', e.target.value)}
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
        </LeverRow>
      </div>
      <LeverRow
        label="Sub Conversion Rate"
        tipKey="subConversion"
        valueDisplay={`${store.subConversion}%`}
        valueClass="text-emerald-400"
      >
        <input
          type="range"
          min="0"
          max="10"
          value={store.subConversion}
          onChange={(e) => handleChange('subConversion', e.target.value)}
          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
    </div>
  </div>
);

const DataTechControls = ({ store, handleChange, formatNum }) => (
  <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg">
    <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6 flex items-center gap-2">
      <Database size={16} /> B2B Enterprise Data
    </h2>
    <div className="space-y-6">
      <LeverRow
        label="Value Per Enriched Profile"
        tipKey="dataValue"
        valueDisplay={`$${store.dataValue.toFixed(2)}`}
        valueClass="text-amber-400"
      >
        <input
          type="range"
          min="0.05"
          max="0.75"
          step="0.05"
          value={store.dataValue}
          onChange={(e) => handleChange('dataValue', e.target.value)}
          className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
      <div className="pt-4 border-t border-slate-800">
        <LeverRow
          label="Infra Budget /mo"
          tipKey="monthlyInfra"
          valueDisplay={formatMoney(store.monthlyInfra)}
          valueClass="text-orange-500"
        >
          <input
            type="range"
            min="300"
            max="2000"
            step="25"
            value={store.monthlyInfra}
            onChange={(e) => handleChange('monthlyInfra', e.target.value)}
            className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
        </LeverRow>
      </div>
    </div>
  </div>
);

const OpExControls = ({ store, handleChange }) => (
  <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-lg">
    <h2 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-6 flex items-center gap-2">
      <Users size={16} /> Staff & Development OpEx
    </h2>
    <div className="space-y-6">
      <LeverRow
        label="Staff & Development Budget /mo"
        tipKey="staffDevBudget"
        valueDisplay={formatMoney(store.staffDevBudget)}
        valueClass="text-violet-400"
      >
        <input
          type="range"
          min="0"
          max="10000"
          step="250"
          value={store.staffDevBudget}
          onChange={(e) => handleChange('staffDevBudget', e.target.value)}
          className="w-full accent-violet-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
        />
      </LeverRow>
    </div>
  </div>
);

const ControlPanel = () => {
  const store = useSimStore();
  const handleChange = (key, value) => store.setLever(key, Number(value));
  const formatNum = (val) => new Intl.NumberFormat('en-US').format(val);

  return (
    <div
      className="flex flex-col gap-6 overflow-y-auto pr-2 pb-10"
      style={{ maxHeight: 'calc(100vh - 120px)' }}
    >
      <AcquisitionControls store={store} handleChange={handleChange} formatNum={formatNum} />
      <MonetizationControls store={store} handleChange={handleChange} />
      <DataTechControls store={store} handleChange={handleChange} formatNum={formatNum} />
      <OpExControls store={store} handleChange={handleChange} />
    </div>
  );
};

export default ControlPanel;
