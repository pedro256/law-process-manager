import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Clock, FileText, Users, Briefcase } from 'lucide-react';
import { SearchResult } from './models/SearchResult';


interface SmartSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  className?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ 
  onResultSelect, 
  placeholder = "Busca inteligente...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search function - in real app, this would call an API
  const performSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery.trim()) return [];
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'case',
        title: 'Ação de Cobrança - Empresa ABC',
        subtitle: 'Processo nº 1001/2025',
        description: 'Cobrança de valores em aberto referente ao contrato...',
        relevance: 0.95,
        highlights: ['cobrança', 'empresa abc'],
        metadata: { status: 'in_progress', court: '5ª Vara Cível' }
      },
      {
        id: '2',
        type: 'client',
        title: 'Roberto Almeida',
        subtitle: 'Cliente desde 2023',
        description: 'CPF: 123.456.789-00 • Telefone: (11) 98765-4321',
        relevance: 0.87,
        highlights: ['roberto', 'almeida'],
        metadata: { category: 'individual', status: 'active' }
      },
      {
        id: '3',
        type: 'document',
        title: 'Petição Inicial - Ação de Cobrança',
        subtitle: 'Documento • Versão 2',
        description: 'Petição inicial para ação de cobrança contra...',
        relevance: 0.82,
        highlights: ['petição', 'cobrança'],
        metadata: { type: 'petition', status: 'final' }
      }
    ].filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setIsLoading(false);
    return mockResults;
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(s => s !== query)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });

    onResultSelect?.(result);
    setIsOpen(false);
    setQuery('');
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <Briefcase size={16} className="text-blue-600" />;
      case 'client':
        return <Users size={16} className="text-green-600" />;
      case 'document':
        return <FileText size={16} className="text-purple-600" />;
      default:
        return <Search size={16} className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'case':
        return 'Processo';
      case 'client':
        return 'Cliente';
      case 'document':
        return 'Documento';
      default:
        return type;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Buscando...</p>
            </div>
          )}

          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="p-4 text-center">
              <Search size={24} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Nenhum resultado encontrado</p>
            </div>
          )}

          {!isLoading && query.length < 2 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                Buscas Recentes
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                >
                  <Clock size={14} className="text-gray-400 mr-2" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                Resultados ({results.length})
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-start px-3 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-0"
                >
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    {getResultIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <span className="text-xs text-gray-500 ml-2">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    {result.subtitle && (
                      <p className="text-xs text-gray-600 mb-1">{result.subtitle}</p>
                    )}
                    {result.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                    {result.highlights && result.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {result.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;