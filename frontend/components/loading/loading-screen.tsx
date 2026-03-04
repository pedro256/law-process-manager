import React from 'react';
import { Scale } from 'lucide-react';
import { APP_NAME } from '@/app-info';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-primary animate-bounce mb-4">
        <Scale size={40} />
      </div>
      <h1 className="text-2xl font-serif text-primary mb-2">{APP_NAME}</h1>
      <p className="text-foreground">Carregando...</p>
    </div>
  );
};

export default LoadingScreen;