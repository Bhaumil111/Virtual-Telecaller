"use client"

import React from 'react'
import {Phone} from "lucide-react"
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image'






export function Navbar() {

const handleClick = ()  =>{
    redirect("/")
}

  return (
    <nav className="border-b bg-white text-black">

        <div className="  container mx-auto py-4 px-4  flex items-center justify-between ">
            <div className='flex items-center  gap-3 '>


                {/* <Image src="/logo.png" alt="logo" width={40} height={40} className='h-10 w-10 rounded-full' /> */}
                <span  className='text-xl font-bold hover: cursor-pointer hidden md:block '  onClick={handleClick}>Voicy</span>

            </div>


            <div className='flex items-center gap-4 '>
                <Link href="/" className='text-lg font-semibold hover:text-emerald-600'>Home</Link>
                {/* <Link href="/about" className='text-lg font-semibold hover:text-emerald-600'>About</Link> */}
                <Link href="/callLogs" className='text-lg font-semibold hover:text-emerald-600'>CallRecords</Link>


                <SignedOut>
                <button className='bg-emerald-600 text-white px-4 py-3 rounded-md hover:bg-emerald-700'>
                    <Link href="/sign-in" >Sign In</Link>
                </button>
                </SignedOut>


              
               <SignedIn>

                <button className='bg-emerald-600 text-white px-2 py-2 rounded-full hover:bg-emerald-700'>
                    <UserButton />
                </button>
                

               </SignedIn>

            </div>

            
            
        </div>

    </nav>
  )
}

