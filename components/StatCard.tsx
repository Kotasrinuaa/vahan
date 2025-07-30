'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { StatCard as StatCardType } from '@/utils/vahanUtils';

interface StatCardProps {
  stat: StatCardType;
  index: number;
}

const gradients = [
  'from-purple-500/20 via-pink-500/20 to-red-500/20',
  'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  'from-green-500/20 via-emerald-500/20 to-lime-500/20',
  'from-orange-500/20 via-yellow-500/20 to-amber-500/20',
];

const borders = [
  'border-purple-500/30',
  'border-blue-500/30',
  'border-green-500/30',
  'border-orange-500/30',
];

const glows = [
  'shadow-purple-500/25',
  'shadow-blue-500/25',
  'shadow-green-500/25',
  'shadow-orange-500/25',
];

export default function StatCard({ stat, index }: StatCardProps) {
  const getTrendIcon = () => {
    switch (stat.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const gradientClass = gradients[index % gradients.length];
  const borderClass = borders[index % borders.length];
  const glowClass = glows[index % glows.length];

  return (
    <div className={`
      relative overflow-hidden rounded-xl border ${borderClass} 
      bg-gradient-to-br ${gradientClass} backdrop-blur-sm bg-black/20
      p-6 shadow-lg ${glowClass} hover:shadow-xl transition-all duration-300
      hover:scale-105 group
    `}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
            {stat.title}
          </h3>
          {getTrendIcon()}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-white">
            {stat.value}
          </p>
          {stat.change && (
            <p className="text-sm text-gray-400">
              {stat.change}
            </p>
          )}
        </div>
      </div>
      
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl" />
    </div>
  );
}