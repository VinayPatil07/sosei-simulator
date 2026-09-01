import React, { useMemo } from 'react';
import { 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useSimStore } from '../store/useSimStore';
import { calculateSimulation } from '../engine/DynamicsEngine';
import { TrendingUp, Users, ShoppingCart, Database, PieChart, AlertCircle } from 'lucide-react';

const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
const formatNum = (val) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-slate-950/95 border border-slate-700 p-5 rounded-xl shadow-2xl w-[480px] backdrop-blur-xl z-50 font-sans text-white">
        <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">Month {label} Snapshot</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Users size={12}/> {formatNum(data.ccu)} Avg CCU | {formatNum(data.mau)} Unique MAU
            </p>
          </div>
          <div className="text-right">
            <div className={`text-xs font-bold px-2 py-1 rounded-md mb-1 inline-block ${data.serverLoad > 90 ? 'bg-red-950/50 text-red-400 border border-red-900/50' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50'}`}>
              Load: {Math.round(data.serverLoad)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
          <div><p className="text-[10px] text-slate-500 font-bold uppercase">Gross Rev</p><p className="text-sm font-black text-blue-400">{formatMoney(data.grossRev)}</p></div>
          <div><p className="text-[10px] text-slate-500 font-bold uppercase">Total OpEx</p><p className="text-sm font-black text-red-400">{formatMoney(data.expenses)}</p></div>
          <div className="text-right"><p className="text-[10px] text-slate-500 font-bold uppercase">Net EBITDA</p><p className={`text-sm font-black ${data.net > 0 ? 'text-emerald-400' : 'text-red-500'}`}>{formatMoney(data.net)}</p></div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1 flex items-center gap-1"><ShoppingCart size={10}/> Itemized B2C Revenue</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex justify-between"><span className="text-slate-400">Ranks</span><span className="text-white font-medium">{formatMoney(data.rankRev)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Battlepass</span><span className="text-white font-medium">{formatMoney(data.battlepassRev)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Gacha</span><span className="text-white font-medium">{formatMoney(data.crateRev)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Claims</span><span className="text-white font-medium">{formatMoney(data.claimRev)}</span></div>
          </div>
          
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1 mt-3 flex items-center gap-1"><Database size={10}/> Enterprise B2B Value</h4>
          <div className="flex justify-between text-xs"><span className="text-slate-400">Enriched Data Profiles</span><span className="text-purple-400 font-bold">{formatMoney(data.b2bRev)}</span></div>
        </div>
      </div>
    );
  }
  return null;
};

export default function MatrixChart() {
  const store = useSimStore();
  const simData = useMemo(() => calculateSimulation(store).data, [store]);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2"><TrendingUp className="text-blue-500" size={16}/> Financial Trajectory</h3>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={simData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickFormatter={(val) => `M${val}`} />
          <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
          <YAxis yAxisId="right" orientation="right" stroke="#34d399" fontSize={11} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="grossRev" name="Gross Revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
          <Line yAxisId="right" type="monotone" dataKey="ccu" name="CCU" stroke="#34d399" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}