import React, { useState } from 'react';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onToggle: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onToggle }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'u1',
      type: 'deadline',
      title: 'Prazo Crítico',
      message: 'Contestação do processo 1001/2025 vence em 2 dias',
      priority: 'urgent',
      read: false,
      actionUrl: '/cases/p1',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    },
    {
      id: '2',
      userId: 'u1',
      type: 'case_update',
      title: 'Movimentação Processual',
      message: 'Nova movimentação no processo 2002/2025 - Despacho do juiz',
      priority: 'high',
      read: false,
      actionUrl: '/cases/p2',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: '3',
      userId: 'u1',
      type: 'payment',
      title: 'Pagamento Recebido',
      message: 'Honorários do cliente Roberto Almeida foram pagos - R$ 2.500,00',
      priority: 'medium',
      read: false,
      actionUrl: '/financial',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    },
    {
      id: '4',
      userId: 'u1',
      type: 'reminder',
      title: 'Reunião Agendada',
      message: 'Reunião com Maria Silva em 1 hora - Sala de reuniões',
      priority: 'medium',
      read: true,
      actionUrl: '/calendar',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    },
    {
      id: '5',
      userId: 'u1',
      type: 'system',
      title: 'Backup Concluído',
      message: 'Backup automático dos dados foi concluído com sucesso',
      priority: 'low',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === 'urgent') {
      return <AlertTriangle size={16} className="text-red-500" />;
    }
    
    switch (type) {
      case 'deadline':
        return <Clock size={16} className="text-orange-500" />;
      case 'case_update':
        return <Info size={16} className="text-blue-500" />;
      case 'payment':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'reminder':
        return <Bell size={16} className="text-purple-500" />;
      case 'system':
        return <Info size={16} className="text-gray-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-blue-500 bg-blue-50';
      case 'low':
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Notificações</h3>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Marcar todas como lidas
            </button>
          )}
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Nenhuma notificação</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                } hover:bg-opacity-75 transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        !notification.read ? 'text-gray-700' : 'text-gray-500'
                      }`}>
                        {notification.message}
                      </p>
                      {notification.actionUrl && (
                        <button className="text-xs text-primary-600 hover:text-primary-800 mt-1">
                          Ver detalhes →
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-green-600"
                        title="Marcar como lida"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Remover notificação"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button className="w-full text-sm text-primary-600 hover:text-primary-800 font-medium">
            Ver todas as notificações
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;