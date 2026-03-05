





export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  document: string;
  documentType: 'cpf' | 'cnpj';
  address: Address;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  notes?: string;
  status: 'active' | 'inactive' | 'prospect';
  communicationHistory: Communication[];
  customFields: Record<string, any>;
  riskProfile: 'low' | 'medium' | 'high';
  creditScore?: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Communication {
  id: string;
  type: 'email' | 'phone' | 'whatsapp' | 'meeting' | 'letter';
  direction: 'inbound' | 'outbound';
  content: string;
  timestamp: string;
  userId: string;
  attachments?: string[];
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface Case {
  id: string;
  number: string;
  title: string;
  clientId: string;
  clientName: string;
  court: string;
  courtCode?: string;
  type: string;
  category: string;
  status: 'new' | 'in_progress' | 'waiting' | 'suspended' | 'closed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string[];
  openedAt: string;
  updatedAt: string;
  estimatedValue?: number;
  actualValue?: number;
  deadlines: Deadline[];
  movements: CaseMovement[];
  documents: string[];
  costs: CaseCost[];
  tags: string[];
  customFields: Record<string, any>;
  aiInsights?: AIInsight[];
  riskAssessment?: RiskAssessment;
}

export interface CaseMovement {
  id: string;
  caseId: string;
  type: 'filing' | 'hearing' | 'decision' | 'appeal' | 'settlement' | 'other';
  description: string;
  date: string;
  userId: string;
  source: 'manual' | 'tribunal_api' | 'email' | 'automated';
  attachments?: string[];
  impact: 'positive' | 'negative' | 'neutral';
}

export interface CaseCost {
  id: string;
  caseId: string;
  type: 'court_fee' | 'expert_fee' | 'travel' | 'documentation' | 'other';
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'reimbursed';
  receipt?: string;
}

export interface AIInsight {
  id: string;
  type: 'deadline_prediction' | 'outcome_probability' | 'similar_cases' | 'risk_alert';
  title: string;
  description: string;
  confidence: number;
  data: Record<string, any>;
  createdAt: string;
}

export interface RiskAssessment {
  overall: 'low' | 'medium' | 'high';
  factors: RiskFactor[];
  recommendations: string[];
  lastUpdated: string;
}

export interface RiskFactor {
  factor: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
}

export interface Deadline {
  id: string;
  caseId: string;
  title: string;
  description?: string;
  date: string;
  type: 'court' | 'internal' | 'client' | 'administrative';
  priority: 'low' | 'medium' | 'high' | 'critical';
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
  alerts: DeadlineAlert[];
  dependencies?: string[];
  estimatedHours?: number;
  actualHours?: number;
}

export interface DeadlineAlert {
  id: string;
  deadlineId: string;
  type: 'email' | 'push' | 'sms' | 'whatsapp';
  triggerDays: number;
  sent: boolean;
  sentAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'hearing' | 'meeting' | 'deadline' | 'reminder' | 'consultation';
  caseId?: string;
  clientId?: string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  attendees: EventAttendee[];
  reminders: EventReminder[];
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  recurrence?: RecurrenceRule;
}

export interface EventAttendee {
  id: string;
  name: string;
  email: string;
  type: 'required' | 'optional';
  status: 'pending' | 'accepted' | 'declined';
}

export interface EventReminder {
  type: 'email' | 'push' | 'sms';
  minutes: number;
  sent: boolean;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: string;
  count?: number;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  caseId?: string;
  clientId?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'draft' | 'review' | 'approved' | 'final' | 'archived';
  version: number;
  path: string;
  size: number;
  mimeType: string;
  tags: string[];
  ocrText?: string;
  aiSummary?: string;
  signatures: DocumentSignature[];
  accessLog: DocumentAccess[];
  retention: DocumentRetention;
}

export interface DocumentSignature {
  id: string;
  signerId: string;
  signerName: string;
  signedAt: string;
  method: 'digital' | 'electronic' | 'physical';
  valid: boolean;
}

export interface DocumentAccess {
  userId: string;
  action: 'view' | 'download' | 'edit' | 'share';
  timestamp: string;
  ipAddress: string;
}

export interface DocumentRetention {
  retainUntil?: string;
  reason: string;
  autoDelete: boolean;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  variables: TemplateVariable[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usage: number;
  tags: string[];
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'list';
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  caseId?: string;
  clientId?: string;
  category: string;
  subcategory?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate?: string;
  paymentMethod?: string;
  reference?: string;
  taxDeductible: boolean;
  attachments?: string[];
  recurringId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  caseId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentTerms: string;
  notes?: string;
  currency: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxable: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string[];
  createdBy: string;
  caseId?: string;
  clientId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  dependencies?: string[];
  checklist?: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  caseId?: string;
  clientId?: string;
  taskId?: string;
  description: string;
  startTime: string;
  endTime?: string;
  duration: number; // minutes
  billable: boolean;
  rate?: number;
  status: 'draft' | 'submitted' | 'approved' | 'billed';
  tags: string[];
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'financial' | 'productivity' | 'case_analysis' | 'client_summary' | 'custom';
  parameters: ReportParameter[];
  schedule?: ReportSchedule;
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  createdBy: string;
  createdAt: string;
  lastRun?: string;
}

export interface ReportParameter {
  name: string;
  type: 'date_range' | 'user' | 'case' | 'client' | 'category';
  value: any;
  required: boolean;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  enabled: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: 'tribunal' | 'financial' | 'communication' | 'storage' | 'analytics';
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  lastSync?: string;
  syncFrequency: number; // minutes
  errorLog?: IntegrationError[];
}

export interface IntegrationError {
  timestamp: string;
  error: string;
  details?: string;
  resolved: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'deadline' | 'case_update' | 'payment' | 'system' | 'reminder';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
}

export interface DashboardStats {
  activeCases: number;
  upcomingDeadlines: number;
  pendingInvoices: number;
  totalClients: number;
  monthlyRevenue: number;
  productivityScore: number;
  caseSuccessRate: number;
  averageResolutionTime: number;
  monthlyCaseStats: { month: string; count: number; revenue: number }[];
  statusDistribution: { status: string; count: number; percentage: number }[];
  recentActivities: Activity[];
  upcomingEvents: Event[];
  criticalDeadlines: Deadline[];
  performanceMetrics: PerformanceMetric[];
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId: string;
  resourceId?: string;
  metadata?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}




export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
  author: string;
}