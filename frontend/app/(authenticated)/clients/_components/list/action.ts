"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function listClientsAction() {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.BACKEND_URL_BASE}/api/clientes`, {
    headers: {
      Authorization: `Bearer ${session?.firebaseToken}`,
    },
  });
const body = await response.json();
//   console.log("session", session?.firebaseToken);
  if (response.status != 200) {
    
    throw new Error(body.detail);
    // return { error: result.message };
  }
  console.log("body",body);
  return body;
}
