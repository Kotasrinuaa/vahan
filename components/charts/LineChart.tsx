'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/utils/vahanUtils';

interface LineChartProps {
  data: ChartData[];
  title: string;
}

export default function VehicleLineChart({ data, title }: LineChartProps) {
  const formatTooltip = (value: any, name: string) => {
    return [value.toLocaleString(), 'Registrations'];
  };

  const formatLabel = (label: string) => {
    const date = new Date(label + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatLabel}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              formatter={formatTooltip}
              labelFormatter={formatLabel}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #4B5563',
                borderRadius: '8px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#lineGradient)" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#A855F7' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </div>
    </div>
  );
}