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
      <div className="bg-card rounded p-6 ">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4">
          <div>
            <h2 className="text-xl text-gray-800">Clientes</h2>
          </div>
          <div>
            <RegisterClientModal />
          </div>
        </div>
        <ClientsList clients={clients} />
      </div>
    </div>
  );
}
