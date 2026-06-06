import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [overview, setOverview] = useState(null);
  const [liveStats, setLiveStats] = useState(null);
  const [activeCalls, setActiveCalls] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshOverview = async () => {
    try {
      const data = await api.getOverview();
      setOverview(data);
    } catch (error) {
      console.error('Failed to fetch overview:', error);
      setOverview({ total_calls_today: 0, active_agents: 0, available_agents: 0, missed_calls_today: 0, avg_call_duration: 0, active_calls_now: 0 });
    }
  };

  const refreshLiveStats = async () => {
    try {
      const data = await api.getLiveStats();
      setLiveStats(data);
    } catch (error) {
      console.error('Failed to fetch live stats:', error);
      setLiveStats({ timestamp: new Date().toISOString(), active_calls: [], online_agents: [], available_agents: 0 });
    }
  };

  const refreshActiveCalls = async () => {
    try {
      const data = await api.getActiveCalls();
      setActiveCalls(data);
    } catch (error) {
      console.error('Failed to fetch active calls:', error);
      setActiveCalls([]);
    }
  };

  const refreshAgents = async () => {
    try {
      const data = await api.getAgents();
      setAgents(data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      setAgents([]);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([
      refreshOverview(),
      refreshLiveStats(),
      refreshActiveCalls(),
      refreshAgents(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    // Delay initial data fetch to allow UI to render first
    const timeoutId = setTimeout(() => {
      refreshAll();
    }, 100);

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      refreshAll();
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        overview,
        liveStats,
        activeCalls,
        agents,
        loading,
        refreshAll,
        refreshOverview,
        refreshLiveStats,
        refreshActiveCalls,
        refreshAgents,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
