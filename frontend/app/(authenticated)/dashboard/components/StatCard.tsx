import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  change,
}) => {
  return (
    <div className="card p-6 flex flex-col slide-in">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className={`rounded-full p-2 ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
      
      {change && (
        <div className="mt-1">
          <span className={`text-xs font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
          <span className="text-xs text-gray-500 ml-1">em relação ao mês anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;