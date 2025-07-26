"use client";
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react';

type analyticsProps = {
  call_sid: string;
  call_text: string;
  // Add other properties as needed
}

const AnalyticsPage = () => {



  const [data, setData] = useState<analyticsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getData');


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);

      }
      catch (e) {
        console.error('Failed to fetch data:', e);
      } finally {
        setIsLoading(false);
      }

    }

    fetchData();


  }, []);

  // console.log("Fetched Data:", data);





  return (

    <div className='min-h-screen p-10'>

      <h1 className='text-3xl font-bold mb-6'>Call Analytics</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>



        {isLoading ? (

          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='animate-pulse bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md'>
              <div className='h-6 bg-gray-400 dark:bg-gray-600 rounded mb-4 w-3/4 mx-auto'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded mb-2'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded mb-2'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded'></div>
            </div>
          ))

          



        ) : (

          data.map((item: analyticsProps) => (
            <div key={item.call_sid} className='bg-gray-100 dark:text-white text-black dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg dark:hover:bg-gray-700 hover:bg-gray-300 transition-shadow duration-300'>
              <h2 className='text-xl font-semibold mb-2 text-center'>
                <Link href={`/analytics/${item.call_sid}`} className='text-green-600 dark:text-green-400 hover:underline'>

                  {item.call_sid.length > 20 ? item.call_sid.substring(0, 20) + '...' : item.call_sid}
                </Link>
              </h2>


              <p className='text-gray-600 dark:text-gray-300'>{item.call_text.length > 200 ? item.call_text.substring(0, 200) + '...' : item.call_text
              }</p>
            </div>
          ))

        )}


      </div>
    </div>
  )
}

export default AnalyticsPage