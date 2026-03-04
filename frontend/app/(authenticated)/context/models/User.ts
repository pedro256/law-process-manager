export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'lawyer' | 'assistant' | 'staff';
  avatar?: string;
  permissions: Permission[];
  mfaEnabled: boolean;
  lastLogin?: string;
  preferences: UserPreferences;
}


export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete' | 'admin')[];
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt-BR' | 'en-US';
  notifications: NotificationSettings;
  dashboardLayout: DashboardWidget[];
}
export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'calendar' | 'tasks' | 'notifications';
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  whatsapp: boolean;
  deadlineAlerts: number; // days before
  caseUpdates: boolean;
  financialAlerts: boolean;
}