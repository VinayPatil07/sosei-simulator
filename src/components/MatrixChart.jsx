import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useSimStore from '../store/useSimStore';
import { calculateSimulation } from '../engine/DynamicsEngine';
import { TrendingUp } from 'lucide-react';
import InfoTip from './InfoTip';

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  const formatNum = (val) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);
  const formatMoney = (val) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs shadow-xl min-w-[180px]">
      <p className="font-bold text-white mb-2">Month {label}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2 text-slate-400">
        <span>CCU</span>
        <span className="text-right font-semibold text-slate-200">{formatNum(row.ccu)}</span>
        <span>MAU</span>
        <span className="text-right font-semibold text-slate-200">{formatNum(row.mau)}</span>
        <span>New / Churned</span>
        <span className="text-right font-semibold text-slate-200">
          +{formatNum(row.newAcquisitions)} / −{formatNum(row.churned)}
        </span>
        <span>B2C / CCU</span>
        <span className="text-right font-semibold text-emerald-400">{formatMoney(row.b2cPerCcu)}</span>
        <span>Staff OpEx</span>
        <span className="text-right font-semibold text-violet-300">{formatMoney(row.staffOpex)}</span>
      </div>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="font-semibold" style={{ color: entry.color }}>
          {entry.name}: {formatMoney(entry.value)}
        </p>
      ))}
      <p className={`font-bold mt-2 pt-2 border-t border-slate-800 ${row.net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        Net: {formatMoney(row.net)} ({Math.round(row.netMargin)}%)
      </p>
    </div>
  );
};

const MatrixChart = () => {
  const store = useSimStore();
  const simData = useMemo(() => calculateSimulation(store).data, [store]);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={16} /> 24-Month Trajectory
          <InfoTip
            title="Revenue vs expenses"
            body="Blue area = gross revenue (B2C + B2B). Red line = total OpEx (infra, creators, Tebex fees, admin, staff). Hover any month for CCU, MAU, and net margin."
          />
        </h3>
        <div className="flex gap-4 text-[10px] font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Gross
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-500" /> Expenses
          </span>
        </div>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={simData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `M${val}`}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val / 1000}k`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              name="Gross Revenue"
              dataKey="grossRev"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGross)"
            />
            <Area
              type="monotone"
              name="Total Expenses"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MatrixChart;
