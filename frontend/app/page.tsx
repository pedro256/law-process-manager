"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Users, BarChart3 } from "lucide-react";
import { APP_NAME } from "@/app-info";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen from-background flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex justify-between items-center bg-background shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          {APP_NAME}
        </h1>
        <div className="flex gap-4">
          <Link href="/auth">
          <Button variant="outline">Entrar</Button>
          </Link>
          
          <Button>Criar Conta</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-foreground max-w-3xl"
        >
          Gestão Inteligente de Processos Jurídicos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-lg text-foreground max-w-2xl"
        >
          Centralize informações, acompanhe prazos e otimize a gestão do seu
          escritório com uma plataforma moderna, segura e eficiente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex gap-4"
        >
          <Button className="bg-primary" size="lg">Começar Agora</Button>
          <Button className="bg-secondary" size="lg" variant="outline">
            Saiba Mais
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-8 pb-16 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <FileText className="w-10 h-10" />
            <h3 className="text-lg font-semibold">Controle de Processos</h3>
            <p className="text-sm text-secundary">
              Cadastro completo de processos com histórico detalhado e
              organização por cliente.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <Scale className="w-10 h-10" />
            <h3 className="text-lg font-semibold">Gestão de Prazos</h3>
            <p className="text-sm text-secundary">
              Alertas automáticos para evitar perda de prazos e compromissos
              judiciais.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <Users className="w-10 h-10" />
            <h3 className="text-lg font-semibold">Gestão de Clientes</h3>
            <p className="text-sm text-secundary">
              Organização de clientes, contatos e vínculos com processos.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <BarChart3 className="w-10 h-10" />
            <h3 className="text-lg font-semibold">Relatórios e Indicadores</h3>
            <p className="text-sm text-secundary">
              Dashboards estratégicos para acompanhamento de desempenho do
              escritório.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-sm text-slate-500 shadow-inner">
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </div>
  );
}
