import { SignIn } from "@clerk/nextjs";

import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex items-center justify-center py-20">
        <SignIn />
      </main>
    </div>
  )
}

export default page