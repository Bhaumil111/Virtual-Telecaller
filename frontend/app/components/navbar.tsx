"use client"

import React from 'react'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import logo from "@/app/logo.png"
import { ModeToggle } from "@/app/components/mood-toggle"






export function Navbar() {

    const handleClick = () => {
        redirect("/")
    }

    return (
        <nav className="border-b bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300 ease-in-out">
            <div className="container mx-auto py-4 px-4 flex items-center justify-between">

                <div className='flex items-center  gap-3 '>



                    <Image src={logo} alt="logo" width={40} height={40} />

                    <span className='text-xl font-bold hover: cursor-pointer hidden md:block ' onClick={handleClick}>Voicy</span>

                </div>


                <div className='flex items-center gap-4 '>
                    <ModeToggle  />
                      <Link href="/" className='text-lg font-semibold hover:text-emerald-600   dark:hover:text-emerald-300 '>Home</Link>
                    <Link href="/dashboard" className='text-lg font-semibold hover:text-emerald-600 dark:hover:text-emerald-300'>Dashboard</Link>
                    {/* <Link href="/about" className='text-lg font-semibold hover:text-emerald-600'>About</Link> */}
                  


                    <SignedOut>
                        <button className='bg-emerald-600 font-bold text-white px-4 py-3 rounded-md hover:bg-emerald-700  dark:hover:text-emerald-300'>
                            <Link href="/sign-in" >Sign In</Link>
                        </button>
                    </SignedOut>



                    <SignedIn>

                        <button className='bg-emerald-600 font-bold text-white px-2 py-2 rounded-full hover:bg-emerald-700  dark:hover:text-emerald-300'>
                            <UserButton />
                        </button>


                    </SignedIn>

                </div>



            </div>

        </nav>
    )
}

