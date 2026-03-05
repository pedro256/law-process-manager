import { clients } from "@/data/mockData";
import ClientsList from "./_components/list/ClientsList";
import { RegisterClientModal } from "./_components/new/modal-register-client";

export default function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Gerenciamento de Clientes
        </h1>
      </div>
      <ClientsList clients={clients} />
    </div>
  );
}
