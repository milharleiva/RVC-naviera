import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import db from '@/lib/db';

interface CustomUser {
    id: string;
    tipo_usuario?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

declare module 'next-auth' {
    interface Session {
        user?: CustomUser;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        tipo_usuario?: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Se deben proporcionar correo electrónico y contraseña.');
                }

                const userfound = await db.usuario.findUnique({
                    where: { email: credentials.email },
                });

                if (!userfound) {
                    throw new Error('El usuario no existe.');
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, userfound.password);

                if (!isPasswordCorrect) {
                    throw new Error('La contraseña es incorrecta.');
                }

                return {
                    id: userfound.id_usuario.toString(),
                    name: userfound.nombre,
                    email: userfound.email,
                    rol: userfound.tipo_usuario,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.rol = (user as CustomUser).tipo_usuario;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                tipo_usuario: token.rol as string,
                name: session.user?.name || null,
                email: session.user?.email || null,
                image: session.user?.image || null,
            };
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
