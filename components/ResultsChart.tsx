
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';
import { DISCScore } from '../types';
import { DISC_DIMENSIONS } from '../constants';

interface ResultsChartProps {
  scores: DISCScore;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ scores }) => {
  const data = [
    { name: 'Dominância (D)', value: scores.D, color: DISC_DIMENSIONS.D.color },
    { name: 'Influência (I)', value: scores.I, color: DISC_DIMENSIONS.I.color },
    { name: 'Estabilidade (S)', value: scores.S, color: DISC_DIMENSIONS.S.color },
    { name: 'Conformidade (C)', value: scores.C, color: DISC_DIMENSIONS.C.color },
  ];

  return (
    <div className="w-full h-80 bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 25, right: 10, left: -30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
            dy={10}
          />
          <YAxis hide domain={[0, 'dataMax + 2']} />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderRadius: '16px', 
              border: '1px solid #334155',
              color: '#f8fafc'
            }}
          />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={45}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList 
              dataKey="value" 
              position="top" 
              style={{ fill: '#f8fafc', fontSize: 16, fontWeight: 'bold' }} 
              offset={10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
