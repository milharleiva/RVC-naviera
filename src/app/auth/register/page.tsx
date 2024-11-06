'use client'

import Link from 'next/link'




export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <form className="w-full max-w-sm bg-white p-8 rounded shadow-md">
                <input type="text" placeholder="Name" className="p-2 mb-4 border  rounded w-full" />
                <input type="email" placeholder="Email" className="p-2 mb-4 border text-black rounded w-full" />
                <input type="password" placeholder="Password" className="p-2 mb-4 border text-black rounded w-full" />
                <input type="confirm-password" placeholder="Confirm Password" className="p-2 mb-4 border text-black rounded w-full" />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Register</button>
                <div className="flex px-3 ">
                <p className="mt-4">Already have an account?</p>
                <Link href="/auth/login" className="text-blue-500 mx-3 mt-4">Log in</Link>
            </div> 
            </form>
               
        </div>
    )
    }