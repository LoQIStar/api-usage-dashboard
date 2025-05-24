import React from 'react';
import { RefreshCw, Settings, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  lastUpdated: Date;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, lastUpdated }) => {
  return (
    <header className="glass rounded-xl p-6 mb-8 border border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg">
            <Menu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">API Usage Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Monitor your AI model usage across providers
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="text-slate-400">Last updated</p>
            <p className="text-white font-medium">
              {lastUpdated.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5 text-slate-300" />
            </button>
            
            <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30">
              <Bell className="w-5 h-5 text-slate-300" />
            </button>
            
            <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600/30">
              <Settings className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 