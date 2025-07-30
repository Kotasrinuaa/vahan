'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartData } from '@/utils/vahanUtils';

interface RingChartProps {
  data: ChartData[];
  title: string;
}

const COLORS = ['#10B981', '#6B7280'];

export default function ElectricRingChart({ data, title }: RingChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const electricData = data.find(item => item.name === 'Electric');
  const electricPercentage = electricData ? ((electricData.value / total) * 100).toFixed(1) : '0';

  const formatTooltip = (value: any, name: string) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return [`${value.toLocaleString()} (${percentage}%)`, name];
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3" />
        {title}
      </h3>
      
      <div className="relative h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={80}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {electricPercentage}%
            </div>
            <div className="text-sm text-gray-400">
              Electric
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}