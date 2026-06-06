import React from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import StatCard from '../components/StatCard.jsx';
import CallTable from '../components/CallTable.jsx';
import { Phone, Users, Clock, TrendingUp } from 'lucide-react';

const Overview = () => {
  const { overview, activeCalls, agents, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  const availableAgents = agents?.filter((a) => a.status === 'available' || a.status === 'online') || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Real-time call center metrics</p>
        </div>
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Calls Today"
          value={overview?.total_calls_today || 0}
          icon="calls"
          color="blue"
        />
        <StatCard
          title="Active Agents"
          value={overview?.active_agents || 0}
          icon="agents"
          color="green"
        />
        <StatCard
          title="Avg Call Duration"
          value={`${Math.round(overview?.avg_call_duration || 0)}s`}
          icon="duration"
          color="purple"
        />
        <StatCard
          title="Missed Calls"
          value={overview?.missed_calls_today || 0}
          icon="rate"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Calls */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Calls</h2>
          <CallTable calls={activeCalls} />
        </div>

        {/* Agent Status */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Agent Availability</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-700">Available</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {availableAgents.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-700">On Break</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {agents?.filter((a) => a.status === 'break').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full" />
                  <span className="text-sm font-medium text-slate-700">Offline</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {agents?.filter((a) => a.status === 'offline').length || 0}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Total Agents</span>
                  <span className="text-lg font-bold text-slate-900">{agents?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
