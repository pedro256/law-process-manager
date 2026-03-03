import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Brain,
  Zap,
  Target,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';
import { Case, AIInsight } from '../../types';

interface SmartCaseManagementProps {
  cases: Case[];
}

const SmartCaseManagement: React.FC<SmartCaseManagementProps> = ({ cases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'value' | 'risk'>('priority');
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'timeline'>('list');

  // Mock AI insights
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'deadline_prediction',
      title: 'Prazo em Risco',
      description: 'Processo 1001/2025 tem 85% de chance de atraso baseado no histórico',
      confidence: 0.85,
      data: { caseId: 'p1', daysToDeadline: 2 },
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      type: 'outcome_probability',
      title: 'Alta Probabilidade de Sucesso',
      description: 'Processo 2002/2025 tem 92% de chance de resultado favorável',
      confidence: 0.92,
      data: { caseId: 'p2', factors: ['precedentes', 'documentação'] },
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      type: 'similar_cases',
      title: 'Casos Similares Encontrados',
      description: '3 casos similares com estratégias bem-sucedidas identificados',
      confidence: 0.78,
      data: { similarCases: ['p5', 'p7', 'p12'] },
      createdAt: new Date().toISOString()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'waiting': return 'bg-purple-100 text-purple-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskLevel = (caseItem: Case) => {
    // Mock risk calculation based on various factors
    const factors = [
      caseItem.deadlines.filter(d => !d.completed && new Date(d.date) < new Date()).length > 0,
      caseItem.priority === 'urgent',
      caseItem.status === 'suspended',
      !caseItem.estimatedValue || caseItem.estimatedValue > 100000
    ];
    
    const riskScore = factors.filter(Boolean).length;
    
    if (riskScore >= 3) return { level: 'high', color: 'text-red-600', bg: 'bg-red-100' };
    if (riskScore >= 2) return { level: 'medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const CaseCard: React.FC<{ caseItem: Case }> = ({ caseItem }) => {
    const risk = getRiskLevel(caseItem);
    const insight = aiInsights.find(i => i.data.caseId === caseItem.id);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(caseItem.priority)}`} />
            </div>
            <p className="text-sm text-gray-600 mb-1">Nº {caseItem.number}</p>
            <p className="text-sm text-gray-500">{caseItem.clientName}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
              {caseItem.status === 'new' ? 'Novo' :
               caseItem.status === 'in_progress' ? 'Em andamento' :
               caseItem.status === 'waiting' ? 'Aguardando' :
               caseItem.status === 'suspended' ? 'Suspenso' :
               caseItem.status === 'closed' ? 'Fechado' :
               'Arquivado'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${risk.bg} ${risk.color}`}>
              Risco {risk.level === 'high' ? 'Alto' : risk.level === 'medium' ? 'Médio' : 'Baixo'}
            </span>
          </div>
        </div>

        {insight && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <Brain size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-800">IA Insight</span>
              <span className="text-xs text-blue-600">({Math.round(insight.confidence * 100)}%)</span>
            </div>
            <p className="text-xs text-blue-700">{insight.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">
              {caseItem.deadlines.filter(d => !d.completed).length} prazos
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">
              {caseItem.documents?.length || 0} docs
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">
              {caseItem.assignedTo.length} advogados
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign size={14} className="text-gray-400" />
            <span className="text-xs text-gray-600">
              {caseItem.estimatedValue ? 
                `R$ ${(caseItem.estimatedValue / 1000).toFixed(0)}k` : 
                'N/A'
              }
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">
              Atualizado {new Date(caseItem.updatedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            Ver detalhes →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain size={24} />
            <h2 className="text-xl font-semibold">Gestão Inteligente de Processos</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-yellow-300" size={16} />
              <span className="text-sm">{aiInsights.length} insights ativos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="text-green-300" size={16} />
              <span className="text-sm">92% taxa de sucesso</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.slice(0, 3).map((insight) => (
            <div key={insight.id} className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                {insight.type === 'deadline_prediction' && <AlertTriangle size={14} />}
                {insight.type === 'outcome_probability' && <TrendingUp size={14} />}
                {insight.type === 'similar_cases' && <FileText size={14} />}
                <span className="text-sm font-medium">{insight.title}</span>
              </div>
              <p className="text-xs opacity-90">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar processos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="priority">Prioridade</option>
              <option value="date">Data</option>
              <option value="value">Valor</option>
              <option value="risk">Risco</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                viewMode === 'kanban' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                viewMode === 'timeline' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Timeline
            </button>
          </div>
          
          <button className="btn btn-primary inline-flex items-center">
            <Plus size={18} className="mr-1" />
            Novo Processo
          </button>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
          <CaseCard key={caseItem.id} caseItem={caseItem} />
        ))}
      </div>
    </div>
  );
};

export default SmartCaseManagement;