import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Phone,
  Users,
  BarChart3,
  AlertCircle,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Active Calls', href: '/active-calls', icon: AlertCircle },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">CallStac</h1>
          <p className="text-slate-400 text-xs">Call Center Dashboard</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
