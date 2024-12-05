import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import {PrismaAdapter} from '@next-auth/prisma-adapter'

const authOptions: NextAuthOptions = {


    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },

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
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async session({token, session}) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.nombre = token.name as string;
                session.user.apellido = token.apellido as string;
                session.user.telefono = token.telefono as string;
                session.user.role = token.role ;
            }
            return session;
        },
    
        async jwt({ token, user }) {
            const dbUser = await db.usuario.findUnique({
                where: {
                    email: token.email ?? undefined,
             },
            })

            if (!dbUser) {
                token.id = user!.id
                return token
            }
            
            token.id = dbUser.id_usuario.toString();
            token.name = dbUser.nombre;
            token.apellido = dbUser.apellido;
            token.role = dbUser.role;
            token.email = dbUser.email;
            token.telefono = dbUser.telefono;

            return token;
        }
        
    },
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };