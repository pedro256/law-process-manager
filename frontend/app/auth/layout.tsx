import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LayoutAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if(session){
    // não precisar logar, ja esta logado
    return redirect("/dashboard")
  }
  return (
    <div>
       {children}
    </div>
  );
}