'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'



export  default  function Register() {


    const {register, handleSubmit, formState: {errors} } = useForm()
    


    const router = useRouter()



    const onSubmit = handleSubmit (async (data) => {

        if (data.password !== data['confirm-password']) {
            alert('Passwords do not match')
            return
        }

        const res = await fetch('/api/auth/register', {
            method:'POST',
            body: JSON.stringify({
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if(res.ok) {

            router.push('/auth/login')
        }

        console.log(errors)
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8 rounded shadow-md">
                <label htmlFor="nombre" className='text-slate-800 mb-2 block text-sm' >nombre</label>
                <input type="text" placeholder="nombre" className="p-2 mb-2 border  rounded w-full"
                {...register('nombre', {required: {value: true, message: 'nombre is required'}})}
                />
                {errors.nombre && errors.nombre.message && (
                    <span className="text-red-600 text-xs">{String(errors.nombre.message)}</span>
                        )}
                <label htmlFor="apellido" className='text-slate-800 mb-2 block text-sm' >apellido</label>
                <input type="text" placeholder="apellido" className="p-2 mb-2 border  rounded w-full"
                {...register('apellido', {required: {value: true, message: 'apellido is required'}})}

                />
                {errors.apellido && typeof errors.apellido.message === "string" && (
                    <span className="text-red-600 text-xs">{errors.apellido.message}</span>
                    )}


                <label htmlFor="email" className='text-slate-800 mb-2 block text-sm' >email</label>
                <input type="email" placeholder="Email" className="p-2 mb-2 border text-black rounded w-full"
                {...register('email',
                     {required:
                         {
                                value: true,
                                message: 'Email is required'
                         }
                        })}
                />
                {errors.email && typeof errors.email.message === "string" && (
                    <span className="text-red-600 text-xs">{errors.email.message}</span>
                    )}
                <label htmlFor="password" className='text-slate-800 mb-2 block text-sm' >password</label>
                <input type="password" placeholder="Password" className="p-2 mb-2 border text-black rounded w-full"
                {...register('password', {required: {value: true, message: 'Password is required'}})}
                />
               {errors.password && typeof errors.password.message === "string" && (
                         <span className="text-red-600 text-xs">{errors.password.message}</span>
                            )}
                <label htmlFor="confirm-password" className='text-slate-800 mb-2 block text-sm' >confirm password</label>
                <input type="password" placeholder="Confirm Password" className="p-2 mb-2 border text-black rounded w-full"
                {...register('confirm-password', {required: {value: true, message: 'Password is required'}})}
                />
                {errors['confirm-password'] && typeof errors['confirm-password'].message === "string" && (
                        <span className="text-red-600 text-xs">{errors['confirm-password'].message}</span>
                    )}


                {}
                <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Register</button>
                <div className="flex px-3 ">
                <p className="mt-4">Already have an account?</p>
                <Link href="/auth/login" className="text-blue-500 mx-3 mt-4">Log in</Link>
            </div> 
            </form>
               
        </div>
    )
    }