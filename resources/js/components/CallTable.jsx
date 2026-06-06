import React from 'react';
import { Phone, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const statusConfig = {
  'in_progress': { icon: Phone, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' },
  'completed': { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
  'missed': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Missed' },
  'abandoned': { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100', label: 'Abandoned' },
  'ringing': { icon: Phone, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Ringing' },
};

const CallTable = ({ calls, onCallClick }) => {
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Agent
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {calls?.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                No calls found
              </td>
            </tr>
          ) : (
            calls?.map((call) => {
              const status = statusConfig[call.status] || statusConfig.ringing;
              const StatusIcon = status.icon;

              return (
                <tr
                  key={call.id}
                  onClick={() => onCallClick?.(call)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{call.customer_name || 'Unknown'}</p>
                      <p className="text-sm text-slate-500">{call.customer_phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-slate-600">
                          {call.agent?.name?.charAt(0) || 'N/A'}
                        </span>
                      </div>
                      <span className="text-sm text-slate-700">{call.agent?.name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDuration(call.duration_seconds)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(call.started_at)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CallTable;
