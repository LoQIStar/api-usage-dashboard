import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OverviewStats from './components/OverviewStats';
import ProviderCards from './components/ProviderCards';
import UsageChart from './components/UsageChart';
import { 
  API_PROVIDERS, 
  MOCK_USAGE_DATA, 
  MOCK_DASHBOARD_STATS, 
  generateChartData 
} from './services/mockData';
import { ApiProvider, UsageData, DashboardStats, ChartDataPoint } from './types';

function App() {
  const [providers] = useState<ApiProvider[]>(API_PROVIDERS);
  const [usageData, setUsageData] = useState<UsageData[]>(MOCK_USAGE_DATA);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(MOCK_DASHBOARD_STATS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize chart data
    setChartData(generateChartData());
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would fetch fresh data from your APIs here
    // For now, we'll just update the timestamp and regenerate some data
    setLastUpdated(new Date());
    setChartData(generateChartData());
    
    // Simulate slight changes in usage data
    const updatedUsageData = usageData.map(usage => ({
      ...usage,
      currentUsage: {
        ...usage.currentUsage,
        tokens: usage.currentUsage.tokens + Math.floor(Math.random() * 10000),
        cost: usage.currentUsage.cost + Math.random() * 2
      },
      lastUpdated: new Date()
    }));
    
    // Recalculate percentages
    const finalUsageData = updatedUsageData.map(usage => ({
      ...usage,
      percentage: (usage.currentUsage.cost / usage.budget.cost) * 100,
      remaining: {
        tokens: usage.budget.tokens - usage.currentUsage.tokens,
        cost: usage.budget.cost - usage.currentUsage.cost
      }
    }));
    
    setUsageData(finalUsageData);
    
    // Update dashboard stats
    const totalUsed = finalUsageData.reduce((sum, usage) => sum + usage.currentUsage.cost, 0);
    const totalBudget = finalUsageData.reduce((sum, usage) => sum + usage.budget.cost, 0);
    
    setDashboardStats({
      ...dashboardStats,
      totalUsed,
      totalRemaining: totalBudget - totalUsed,
      averageDailyCost: totalUsed / 30,
      projectedMonthlyCost: (totalUsed / 30) * 30
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 p-6">
      <div className="max-w-7xl mx-auto">
        <Header onRefresh={handleRefresh} lastUpdated={lastUpdated} />
        
        <OverviewStats stats={dashboardStats} />
        
        <ProviderCards providers={providers} usageData={usageData} />
        
        <UsageChart data={chartData} />
        
        {/* Footer */}
        <footer className="glass rounded-xl p-4 border border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            API Usage Dashboard - Monitor your AI model consumption across multiple providers
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Last refresh: {lastUpdated.toLocaleString()}
          </p>
        </footer>
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-blue"></div>
              <span className="text-white">Refreshing data...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
