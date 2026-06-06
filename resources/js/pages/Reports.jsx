import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';

const Reports = () => {
  const [callVolume, setCallVolume] = useState([]);
  const [agentPerformance, setAgentPerformance] = useState([]);
  const [dispositionSummary, setDispositionSummary] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '2026-06-01', to: '2026-06-06' });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    fetchCallVolume();
    fetchAgentPerformance();
    fetchDispositionSummary();
  }, [dateRange]);

  const fetchCallVolume = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reports/call-volume?from_date=${dateRange.from}&to_date=${dateRange.to}&group_by=day`
      );
      const data = await response.json();
      setCallVolume(data.data || []);
    } catch (error) {
      console.error('Failed to fetch call volume:', error);
    }
  };

  const fetchAgentPerformance = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reports/agent-performance?from_date=${dateRange.from}&to_date=${dateRange.to}`
      );
      const data = await response.json();
      setAgentPerformance(data.data || []);
    } catch (error) {
      console.error('Failed to fetch agent performance:', error);
    }
  };

  const fetchDispositionSummary = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reports/disposition-summary?from_date=${dateRange.from}&to_date=${dateRange.to}`
      );
      const data = await response.json();
      setDispositionSummary(data.data || []);
    } catch (error) {
      console.error('Failed to fetch disposition summary:', error);
    }
  };

  const handleExport = async () => {
    try {
      await fetch('http://localhost:8000/api/reports/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'call_volume',
          from_date: dateRange.from,
          to_date: dateRange.to,
          format: 'csv',
        }),
      });
      // Note: This would typically trigger a file download
      alert('Export functionality requires backend implementation with Laravel Excel');
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500">Track call center performance metrics</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">From:</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">To:</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Call Volume Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="period" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} name="Calls" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Agent Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformance.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="agent_name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_calls" fill="#3b82f6" name="Total Calls" />
              <Bar dataKey="completed_calls" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Disposition Summary Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Call Outcomes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dispositionSummary}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.disposition_name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {dispositionSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Agent Success Rates</h2>
          <div className="space-y-3">
            {agentPerformance.slice(0, 5).map((agent) => (
              <div key={agent.agent_id} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{agent.agent_name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${agent.success_rate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900">{agent.success_rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
