'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartData } from '@/utils/vahanUtils';

interface DonutChartProps {
  data: ChartData[];
  title: string;
}

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', 
  '#06B6D4', '#EC4899', '#6B7280', '#F97316', '#84CC16'
];

export default function FuelDonutChart({ data, title }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatTooltip = (value: any, name: string) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return [`${value.toLocaleString()} (${percentage}%)`, name];
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3" />
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
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
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ color: '#F9FAFB', fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}