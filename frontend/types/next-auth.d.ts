import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    firebaseToken?: string;
    expiresAt?:number;
  }
  interface User{
    firebaseToken:string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // accessToken?: string;
    // refreshToken?: string;
    // accessTokenExpires?: number;
    // idToken?:string;
    // error?: string;
    firebaseToken:string;
    firebaseExp:number;
  }
  
}