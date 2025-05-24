import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { ChartDataPoint } from '../types';
import { formatCurrency, formatDate, formatNumber } from '../utils';

interface UsageChartProps {
  data: ChartDataPoint[];
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'cost' | 'tokens'>('cost');
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('30d');

  const filteredData = data.slice(timeRange === '7d' ? -7 : -30);

  const providerColors = {
    claude: '#D97706',
    gemini: '#0EA5E9',
    openai: '#10B981',
    deepseek: '#8B5CF6',
    huggingface: '#F59E0B'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border border-slate-700/50 rounded-lg p-4 shadow-xl">
          <p className="text-slate-300 text-sm mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400 capitalize">{entry.dataKey}:</span>
              <span className="text-white font-medium">
                {viewMode === 'cost' 
                  ? formatCurrency(entry.value * 0.00002) 
                  : formatNumber(entry.value)
                }
                {viewMode === 'tokens' && ' tokens'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (viewMode === 'cost') {
      return formatCurrency(value * 0.00002);
    }
    return formatNumber(value);
  };

  return (
    <div className="glass rounded-xl p-6 border border-slate-700/50 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Usage Trends</h3>
            <p className="text-slate-400 text-sm">API usage across all providers</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cost')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'cost' 
                  ? 'bg-accent-blue text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cost
            </button>
            <button
              onClick={() => setViewMode('tokens')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'tokens' 
                  ? 'bg-accent-blue text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tokens
            </button>
          </div>
          
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === '7d' 
                  ? 'bg-accent-purple text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === '30d' 
                  ? 'bg-accent-purple text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              30D
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={formatDate}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#94a3b8' }}
              iconType="circle"
            />
            {Object.entries(providerColors).map(([provider, color]) => (
              <Line
                key={provider}
                type="monotone"
                dataKey={provider}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: color }}
                name={provider.charAt(0).toUpperCase() + provider.slice(1)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart; 