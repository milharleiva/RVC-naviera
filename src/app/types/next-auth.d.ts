import { DefaultUser } from "next-auth";
import { UserRole, Usuario } from "@prisma/client";
import 'next-auth/jwt'

type Userid = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: Userid
    role: UserRole
  }
}





declare module "next-auth" {
  interface Session {
    user : Usuario & {
      id : id_usuario
      role: UserRole
    }
     
  }

  interface User extends DefaultUser {
    role?: string;
  }
}
