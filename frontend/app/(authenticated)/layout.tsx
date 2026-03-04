import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./_components/Layout";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const e = await new Promise<boolean>((resolve,reject) => {
  //     setTimeout(() => {
  //         resolve(true)
  //     },100);
  //   });
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
