"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.




// "Call SID": "CA98d80de313ea69e665a131872222e8e4",
// "Duration": "0",
// "End Time": "Wed, 09 Apr 2025 18:03:46 GMT",
// "From": "+18542695596",
// "Start Time": "Wed, 09 Apr 2025 18:02:52 GMT",
// "Status": "no-answer",
// "To": "+917041965783"




// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }


export type CallLog = {
  call_sid:string,
  duration:string,
  end_time:string,
  from:string,
  start_time:string,
  status:string,
  to:string
  
}









export const columns:ColumnDef<CallLog>[]  =[
// Call_sid
  {
    accessorKey:"call_sid",
    header:"Call SID",
  },

// From
  // {
  //   accessorKey:"From",
  //   header:"From",
  // },
// To

  {
    accessorKey:"to",
    header:"To",
  },



  // Start Time
  {
    accessorKey:"start_time",
    header:"Start Time",
  },
  // End Time
  {
    accessorKey:"end_time",
    header:"End Time",
  },


  // Duration
  {
    accessorKey:"duration",
    header:"Duration",
  },

  {
    accessorKey:"status",
    header:"Status",
  },



]