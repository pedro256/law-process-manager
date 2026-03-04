import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  FileText, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Brain,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DashboardStats, PerformanceMetric } from '../models';

interface SmartDashboardProps {
  stats: DashboardStats;
}

const SmartDashboard: React.FC<SmartDashboardProps> = ({ stats }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Taxa de Sucesso',
      value: stats.caseSuccessRate,
      target: 85,
      unit: '%',
      trend: 'up',
      change: 5.2
    },
    {
      name: 'Tempo Médio de Resolução',
      value: stats.averageResolutionTime,
      target: 90,
      unit: 'dias',
      trend: 'down',
      change: -8.5
    },
    {
      name: 'Produtividade',
      value: stats.productivityScore,
      target: 80,
      unit: 'pts',
      trend: 'up',
      change: 12.3
    },
    {
      name: 'Receita Mensal',
      value: stats.monthlyRevenue / 1000,
      target: 50,
      unit: 'k',
      trend: 'up',
      change: 18.7
    }
  ];

  const COLORS = ['#6d0330', '#8b1538', '#a91e47', '#c72c56', '#e53965'];

  const SmartCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
    subtitle?: string;
    color?: string;
  }> = ({ title, value, icon, trend, change, subtitle, color = 'primary' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          color === 'primary' ? 'bg-primary-100' :
          color === 'green' ? 'bg-green-100' :
          color === 'blue' ? 'bg-blue-100' :
          color === 'orange' ? 'bg-orange-100' :
          'bg-gray-100'
        }`}>
          <div className={`${
            color === 'primary' ? 'text-primary-600' :
            color === 'green' ? 'text-green-600' :
            color === 'blue' ? 'text-blue-600' :
            color === 'orange' ? 'text-orange-600' :
            'text-gray-600'
          }`}>
            {icon}
          </div>
        </div>
        {trend && change && (
          <div className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {trend === 'up' ? <TrendingUp size={16} /> : 
             trend === 'down' ? <TrendingDown size={16} /> : 
             <div className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );

  const PerformanceCard: React.FC<{ metric: PerformanceMetric }> = ({ metric }) => {
    const percentage = (metric.value / metric.target) * 100;
    const isOnTarget = percentage >= 90;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
          <div className={`flex items-center space-x-1 ${
            metric.trend === 'up' ? 'text-green-600' : 
            metric.trend === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {metric.trend === 'up' ? <TrendingUp size={14} /> : 
             metric.trend === 'down' ? <TrendingDown size={14} /> : 
             <div className="w-3.5 h-3.5" />}
            <span className="text-xs font-medium">
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {metric.value}
            </span>
            <span className="text-sm text-gray-500">{metric.unit}</span>
          </div>
          <div className="text-xs text-gray-500">
            Meta: {metric.target}{metric.unit}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isOnTarget ? 'bg-green-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Insights */}
      <div className="bg-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain size={24} />
            <h2 className="text-xl font-semibold">Dashboard Inteligente 2.0</h2>
          </div>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Settings size={16} />
            <span className="text-sm">Personalizar</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Zap className="text-yellow-300" size={20} />
            <div>
              <p className="text-sm opacity-90">Insight do Dia</p>
              <p className="text-xs">3 prazos críticos precisam de atenção</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="text-green-300" size={20} />
            <div>
              <p className="text-sm opacity-90">Meta do Mês</p>
              <p className="text-xs">87% da meta de receita atingida</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-blue-300" size={20} />
            <div>
              <p className="text-sm opacity-90">Tendência</p>
              <p className="text-xs">Produtividade +12% vs mês anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">Visão Geral</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(['7d', '30d', '90d', '1y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === period
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period === '7d' ? '7 dias' :
               period === '30d' ? '30 dias' :
               period === '90d' ? '90 dias' :
               '1 ano'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmartCard
          title="Processos Ativos"
          value={stats.activeCases}
          icon={<FileText size={24} />}
          trend="up"
          change={8.2}
          subtitle="vs mês anterior"
          color="primary"
        />
        <SmartCard
          title="Prazos Críticos"
          value={stats.upcomingDeadlines}
          icon={<AlertTriangle size={24} />}
          trend="down"
          change={-15.3}
          subtitle="próximos 7 dias"
          color="orange"
        />
        <SmartCard
          title="Receita Mensal"
          value={`R$ ${(stats.monthlyRevenue / 1000).toFixed(0)}k`}
          icon={<DollarSign size={24} />}
          trend="up"
          change={18.7}
          subtitle="vs mês anterior"
          color="green"
        />
        <SmartCard
          title="Clientes Ativos"
          value={stats.totalClients}
          icon={<Users size={24} />}
          trend="up"
          change={5.1}
          subtitle="vs mês anterior"
          color="blue"
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <PerformanceCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-800">Tendência de Receita</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
              <span>Receita</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
              <span>Casos</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.monthlyCaseStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6d0330" 
                  strokeWidth={3}
                  dot={{ fill: '#6d0330', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#6d0330', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Case Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Distribuição de Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {stats.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} processos (${props.payload.percentage}%)`,
                    props.payload.status
                  ]}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {stats.statusDistribution.map((item, index) => (
              <div key={item.status} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{item.status}</span>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {stats.criticalDeadlines && stats.criticalDeadlines.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-red-600" size={24} />
            <h3 className="text-lg font-medium text-red-800">Alertas Críticos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.criticalDeadlines.slice(0, 3).map((deadline) => (
              <div key={deadline.id} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Crítico
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Vence: {new Date(deadline.date).toLocaleDateString('pt-BR')}</span>
                  <button className="text-primary-600 hover:text-primary-800 font-medium">
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDashboard;