"use client";

import Google from "@/components/svg/Google";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, KeyRound, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SignInFormSchema, SignInFormType } from "./validation/SignInFormValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  }
  const onSubmit = async (data: any) => {
    const response = await signIn("application", {
      email:data.username,
      password:data.password,
      redirect: false,
    });
    if (response?.error) {
      setError(response.error)
      return;
    }
    // dialog.success({
    //   title:"Usuário logado!"
    // })
    router.push("/dashboard")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-card text-foreground rounded-2xl shadow-xl p-8 border border-border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Entrar no Sistema</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Acesse sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="flex flex-col gap-5">
            {/* Campo de Usuário */}
            <Field className="flex flex-col gap-2">
              <FieldLabel className="text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground ml-1">
                Usuário ou Email
              </FieldLabel>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  {...register("username")}
                  className="pl-10 bg-background border-input focus:ring-ring h-11"
                  placeholder="Seu nome de usuário"
                />
              </div>
              {errors.username && (
                <FieldError className="text-destructive text-xs italic">
                  {errors.username.message}
                </FieldError>
              )}
            </Field>

            {/* Campo de Senha */}
            <Field className="flex flex-col gap-2">
              <div className="flex justify-between items-end ml-1">
                <FieldLabel className="text-[10px] uppercase tracking-[0.15em] font-black text-muted-foreground">
                  Senha
                </FieldLabel>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase"
                >
                  Esqueceu?
                </Link>
              </div>
              <div className="relative group">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  type="password"
                  {...register("password")}
                  className="pl-10 bg-background border-input focus:ring-ring h-11"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <FieldError className="text-destructive text-xs italic">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>

            {/* Botão de Ação Principal */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-primary-foreground rounded-radius font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] mt-2 shadow-lg shadow-primary/5"
            >
              {isSubmitting ? "Autenticando..." : "Entrar"}
              <ArrowRight size={18} />
            </Button>
          </FieldGroup>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-4 w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-200
          bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-60"
        >
          <Google />
          {loading ? "Entrando..." : "Continuar com Google"}
        </button>

        <div className="mt-8 text-center text-xs text-[var(--muted-foreground)]">
          Ao continuar, você concorda com nossos termos de uso e política de
          privacidade.
        </div>
      </div>
    </div>
  );
}
