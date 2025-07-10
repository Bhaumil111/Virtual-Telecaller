
"use client"


import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react';
import { DataTable } from './datatable';
import { columns } from './columns';
import Link from 'next/link';


async function getData() {

  const res = await fetch("http://127.0.0.1:5000/call_details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

  });

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}



export default function CallDetails() {


  // const data = await getData()

  const [data,setData] = useState([])
  
  

  useEffect(()=>{


    const fetchData = async()=>{

      const data = await getData()
      setData(data)

      
    }

    fetchData()


  },[])






console.log("Data", data)
  // console.log("Data", data)
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 
                    dark:from-[#0d0d0d] dark:to-[#1a1a1a] 
                    min-h-screen flex flex-col items-center 
                    ">
  
      <div className="shadow-md rounded-md bg-white dark:bg-[#121212] 
                      text-black dark:text-gray-200 mx-auto p-10 w-full 
                      max-w-6xl ">
  
        <h1 className="text-2xl font-bold text-center mb-4">Call Records


        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          All your call records are displayed below.
        </p>
  
        <DataTable columns={columns} data={data} />
               <button className='bg-green-500 text-white dark:bg-green-600 px-4 py-2 rounded-md  hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300'>
            <Link href = "/dashboard">Go to Dashboard</Link>
        </button>
  
      </div>


    </div>
  );
  





}