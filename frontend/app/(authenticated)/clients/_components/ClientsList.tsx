"use client";
import React, { useState } from "react";
import { Search, Plus, UserX, Filter } from "lucide-react";
import { Client } from "../../dashboard/models";
import Link from "next/link";

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || client.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl text-gray-800">Clientes</h2>
          </div>
          <div className=" border-2 border-primary rounded bg-primary">
            <Link href="/clients/new" className="text-white flex px-6 py-2 items-center">
            
              <Plus size={18} className="mr-1" />
              <p>Novo Cliente</p>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por nome, email ou documento..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Todas categorias</option>
              <option value="individual">Individual</option>
              <option value="empresarial">Empresarial</option>
            </select>
          </div>
        </div>
      </div>

      {filteredClients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/clients/${client.id}`} className="group">
                      <div className="text-sm font-medium text-gray-800 group-hover:text-primary-600">
                        {client.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Desde{" "}
                        {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{client.email}</div>
                    <div className="text-xs text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {client.document}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`badge ${
                        client.category === "individual"
                          ? "badge-blue"
                          : "badge-purple"
                      }`}
                    >
                      {client.category === "individual"
                        ? "Individual"
                        : "Empresarial"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`badge ${
                        client.status === "active"
                          ? "badge-green"
                          : "badge-gray"
                      }`}
                    >
                      {client.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <UserX size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            Nenhum cliente encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Não encontramos nenhum cliente correspondente aos critérios de
            busca.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
            }}
            className="btn btn-outline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
