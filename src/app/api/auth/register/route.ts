import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import db from '@/lib/db';



export async function POST(request: Request) {
   
    try {
        

        const data = await request.json(); 

        const userfound = await db.usuario.findUnique({
            where: {
                email: data.email
            }
        })
        
        if(userfound) {
            return NextResponse.json({message: 'correo ya existe'}, {status: 400});
        }
        



        
        const hashedpassword = await bcrypt.hash(data.password, 10);   
        const newUser = await db.usuario.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: hashedpassword
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: _, ...user} = newUser;
       
        return NextResponse.json(user); 


    } catch (error) {

        if (error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        }
        return NextResponse.json({message: 'error desconocido'}, {status: 500});
        
    }
       
      
}
