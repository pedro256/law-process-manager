import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./_components/Layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log("session",session)
  if(!session){
    return redirect("/unauthorized")
  }
  return (
    <main>
      <AuthProvider>
        <Layout>
          {children}
        </Layout>
      </AuthProvider>
    </main>
  );
}
