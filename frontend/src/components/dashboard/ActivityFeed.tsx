import React from 'react';
import { FileText, User, Calendar, Clock, CircleDot } from 'lucide-react';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  title: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, title }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_update':
        return <FileText size={16} className="text-blue-500" />;
      case 'client_added':
        return <User size={16} className="text-green-500" />;
      case 'document_upload':
        return <FileText size={16} className="text-yellow-500" />;
      case 'event':
        return <Calendar size={16} className="text-purple-500" />;
      case 'deadline':
        return <Clock size={16} className="text-red-500" />;
      default:
        return <CircleDot size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      
      if (isToday(date)) {
        return 'Hoje';
      } else if (isYesterday(date)) {
        return 'Ontem';
      } else {
        return format(date, "dd 'de' MMMM", { locale: ptBR });
      }
    } catch (error) {
      return dateStr;
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <p className="text-gray-500 text-sm py-4 text-center">Nenhuma atividade recente</p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;