import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import db from '@/lib/db';
import bcrypt from 'bcrypt';




const authOptions = 
    {

        providers: [
            CredentialProvider({
                name: 'credentials',
                credentials: {
                    email: {label: 'Email', type: 'email'},
                    password: {label: 'Password', type: 'password'}
                    
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                async authorize(credentials, req) {
                    
                const userfound = await db.usuario.findUnique({
                        where: {
                            email: credentials?.email
                        }
                    })        

                    if(!userfound)  throw new Error('usuario no encontrado')

                    

                   if (!credentials) return null;
                   const matchpassword = await bcrypt.compare(credentials.password, userfound.password)

                   if (!matchpassword)  throw Error('contraseña incorrecta')

                   return {
                    id: userfound.id_usuario.toString(),
                    name: userfound.nombre,
                    email: userfound.email
                   }

                    
    
                }
            })
        ],
        pages : {
            signIn: '/auth/login',
        }
    }


const handler =   NextAuth(authOptions);


export {handler as GET, handler as POST}