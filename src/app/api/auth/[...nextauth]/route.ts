import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            tipo_usuario: string;
        };
    }
}

const authOptions = {
    providers: [
        CredentialProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials, req) {
                const userfound = await db.usuario.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!userfound) throw new Error('usuario no encontrado');

                if (!credentials) return null;
                const matchpassword = await bcrypt.compare(credentials.password, userfound.password);

                if (!matchpassword) throw Error('contraseña incorrecta');

                return {
                    id: userfound.id_usuario.toString(),
                    name: userfound.nombre,
                    email: userfound.email,
                    tipo_usuario: userfound.tipo_usuario // Añadimos el tipo de usuario
                };
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function middleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userTipoUsuario = session.user.tipo_usuario;

    if (userTipoUsuario !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
}
