import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      tipo_usuario?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    tipo_usuario?: string;
  }
}
