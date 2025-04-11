"use client"

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { redirect } from "next/navigation";

export function SubmitHandler() {

    const handleClick = () => {
        redirect("/")
    }

    return (
        <div className="flex flex-col items-center justify-center h-72 w-full md:w-1/2 mx-auto p-8
        
        bg-white rounded-md shadow-md  gap-4">
            <h1 className="text-3xl font-bold text-gray-800 "> Your Call Initiated to the following numbers</h1>


            {/* <p className="text-lg text-gray-600 mt-4">+917041965783</p>
            <p className="text-lg text-gray-600 mt-4">+917041965783</p>
            <p className="text-lg text-gray-600 mt-4">+917041965783</p>
            <p className="text-lg text-gray-600 mt-4">+917041965783</p>
            */}
            <ol className="mt-4">

                <li className="flex justify-center items-center gap-2">
                    <Phone className="h-6 w-6 text-emerald-600" />
                    <p className="text-lg text-gray-600 ">+917041965783</p>
                </li>

                <li className="flex justify-center items-center gap-2">
                    <Phone className="h-6 w-6 text-emerald-600" />
                    <p className="text-lg text-gray-600 ">+917041965783</p>
                </li>
            </ol>



            <Button variant='outline' onClick={handleClick}>
                Go Back Home
            </Button>

        </div>




    )

}