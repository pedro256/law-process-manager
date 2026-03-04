import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Scale, 
  Users, 
  FileText, 
  Calendar, 
  Folder, 
  DollarSign, 
  Settings, 
  X,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transition-transform transform lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="text-primary-600" size={28} />
              <span className="text-xl font-serif font-semibold text-primary-600">Helen Reis</span>
            </Link>
            <button 
              onClick={toggleSidebar}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          <SidebarContent isActive={isActive} />
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-2">
              <Scale className="text-primary-600" size={28} />
              <span className="text-xl font-serif font-semibold text-primary-600">Helen Reis</span>
            </Link>
          </div>
          
          <SidebarContent isActive={isActive} />
        </div>
      </div>
    </>
  );
};

interface SidebarContentProps {
  isActive: (path: string) => boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ isActive }) => {
  return (
    <nav className="flex-1 px-2 py-4 overflow-y-auto">
      <div className="space-y-1">
        <SidebarLink 
          to="/" 
          icon={<BarChart3 size={20} />} 
          text="Dashboard" 
          active={isActive('/')} 
        />
        <SidebarLink 
          to="/clients" 
          icon={<Users size={20} />} 
          text="Clientes" 
          active={isActive('/clients')} 
        />
        <SidebarLink 
          to="/cases" 
          icon={<FileText size={20} />} 
          text="Processos" 
          active={isActive('/cases')} 
        />
        <SidebarLink 
          to="/calendar" 
          icon={<Calendar size={20} />} 
          text="Agenda" 
          active={isActive('/calendar')} 
        />
        <SidebarLink 
          to="/documents" 
          icon={<Folder size={20} />} 
          text="Documentos" 
          active={isActive('/documents')} 
        />
        <SidebarLink 
          to="/financial" 
          icon={<DollarSign size={20} />} 
          text="Financeiro" 
          active={isActive('/financial')} 
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200">
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          text="Configurações" 
          active={isActive('/settings')} 
        />
      </div>
    </nav>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className={`mr-3 ${active ? 'text-primary-600' : 'text-gray-500'}`}>
        {icon}
      </span>
      {text}
    </Link>
  );
};

export default Sidebar;