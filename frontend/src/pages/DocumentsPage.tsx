import React, { useState } from 'react';
import { Search, Plus, Filter, Folder, FileText, FileEdit, Trash } from 'lucide-react';
import { documents } from '../data/mockData';
import { Document } from '../types';

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get unique document types for filter
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'petition':
        return 'Petição';
      case 'power_of_attorney':
        return 'Procuração';
      case 'corporate_document':
        return 'Documento Societário';
      case 'agreement':
        return 'Acordo';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">Documentos</h1>
      </div>
      
      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl font-serif font-semibold text-gray-800">Documentos</h2>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg ${view === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-lg ${view === 'list' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </button>
              
              <button className="btn btn-primary inline-flex items-center ml-2">
                <Plus size={18} className="mr-1" />
                Novo Documento
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar documentos..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Filter size={16} className="text-gray-500 mr-2" />
                <select
                  className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Todos tipos</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{getTypeLabel(type)}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <select
                  className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Todos status</option>
                  <option value="draft">Rascunho</option>
                  <option value="final">Finalizado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {filteredDocuments.length > 0 ? (
          <div className="p-6">
            {view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDocuments.map((document) => (
                  <div 
                    key={document.id} 
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-primary-50 p-2 rounded-lg">
                        <FileText size={24} className="text-primary-600" />
                      </div>
                      <div className="flex">
                        <button className="p-1 text-gray-400 hover:text-primary-600">
                          <FileEdit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 ml-1">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-1 text-gray-800 line-clamp-2">{document.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Atualizado em {new Date(document.updatedAt).toLocaleDateString('pt-BR')}
                      {document.version > 1 && ` • Versão ${document.version}`}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`badge ${
                        document.status === 'draft' ? 'badge-yellow' :
                        document.status === 'final' ? 'badge-green' :
                        'badge-gray'
                      }`}>
                        {document.status === 'draft' ? 'Rascunho' :
                        document.status === 'final' ? 'Finalizado' :
                        'Arquivado'}
                      </span>
                      <a 
                        href="#" 
                        className="text-primary-600 text-sm font-medium hover:text-primary-800"
                      >
                        Visualizar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Relacionado a
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Atualizado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDocuments.map((document) => (
                      <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-primary-50 p-1.5 rounded-lg mr-3">
                              <FileText size={16} className="text-primary-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-800">{document.title}</div>
                              <div className="text-xs text-gray-500">Versão {document.version}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {getTypeLabel(document.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {document.caseId ? (
                            <div className="flex items-center">
                              <FileText size={14} className="text-gray-500 mr-1" />
                              <span>Processo</span>
                            </div>
                          ) : document.clientId ? (
                            <div className="flex items-center">
                              <Folder size={14} className="text-gray-500 mr-1" />
                              <span>Cliente</span>
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`badge ${
                            document.status === 'draft' ? 'badge-yellow' :
                            document.status === 'final' ? 'badge-green' :
                            'badge-gray'
                          }`}>
                            {document.status === 'draft' ? 'Rascunho' :
                            document.status === 'final' ? 'Finalizado' :
                            'Arquivado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(document.updatedAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-gray-500 hover:text-primary-600">
                              <FileEdit size={16} />
                            </button>
                            <button className="text-gray-500 hover:text-red-600">
                              <Trash size={16} />
                            </button>
                            <a 
                              href="#" 
                              className="text-primary-600 hover:text-primary-900 font-medium"
                            >
                              Visualizar
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Folder size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum documento encontrado</h3>
            <p className="text-gray-500 mb-4">
              Não encontramos nenhum documento correspondente aos critérios de busca.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="btn btn-outline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;