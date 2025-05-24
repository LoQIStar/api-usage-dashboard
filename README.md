# API Usage Dashboard

A comprehensive dashboard for monitoring API usage across multiple AI model providers. Track your consumption, manage budgets, and receive early warnings before hitting your limits.

## 🚀 Features

### Multi-Provider Support
- **Claude Anthropic** - Advanced AI assistant
- **Google Gemini 2.5 Pro** - Google's latest AI model
- **OpenAI** - GPT models and APIs
- **Deepseek** - Efficient AI models
- **Hugging Face** - Open-source AI models

### Dashboard Capabilities
- **Real-time Usage Tracking** - Monitor token consumption and costs
- **Budget Management** - Set and track spending limits
- **Early Warning System** - Get alerts before hitting limits
- **Usage Trends** - Visualize consumption patterns over time
- **Provider Comparison** - Compare usage across different APIs
- **Responsive Design** - Works on desktop, tablet, and mobile

### Key Metrics
- Current usage in tokens and dollars
- Remaining budget and projected costs
- Usage percentage with color-coded status
- Daily average consumption
- Monthly projections

## 🎨 Design

The dashboard features a modern dark theme with:
- Glassmorphism effects
- Gradient accents
- Smooth animations
- Responsive grid layouts
- Interactive charts and visualizations

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **PostCSS** for CSS processing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd api-usage-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 🔧 Configuration

### Setting Up API Providers

Currently, the dashboard uses mock data for demonstration. To connect real API providers:

1. **Create API service files** in `src/services/` for each provider
2. **Implement data fetching** functions for usage statistics
3. **Update the mock data** with real API calls
4. **Configure API keys** (store securely, never commit to version control)

### Customizing Budgets

Edit the budget values in `src/services/mockData.ts`:

```typescript
export const MOCK_USAGE_DATA: UsageData[] = [
  {
    providerId: 'claude',
    budget: { tokens: 5000000, cost: 100.00 }, // Adjust these values
    // ... other properties
  },
  // ... other providers
];
```

### Alert Thresholds

Customize warning and critical alert levels in the utility functions:

```typescript
export const getUsageStatus = (percentage: number): 'safe' | 'warning' | 'critical' => {
  if (percentage >= 90) return 'critical';  // Adjust threshold
  if (percentage >= 75) return 'warning';   // Adjust threshold
  return 'safe';
};
```

## 📊 Data Structure

### API Provider
```typescript
interface ApiProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  website: string;
}
```

### Usage Data
```typescript
interface UsageData {
  providerId: string;
  currentUsage: { tokens: number; cost: number };
  budget: { tokens: number; cost: number };
  remaining: { tokens: number; cost: number };
  percentage: number;
  lastUpdated: Date;
}
```

## 🔮 Future Enhancements

- **Real API Integration** - Connect to actual provider APIs
- **User Authentication** - Secure access with login system
- **Data Persistence** - Store historical data in database
- **Advanced Alerts** - Email/SMS notifications
- **Export Features** - Download reports as PDF/CSV
- **Team Management** - Multi-user support with roles
- **Cost Optimization** - Recommendations for reducing usage
- **API Key Management** - Secure credential storage

## 🚨 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement proper authentication for production
- Consider rate limiting for API calls
- Encrypt stored credentials

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🎯 Usage Scenarios

### Individual Developers
- Track personal API usage across projects
- Monitor spending to stay within budget
- Optimize API calls for cost efficiency

### Development Teams
- Monitor team-wide API consumption
- Allocate budgets across different projects
- Identify high-usage periods and patterns

### Businesses
- Track API costs across departments
- Set spending limits and alerts
- Generate usage reports for accounting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern dashboard interfaces
- Icons provided by Lucide React
- Charts powered by Recharts library
- Styling with Tailwind CSS

---

**Note**: This dashboard currently uses mock data for demonstration purposes. For production use, integrate with actual API provider endpoints and implement proper authentication and data persistence.
