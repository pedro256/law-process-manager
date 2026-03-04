import React from 'react';
import { clients } from '../../data/mockData';
import ClientsList from '../../components/clients/ClientsList';

const ClientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">Gerenciamento de Clientes</h1>
      </div>
      
      <ClientsList clients={clients} />
    </div>
  );
};

export default ClientsPage;