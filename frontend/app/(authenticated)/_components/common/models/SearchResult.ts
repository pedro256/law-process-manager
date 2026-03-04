export interface SearchResult {
  id: string;
  type: 'case' | 'client' | 'document' | 'contact';
  title: string;
  subtitle?: string;
  description?: string;
  relevance: number;
  highlights?: string[];
  metadata?: Record<string, any>;
}
