import { useEffect, useState } from "react";
import {
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  MessageCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { appFirebase } from "@/lib/firebase";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";


export default function UserAuthenticatedArea() {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const formatedName = (session?.user?.name || "[usuario]").split(" ")[0];

  async function signOut() {
    const auth = getAuth(appFirebase);
    console.log("auth", auth);
    await firebaseSignOut(auth);
    await nextAuthSignOut();
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        {/* {session?.user?.image ? (
          <img
            src={session?.user?.image}
            alt={session?.user?.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
            {session?.user?.name.charAt(0)}
          </div>
        )} */}
        <span className="hidden md:block text-sm font-medium">
          {formatedName}
        </span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 fade-in">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User size={16} className="mr-2" />
            Perfil
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings size={16} className="mr-2" />
            Configurações
          </a>
          <button
            onClick={signOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
