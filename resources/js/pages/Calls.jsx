import { useState, useEffect } from 'react';
import CallTable from '../components/CallTable.jsx';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCalls();
  }, [filter]);

  const fetchCalls = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8000/api/calls';
      if (filter !== 'all') {
        url += `?status=${filter}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setCalls(data.data || data);
    } catch (error) {
      console.error('Failed to fetch calls:', error);
    }
    setLoading(false);
  };

  const filteredCalls = calls?.filter((call) => {
    if (search) {
      return (
        call.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        call.customer_phone?.includes(search)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Call History</h1>
          <p className="text-slate-500">View and manage all calls</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Calls</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-150">
            <SlidersHorizontal className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Calls Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading calls...</div>
        </div>
      ) : (
        <CallTable calls={filteredCalls} />
      )}

      {/* Pagination */}
      {calls?.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredCalls?.length} of {calls?.length} calls
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 transition-all duration-150">
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 transition-all duration-150">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calls;
