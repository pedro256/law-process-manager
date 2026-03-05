export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: string;
  attachments?: string[];
  metadata?: Record<string, any>;
}