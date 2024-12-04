import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      role?: string;
    } 
  }
}

 const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await db.usuario.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) throw new Error('Usuario no encontrado');

        const matchPassword = await bcrypt.compare(credentials.password, user.password);

        if (!matchPassword) throw new Error('Contraseña incorrecta');

        return {
          id: user.id_usuario.toString(),
          name: user.nombre,
          email: user.email,
          role: user.tipo_usuario
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

