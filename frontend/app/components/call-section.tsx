
"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"


import React from "react"
import { useState } from "react"
import { redirect } from  "next/navigation"
import { SubmitHandler } from "@/app/components/submit-handler"


interface CallSectionProps {
    businessName: string,
    businessInfo: string,
    systemPrompt: string,
    sourceNumber: string,
    destinationNumber :string,
}

export function CallSection() {





    const [formData, setFormData] = useState<CallSectionProps>({
        businessName: "",
        businessInfo: "",
        systemPrompt: "",
        sourceNumber: "",
        destinationNumber:"",
    })




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log("formData", formData)
        
        try{
            const response = await fetch("http://127.0.0.1:5000/information", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

                
              });


            if(!response.ok){
                throw new Error("Network response was not ok")
              }

           
              
            const data = await response.json()
            console.log("Response data:", data)
        

              setTimeout(async()=>{

                try{

                    const callResponse = await fetch("http://127.0.0.1:5000/make_call", {
                        method: "GET",
                    });

                    const calld = await callResponse.text()
                    console.log("Call Response:", calld)

                }
                catch(error){
                    console.error("Error:", error)
                }

              }, 5000)
        }

        catch(error){
            console.error("Error:", error)
        }




    }
    return (


        <div className="bg-white py-16  mx-auto rounded-md shadow-md  mt-16 w-full md:w-1/2" >



            <div className="flex flex-col items-center justify-center mb-8">
                <div className="flex items-center mb-4 gap-1">

                    <Phone className="h-8 w-8 text-emerald-600" />
                    <h2 className="text-4xl font-bold text-gray-800"> Call Section</h2>
                </div>

                <p className="text-emerald-600 text-xl font-bold text-center mb-10 "> Enter your Details to get started
                </p>


                <form className="items-center justify-center w-66 md:w-3/4" onSubmit={handleSubmit}
                >

                    <div className="mb-4 w-full items-center justify-center flex flex-col gap-1">
                        <label htmlFor="businessName" className=" text-gray-700 font-bold mb-2">Business Name</label>
                        <Input type="text" id="businessName" name="businessName" placeholder="Enter your business name" className="border border-gray-300 rounded-md p-2 " required onChange={handleChange} />


                    </div>

                    <div className="mb-4 w-full items-center justify-center flex flex-col gap-1">
                        <label htmlFor="businessInfo" className=" text-gray-700 font-bold mb-2">Business Information</label>
                        <Textarea id="businessInfo" name="businessInfo" placeholder="Enter your business information" className="border border-gray-300 rounded-md p-2 h-28 " required onChange={handleChange} />
                    </div>

                    <div className="mb-4 w-full items-center justify-center flex flex-col gap-1">
                        <label htmlFor="systemPrompt" className=" text-gray-700 font-bold mb-2">System Prompt</label>
                        <Textarea id="systemPrompt" name="systemPrompt" placeholder="Enter your system prompt" className="border border-gray-300 rounded-md p-2 h-28 " required onChange={handleChange} />
                    </div>

                    <div className="mb-4 w-full items-center justify-center flex flex-col gap-1">
                        <label htmlFor="sourceNumber" className="text-gray-700 font-bold mb-2">Source Number</label>
                        <Input type="text" id="sourceNumber" name="sourceNumber" placeholder="Enter your source number" className="border border-gray-300 rounded-md p-2" required onChange={handleChange} />
                    </div>

                    <div className="mb-4 w-full items-center justify-center flex flex-col gap-1">
                        <label htmlFor="destinationNumber" className="text-gray-700 font-bold mb-2">Destination Number</label>
                        <Input type="text" id="destinationNumber" name="destinationNumber" placeholder="Enter your destination number"
                            className="border border-gray-300 rounded-md p-2" required onChange={handleChange} />
                    </div>


                    <div className="items-center justify-center w-full flex flex-col gap-1">


                        <button type="submit" 
                        className="bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-emerald-700  w-36  hover:cursor-pointer">
                        
                        
                        Initate Calls</button>

                    </div>

                </form>

            </div>

        </div>

    )

}