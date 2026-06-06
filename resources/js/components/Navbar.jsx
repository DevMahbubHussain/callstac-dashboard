import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext.jsx';

const Navbar = () => {
  const { activeCalls } = useDashboard();

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search calls, agents..."
            className="pl-10 pr-4 py-2 w-80 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{activeCalls.length} Active Calls</span>
        </div>

        <button className="relative p-2 hover:bg-slate-100 rounded-lg">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
