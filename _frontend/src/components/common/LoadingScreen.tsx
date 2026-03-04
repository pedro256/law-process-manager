import React from 'react';
import { Scale } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-primary-600 animate-bounce mb-4">
        <Scale size={40} />
      </div>
      <h1 className="text-2xl font-serif text-primary-600 mb-2">Helen Reis</h1>
      <p className="text-gray-500">Carregando...</p>
    </div>
  );
};

export default LoadingScreen;