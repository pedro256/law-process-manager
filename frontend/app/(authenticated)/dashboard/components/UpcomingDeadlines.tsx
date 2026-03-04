import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';
import { Case, Deadline } from '../../types';

interface DeadlineItemProps {
  deadline: Deadline;
  caseData: Case;
}

const DeadlineItem: React.FC<DeadlineItemProps> = ({ deadline, caseData }) => {
  const today = new Date();
  const deadlineDate = parseISO(deadline.date);
  const daysRemaining = differenceInDays(deadlineDate, today);
  
  const formatDeadlineDate = () => {
    return format(deadlineDate, "dd 'de' MMMM", { locale: ptBR });
  };
  
  const getPriorityClass = () => {
    if (daysRemaining < 0) return 'bg-red-100 text-red-800';
    
    switch (deadline.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    if (daysRemaining < 0) return `Atrasado por ${Math.abs(daysRemaining)} dias`;
    if (daysRemaining === 0) return 'Vence hoje';
    if (daysRemaining === 1) return 'Vence amanhã';
    return `${daysRemaining} dias restantes`;
  };

  return (
    <div className="p-4 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{deadline.title}</h4>
        <span className={`badge ${getPriorityClass()}`}>{getStatusText()}</span>
      </div>
      
      <div className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Processo:</span> {caseData.title}
      </div>
      
      <div className="text-sm text-gray-500 mb-2">
        <span className="font-medium">Data:</span> {formatDeadlineDate()}
      </div>
      
      {deadline.description && (
        <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
      )}
      
      <div className="mt-3">
        <Link 
          to={`/cases/${caseData.id}`} 
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          Ver processo
        </Link>
      </div>
    </div>
  );
};

interface UpcomingDeadlinesProps {
  cases: Case[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ cases }) => {
  // Get all deadlines from all cases and sort by date
  const allDeadlines = cases
    .flatMap(caseItem => 
      caseItem.deadlines.map(deadline => ({
        deadline,
        caseData: caseItem
      }))
    )
    .filter(item => !item.deadline.completed)
    .sort((a, b) => 
      new Date(a.deadline.date).getTime() - new Date(b.deadline.date).getTime()
    )
    .slice(0, 5); // Limit to 5 items

  return (
    <div className="card">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800">Prazos Próximos</h3>
        <Link 
          to="/calendar" 
          className="text-sm text-primary-600 hover:text-primary-800 font-medium"
        >
          Ver todos
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {allDeadlines.length > 0 ? (
          allDeadlines.map(({ deadline, caseData }) => (
            <DeadlineItem 
              key={deadline.id}
              deadline={deadline}
              caseData={caseData}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <AlertCircle size={28} className="text-gray-400 mb-2" />
            <p className="text-gray-500">Não há prazos próximos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;