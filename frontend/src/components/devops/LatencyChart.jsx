import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const LatencyChart = ({ data, serviceName }) => {
  return (
    <div className="bg-black/90 border border-green-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-sm">
      <h3 className="text-green-400 font-mono text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
        LATENCY_METRICS::{serviceName || 'SYSTEM'}
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#4ade80" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#4ade80', opacity: 0.7 }}
            />
            <YAxis 
              stroke="#4ade80" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              unit="ms"
              tick={{ fill: '#4ade80', opacity: 0.7 }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#000', 
                border: '1px solid #22c55e', 
                color: '#4ade80',
                fontFamily: 'monospace'
              }}
              itemStyle={{ color: '#4ade80' }}
              cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6, fill: '#000', stroke: '#22c55e', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
