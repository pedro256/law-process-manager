import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  MapPin, 
  Calendar, 
  Trash, 
  Edit, 
  ArrowLeft, 
  Folder, 
  DollarSign,
  FileEdit 
} from 'lucide-react';
import { clients, cases, documents, financialRecords } from '../../data/mockData';

const ClientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'documents' | 'financial'>('overview');
  
  const client = clients.find(c => c.id === id);
  const clientCases = cases.filter(c => c.clientId === id);
  const clientDocuments = documents.filter(d => d.clientId === id);
  const clientFinancialRecords = financialRecords.filter(f => f.clientId === id);
  
  if (!client) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Cliente não encontrado</h2>
        <p className="text-gray-600 mb-4">O cliente que você está procurando não existe ou foi removido.</p>
        <Link to="/clients" className="btn btn-primary">
          Voltar para lista de clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Link to="/clients" className="text-gray-500 hover:text-gray-700 mr-3">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-serif font-semibold text-gray-800">{client.name}</h1>
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
            onClick={() => setActiveTab('cases')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'cases'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Processos ({clientCases.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'documents'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documentos ({clientDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`py-3 px-2 border-b-2 text-sm font-medium ${
              activeTab === 'financial'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Financeiro ({clientFinancialRecords.length})
          </button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-800">Informações do Cliente</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium">{client.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Mail size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Phone size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <FileText size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Documento</p>
                    <p className="font-medium">{client.document}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <MapPin size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Calendar size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cliente desde</p>
                    <p className="font-medium">{new Date(client.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {client.notes && (
              <div className="card p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Anotações</h2>
                <p className="text-gray-700">{client.notes}</p>
              </div>
            )}
            
            <div className="card">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800">Processos Recentes</h2>
                  <button 
                    onClick={() => setActiveTab('cases')}
                    className="text-primary-600 text-sm font-medium hover:text-primary-800"
                  >
                    Ver todos
                  </button>
                </div>
              </div>
              
              {clientCases.length > 0 ? (
                <div className="p-6 space-y-4">
                  {clientCases.slice(0, 3).map(caseItem => (
                    <div key={caseItem.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{caseItem.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Processo nº {caseItem.number} • {caseItem.court}
                        </p>
                      </div>
                      <Link 
                        to={`/cases/${caseItem.id}`}
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                      >
                        Detalhes
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Nenhum processo encontrado para este cliente.</p>
                  <Link 
                    to="/cases/new" 
                    className="btn btn-primary mt-4 inline-flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Novo Processo
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        
        {activeTab === 'cases' && (
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Processos</h2>
                <Link 
                  to="/cases/new" 
                  className="btn btn-primary inline-flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Novo Processo
                </Link>
              </div>
            </div>
            
            {clientCases.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título/Número
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tribunal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clientCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-800">{caseItem.title}</div>
                          <div className="text-xs text-gray-500">Nº {caseItem.number}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {caseItem.court}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {caseItem.type}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`badge ${
                            caseItem.status === 'new' ? 'badge-blue' : 
                            caseItem.status === 'in_progress' ? 'badge-yellow' : 
                            caseItem.status === 'waiting' ? 'badge-purple' : 
                            caseItem.status === 'closed' ? 'badge-green' : 
                            'badge-gray'
                          }`}>
                            {caseItem.status === 'new' ? 'Novo' : 
                            caseItem.status === 'in_progress' ? 'Em andamento' : 
                            caseItem.status === 'waiting' ? 'Aguardando' : 
                            caseItem.status === 'closed' ? 'Fechado' : 
                            'Arquivado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm">
                          <Link 
                            to={`/cases/${caseItem.id}`} 
                            className="text-primary-600 hover:text-primary-900 font-medium"
                          >
                            Ver Detalhes
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <FileText size={36} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum processo encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Este cliente ainda não possui processos registrados.
                </p>
                <Link 
                  to="/cases/new" 
                  className="btn btn-primary inline-flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Novo Processo
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Documentos</h2>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Documento
                </button>
              </div>
            </div>
            
            {clientDocuments.length > 0 ? (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {clientDocuments.map((document) => (
                  <div 
                    key={document.id} 
                    className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-primary-50 p-2 rounded-lg">
                        <Folder size={24} className="text-primary-600" />
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
                <Folder size={36} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum documento encontrado</h3>
                <p className="text-gray-500 mb-4">
                  Este cliente ainda não possui documentos registrados.
                </p>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Adicionar Documento
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'financial' && (
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Registros Financeiros</h2>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Novo Registro
                </button>
              </div>
            </div>
            
            {clientFinancialRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clientFinancialRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-full mr-2 ${
                              record.type === 'income' 
                                ? 'bg-green-100' 
                                : 'bg-red-100'
                            }`}>
                              <DollarSign 
                                size={14} 
                                className={record.type === 'income' 
                                  ? 'text-green-600' 
                                  : 'text-red-600'
                                } 
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-800">{record.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <span className="capitalize">{record.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`badge ${
                            record.status === 'paid' ? 'badge-green' : 
                            record.status === 'pending' ? 'badge-yellow' : 
                            'badge-red'
                          }`}>
                            {record.status === 'paid' ? 'Pago' : 
                            record.status === 'pending' ? 'Pendente' : 
                            'Atrasado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-sm font-medium ${
                            record.type === 'income' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            {record.type === 'income' ? '+' : '-'}
                            R$ {record.amount.toLocaleString('pt-BR')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <DollarSign size={36} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum registro financeiro</h3>
                <p className="text-gray-500 mb-4">
                  Este cliente ainda não possui registros financeiros.
                </p>
                <button className="btn btn-primary inline-flex items-center">
                  <Plus size={16} className="mr-1" />
                  Novo Registro
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsPage;