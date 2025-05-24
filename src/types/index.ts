export interface ApiProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  website: string;
}

export interface UsageData {
  providerId: string;
  currentUsage: {
    tokens: number;
    cost: number;
  };
  budget: {
    tokens: number;
    cost: number;
  };
  remaining: {
    tokens: number;
    cost: number;
  };
  percentage: number;
  lastUpdated: Date;
}

export interface UsageHistory {
  date: string;
  tokens: number;
  cost: number;
  providerId: string;
}

export interface AlertThreshold {
  type: 'warning' | 'critical';
  percentage: number;
  enabled: boolean;
}

export interface ApiConfiguration {
  providerId: string;
  apiKey?: string;
  budget: {
    tokens: number;
    cost: number;
  };
  alertThresholds: AlertThreshold[];
  isEnabled: boolean;
}

export interface DashboardStats {
  totalBudget: number;
  totalUsed: number;
  totalRemaining: number;
  mostUsedProvider: string;
  averageDailyCost: number;
  projectedMonthlyCost: number;
}

export interface ChartDataPoint {
  date: string;
  claude: number;
  gemini: number;
  openai: number;
  deepseek: number;
  huggingface: number;
  total: number;
} 