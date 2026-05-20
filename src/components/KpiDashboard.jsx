import React, { useMemo } from 'react';
import useSimStore from '../store/useSimStore';
import { calculateSimulation } from '../engine/DynamicsEngine';
import { Server, DollarSign } from 'lucide-react';
import InfoTip from './InfoTip';
import { KPI_TIPS } from '../data/simGlossary';

const KpiLabel = ({ label, tipKey }) => {
  const tip = KPI_TIPS[tipKey];
  return (
    <span className="inline-flex items-center gap-1 text-inherit">
      {label}
      {tip && <InfoTip title={tip.title} body={tip.body} />}
    </span>
  );
};

const KpiRow = ({ label, tipKey, value, valueClass = 'font-bold text-white', labelClass = 'text-slate-400 text-sm' }) => (
  <div className="flex justify-between items-end mb-2">
    <span className={labelClass}>
      <KpiLabel label={label} tipKey={tipKey} />
    </span>
    <span className={valueClass}>{value}</span>
  </div>
);

const KpiDashboard = () => {
  const store = useSimStore();
  const simData = useMemo(() => calculateSimulation(store).data, [store]);

  const m12 = simData[11];
  const m24 = simData[23];
  const currentLoad = m24.serverLoad;

  const formatMoney = (val) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNum = (val) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        className={`p-6 rounded-xl border relative overflow-hidden shadow-xl ${
          currentLoad > 100
            ? 'bg-red-950/20 border-red-900/50'
            : currentLoad > 85
              ? 'bg-amber-950/20 border-amber-900/50'
              : 'bg-slate-900 border-slate-800'
        }`}
      >
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Server size={14} />
          <KpiLabel label="Server Health (M24)" tipKey="serverHealth" />
        </h3>
        <p
          className={`text-2xl font-black ${
            currentLoad > 100 ? 'text-red-500' : currentLoad > 85 ? 'text-amber-500' : 'text-emerald-500'
          }`}
        >
          {currentLoad > 100 ? 'CRITICAL LAG' : currentLoad > 85 ? 'HIGH STRESS' : 'OPTIMAL'}
        </p>
        <div className="mt-4 w-full bg-slate-950 rounded-full h-2 relative border border-slate-800">
          <div
            className={`h-full absolute left-0 top-0 transition-all ${
              currentLoad > 100 ? 'bg-red-500' : currentLoad > 85 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(currentLoad, 100)}%` }}
          />
          <div className="absolute left-[85%] top-0 bottom-0 w-px bg-white/50" />
        </div>
        <p className="text-xs text-slate-500 mt-2 text-right">Load: {Math.round(currentLoad)}%</p>
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-slate-500 mb-0.5 flex items-center gap-1">
              <KpiLabel label="CCU" tipKey="ccu" />
            </p>
            <p className="font-bold text-slate-300">{formatNum(m24.ccu)}</p>
          </div>
          <div>
            <p className="text-slate-500 mb-0.5 flex items-center gap-1">
              <KpiLabel label="MAU" tipKey="mau" />
            </p>
            <p className="font-bold text-slate-300">{formatNum(m24.mau)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-slate-500 mb-0.5">Backend shards</p>
            <p className="font-bold text-slate-300">
              {m24.backendInstances} / 15 · {formatMoney(m24.infraSpend)} infra
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <DollarSign size={14} /> Month 12 Economics
        </h3>
        <KpiRow
          label="B2C Gross / CCU"
          tipKey="b2cPerCcu"
          value={formatMoney(m12.b2cPerCcu)}
          valueClass="text-lg font-bold text-emerald-400"
        />
        <KpiRow
          label="CCU · MAU"
          tipKey="ccu"
          value={`${formatNum(m12.ccu)} · ${formatNum(m12.mau)}`}
          valueClass="text-lg font-bold text-white"
        />
        <KpiRow
          label="Staff OpEx"
          tipKey="staffOpex"
          value={formatMoney(m12.staffOpex)}
          valueClass="text-sm font-bold text-violet-400"
        />
        <div className="flex justify-between items-end pt-2 border-t border-slate-800">
          <span className="text-slate-400 text-sm">
            <KpiLabel label="Monthly Net" tipKey="netMargin" />
          </span>
          <span className={`text-xl font-bold ${m12.net > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatMoney(m12.net)}
          </span>
        </div>
        <p className="text-[10px] text-slate-600 mt-1 text-right">Margin {Math.round(m12.netMargin)}%</p>
      </div>

      <div className="bg-blue-950/20 rounded-xl p-6 border border-blue-900/40 shadow-xl">
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <DollarSign size={14} /> Month 24 Scale
        </h3>
        <KpiRow
          label="B2C Gross / CCU"
          tipKey="b2cPerCcu"
          value={formatMoney(m24.b2cPerCcu)}
          valueClass="text-lg font-bold text-emerald-400"
          labelClass="text-blue-200/60 text-sm"
        />
        <KpiRow
          label="Gross Revenue"
          tipKey="grossRev"
          value={formatMoney(m24.grossRev)}
          valueClass="text-lg font-bold text-white"
          labelClass="text-blue-200/60 text-sm"
        />
        <KpiRow
          label="Staff OpEx"
          tipKey="staffOpex"
          value={formatMoney(m24.staffOpex)}
          valueClass="text-sm font-bold text-violet-400"
          labelClass="text-blue-200/60 text-sm"
        />
        <div className="flex justify-between items-end pt-2 border-t border-blue-900/40">
          <span className="text-blue-200/60 text-sm">
            <KpiLabel label="Monthly Net" tipKey="netMargin" />
          </span>
          <span className={`text-xl font-bold ${m24.net > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatMoney(m24.net)}
          </span>
        </div>
        <p className="text-[10px] text-blue-400/50 mt-1 text-right">
          Margin {Math.round(m24.netMargin)}% · BuiltByBit ~$40–$60/CCU
        </p>
      </div>
    </div>
  );
};

export default KpiDashboard;
