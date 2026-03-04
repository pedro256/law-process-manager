
'use client'
import { signOut as nextAuthSignOut } from "next-auth/react";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";
import { appFirebase } from "@/lib/firebase";

export default function DashBoard() {
  async function Logout() {
    const auth = getAuth(appFirebase);
    console.log("auth",auth)
    await firebaseSignOut(auth);
    await nextAuthSignOut();
  }
  return (
    <main>
      HELLO
      <div className="border p-4 rounded w-min bg-primary ">
        <button className="text-foreground" onClick={Logout}>sair</button>
      </div>
    </main>
  );
}
