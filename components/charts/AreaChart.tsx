'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '@/utils/vahanUtils';

interface AreaChartProps {
  data: ChartData[];
  title: string;
}

const fuelColors = {
  'PETROL': '#3B82F6',
  'DIESEL': '#EF4444',
  'ELECTRIC': '#10B981',
  'CNG': '#F59E0B',
  'LPG': '#8B5CF6',
  'HYBRID': '#06B6D4',
  'OTHER': '#6B7280'
};

export default function FuelAreaChart({ data, title }: AreaChartProps) {
  const fuels = Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== 'value');

  const formatTooltip = (value: any, name: string) => {
    return [value.toLocaleString(), name];
  };

  const formatLabel = (label: string) => {
    const date = new Date(label + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3" />
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            <Legend wrapperStyle={{ color: '#F9FAFB' }} />
            {fuels.map((fuel, index) => (
              <Area
                key={fuel}
                type="monotone"
                dataKey={fuel}
                stackId="1"
                stroke={fuelColors[fuel as keyof typeof fuelColors] || '#6B7280'}
                fill={fuelColors[fuel as keyof typeof fuelColors] || '#6B7280'}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}