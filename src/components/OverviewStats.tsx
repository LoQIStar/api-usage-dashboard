import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { DashboardStats } from '../types';
import { formatCurrency, formatPercentage } from '../utils';

interface OverviewStatsProps {
  stats: DashboardStats;
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ stats }) => {
  const usagePercentage = (stats.totalUsed / stats.totalBudget) * 100;
  
  const statCards = [
    {
      title: 'Total Budget',
      value: formatCurrency(stats.totalBudget),
      subtitle: 'Monthly allocation',
      icon: DollarSign,
      color: 'from-accent-blue to-accent-cyan',
      change: null
    },
    {
      title: 'Current Usage',
      value: formatCurrency(stats.totalUsed),
      subtitle: `${formatPercentage(usagePercentage)} of budget`,
      icon: TrendingUp,
      color: 'from-accent-green to-accent-blue',
      change: `+${formatCurrency(stats.averageDailyCost)}/day`
    },
    {
      title: 'Remaining Budget',
      value: formatCurrency(stats.totalRemaining),
      subtitle: 'Available funds',
      icon: Zap,
      color: 'from-accent-purple to-accent-pink',
      change: `${Math.ceil(stats.totalRemaining / stats.averageDailyCost)} days left`
    },
    {
      title: 'Projected Monthly',
      value: formatCurrency(stats.projectedMonthlyCost),
      subtitle: 'Based on current usage',
      icon: AlertTriangle,
      color: stats.projectedMonthlyCost > stats.totalBudget 
        ? 'from-accent-red to-accent-orange' 
        : 'from-accent-orange to-accent-red',
      change: stats.projectedMonthlyCost > stats.totalBudget 
        ? `⚠️ Over budget` 
        : '✅ On track'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div key={index} className="glass rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 bg-gradient-to-r ${card.color} rounded-lg`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            {card.change && (
              <div className="text-right">
                <span className="text-xs text-slate-400 block">{card.change}</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
            <p className="text-xs text-slate-500">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats; 