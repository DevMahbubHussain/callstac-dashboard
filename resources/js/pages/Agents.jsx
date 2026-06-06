import { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import { Phone, Mail, MoreVertical } from 'lucide-react';

const Agents = () => {
  const { agents, refreshAgents } = useDashboard();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [stats, setStats] = useState(null);

  const statusColors = {
    online: 'bg-green-100 text-green-700',
    available: 'bg-blue-100 text-blue-700',
    break: 'bg-yellow-100 text-yellow-700',
    offline: 'bg-slate-100 text-slate-700',
  };

  const statusLabels = {
    online: 'Online',
    available: 'Available',
    break: 'On Break',
    offline: 'Offline',
  };

  const handleAgentClick = async (agent) => {
    setSelectedAgent(agent);
    // Fetch agent statistics
    try {
      const response = await fetch(`http://localhost:8000/api/agents/${agent.id}/statistics`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch agent stats:', error);
    }
  };

  const handleStatusChange = async (agentId, newStatus) => {
    try {
      await fetch(`http://localhost:8000/api/agents/${agentId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      refreshAgents();
      if (selectedAgent?.id === agentId) {
        setSelectedAgent((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Failed to update agent status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agents</h1>
          <p className="text-slate-500">Manage your call center team</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents List */}
        <div className="lg:col-span-2 space-y-4">
          {agents?.map((agent) => (
            <div
              key={agent.id}
              onClick={() => handleAgentClick(agent)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                selectedAgent?.id === agent.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {agent.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{agent.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Mail className="w-4 h-4" />
                      {agent.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <Phone className="w-4 h-4" />
                      {agent.phone}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
                    {statusLabels[agent.status]}
                  </span>
                  <p className="text-xs text-slate-500 mt-2">Ext: {agent.extension}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Details Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {selectedAgent ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {selectedAgent.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{selectedAgent.name}</h3>
                <p className="text-slate-500">{selectedAgent.email}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <label className="text-sm font-medium text-slate-700 block mb-2">
                  Change Status
                </label>
                <select
                  value={selectedAgent.status}
                  onChange={(e) => handleStatusChange(selectedAgent.id, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="available">Available</option>
                  <option value="break">On Break</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {stats && (
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <h4 className="font-medium text-slate-900">Performance Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total Calls</span>
                      <span className="font-medium text-slate-900">{stats.total_calls}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Completed</span>
                      <span className="font-medium text-green-600">{stats.completed_calls}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Missed</span>
                      <span className="font-medium text-red-600">{stats.missed_calls}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Avg Duration</span>
                      <span className="font-medium text-slate-900">
                        {Math.round(stats.avg_duration)}s
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Today's Calls</span>
                      <span className="font-medium text-blue-600">{stats.today_calls}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              Select an agent to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agents;
