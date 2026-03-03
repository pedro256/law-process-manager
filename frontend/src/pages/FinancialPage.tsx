import React, { useState } from 'react';
import { Search, Plus, Filter, DollarSign, Users, FileText, Calendar, CreditCard, FileEdit, Trash } from 'lucide-react';
import { financialRecords } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const FinancialPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const filteredRecords = financialRecords.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate summary stats
  const totalIncome = financialRecords
    .filter(record => record.type === 'income')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const totalExpenses = financialRecords
    .filter(record => record.type === 'expense')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const pendingIncome = financialRecords
    .filter(record => record.type === 'income' && record.status === 'pending')
    .reduce((sum, record) => sum + record.amount, 0);
  
  // Data for pie chart
  const categoryData = financialRecords.reduce((acc: Record<string, number>, record) => {
    const category = record.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += record.amount;
    return acc;
  }, {});
  
  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
  
  const COLORS = ['#1E3A8A', '#3B82F6', '#60A5FA', '#FCD34D', '#F59E0B', '#D97706'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">Financeiro</h1>
      </div>
      
      {/* Stats summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Receitas Totais</h3>
              <p className="text-2xl font-semibold mt-1 text-green-600">
                R$ {totalIncome.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Despesas Totais</h3>
              <p className="text-2xl font-semibold mt-1 text-red-600">
                R$ {totalExpenses.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <CreditCard size={20} className="text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Saldo</h3>
              <p className="text-2xl font-semibold mt-1 text-primary-600">
                R$ {(totalIncome - totalExpenses).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-primary-100 p-2 rounded-full">
              <DollarSign size={20} className="text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Recebimentos Pendentes</h3>
              <p className="text-2xl font-semibold mt-1 text-yellow-600">
                R$ {pendingIncome.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <Calendar size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="card p-6 lg:col-span-1">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Distribuição por Categoria</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Records table */}
        <div className="card lg:col-span-2">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl font-serif font-semibold text-gray-800">Registros Financeiros</h2>
              
              <button className="btn btn-primary inline-flex items-center">
                <Plus size={18} className="mr-1" />
                Novo Registro
              </button>
            </div>
            
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar registros..."
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
                    <option value="income">Receitas</option>
                    <option value="expense">Despesas</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Todos status</option>
                    <option value="paid">Pago</option>
                    <option value="pending">Pendente</option>
                    <option value="overdue">Atrasado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {filteredRecords.length > 0 ? (
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
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="capitalize">{record.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`text-sm font-medium ${
                          record.type === 'income' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {record.type === 'income' ? '+' : '-'}
                          R$ {record.amount.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-500 hover:text-primary-600">
                            <FileEdit size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <DollarSign size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">Nenhum registro encontrado</h3>
              <p className="text-gray-500 mb-4">
                Não encontramos nenhum registro financeiro correspondente aos critérios de busca.
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
    </div>
  );
};

export default FinancialPage;