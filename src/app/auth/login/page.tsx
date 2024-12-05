'use client'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {

  const {register, handleSubmit ,formState:{errors} } = useForm()

  const router = useRouter()

  const [error, SetError] = useState('')

  const onSubmit = handleSubmit( async (data) => {
    console.log(data)
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  
   if(res?.error) {
    SetError(res.error)
   } else {
    router.push('/dashboard')
    router.refresh()
   }
  })

  return (


    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">

      {error && (
                    <p className="bg-red-600 text-lg text-white p-3 rounded ">{error}</p>
                    )}

      <label htmlFor="email" className='text-slate-800 mb-2 block text-sm' >Email</label>
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
      
                <label htmlFor="password" className='text-slate-800 mb-2 block text-sm' >Password</label>
                <input type="password" placeholder="Password" className="p-2 mb-2 border text-black rounded w-full"
                {...register('password', {required: {value: true, message: 'Password is required'}})}/>
                {errors.password && typeof errors.password.message === "string" && (
                <span className="text-red-600 text-xs">{errors.password.message}</span>
                  )}

      <button type="submit" className="p-2 bg-blue-500 text-white   rounded">Login</button>
      </form>
      <div className='flex px-3 '>
        <p className="mt-4">no tienes una cuenta?</p>
      <Link  href="/auth/register" className="text-blue-500 mx-3 mt-4"> registrarse</Link>
      </div>
      <div className='flex px-3'>
      <p>olvidaste tu contraseña?</p>
      <Link href="{{ .ConfirmationURL }}">reiniciar contraseña</Link>
      </div>
      
    </div>
  )
}