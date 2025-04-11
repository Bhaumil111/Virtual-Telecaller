
"use client"


import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react';
import { DataTable } from './datatable';
import { columns } from './columns';


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



export default function callDetails() {


  // const data = await getData()

  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true)
  

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

    // render the data in a table format


    <div className='bg-gradient-to-b from grayscale-50 to-gray-200 min-h-screen items-center   flex flex-col'>

    <div className=" shadow-md rounded-md text-black mx-auto p-10 w-full">

      <h1 className="text-2xl font-bold text-center mb-4">Call Logs</h1>
      <p className="text-center text-gray-600 mb-6">Here are the details of your call</p>

      <DataTable columns={columns} data = {data} />

      </div>

    </div>

  )





}