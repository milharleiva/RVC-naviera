'use client'
import Link from 'next/link'



export default function LoginPage() {
  return (


    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="flex flex-col space-y-4">
      <input type="email" placeholder="Email" className="p-2 border   rounded" />
      <input type="password" placeholder="Password" className="p-2 border  rounded" />
      <button type="submit" className="p-2 bg-blue-500 text-white   rounded">Login</button>
      </form>
      <div className='flex px-3 '>
        <p className="mt-4">Dont have an account?</p>
      <Link  href="/auth/register" className="text-blue-500 mx-3 mt-4"> registrarse</Link>
      </div>
      
    </div>
  )
}