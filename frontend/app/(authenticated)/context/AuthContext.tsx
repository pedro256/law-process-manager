"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "./models/User";
import { currentUser } from "@/data/mockData";
import { SessionProvider } from "next-auth/react";

interface AuthContextType {}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={{}}>
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
