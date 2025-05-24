import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { ApiProvider, UsageData } from '../types';
import { formatCurrency, formatNumber, formatPercentage, formatRelativeTime, getUsageStatus, getStatusColor } from '../utils';

interface ProviderCardsProps {
  providers: ApiProvider[];
  usageData: UsageData[];
}

const ProviderCards: React.FC<ProviderCardsProps> = ({ providers, usageData }) => {
  const getProviderUsage = (providerId: string) => {
    return usageData.find(data => data.providerId === providerId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {providers.map(provider => {
        const usage = getProviderUsage(provider.id);
        if (!usage) return null;

        const status = getUsageStatus(usage.percentage);
        const statusColor = getStatusColor(status);

        return (
          <div key={provider.id} className="glass rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${provider.color}20`, border: `1px solid ${provider.color}40` }}
                >
                  {provider.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{provider.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(usage.lastUpdated)}
                  </div>
                </div>
              </div>
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Usage Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Usage</span>
                <span 
                  className="font-medium"
                  style={{ color: statusColor }}
                >
                  {formatPercentage(usage.percentage)}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(usage.percentage, 100)}%`,
                    backgroundColor: statusColor,
                    boxShadow: `0 0 10px ${statusColor}40`
                  }}
                />
              </div>
            </div>

            {/* Usage Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Current Usage</span>
                <div className="text-right">
                  <div className="text-white font-medium">{formatCurrency(usage.currentUsage.cost)}</div>
                  <div className="text-slate-500 text-xs">{formatNumber(usage.currentUsage.tokens)} tokens</div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Budget</span>
                <div className="text-right">
                  <div className="text-white font-medium">{formatCurrency(usage.budget.cost)}</div>
                  <div className="text-slate-500 text-xs">{formatNumber(usage.budget.tokens)} tokens</div>
                </div>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-slate-700/50">
                <span className="text-slate-400 text-sm">Remaining</span>
                <div className="text-right">
                  <div 
                    className="font-medium"
                    style={{ color: statusColor }}
                  >
                    {formatCurrency(usage.remaining.cost)}
                  </div>
                  <div className="text-slate-500 text-xs">{formatNumber(usage.remaining.tokens)} tokens</div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                    border: `1px solid ${statusColor}40`
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                {status === 'critical' && (
                  <span className="text-xs text-red-400 animate-pulse">
                    ⚠️ Almost at limit
                  </span>
                )}
                {status === 'warning' && (
                  <span className="text-xs text-yellow-400">
                    ⚡ High usage
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProviderCards; 