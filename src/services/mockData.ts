import { ApiProvider, UsageData, UsageHistory, DashboardStats, ChartDataPoint } from '../types';

export const API_PROVIDERS: ApiProvider[] = [
  {
    id: 'claude',
    name: 'Claude Anthropic',
    icon: '🤖',
    color: '#D97706',
    website: 'https://anthropic.com'
  },
  {
    id: 'gemini',
    name: 'Google Gemini 2.5 Pro',
    icon: '💎',
    color: '#0EA5E9',
    website: 'https://ai.google.dev'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '⚡',
    color: '#10B981',
    website: 'https://openai.com'
  },
  {
    id: 'deepseek',
    name: 'Deepseek',
    icon: '🔍',
    color: '#8B5CF6',
    website: 'https://deepseek.com'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    icon: '🤗',
    color: '#F59E0B',
    website: 'https://huggingface.co'
  }
];

export const MOCK_USAGE_DATA: UsageData[] = [
  {
    providerId: 'claude',
    currentUsage: { tokens: 2450000, cost: 49.20 },
    budget: { tokens: 5000000, cost: 100.00 },
    remaining: { tokens: 2550000, cost: 50.80 },
    percentage: 49,
    lastUpdated: new Date()
  },
  {
    providerId: 'gemini',
    currentUsage: { tokens: 1250000, cost: 18.75 },
    budget: { tokens: 2000000, cost: 30.00 },
    remaining: { tokens: 750000, cost: 11.25 },
    percentage: 62.5,
    lastUpdated: new Date()
  },
  {
    providerId: 'openai',
    currentUsage: { tokens: 1800000, cost: 72.00 },
    budget: { tokens: 2500000, cost: 100.00 },
    remaining: { tokens: 700000, cost: 28.00 },
    percentage: 72,
    lastUpdated: new Date()
  },
  {
    providerId: 'deepseek',
    currentUsage: { tokens: 875000, cost: 8.75 },
    budget: { tokens: 1500000, cost: 15.00 },
    remaining: { tokens: 625000, cost: 6.25 },
    percentage: 58.3,
    lastUpdated: new Date()
  },
  {
    providerId: 'huggingface',
    currentUsage: { tokens: 320000, cost: 12.80 },
    budget: { tokens: 500000, cost: 20.00 },
    remaining: { tokens: 180000, cost: 7.20 },
    percentage: 64,
    lastUpdated: new Date()
  }
];

export const generateUsageHistory = (): UsageHistory[] => {
  const history: UsageHistory[] = [];
  const days = 30;
  
  API_PROVIDERS.forEach(provider => {
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const baseUsage = Math.random() * 100000 + 50000;
      const variation = Math.sin(i * 0.2) * 20000;
      
      history.push({
        date: date.toISOString().split('T')[0],
        tokens: Math.floor(baseUsage + variation),
        cost: parseFloat(((baseUsage + variation) * 0.00002).toFixed(2)),
        providerId: provider.id
      });
    }
  });
  
  return history;
};

export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const claude = Math.floor(Math.random() * 80000 + 40000);
    const gemini = Math.floor(Math.random() * 60000 + 30000);
    const openai = Math.floor(Math.random() * 90000 + 50000);
    const deepseek = Math.floor(Math.random() * 40000 + 20000);
    const huggingface = Math.floor(Math.random() * 20000 + 10000);
    
    data.push({
      date: date.toISOString().split('T')[0],
      claude,
      gemini,
      openai,
      deepseek,
      huggingface,
      total: claude + gemini + openai + deepseek + huggingface
    });
  }
  
  return data;
};

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalBudget: 265.00,
  totalUsed: 161.50,
  totalRemaining: 103.50,
  mostUsedProvider: 'OpenAI',
  averageDailyCost: 5.38,
  projectedMonthlyCost: 161.40
}; 