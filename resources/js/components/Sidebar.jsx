import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const navLinkClass = (href) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
      isActive(href)
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`;

  return (
    <div className="w-64 bg-slate-900 min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
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
            className={navLinkClass(item.href)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/settings"
          className={navLinkClass('/settings')}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
