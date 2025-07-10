import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    // <div>UserPage</div>

    <div className='min-h-screen flex flex-col items-center justify-start mt-32'>
        <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>This page is under construction </h3>
        <h3 className='text-lg text-gray-600 dark:text-gray-400 mt-3'>Please check back later.


        </h3>

        <button className='bg-green-500 text-white dark:bg-green-600 px-4 py-2 rounded-md mt-4 hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300'>
            <Link href = "/dashboard">Go to Dashboard</Link>
        </button>
    </div>
  )
}

export default UserPage