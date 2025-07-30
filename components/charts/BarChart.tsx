'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '@/utils/vahanUtils';

interface BarChartProps {
  data: ChartData[];
  title: string;
}

const vehicleColors = {
  'MOTOR CAR': '#3B82F6',
  'MOTOR CYCLE': '#EF4444',
  'SCOOTER': '#10B981',
  'GOODS CARRIER': '#F59E0B',
  'AUTO RICKSHAW': '#8B5CF6',
  'TAXI': '#06B6D4',
  'BUS': '#EC4899',
  'TRAILER': '#6B7280'
};

export default function VehicleBarChart({ data, title }: BarChartProps) {
  const vehicleClasses = Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== 'value');

  const formatTooltip = (value: any, name: string) => {
    return [value.toLocaleString(), name];
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3" />
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #4B5563',
                borderRadius: '8px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
              }}
            />
            <Legend wrapperStyle={{ color: '#F9FAFB' }} />
            {vehicleClasses.slice(0, 5).map((vehicleClass, index) => (
              <Bar
                key={vehicleClass}
                dataKey={vehicleClass}
                fill={vehicleColors[vehicleClass as keyof typeof vehicleColors] || '#6B7280'}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}