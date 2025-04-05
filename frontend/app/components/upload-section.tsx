import React from 'react';
import { Textarea } from '@/components/ui/textarea';



export function UploadSection() {
    // two textbox parrellly aligned with a button in the middle one for text of data and one for system prompt text
    // and a button to upload the data and system prompt text
    return (


        <div className=' bg-white py-20  mx-auto  px-5 flex  items-center  justify-between md :gap-4 gap-2 flex-col md:flex-row'>



            <div className='  items-center justify-center grid grid-cols-1 md:grid-cols-2 gap-4 w-full  mx-auto '>
                <div className='flex flex-col  items-center'>

                    <label className='text-gray-800 font-bold text-2xl  mb-2  ' id='business-info'
                    > Enter Business Information </label>

                    <Textarea className='w-full h-36  ' id = 'business-info' placeholder='Enter your business information here.'>

                    </Textarea>

                    <button className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-md mt-4  '>
                        Upload Data
                    </button>
                </div>


                <div className='flex flex-col  items-center'>
                    <label className='text-gray-800 font-bold text-2xl  mb-2  ' id='business-prompt'>
                        Enter your System Prompt
                    </label>

                    <Textarea className='w-full h-36' id='system-prompt' placeholder='Enter your system prompt here'>


                    </Textarea>

                    <button className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-md mt-4  '>
                        Upload  Prompt
                    </button>
                    
                </div>

            </div>
        </div>

    )
}

