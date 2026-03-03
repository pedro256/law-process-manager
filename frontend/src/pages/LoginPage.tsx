import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side illustration/branding - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white flex-col justify-center items-center p-12">
        <div className="max-w-md text-center">
          <Scale size={64} className="mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold mb-4">Helen Reis Advocacia</h1>
          <p className="text-xl mb-6">
            Sistema de gestão completo para escritórios de advocacia.
          </p>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Gestão completa de processos</h3>
              <p className="text-sm text-white/80">
                Acompanhe prazos, audiências e movimentações com facilidade
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Organização financeira</h3>
              <p className="text-sm text-white/80">
                Controle de honorários, despesas e faturamento em um só lugar
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <Scale size={40} className="text-primary-600 mb-2" />
            <h1 className="text-2xl font-serif font-semibold text-primary-600">Helen Reis</h1>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800">
              Acesse sua conta
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                    Esqueceu a senha?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`w-full btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Para fins de demonstração, qualquer combinação de email/senha é aceita
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;