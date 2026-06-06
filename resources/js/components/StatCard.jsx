import React from 'react';
import { Phone, Users, Clock, TrendingUp } from 'lucide-react';

const icons = {
  calls: Phone,
  agents: Users,
  duration: Clock,
  rate: TrendingUp,
};

const colors = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
};

const hoverColors = {
  blue: 'group-hover:bg-blue-600',
  green: 'group-hover:bg-green-600',
  purple: 'group-hover:bg-purple-600',
  orange: 'group-hover:bg-orange-600',
};

const StatCard = ({ title, value, icon, color = 'blue', trend }) => {
  const Icon = icons[icon] || Phone;
  const bgColor = colors[color] || colors.blue;
  const hoverBgColor = hoverColors[color] || hoverColors.blue;

  return (
    <div className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-default">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from yesterday
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${bgColor} ${hoverBgColor} rounded-lg flex items-center justify-center transition-colors duration-200`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
