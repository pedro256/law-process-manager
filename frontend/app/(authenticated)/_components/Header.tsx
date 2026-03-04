import React, { useState } from 'react';
import { Menu, ChevronDown, LogOut, User, Settings, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmartSearch from './common/SmartSearch';
import NotificationCenter from './common/NotificationCenter';
import AIAssistant from './common/AIAssistant';
import { SearchResult } from './common/models/SearchResult';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleSearchResult = (result: SearchResult) => {
    console.log('Selected result:', result);
    // Navigate to the selected result
    // This would typically use React Router navigation
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="text-gray-600 lg:hidden mr-3"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:block max-w-md w-80">
            <SmartSearch
              onResultSelect={handleSearchResult}
              placeholder="Busca inteligente..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <NotificationCenter
              isOpen={showNotifications}
              onToggle={() => setShowNotifications(!showNotifications)}
            />
          </div>

          <button
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            title="Assistente IA"
          >
            <MessageCircle size={20} />
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {user?.name.charAt(0)}
                </div>
              )}
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" />
                  Perfil
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2" />
                  Configurações
                </a>
                <button 
                  onClick={logout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </header>

      <AIAssistant
        isOpen={showAIAssistant}
        onToggle={() => setShowAIAssistant(!showAIAssistant)}
      />
    </>
  );
};

export default Header;