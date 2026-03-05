import React, { useState } from 'react';
import { Menu, ChevronDown, LogOut, User, Settings, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmartSearch from './common/SmartSearch';
import NotificationCenter from './common/NotificationCenter';
import AIAssistant from './common/AIAssistant';
import { SearchResult } from './common/models/SearchResult';
import UserAuthenticatedArea from './UserAutheticatedArea';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleSearchResult = (result: SearchResult) => {
    console.log('Selected result:', result);
    // Navigate to the selected result
    // This would typically use React Router navigation
  };

  return (
    <>
      <header className="bg-background border-b border-gray-200 shadow-sm z-10">
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
          
          <UserAuthenticatedArea/>
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