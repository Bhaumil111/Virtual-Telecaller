"use client"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
export function HeroSection(){
const handleClick = () =>{

    redirect("/makeCall")

}

    return(


        <section className = " py-10 lg:py-15 ">
            <div className = " mx-auto px-4 sm:px-6 lg:px-8">
                <div className = "text-center mb-12">
                    <h1 className = "text-3xl  lg:text-6xl font-bold text-gray-900 dark:text-gray-400">
                    AI <span className="text-emerald-600 dark:text-emerald-300">Telecaller</span>
                        </h1>
                    <p className = "mt-4 text-2xl text-black dark:text-gray-300 "> The AI-powered virtual telecaller that advertises your business effectively</p>





                    <div className="mt-8 flex justify-center" onClick={handleClick}>
                        <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold  text-lg px-10 py-7 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer">

                            Get Started
                        </Button>
                    </div>

                </div>

                </div>
        </section>
    )

}


