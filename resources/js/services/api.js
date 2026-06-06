// Use relative URL for same-origin requests, fallback to localhost for development
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api'
  : '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = new Error(`API Error: ${response.status} ${response.statusText}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
};

const api = {
  // Agents
  getAgents: async () => {
    const response = await fetch(`${API_BASE_URL}/agents`);
    return handleResponse(response);
  },

  getAgent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`);
    return handleResponse(response);
  },

  updateAgentStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  getAgentStatistics: async (id) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}/statistics`);
    return handleResponse(response);
  },

  // Calls
  getCalls: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/calls${query ? `?${query}` : ''}`);
    return handleResponse(response);
  },

  getCall: async (id) => {
    const response = await fetch(`${API_BASE_URL}/calls/${id}`);
    return handleResponse(response);
  },

  createCall: async (data) => {
    const response = await fetch(`${API_BASE_URL}/calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateCall: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/calls/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getActiveCalls: async () => {
    const response = await fetch(`${API_BASE_URL}/calls/active`);
    return handleResponse(response);
  },

  getMissedCalls: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/calls/missed${query ? `?${query}` : ''}`);
    return handleResponse(response);
  },

  // Dashboard
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/overview`);
    return handleResponse(response);
  },

  getLiveStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/live-stats`);
    return handleResponse(response);
  },

  getAgentPerformance: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/agent-performance`);
    return handleResponse(response);
  },

  // Reports
  getCallVolume: async (fromDate, toDate, groupBy = 'day') => {
    const response = await fetch(
      `${API_BASE_URL}/reports/call-volume?from_date=${fromDate}&to_date=${toDate}&group_by=${groupBy}`
    );
    return handleResponse(response);
  },

  getAgentPerformanceReport: async (fromDate, toDate, agentId = null) => {
    let url = `${API_BASE_URL}/reports/agent-performance?from_date=${fromDate}&to_date=${toDate}`;
    if (agentId) url += `&agent_id=${agentId}`;
    const response = await fetch(url);
    return handleResponse(response);
  },

  getDispositionSummary: async (fromDate, toDate) => {
    const response = await fetch(
      `${API_BASE_URL}/reports/disposition-summary?from_date=${fromDate}&to_date=${toDate}`
    );
    return handleResponse(response);
  },

  // Customers
  getCustomers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/customers${query ? `?${query}` : ''}`);
    return handleResponse(response);
  },

  getCustomer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    return handleResponse(response);
  },

  createCustomer: async (data) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateCustomer: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Dispositions
  getDispositions: async () => {
    const response = await fetch(`${API_BASE_URL}/dispositions`);
    return handleResponse(response);
  },
};

export default api;
