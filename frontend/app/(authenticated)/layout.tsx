import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./_components/Layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
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
