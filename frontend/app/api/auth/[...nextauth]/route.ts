import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { appFirebase } from "@/lib/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      id:"application",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        const auth = getAuth(appFirebase);

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          console.log("process.. login")

          const idToken = await userCredential.user.getIdToken();

          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            firebaseToken: idToken,
            displayName: userCredential.user.displayName,
          };
        } catch (error) {
          console.error("erro login",error)
          throw new Error("Email ou senha inválidos");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const decoded: any = jwtDecode(user.firebaseToken);
        token.firebaseToken = user.firebaseToken;
        token.firebaseExp = decoded.exp;
      }
      
      return token;
    },

    async session({ session, token }) {
      session.firebaseToken = token.firebaseToken as string;
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
