import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Calendar, 
  Gavel, 
  Clock, 
  Edit, 
  Trash, 
  ArrowLeft, 
  CheckSquare, 
  AlertCircle,
  FileEdit,
  Plus 
} from 'lucide-react';
import { cases, documents, users } from '../../data/mockData';
import { format, parseISO, isToday, addDays, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Deadline } from '../../types';

const CaseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'deadlines' | 'documents'>('overview');
  
  const caseItem = cases.find(c => c.id === id);
  const caseDocuments = documents.filter(d => d.caseId === id);
  
  if (!caseItem) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Processo não encontrado</h2>
        <p className="text-gray-600 mb-4">O processo que você está procurando não existe ou foi removido.</p>
        <Link to="/cases" className="btn btn-primary">
          Voltar para lista de processos
        </Link>
      </div>
    );
  }

  const assignedUser = users.find(user => user.id === caseItem.assignedTo);

  const statusLabels: Record<string, string> = {
    new: 'Novo',
    in_progress: 'Em andamento',
    waiting: 'Aguardando',
    closed: 'Fechado',
    archived: 'Arquivado'
  };

  const statusClasses: Record<string, string> = {
    new: 'badge-blue',
    in_progress: 'badge-yellow',
    waiting: 'badge-purple',
    closed: 'badge-green',
    archived: 'badge-gray'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Link to="/cases" className="text-gray-500 hover:text-gray-700 mr-3">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-gray-800">{caseItem.title}</h1>
            <p className="text-gray-500">Processo nº {caseItem.number}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="btn btn-outline flex items-center">
            <Edit size={16} className="mr-1" />
            Editar
          </button>
          <button className="btn bg-red-600 text-white hover:bg-red-700 flex items-center">
            <Trash size={16} className="mr-1" />
            Remover
          </button>
        </div>
      </div>
      
      {/* Status and badges */}
      <div className="flex flex-wrap gap-2">
        <span className={`badge ${statusClasses[caseItem.status]}`}>
          {statusLabels[caseItem.status]}
        </span>
        <span className="badge badge-gray">
          {caseItem.type}
        </span>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('deadlines')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'deadlines'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Prazos ({caseItem.deadlines.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'documents'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documentos ({caseDocuments.length})
          </button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-800">Detalhes do Processo</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <FileText size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Número do Processo</p>
                    <p className="font-medium">{caseItem.number}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <Link 
                      to={`/clients/${caseItem.clientId}`}
                      className="font-medium hover:text-primary-600"
                    >
                      {caseItem.clientName}
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Gavel size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vara/Tribunal</p>
                    <p className="font-medium">{caseItem.court}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Calendar size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data de Abertura</p>
                    <p className="font-medium">{new Date(caseItem.openedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Clock size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Última Atualização</p>
                    <p className="font-medium">{new Date(caseItem.updatedAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Responsável</p>
                    <p className="font-medium">
                      {assignedUser?.name || 'Não atribuído'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">Próximos Prazos</h2>
                    <button 
                      onClick={() => setActiveTab('deadlines')}
                      className="text-primary-600 text-sm font-medium hover:text-primary-800"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {caseItem.deadlines.length > 0 ? (
                    <div className="space-y-4">
                      {caseItem.deadlines
                        .filter(d => !d.completed)
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .slice(0, 3)
                        .map((deadline) => (
                          <DeadlineItem key={deadline.id} deadline={deadline} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Nenhum prazo registrado para este processo.</p>
                      <button className="btn btn-primary mt-4">
                        <Plus size={16} className="mr-1" />
                        Adicionar Prazo
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">Documentos Recentes</h2>
                    <button 
                      onClick={() => setActiveTab('documents')}
                      className="text-primary-600 text-sm font-medium hover:text-primary-800"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {caseDocuments.length > 0 ? (
                    <div className="space-y-4">
                      {caseDocuments
                        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        .slice(0, 3)
                        .map((doc) => (
                          <div 
                            key={doc.id}
                            className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{doc.title}</h3>
                              <span className={`badge ${
                                doc.status === 'draft' ? 'badge-yellow' :
                                doc.status === 'final' ? 'badge-green' :
                                'badge-gray'
                              }`}>
                                {doc.status === 'draft' ? 'Rascunho' :
                                doc.status === 'final' ? 'Finalizado' :
                                'Arquivado'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Atualizado em {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                              {doc.version > 1 && ` • Versão ${doc.version}`}
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Nenhum documento registrado para este processo.</p>
                      <button className="btn btn-primary mt-4">
                        <Plus size={16} className="mr-1" />
                        Adicionar Documento
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'deadlines' && (
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Prazos e Compromissos</h2>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Prazo
                </button>
              </div>
            </div>
            
            {caseItem.deadlines.length > 0 ? (
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium">Filtrar por:</span>
                    <button className="px-3 py-1 rounded-full bg-primary-50 text-primary-700">
                      Todos
                    </button>
                    <button className="px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
                      Pendentes
                    </button>
                    <button className="px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
                      Concluídos
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {caseItem.deadlines
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((deadline) => (
                      <div key={deadline.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium text-lg">{deadline.title}</h3>
                              <span className={`ml-3 badge ${
                                deadline.priority === 'high' ? 'badge-red' :
                                deadline.priority === 'medium' ? 'badge-yellow' :
                                'badge-blue'
                              }`}>
                                {deadline.priority === 'high' ? 'Alta' :
                                deadline.priority === 'medium' ? 'Média' :
                                'Baixa'}
                              </span>
                            </div>
                            
                            <div className="mt-2 flex items-center text-sm">
                              <Calendar size={16} className="text-gray-500 mr-2" />
                              <span>
                                {format(parseISO(deadline.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                              </span>
                            </div>
                            
                            {deadline.description && (
                              <p className="mt-3 text-gray-700">{deadline.description}</p>
                            )}
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <button className={`p-2 rounded-full ${deadline.completed ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                              <CheckSquare size={20} />
                            </button>
                            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                              <FileEdit size={20} />
                            </button>
                            <button className="p-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600">
                              <Trash size={20} />
                            </button>
                          </div>
                        </div>
                        
                        <DeadlineStatus deadline={deadline} />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="p-10 text-center">
                <Calendar size={36} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum prazo encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Este processo ainda não possui prazos registrados.
                </p>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Prazo
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Documentos do Processo</h2>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Documento
                </button>
              </div>
            </div>
            
            {caseDocuments.length > 0 ? (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {caseDocuments.map((document) => (
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
                    
                    <h3 className="font-medium mb-1 text-gray-800">{document.title}</h3>
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
              <div className="p-10 text-center">
                <FileText size={36} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum documento encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Este processo ainda não possui documentos registrados.
                </p>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Documento
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface DeadlineItemProps {
  deadline: Deadline;
}

const DeadlineItem: React.FC<DeadlineItemProps> = ({ deadline }) => {
  return (
    <div className="p-3 border border-gray-100 rounded-lg">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">{deadline.title}</h3>
        <span className={`badge ${
          deadline.priority === 'high' ? 'badge-red' :
          deadline.priority === 'medium' ? 'badge-yellow' :
          'badge-blue'
        }`}>
          {deadline.priority === 'high' ? 'Alta' :
          deadline.priority === 'medium' ? 'Média' :
          'Baixa'}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Data:</span> {new Date(deadline.date).toLocaleDateString('pt-BR')}
      </p>
      
      <DeadlineStatus deadline={deadline} />
    </div>
  );
};

const DeadlineStatus: React.FC<{ deadline: Deadline }> = ({ deadline }) => {
  const today = new Date();
  const deadlineDate = parseISO(deadline.date);
  const daysRemaining = differenceInDays(deadlineDate, today);
  
  if (deadline.completed) {
    return (
      <div className="mt-2 flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-md text-sm">
        <CheckSquare size={16} className="mr-1.5" />
        Concluído
      </div>
    );
  }
  
  if (daysRemaining < 0) {
    return (
      <div className="mt-2 flex items-center text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-sm">
        <AlertCircle size={16} className="mr-1.5" />
        Atrasado por {Math.abs(daysRemaining)} {Math.abs(daysRemaining) === 1 ? 'dia' : 'dias'}
      </div>
    );
  }
  
  if (daysRemaining === 0) {
    return (
      <div className="mt-2 flex items-center text-red-600 bg-red-50 px-3 py-1.5 rounded-md text-sm">
        <AlertCircle size={16} className="mr-1.5" />
        Vence hoje
      </div>
    );
  }
  
  if (daysRemaining <= 3) {
    return (
      <div className="mt-2 flex items-center text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-md text-sm">
        <Clock size={16} className="mr-1.5" />
        {daysRemaining === 1 ? 'Vence amanhã' : `${daysRemaining} dias restantes`}
      </div>
    );
  }
  
  return (
    <div className="mt-2 flex items-center text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md text-sm">
      <Clock size={16} className="mr-1.5" />
      {daysRemaining} dias restantes
    </div>
  );
};

export default CaseDetailsPage;