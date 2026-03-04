import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Users, 
  FileText,
  Clock,
  MapPin
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addDays,
  getHours
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { events } from '../data/mockData';
import { Event } from '../types';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const renderMonthHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm"
          >
            Hoje
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate
    });
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map(day => (
          <div key={day} className="p-2 text-sm font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}
        
        {dateRange.map((date, i) => {
          const isCurrentMonth = isSameMonth(date, monthStart);
          const isToday = isSameDay(date, new Date());
          const isSelected = isSameDay(date, selectedDate);
          const dayEvents = events.filter(event => 
            isSameDay(parseISO(event.startTime), date)
          );
          
          return (
            <div 
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`min-h-[100px] border border-gray-100 p-1 ${
                !isCurrentMonth 
                  ? 'bg-gray-50 text-gray-400'
                  : isToday
                    ? 'bg-primary-50'
                    : isSelected
                      ? 'bg-primary-50 border-primary-200'
                      : 'bg-white'
              } transition-colors hover:border-primary-200 cursor-pointer`}
            >
              <div className="text-right mb-1">
                <span className={`inline-block w-6 h-6 rounded-full text-sm leading-6 text-center ${
                  isToday 
                    ? 'bg-primary-600 text-white'
                    : isCurrentMonth
                      ? 'text-gray-800' 
                      : 'text-gray-400'
                }`}>
                  {format(date, 'd')}
                </span>
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div 
                    key={event.id}
                    className={`text-xs px-1.5 py-0.5 truncate rounded ${
                      event.type === 'hearing' 
                        ? 'bg-red-100 text-red-800'
                        : event.type === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : event.type === 'deadline'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {format(parseISO(event.startTime), 'HH:mm')} {event.title}
                  </div>
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1.5">
                    + {dayEvents.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const eventTypeBadge = (type: string) => {
    switch (type) {
      case 'hearing':
        return <span className="badge badge-red">Audiência</span>;
      case 'meeting':
        return <span className="badge badge-blue">Reunião</span>;
      case 'deadline':
        return <span className="badge badge-yellow">Prazo</span>;
      case 'reminder':
        return <span className="badge badge-purple">Lembrete</span>;
      default:
        return <span className="badge badge-gray">{type}</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">Agenda</h1>
        
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'month' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'week' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                currentView === 'day' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Dia
            </button>
          </div>
          
          <button className="btn btn-primary inline-flex items-center">
            <Plus size={16} className="mr-1" />
            Novo Evento
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Events */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {renderMonthHeader()}
            
            <div className="mt-6">
              {currentView === 'month' && renderCalendarDays()}
              
              {currentView === 'week' && (
                <div className="text-center p-10">
                  <CalendarIcon size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Visualização de Semana
                  </h3>
                  <p className="text-gray-500">
                    Esta visualização será implementada em breve.
                  </p>
                </div>
              )}
              
              {currentView === 'day' && (
                <div className="text-center p-10">
                  <CalendarIcon size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Visualização de Dia
                  </h3>
                  <p className="text-gray-500">
                    Esta visualização será implementada em breve.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div>
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Próximos Eventos</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {events
                .filter(event => new Date(event.startTime) >= new Date())
                .sort((a, b) => 
                  new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                )
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      {eventTypeBadge(event.type)}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon size={16} className="text-gray-500 mr-2" />
                        <span>
                          {format(parseISO(event.startTime), "dd 'de' MMMM", { locale: ptBR })}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span>
                          {format(parseISO(event.startTime), "HH:mm")} - {format(parseISO(event.endTime), "HH:mm")}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-500 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {(event.clientId || event.caseId) && (
                        <div className="flex items-center">
                          {event.clientId && (
                            <div className="flex items-center mr-4">
                              <Users size={16} className="text-gray-500 mr-1" />
                              <span>Cliente</span>
                            </div>
                          )}
                          
                          {event.caseId && (
                            <div className="flex items-center">
                              <FileText size={16} className="text-gray-500 mr-1" />
                              <span>Processo</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
              {events.filter(event => new Date(event.startTime) >= new Date()).length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Não há eventos futuros agendados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;