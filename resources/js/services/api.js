// Use relative URL for same-origin requests, fallback to localhost for development
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? '/api'  // Use relative path for local development
    : '/api'; // Use relative path in production

const api = {
  // Agents
  getAgents: async () => {
    const response = await fetch(`${API_BASE_URL}/agents`);
    return response.json();
  },

  getAgent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`);
    return response.json();
  },

  updateAgentStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  getAgentStatistics: async (id) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/statistics`);
    return response.json();
  },

  // Calls
  getCalls: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/calls${query ? `?${query}` : ''}`);
    return response.json();
  },

  getCall: async (id) => {
    const response = await fetch(`${API_BASE_URL}/calls/${id}`);
    return response.json();
  },

  createCall: async (data) => {
    const response = await fetch(`${API_BASE_URL}/calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateCall: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/calls/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getActiveCalls: async () => {
    const response = await fetch(`${API_BASE_URL}/calls/active`);
    return response.json();
  },

  getMissedCalls: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/calls/missed${query ? `?${query}` : ''}`);
    return response.json();
  },

  // Dashboard
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/overview`);
    return response.json();
  },

  getLiveStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/live-stats`);
    return response.json();
  },

  getAgentPerformance: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/agent-performance`);
    return response.json();
  },

  // Reports
  getCallVolume: async (fromDate, toDate, groupBy = 'day') => {
    const response = await fetch(`${API_BASE_URL}/reports/call-volume?from_date=${fromDate}&to_date=${toDate}&group_by=${groupBy}`);
    return response.json();
  },

  getAgentPerformanceReport: async (fromDate, toDate, agentId = null) => {
    let url = `${API_BASE_URL}/reports/agent-performance?from_date=${fromDate}&to_date=${toDate}`;
    if (agentId) url += `&agent_id=${agentId}`;
    const response = await fetch(url);
    return response.json();
  },

  getDispositionSummary: async (fromDate, toDate) => {
    const response = await fetch(`${API_BASE_URL}/reports/disposition-summary?from_date=${fromDate}&to_date=${toDate}`);
    return response.json();
  },

  // Customers
  getCustomers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/customers${query ? `?${query}` : ''}`);
    return response.json();
  },

  getCustomer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    return response.json();
  },

  createCustomer: async (data) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateCustomer: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Dispositions
  getDispositions: async () => {
    const response = await fetch(`${API_BASE_URL}/dispositions`);
    return response.json();
  },
};

export default api;
