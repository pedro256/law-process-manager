import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Lightbulb, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../../types';

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Olá! Sou seu assistente jurídico inteligente. Como posso ajudá-lo hoje?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('prazo') || input.includes('deadline')) {
      return 'Identifiquei que você está perguntando sobre prazos. Você tem 3 prazos críticos nos próximos 7 dias:\n\n• Contestação - Processo 1001/2025 (vence em 2 dias)\n• Audiência preliminar - Processo 2002/2025 (em 5 dias)\n• Apresentação de testemunhas - Processo 3003/2025 (em 6 dias)\n\nGostaria que eu configure lembretes automáticos?';
    }
    
    if (input.includes('cliente') || input.includes('contato')) {
      return 'Posso ajudá-lo com informações sobre clientes. Você tem 127 clientes ativos no sistema. Os mais recentes são:\n\n• Maria Silva (cadastrada hoje)\n• Empresa XYZ Ltda. (cadastrada ontem)\n• João Santos (cadastrado há 3 dias)\n\nPrecisa de alguma informação específica sobre algum cliente?';
    }
    
    if (input.includes('processo') || input.includes('caso')) {
      return 'Você tem 23 processos ativos no momento:\n\n• 8 em andamento\n• 5 aguardando manifestação\n• 3 novos\n• 7 em fase de análise\n\nO processo com maior risco de atraso é o 1001/2025 (Ação de Cobrança). Recomendo priorizar a contestação que vence em 2 dias.';
    }
    
    if (input.includes('relatório') || input.includes('dashboard')) {
      return 'Posso gerar relatórios personalizados para você. Alguns relatórios populares:\n\n• Produtividade mensal\n• Análise financeira\n• Status dos processos\n• Performance por advogado\n\nQual tipo de relatório você gostaria de gerar?';
    }
    
    if (input.includes('ajuda') || input.includes('help')) {
      return 'Estou aqui para ajudar! Posso auxiliar com:\n\n🔍 Buscar informações sobre casos, clientes e documentos\n📅 Gerenciar prazos e compromissos\n📊 Gerar relatórios e análises\n⚠️ Alertas e notificações importantes\n📝 Criar documentos a partir de modelos\n💰 Análises financeiras\n\nO que você gostaria de fazer?';
    }
    
    return 'Entendi sua solicitação. Com base na análise dos seus dados, posso sugerir algumas ações:\n\n• Revisar os prazos mais urgentes\n• Verificar pendências financeiras\n• Atualizar status dos processos\n\nPrecisa de mais detalhes sobre algum desses pontos?';
  };

  const quickActions = [
    { icon: Calendar, text: 'Prazos urgentes', action: () => setInputMessage('Quais são os prazos mais urgentes?') },
    { icon: FileText, text: 'Relatório mensal', action: () => setInputMessage('Gerar relatório mensal de produtividade') },
    { icon: AlertTriangle, text: 'Alertas críticos', action: () => setInputMessage('Mostrar alertas críticos') },
    { icon: Lightbulb, text: 'Sugestões', action: () => setInputMessage('Que sugestões você tem para melhorar minha produtividade?') },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <span className="font-medium">Assistente IA</span>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                )}
                {message.type === 'user' && (
                  <User size={16} className="text-white mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot size={16} className="text-primary-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3">Ações rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center space-x-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <action.icon size={14} className="text-primary-600" />
                <span className="text-gray-700">{action.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;